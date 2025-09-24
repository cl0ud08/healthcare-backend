const express = require('express');
const router = express.Router();
const { register, login, refreshToken } = require('../controllers/authController');
const { registerValidator, loginValidator } = require('../middlewares/validators');
const handleValidation = require('../middlewares/handleValidation'); // Import the new middleware

router.post('/register', registerValidator, handleValidation, register);
router.post('/login', loginValidator, handleValidation, login);
router.post('/refresh', refreshToken);

module.exports = router;