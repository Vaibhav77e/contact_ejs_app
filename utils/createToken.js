const jwt = require('jsonwebtoken');

const createToken = (id)=>{
    return jwt.sign(
        {id:id},
        process.env.JWT_SECRET_KEY,
        {
        expiresIn:process.env.JWT_EXPIRES_IN
        }
        );
}

module.exports = createToken;
