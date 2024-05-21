const express = require('express');
const Router = express.Router();
const {
  createRequest,
  acceptRequest,
  deleteRequest,
  updateRequest,
} = require('../Controller/BloodController');
const ProtectRoute = require('../Utils/ProtectRoute');

Router.post('/create', ProtectRoute, createRequest);
Router.get('/accept/:id', ProtectRoute, acceptRequest);
Router.get('/delete/:id', ProtectRoute, deleteRequest);
Router.post('/update/:id', ProtectRoute, updateRequest);

module.exports = Router;
