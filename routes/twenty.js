const express = require('express');
const twenty = require('../controller/twenty');

const router = express.Router();

router.get('/twenty', twenty.twenty);

module.exports = router;