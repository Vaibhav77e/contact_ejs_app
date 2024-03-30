const User = require('../../models/UserModel/user_model');
const bcrypt = require('bcryptjs');


exports.createNewAccount = async(req, res)=>{
    try{
        const {name,email,phone,password} = req.body;

        var emailRegex = /^[a-zA-Z0-9.a-zA-Z0-9.!#$%&'*+-/=?^_`{|}~]+@[a-zA-Z0-9]+\.[a-zA-Z]+/;
        if (!emailRegex.test(email)) {
          return;
        }

        // Regular expression to match only numeric characters
        let numericRegex = /^[0-9]+$/;

        let isNumeric = numericRegex.test(phone);

        console.log(`Check Number : ${isNumeric}`);

        if(isNumeric===false){
            return;
            return res.render("signin",{title:"Add Users",body:"Add Users",error:'Please provide correct format of number'});
        }

        if(phone.length>10||phone.length<10){
            return;
            return res.render("signin",{title:"Add Users",body:"Add Users",error:'Number must be at 10 digits can\'t be more or less that'});
        }


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