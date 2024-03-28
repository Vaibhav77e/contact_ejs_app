const User = require('../../models/UserModel/user_model');
const sendToken = require('../../utils/sendToken');

exports.loginUser = async(req, res, next) => {
        const contacts =[];
        try{
            const {email,password} = req.body;

            if(email.length<0 || password.length<0){
                return res.status(400).json({
                    message : "Please provide required fields"
                });
            }

            let user = await User.findOne({email: email}).select('+password');
    
        if(user===null){
            return  res.status(400).json({
                message : "Email not found"
            });
            }

            const checkPassword = await user.comparePassword(password);
            if(!checkPassword){
                return res.status(400).json({
                    message : "Password doesn't match"
                });
            }

            // const token = await user.generateAuthTokens()
            // res.cookie('token', token, {httpOnly: true})
            // res.render('index',{contacts:contacts})


            //sendToken(user,200,res);

        }catch(e){
            return res.status(500).json({message:e.message})
        }
}