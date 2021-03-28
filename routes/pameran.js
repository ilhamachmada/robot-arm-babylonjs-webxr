const express = require('express');
const pameran = require('../controller/pameran');

const router = express.Router();

router.get('/pameran', pameran.pameran);

module.exports = router;