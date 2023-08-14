// controllers/users.js
const User = require('../models/user');
const jwt = require('jsonwebtoken'); // импортируем модуль jsonwebtoken
const { NODE_ENV, JWT_SECRET } = process.env;


module.exports.login = (req, res, next) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret',
        { expiresIn: '7d' }
      );

      res.send({ token });
    })
    .catch(next);
};