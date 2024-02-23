exports.getLoginPage = (request, response) => {
  response.render('login');
};

exports.getSignupPage = (request, response) => {
  response.render('signup');
};

exports.getHomepage = (request, response) => {
  response.render('homepage');
};
