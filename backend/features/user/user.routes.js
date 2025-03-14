const express = require('express');
const router = express.Router();
const { registerUser, loginUser, logoutUser, updateUser, deleteUser, getUserData, refreshToken } = require('./user.service');
const verifyToken = require('../../middleware/authJWT');

router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/logout', verifyToken, logoutUser);
router.put('/', verifyToken, updateUser);
router.delete('/', verifyToken, deleteUser);
router.get('/me', verifyToken, getUserData);
router.get('/refreshtoken', verifyToken, refreshToken);

module.exports = router;
