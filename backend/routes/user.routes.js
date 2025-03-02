const express = require('express');
const router = express.Router();
const { registerUser, loginUser, logoutUser, updateUser, deleteUser, checkUserStatus } = require('../controllers/user.controller');
const verifyToken = require('../middleware/authJWT');

router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/logout', verifyToken, logoutUser);
router.put('/update', verifyToken, updateUser);
router.delete('/delete', verifyToken, deleteUser);
router.get('/me', verifyToken, checkUserStatus);

module.exports = router;
