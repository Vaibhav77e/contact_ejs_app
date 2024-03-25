const User = require('../../models/UserModel/user_model');
const bcrypt = require('bcryptjs');


exports.createNewAccount = async(req,res,next) => {
    try{

        const {name,age,email,phone,password,address} = req.body;

        let user = await User.find({email:email});

        if(user.length>0){
            return res.status(400).json({
                message:"User already exists.Please login different account or create one"
            });
        }

        if(password.length<=0){
            return res.status(404).json({
                "message":"Please provide password"
            })
        }

        const hashedPassword =await bcrypt.hash(password,10);

        user = await User.create({
        name:name,
        age:age,
        email:email,
        phone:phone,
        password:hashedPassword,
        address:address});

        if(user===null){
            return res.status(400).json({message:"Couldn't create account"});
        }

        res.status(200).json(
        {message:"Account created successfully",data:user});

    }catch(err){
        console.log(err.message);
        return res.status(500).json({message:err.message});
    }
}