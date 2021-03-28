const express = require('express');
const skybox = require('../controller/skybox');

const router = express.Router();

router.get('/skybox', skybox.skybox);

module.exports = router;