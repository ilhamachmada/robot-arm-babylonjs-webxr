const express = require('express');
const test = require('../controller/test-controller');

const router = express.Router();

router.get('/test', test.testController);

module.exports = router;