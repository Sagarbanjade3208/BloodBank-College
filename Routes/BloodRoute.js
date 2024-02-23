const express = require('express');
const Router = express.Router();
const {
  createRequest,
  acceptRequest,
  deleteRequest,
} = require('../Controller/BloodController');
const ProtectRoute = require('../Utils/ProtectRoute');

Router.post('/create', ProtectRoute, createRequest);
Router.get('/accept/:id', ProtectRoute, acceptRequest);
Router.get('/delete/:id', ProtectRoute, deleteRequest);

module.exports = Router;
