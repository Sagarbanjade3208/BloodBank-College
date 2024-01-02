const express = require('express')
const Router = express.Router();
const {createRequest} = require('../Controller/BloodController')
const ProtectRoute = require("../Utils/ProtectRoute");

Router.post('/create' , ProtectRoute , createRequest);

module.exports = Router;