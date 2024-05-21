const User = require('../Model/UserModel');
const CatchAsync = require('../Utils/CatchAsync');
const AppError = require('../Utils/AppError');
const issueJwt = require('../Utils/IssueJwt');
const jwt = require('jsonwebtoken');

exports.signup = CatchAsync(async function (request, response, next) {
  const { name, email, password, age, address, phoneNumber, bloodGroup } =
    request.body;
  const isAdmin = request.body.isAdmin ? true : false;
  const isalreadyExist = await User.findOne({ email });

  if (isalreadyExist && isAdmin) {
    return response.render('adminAccount', {
      errorMessage: 'account already exists',
    });
  }
  const user = await User.create({
    name,
    email,
    password,
    age,
    address,
    phoneNumber,
    bloodGroup,
    isAdmin,
  });

  response.redirect('/login');
});

exports.login = CatchAsync(async function (request, response, next) {
  const { email, password } = request.body;
  if (!email || !password)
    return next(new AppError('Please enter email and password', 401, 'login'));
  const userDoc = await User.findOne({ email });
  if (!userDoc || !(await userDoc.comparePassword(password, userDoc.password)))
    return next(new AppError('Invalid email or password', 401, 'login'));
  const token = issueJwt({ _id: userDoc._id });
  response.cookie('jwt', token);
  response.redirect('/dashboard');
});

exports.protectRoute = CatchAsync(async function (request, response, next) {
  const cookie = request.cookies.jwt;
  if (!cookie) return response.redirect('/login');
  const { _id } = jwt.verify(cookie, 'SAGAR');
  const user = await User.findById(_id);
  if (!user) return response.redirect('/login');
  next();
});
