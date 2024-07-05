const express = require('express');
const { authenticateToken } = require('../utils/jwt');
const likeController = require('../controllers/likeController');

const router = express.Router();

router.post('/discuss/:id/like', authenticateToken, likeController.likePost);
router.post('/discuss/:id/unlike', authenticateToken, likeController.unlikePost);
router.post('/comments/:id/like', authenticateToken, likeController.likeComment);
router.post('/comments/:id/unlike', authenticateToken, likeController.unlikeComment);

module.exports = router;
