const express = require('express');
const UserRoute = require("./Routes/UserRoutes");
const BloodRoute = require("./Routes/BloodRoute");
const ErrorHandler = require('./Utils/ErrorHandler');
const cookieParser = require("cookie-parser");

const app = express();

app.use(express.json());
app.use(cookieParser());

app.use("/api/v1/users" , UserRoute);
app.use("/api/v1/blood" , BloodRoute);


app.use('*' , (request , response) => {
    response.send("Route not found on this server");
})
app.use(ErrorHandler);

module.exports = app;