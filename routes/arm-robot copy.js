const express = require('express');
const armRobot = require('../controller/arm-robot');

const router = express.Router();

router.get('/arm-robot', armRobot.robot);

module.exports = router;