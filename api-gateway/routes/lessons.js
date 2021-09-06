const express = require('express');
const router = express.Router();
const lessonHandler = require('../routes/handler/lessons')
const verifyToken = require('../middleware/verifyToken');

router.post('/', lessonHandler.create);
router.get('/', lessonHandler.getAll);
router.get('/:id', lessonHandler.get);
router.put('/:id', lessonHandler.update);
router.delete('/:id', lessonHandler.destroy);

module.exports = router;