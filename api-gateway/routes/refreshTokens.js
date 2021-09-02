const express = require('express');
const router = express.Router();
const refreshTokenHandler = require('../routes/handler/refresh-tokens');

router.post('/', refreshTokenHandler.refreshToken);
module.exports = router;