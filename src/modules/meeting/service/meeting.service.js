const { Op } = require("sequelize");
const Meeting = require("../model/meeting.model");

function validateTimes(startTime, endTime) {
  if (!startTime || !endTime) {
    throw { status: 400, message: "startTime and endTime are required" };
  }

  if (new Date(startTime) >= new Date(endTime)) {
    throw { status: 400, message: "startTime must be before endTime" };
  }
}

async function checkConflict({ userId, startTime, endTime, excludeId }) {
  const where = {
    userId,
    startTime: { [Op.lt]: endTime },
    endTime: { [Op.gt]: startTime },
  };

  if (excludeId) {
    where.id = { [Op.ne]: excludeId };
  }

  return await Meeting.findOne({ where });
}

async function createMeeting(data) {
  validateTimes(data.startTime, data.endTime);

  const conflict = await checkConflict(data);

  if (conflict) {
    throw { status: 400, message: "Time slot already booked" };
  }

  return await Meeting.create(data);
}

async function updateMeeting(id, data) {
  const meeting = await Meeting.findByPk(id);
  if (!meeting) {
    throw { status: 404, message: "Meeting not found" };
  }

  validateTimes(data.startTime, data.endTime);

  const conflict = await checkConflict({
    userId: data.userId,
    startTime: data.startTime,
    endTime: data.endTime,
    excludeId: id,
  });

  if (conflict) {
    throw { status: 400, message: "Time slot already booked" };
  }

  return await meeting.update(data);
}

async function getMeetingById(id) {
  const meeting = await Meeting.findByPk(id);
  if (!meeting) {
    throw { status: 404, message: "Meeting not found" };
  }
  return meeting;
}

async function listMeetings(query) {
  const where = {};

  if (query.userId) {
    where.userId = query.userId;
  }

  if (query.startDate && query.endDate) {
    where.startTime = {
      [Op.gte]: query.startDate,
    };
    where.endTime = {
      [Op.lte]: query.endDate,
    };
  }

  return await Meeting.findAll({ where });
}

async function deleteMeeting(id) {
  const meeting = await Meeting.findByPk(id);
  if (!meeting) {
    throw { status: 404, message: "Meeting not found" };
  }

  await meeting.destroy();
}

module.exports = {
  createMeeting,
  updateMeeting,
  getMeetingById,
  listMeetings,
  deleteMeeting,
};
