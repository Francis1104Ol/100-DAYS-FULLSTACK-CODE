const jwt = require('jsonwebtoken');

module.exports = (user, statusCode, res) => {
  const token = jwt.sign({ id: user._id }, process.env.SECRET_STR, {
    expiresIn: process.env.LOGIN_EXPIRES,
  });
const options ={
    maxAge :process.env.COOKIES_EXPIRES,
    httpOnly:true
  }
  if(process.env.NODE_ENV ==='production')
    options.secure =true;
  user.password =undefined
  res.cookie('jwt', token, options)
  res.status(statusCode).json({
    status: 'success',
    token,
    data: { user },
  });
};