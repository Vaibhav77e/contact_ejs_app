const getToken = require('./createToken');
const Contacts = require('../models/ContactsModel/contacts_model');



const sendToken = async(user,statusCode,req,res,)=>{

    let token = getToken(user.id);

    req.session.setUser = token;
    console.log(`user in sendToken: ${user.id}`);
    console.log(`req.session.setUser in sendToken: ${req.session.setUser}`);
    res.locals.getCurrentUser = req.session.setUser
    console.log(`res.locals.userId in sendToken: ${res.locals.getCurrentUser}`);


    global.whatever = token;


    let contacts = await Contacts.findById(user.id);

    console.log(`Contacts : ${contacts}`);

    if(!contacts){
        contacts=[];
    }

    res
    .status(statusCode)
  //  .cookie('token',token,options)
    .render('index',{contacts:contacts,
       // token:token,
    });
}


// const sendToken = async(user,statusCode,req,res,)=>{
//     const contacts =[];
//     // get token here
//     const token = getToken(user.id);
//     console.log(`token : ${token}`);
//     // options for cookie
//      const options = {
//         expires : new Date(Date.now() + process.env.COOKIE_EXPIRES_TIME * 24 * 60 * 60 * 1000)
//     }

//     req.session.userToken = token;

//     // console.log(`new User : ${req.session.user}`);
//     // console.log(`req.session.userToken : ${req.session.userToken }`);
//     res.locals.saveUserToken = req.session.userToken;

//     res
//     .status(statusCode)
//   //  .cookie('token',token,options)
//     .render('index',{contacts:contacts,
//        // token:token,
//     });
// }

module.exports = sendToken;