// routes/diversityRoutes.js
const express = require('express');
const router = express.Router();
const diversityController = require('../controllers/diversityController');

router.get('/diversityCounts', diversityController.diversityCounts);

module.exports = router;
