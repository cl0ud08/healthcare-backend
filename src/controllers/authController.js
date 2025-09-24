const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const prisma = require('../config/db');
const { jwtSecret, jwtRefreshSecret } = require('../config/env');

// Register a new user
exports.register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) return res.status(400).json({ error: 'Email already registered' });

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: { name, email, password: hashedPassword },
    });

    res.status(201).json({
      message: 'User registered successfully',
      user: { id: user.id, name: user.name, email: user.email }
    });
  } catch (err) {
    next(err);
  }
};

// Login user
exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) return res.status(400).json({ error: 'Invalid credentials' });

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return res.status(400).json({ error: 'Invalid credentials' });

    const accessToken = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      jwtSecret,
      { expiresIn: '15m' }
    );

    const refreshToken = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      jwtRefreshSecret,
      { expiresIn: '7d' }
    );

    res.json({ accessToken, refreshToken });
  } catch (err) {
    next(err);
  }
};

// Refresh access token
exports.refreshToken = async (req, res, next) => {
  try {
    const { refreshToken } = req.body;
    if (!refreshToken) {
      return res.status(400).json({ error: 'Refresh token required' });
    }
    jwt.verify(refreshToken, jwtRefreshSecret, async (err, user) => {
      if (err) return res.status(403).json({ error: 'Invalid refresh token' });
      
      const dbUser = await prisma.user.findUnique({ where: { id: user.id } });
      if (!dbUser) return res.status(403).json({ error: 'User not found' });

      const accessToken = jwt.sign({ id: dbUser.id, email: dbUser.email, role: dbUser.role }, jwtSecret, { expiresIn: '15m' });
      res.json({ accessToken });
    });
  } catch (err) {
    next(err);
  }
};