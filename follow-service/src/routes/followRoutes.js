const express = require('express');
const { authenticateToken } = require('../utils/jwt');
const followController = require('../controllers/followController');

const router = express.Router();

router.post('/unfollow', authenticateToken, followController.unfollowUser);
router.get('/followers/:id', authenticateToken, followController.getFollowers);
router.get('/followees/:id', authenticateToken, followController.getFollowees);
router.post('/', authenticateToken, followController.followUser);

module.exports = router;
