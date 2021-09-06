const express = require('express');
const router = express.Router();
const chapterHandler = require('../routes/handler/chapters')
const verifyToken = require('../middleware/verifyToken');

router.post('/', chapterHandler.create);
router.get('/', chapterHandler.getAll);
router.get('/:id', chapterHandler.get);
router.put('/:id', chapterHandler.update);
router.delete('/:id', chapterHandler.destroy);

module.exports = router;