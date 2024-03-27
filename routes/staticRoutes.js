const express = require('express');
const router = express.Router();
const Contacts = require('../models/ContactsModel/contacts_model');

const User = require('../models/UserModel/user_model');
const bcrypt = require('bcryptjs');

const {viewAllMyContacts} = require('../controllers/ContactController/view_contact_controller');
const isUserAuthenticated = require('../middlewares/isUserAuthenticated');

// router.get('/',(req,res)=>{
//     res.render("index",{title:"Nation pride",body:"India the great"});
// });

// added to check whether the data will load or not working fine now
// router.get('/view_contacts', viewAllMyContacts);


/// <------------- Auth Routes ---------------------->


router.get('/test',(req, res)=>{
    res.render('test');
})

router.post('/auth/createAccount',async(req, res)=>{
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
            console.log("Couldn't create account");
            return;
        }

        res.render('/');
    }catch(err){
        console.log(`Error whiling creating account: ${err.message}`)
    }
})


/// <------- Contacts Routes --------------------> //////
// get the all contacts
router.get('/',viewAllMyContacts);

// create nwe account
router.post('/contacts/add_user',(req,res)=>{
    res.render("add_user",{title:"Add Users",body:"Add Users"});
});

// edit route
router.get('/edit/:id',(req,res)=>{
    let id = req.params.id;
    Contacts.findById(id).then(contacts=>{
        if(contacts===null){
            res.redirect('/');
        }else{
            res.render('edit_user',{
                contacts:contacts
            });
        }
    }).catch(err=>{
            res.redirect('/');
    });
});

// update route

router.post('/update/:id',(req,res)=>{
    let id = req.params.id;

    Contacts.findByIdAndUpdate(id,{
        name:req.body.name,
        phone:req.body.phone
    }).then(result=>{
        res.redirect('/');
    }).catch(err=>{
        console.log(`Error while updating the record : ${err.message}`);
    });

});

// delete route

router.get('/delete/:id',(req,res)=>{
    let id = req.params.id;

    Contacts.findByIdAndDelete(id).then(_ =>{
        res.redirect('/');
    }).catch(err=>{
        console.log(`Error while deleting the users ${err.message}`);
    });
});



// About route
router.get('/about', (req, res) => {
    res.render('about', { title: 'About Page' });
});

module.exports = router;