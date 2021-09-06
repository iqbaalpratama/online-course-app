const express = require('express');
const router = express.Router();
const reviewHandler = require('../routes/handler/reviews')
const verifyToken = require('../middleware/verifyToken');

router.post('/', reviewHandler.create);
router.put('/:id', reviewHandler.update);
router.delete('/:id', reviewHandler.destroy);

module.exports = router;