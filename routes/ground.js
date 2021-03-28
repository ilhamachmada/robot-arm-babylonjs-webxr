const express = require('express');
const ground = require('../controller/ground');

const router = express.Router();

router.get('/ground', ground.ground);

module.exports = router;