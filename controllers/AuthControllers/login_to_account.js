const User = require('../../models/UserModel/user_model');
const bcrypt = require('bcryptjs');

exports.loginUser = async(req,res)=>{
    try{
        const {email,password} = req.body;

        let user = await User.findOne({email: email}).select('+password');
       if(user===null){
            console.log(`Email not found`);
            return res.redirect('/login');
        }

        const checkPassword = await user.comparePassword(password);
        if(!checkPassword){
           return res.status(401).send('Incorrect email or password.');
        }

        req.session.userId = user.id;

        console.log(`user in login: ${req.session.userId}`);

        // let contacts = await Contacts.findById(req.session.userId);
        // res.render('index',{contacts:contacts});

        res.redirect('/view');

    }catch(e){
        console.log(`Error whiling logging into your account : ${e.message}`);
        return;
    }
}