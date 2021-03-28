const express = require('express');
const convControl = require('../controller/conveyor-controller');

const router = express.Router();

router.get('/conveyor', convControl.conveyorController);

module.exports = router;