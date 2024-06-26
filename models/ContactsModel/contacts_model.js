const mongoose = require('mongoose');

const contactSchema = mongoose.Schema({
    userId:{
        type:mongoose.Schema.ObjectId,
        ref:'User'
    },
    name:{
        type: String,
        required: true,
    },
    phone:{
        type: String,
        required: true,
        maxLength:[10,"Phone number can't be more than 10 digits"],
        minLength:[10,"Phone number can't be less than 10 digits"],
    },
    tags:{
        type:Array,
    }
},
{
    timestamps:true,
}
);

const contacts = mongoose.model('Contact',contactSchema);

module.exports = contacts;