const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');


const userSchema = mongoose.Schema({
    name:{
        type: String,
        required: true,
    },
    email:{
        type: String,
        required: true,
        unique: true,
        validate : [validator.isEmail,'Please enter a valid email address']
    },
    phone:{
        type: String,
        required: true,
        maxLength:[10,"Phone number can't be more than 10 digits"],
        minLength:[10,"Phone number can't be less than 10 digits"]
    },
    password:{
        type: String,
        required: true,
        minLength:[8,"The password must be of 8 characters"]
    },
},
{
    timestamps:true,
}
);



userSchema.methods.comparePassword = async function(enteredPassword){
    return await bcrypt.compare(enteredPassword,this.password);
}

const userModel = mongoose.model('User',userSchema);

module.exports = userModel;

