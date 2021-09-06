const express = require('express');
const router = express.Router();
const imageCoursesHandler = require('../routes/handler/image-courses')
const verifyToken = require('../middleware/verifyToken');



router.post('/', verifyToken, imageCoursesHandler.create);
router.delete('/:id', verifyToken, imageCoursesHandler.destroy);

module.exports = router;