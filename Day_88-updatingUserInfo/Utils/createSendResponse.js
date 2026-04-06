const jwt = require('jsonwebtoken');

module.exports = (user, statusCode, res) => {
  const token = jwt.sign({ id: user._id }, process.env.SECRET_STR, {
    expiresIn: process.env.LOGIN_EXPIRES,
  });

  res.status(statusCode).json({
    status: 'success',
    token,
    data: { user },
  });
};