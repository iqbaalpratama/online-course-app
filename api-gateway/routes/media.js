const express = require('express');
const router = express.Router();
const mediaHandler = require('../routes/handler/media')
const verifyToken = require('../middleware/verifyToken');

router.post('/', mediaHandler.create);
router.get('/', verifyToken, mediaHandler.getAll);
router.delete('/:id', mediaHandler.destroy);

module.exports = router;