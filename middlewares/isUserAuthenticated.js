// const User = require('../models/UserModel/user_model');
// const jwt = require('jsonwebtoken');


// const isUserAuthenticated = async (req, res, next) => {
//     let token;
//     console.log(`Token is present : ${res.cookie.token}`);
//     try{
//     //   if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
//     //     token = req.headers.authorization.split(' ')[1];
//     //   }
//     if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
//         token = req.headers.authorization.split(' ')[1];
//       }
//       else{
//         return res.status(401).json({message: "You are not authorized to access this resource."});
//     }

//     if(token===null){
//         res.status(401).json({message:'Your unauthorized to access this resource,login first access this resources'});
//     }

//     const verifyUser = jwt.verify(token,JWT_SECRET_KEY);

//     const user = await User.findById(verifyUser.id);

//     if(!user){
//         next(new NoDataError('User not found'));
//     }
//     req.user = user;

//     next();

//     }catch(e){
//         return res.status(500).json({message:e.message});
//     }
// }

// module.exports = isUserAuthenticated;


const jwt = require('jsonwebtoken')

// Middleware to authenticate token
const isUserAuthenticated = async(req,res, next) => {
    const token = req.cookies.token;
    console.log(`Token triggered : ${token}`);

    if(token == null){
        req.user == null;
        next()
    }else{
        const decodedToken =jwt.verify(token, process.env.JWT_SECRET_KEY)
        if(decodedToken){
            req.user = decodedToken._id;
        }else{
            req.user = null
        }
        next()
    }
}

module.exports = isUserAuthenticated;