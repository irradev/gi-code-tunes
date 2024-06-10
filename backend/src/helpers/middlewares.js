const jwt = require('jsonwebtoken');

const { User } = require('../models');

require('dotenv').config();

const checkToken = async (req, res, next) => {
  if (!req.headers.authorization) {
    return res.status(403).json({ message: 'No se puede acceder' });
  }

  const token = req.headers.authorization.split(' ')[1];
  let payload;
  try {
    payload = jwt.verify(token, process.env.JWT_SECRET);
  } catch (error) {
    return res.status(403).json({ message: 'No se puede acceder' });
  }

  const user = await User.findByPk(payload.id);
  req.user = user;

  next();
};

module.exports = { checkToken };
