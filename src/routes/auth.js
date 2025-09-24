const express = require('express');
const router = express.Router();
const { register, login, refreshToken } = require('../controllers/authController');
const { registerValidator, loginValidator } = require('../middlewares/validators');
const { validationResult } = require('express-validator');

function handleValidation(req, res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
}

router.post('/register', registerValidator, handleValidation, register);
router.post('/login', loginValidator, handleValidation, login);
router.post('/refresh', refreshToken);

module.exports = router;
