const CatchAsync = require('../Utils/CatchAsync');
const User = require('../Model/UserModel');
const BloodRequest = require('../Model/BloodRequestModel');

exports.getLoginPage = (request, response) => {
  response.render('login');
};

exports.getSignupPage = (request, response) => {
  response.render('signup');
};

exports.getHomepage = CatchAsync(async (request, response) => {
  response.render('dashboard', { allRequestOfUser });
});

exports.logout = CatchAsync(async function (request, response, next) {
  response.cookie('jwt', '', { maxAge: 1 });
  response.redirect('/login');
});

exports.getDashboard = CatchAsync(async (request, response) => {
  const allRequestOfUser = await BloodRequest.find({
    userId: request._user._id,
  });

  const mappedData = allRequestOfUser.map((request) => request.toObject());
  let user = await User.findById(request._user._id);
  user = user.toObject();
  response.render('dashboard', {
    allRequestOfUser: mappedData.reverse(),
    user,
  });
});

exports.getRequestBloodPage = (request, response) => {
  response.render('requestBlood');
};

exports.getDonateBloodPage = (request, response) => {
  response.render('donateBlood');
};

exports.getAdminPage = async (request, response) => {
  let requests = await BloodRequest.find({ isAccepted: false }).populate({
    path: 'userId',
    select: 'name',
  });
  requests = requests.map((request) => request.toObject());
  response.render('adminConsole', { requests: requests.reverse() });
};

exports.getAdminSignupPage = (request, response) => {
  response.render('adminAccount');
};
