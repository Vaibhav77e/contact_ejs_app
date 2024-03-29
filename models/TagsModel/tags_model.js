const mongoose = require('mongoose');

const tagsSchema = mongoose.Schema({
    userId:{
        type:mongoose.Schema.ObjectId,
        ref:'User'
    },
    tags:{
        type:Array,
    }
});

const tags = mongoose.model('Tags',tagsSchema);

module.exports = tags;