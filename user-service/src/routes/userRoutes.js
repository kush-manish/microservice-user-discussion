const express = require('express');
const { authenticateToken } = require('../utils/jwt');
const userController = require('../controllers/userController');

const router = express.Router();

router.post('/token', userController.getToken);
router.get('/search', authenticateToken, userController.searchUsersByName);
router.get('/:id', authenticateToken, userController.getUser);
router.put('/:id', authenticateToken, userController.updateUser);
router.delete('/:id', authenticateToken, userController.deleteUser);
router.post('/', userController.createUser);
router.get('/', authenticateToken, userController.getAllUsers);

module.exports = router;
