const bcrypt = require('bcryptjs');
const asyncHandler = require('express-async-handler');
const { findUserByEmail, createUser } = require('../services/userService');
const generateToken = require('../utils/generateToken');

const register = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    res.status(400);
    throw new Error('All fields are required');
  }
  const userExists = await findUserByEmail(email);
  if (userExists) {
    res.status(400);
    throw new Error('User already exists');
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await createUser({ name, email, password: hashedPassword });
  res.status(201).json({
    success: true,
    user: {
      _id: user._id,
      name: user.name,
      email: user.email,
    },
    token: generateToken(user._id),
  });
});

const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400);
    throw new Error('All fields are required');
  }
  const user = await findUserByEmail(email);
  if (!user || !(await bcrypt.compare(password, user.password))) {
    res.status(401);
    throw new Error('Invalid credentials');
  }
  res.status(200).json({
    success: true,
    user: {
      _id: user._id,
      name: user.name,
      email: user.email,
    },
    token: generateToken(user._id),
  });
});

module.exports = { register, login };