const express = require('express');
const { authenticateToken } = require('../utils/jwt');
const discussController = require('../controllers/discussController');

const router = express.Router();

router.get('/search', authenticateToken, discussController.getDiscussPostsByTags);
router.get('/searchByText', authenticateToken, discussController.getDiscussPostsByText);
router.get('/:id', authenticateToken, discussController.getDiscussPost);
router.put('/:id', authenticateToken, discussController.updateDiscussPost);
router.delete('/:id', authenticateToken, discussController.deleteDiscussPost);
router.get('/', authenticateToken, discussController.getAllDiscussPosts);
router.post('/', authenticateToken, discussController.createDiscussPost);


module.exports = router;
