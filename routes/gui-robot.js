const express = require('express');
const guiControl = require('../controller/gui-controller');

const router = express.Router();

router.get('/gui', guiControl.guiController);

module.exports = router;