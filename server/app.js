const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const memberRoutes = require('./routes/memberRoutes');
const requestRoutes = require('./routes/requestRoutes');
const resourceRoutes = require('./routes/resourceRoutes');
const dashboardRoutes = require('./routes/dashboardRoutes');
const statisticsRoutes = require('./routes/statisticsRoutes');
const searchRoutes = require('./routes/searchRoutes');
const authMiddleware = require('./middleware/authMiddleware');
const errorHandler = require('./middleware/errorHandler');

const app = express();
app.use(cors());
app.use(express.json());
app.use('/api/auth', authRoutes);
app.use('/api/members', authMiddleware, memberRoutes);
app.use('/api/requests', authMiddleware, requestRoutes);
app.use('/api/resources', authMiddleware, resourceRoutes);
app.use('/api/dashboard', authMiddleware, dashboardRoutes);
app.use('/api/statistics', authMiddleware, statisticsRoutes);
app.use('/api/search', authMiddleware, searchRoutes);
app.use(errorHandler);

module.exports = app;






// const express = require("express");
// const cors = require("cors");

// const authRoutes = require("./routes/auth");

// const app = express();

// app.use(cors());
// app.use(express.json());

// // Routes
// app.use("/api/auth", authRoutes);

// module.exports = app;