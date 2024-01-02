const jwt = require("jsonwebtoken")

function issueJwt (payload) {
    return jwt.sign(payload , "SAGAR");
}

module.exports = issueJwt