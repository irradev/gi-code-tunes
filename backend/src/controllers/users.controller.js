const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const { User } = require('../models');

const register = async (req, res) => {
  req.body.password = bcrypt.hashSync(req.body.password, 10); // normal entre 8 y 12

  try {
    const user = await User.create(req.body);
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ where: { email } });

  if (!user) {
    return res.status(401).json({ message: 'Credenciales inválidas' });
  }

  if (!bcrypt.compareSync(password, user.password)) {
    return res.status(401).json({ message: 'Credenciales inválidas' });
  }

  const token = jwt.sign(
    {
      id: user.id,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: '1d',
    }
  );

  res.json({ token });
};

module.exports = { register, login };
