const express = require('express');
const router = express.Router();

router.get('/',(req,res)=>{
    res.render("index",{title:"Vaibhav",body:"Yen matha idhini antha gothilla"});
});

router.get('/add',(req,res)=>{
    res.render("add_user",{title:"Add Users",body:"Add Users"});
});


module.exports = router;