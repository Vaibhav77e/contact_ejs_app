const User = require('../../models/UserModel/user_model');
const bcrypt = require('bcryptjs');


exports.createNewAccount = async(req, res)=>{
    try{
        const {name,email,phone,password} = req.body;

        let user = await User.find({email:email});

        if(!user){
            // return res.status(400).json({
            //     message:"User already exists.Please login different account or create one"
            // });
             console.log("User already exists.Please login different account or create one")
             return res.redirect('/register');
        }

        const hashedPassword =await bcrypt.hash(password,10);

        user = await User.create({
        name:name,
        email:email,
        phone:phone,
        password:hashedPassword,
        });

        if(user===null){
            console.log("Couldn't create account");
            return res.redirect('/register');
        }

       return res.redirect('/login')
    }catch(err){
        console.log(`Error whiling creating account: ${err.message}`)
    }
}