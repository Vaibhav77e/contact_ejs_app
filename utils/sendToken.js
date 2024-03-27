const getToken = require('./createToken');

const sendToken = async(user,statusCode,res)=>{
    const contacts =[];
    // get token here
    const token = getToken(user.id);
    console.log(`token : ${token}`);
    // options for cookie
     const options = {
        expires : new Date(Date.now() + process.env.COOKIE_EXPIRES_TIME * 24 * 60 * 60 * 1000)
    }

    res
    .status(statusCode)
    .cookie('token',token,options)
    .render('index',{contacts:contacts});
}

module.exports = sendToken;