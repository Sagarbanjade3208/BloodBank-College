const Router = require('express').Router();
const {
  getLoginPage,
  getSignupPage,
  getHomepage,
} = require('../Controller/DocumentController');
const { protectRoute } = require('../Controller/UserController');

Router.route('/login').get(getLoginPage);
Router.route('/signup').get(getSignupPage);
Router.route('/').get(protectRoute, getHomepage);

module.exports = Router;
