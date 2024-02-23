const Router = require('express').Router();
const {
  getLoginPage,
  getSignupPage,
  logout,
  getDashboard,
  getAdminPage,
  getDonateBloodPage,
  getRequestBloodPage,
  getAdminSignupPage,
} = require('../Controller/DocumentController');
const protectRoute = require('../Utils/ProtectRoute');
const AdminPrivilage = require('../Utils/AdminPrivilage');

Router.route('/login').get(getLoginPage);
Router.route('/signup').get(getSignupPage);
Router.route('/admin-signup').get(getAdminSignupPage);
Router.route('/logout').get(protectRoute, logout);
Router.route('/dashboard').get(protectRoute, getDashboard);
Router.route('/admin').get(protectRoute, AdminPrivilage, getAdminPage);
Router.route('/donate-blood').get(protectRoute, getDonateBloodPage);
Router.route('/request-blood').get(
  protectRoute,
  protectRoute,
  getRequestBloodPage
);

module.exports = Router;
