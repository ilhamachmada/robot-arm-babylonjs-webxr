const express = require('express');
const industryControl = require('../controller/industry-controller');

const router = express.Router();

router.get('/industry-simulation', industryControl.industryController);

module.exports = router;