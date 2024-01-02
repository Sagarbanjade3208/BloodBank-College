const AppError = require("./AppError")


module.exports = function (request , response , next) {
    if(!request?._user.isAdmin) return next(new AppError("You don't have admin privilage to peform this action"))
    next();
}