const express = require('express');
const Router = express.Router();
const { signup, login } = require('../Controller/UserController');

Router.get('/', (request, response) => {
  response.send('Hello i am user route');
});

Router.post(
  '/signup',
  (req, res, next) => {
    req.body.isAdmin = false;
    next();
  },
  signup
);
Router.post('/login', login);

module.exports = Router;
