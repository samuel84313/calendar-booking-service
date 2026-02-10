const service = require("../service/meeting.service");

async function createMeeting(req, res, next) {
  try {
    const meeting = await service.createMeeting(req.body);
    res.status(201).json(meeting);
  } catch (err) {
    next(err);
  }
}

async function updateMeeting(req, res, next) {
  try {
    const meeting = await service.updateMeeting(req.params.id, req.body);
    res.status(200).json(meeting);
  } catch (err) {
    next(err);
  }
}

async function getMeeting(req, res, next) {
  try {
    const meeting = await service.getMeetingById(req.params.id);
    res.status(200).json(meeting);
  } catch (err) {
    next(err);
  }
}

async function listMeetings(req, res, next) {
  try {
    const meetings = await service.listMeetings(req.query);
    res.status(200).json(meetings);
  } catch (err) {
    next(err);
  }
}

async function deleteMeeting(req, res, next) {
  try {
    await service.deleteMeeting(req.params.id);
    res.status(204).send();
  } catch (err) {
    next(err);
  }
}

module.exports = {
  createMeeting,
  updateMeeting,
  getMeeting,
  listMeetings,
  deleteMeeting,
};
