const express = require('express');
const router = express.Router();
const { registerUser, loginUser, logoutUser, updateUser, deleteUser } = require('../controllers/user.controller');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/logout', authMiddleware, logoutUser);
router.put('/update', authMiddleware, updateUser);
router.delete('/delete', authMiddleware, deleteUser);

module.exports = router;
