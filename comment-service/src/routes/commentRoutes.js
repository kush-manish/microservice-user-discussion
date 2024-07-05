const express = require('express');
const { authenticateToken } = require('../utils/jwt');
const commentController = require('../controllers/commentController');

const router = express.Router();

router.post('/', authenticateToken, commentController.createComment);
router.get('/:id', authenticateToken, commentController.getComment);
router.put('/:id', authenticateToken, commentController.updateComment);
router.delete('/:id', authenticateToken, commentController.deleteComment);
router.get('/', authenticateToken, commentController.getAllCommentsForPost);

module.exports = router;
