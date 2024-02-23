const User = require('../Model/UserModel');
const AppError = require('../Utils/AppError');
const jwt = require('jsonwebtoken');

async function ProtectRoute(request, response, next) {
  const cookie = request?.cookies?.jwt;
  if (!cookie) return response.redirect('/login');
  const decoded = jwt.verify(cookie, 'SAGAR');
  const userDoc = await User.findById(decoded._id);
  if (!userDoc) return response.redirect('/login');
  request._user = userDoc;
  next();
}

module.exports = ProtectRoute;
