const User = require("../Model/UserModel");
const AppError = require("../Utils/AppError");
const jwt  = require("jsonwebtoken");

async function ProtectRoute(request , response , next) {
    const cookie = request?.cookies?.jwt;
    if(!cookie) return next(new AppError("Please login to peform this operation"));
    const decoded = jwt.verify(cookie , "SAGAR");
    const userDoc = await User.findById(decoded._id);
    if(!userDoc) return next(new AppError("Invalid token or User no longer exists"));
    request._user = userDoc;
    next();
}

module.exports = ProtectRoute;