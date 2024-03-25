const express = require('express');
const router = express.Router();

router.get('/',(req,res)=>{
    res.render("index",{title:"Vaibhav",body:"Yen matha idhini antha gothilla"});
});

router.post('/add',(req,res)=>{
    res.render("add_user",{title:"Add Users",body:"Add Users"});
});

// router.post('/add', (req,res)=>{
//     const {name,phoneNumber} = req.body;

//     contact =  Contact.create({
//             //userId: userId,
//             name:name,
//             phoneNumber:phoneNumber,
//     });
//     if(!contact){
//         return res.status(404).json({message:"Couldn't create contact,something went wrong"});
//     }

//    contact.save((err)=>{
//     if(err){
//         res.json({message: err.message,type:"danger"});
//     }else{
//         console.log("Contacts created successfully");
//         res.redirect('/');
//     }
//    });

// });

module.exports = router;