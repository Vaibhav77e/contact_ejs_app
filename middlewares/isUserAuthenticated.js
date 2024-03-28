const User = require('../models/UserModel/user_model');

const jwt = require('jsonwebtoken')

// Middleware to authenticate token
const isUserAuthenticated = async (req,res,next) => {
    let token;
    try{
        if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
            token = req.headers.authorization.split(' ')[1];
        }else{
            return res.status(401).json({message: "You are not authorized to access this resource."});
        }

        if(token===null){
            return res.status(401).json({message:'Your unauthorized to access this resource,login first access this resources'});
        }

        console.log(`Token baa :${token}`);

        const verifyToken = jwt.verify(token,process.env.JWT_SECRET_KEY);

        const user = await User.findById(verifyToken.id);

        if(!user){
            return console.log("User not found");
        }
        req.user = user;

        next();
    }
    catch(err){
        return console.log(`Error while : ${err.message}`)
        return res.status(400).json({message: err.message});
    }
}

module.exports = isUserAuthenticated;