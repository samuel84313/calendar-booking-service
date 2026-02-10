📅 Calendar Booking Service
📌 Project Overview

This is a backend REST API built using Node.js, Express, Sequelize, and PostgreSQL.
The system allows users to schedule meetings while strictly preventing overlapping time slots using conflict detection logic.

The project follows a clean modular architecture:

Routes → Controller → Service → Model → Database

🚀 Tech Stack

Node.js

Express.js

Sequelize ORM

PostgreSQL (or SQLite for local testing)

Nodemon

✅ Features

Create and fetch users

Create, update, delete, and list meetings

Prevent overlapping meeting time slots

Filter meetings by user and date range

Proper validation and error handling

Clean modular backend structure

🔒 Business Rule – Conflict Prevention

A meeting cannot overlap with an existing meeting.

A conflict exists if:

existing.startTime < new.endTime
AND
existing.endTime > new.startTime


If conflict is detected, the API returns:

400 Bad Request
"Time slot already booked"


🌍 Live Deployment

Live Application URL:

https://calendar-booking-service-9imh.onrender.com
