const User = require('../Model/UserModel');
const CatchAsync = require('../Utils/CatchAsync')
const AppError = require("../Utils/AppError");
const issueJwt = require("../Utils/IssueJwt");


exports.signup = CatchAsync(async function(request , response , next) {
    const {
        name , email , password , age , address , phoneNumber , bloodGroup
    } = request.body;

    const user = await User.create({name , email , password , age , address , phoneNumber , bloodGroup})

    response.status(200).json({
        message : "User created successfully" ,
        user
    })
})

exports.login = CatchAsync(async function(request , response , next) {
    const {email , password} = request.body;
    if(!email || !password) return next(new AppError("Please enter email and password" , 401))
    const userDoc = await User.findOne({email});
    if(!userDoc || !await userDoc.comparePassword(password , userDoc.password)) return next(new AppError("Invalid email or password"));
    const token = issueJwt({_id : userDoc._id });
    response.cookie("jwt" , token);
    response.status(200).json({
        message : "Logged in successfully"
    })
})
