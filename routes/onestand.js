const express = require('express');
const onestand = require('../controller/onestand');

const router = express.Router();

router.get('/onestand', onestand.onestand);

module.exports = router;