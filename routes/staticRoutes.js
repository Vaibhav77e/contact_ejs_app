const express = require('express');
const router = express.Router();
const Contacts = require('../models/ContactsModel/contacts_model');

const User = require('../models/UserModel/user_model');
const bcrypt = require('bcryptjs');
const {viewAllMyContacts} = require('../controllers/ContactController/view_contact_controller');
const isUserAuthenticated = require('../middlewares/isUserAuthenticated');
const isAuth = require('../middlewares/isAuth');
const sendToken = require('../utils/sendToken');



// router.get('/',(req,res)=>{
//     res.render("index",{title:"Nation pride",body:"India the great"});
// });

// added to check whether the data will load or not working fine now
// router.get('/view_contacts', viewAllMyContacts);


/// <------------- Auth Routes ---------------------->


router.get('/register',(req, res)=>{
    res.render('register');
});

router.get('/login',(req, res)=>{
    res.render('login');
});


// register or create new user
router.post('/register',async(req, res)=>{
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
        // const hashedPassword = password;

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
});


// login to the account

router.post('/login',async(req,res)=>{
    try{
        const {email,password} = req.body;

        console.log(`data : ${req.body.email}`)

        let user = await User.findOne({email: email}).select('+password');

        console.log(`user : ${user}`);
   
       if(user===null){
            console.log(`Email not found`);
            return res.redirect('/login');
        }

        const checkPassword = await user.comparePassword(password);
        if(!checkPassword){
           return res.status(401).send('Incorrect email or password.');
        }

        req.session.userId = user.id;

        console.log(`user in login: ${req.session.userId}`);

        // let contacts = await Contacts.findById(req.session.userId);
        // res.render('index',{contacts:contacts});

        res.redirect('/view');

    }catch(e){
        console.log(`Error whiling logging into your account : ${e.message}`);
        return;
    }
});


router.get('/logout', (req,res)=>{
    req.session.destroy((err)=>{
        if(err) throw err;
        res.redirect('/login');
    });
});


/// <------- Contacts Routes --------------------> //////


// get the all contacts
router.get('/view',isAuth,viewAllMyContacts);

// create new account page
router.post('/contacts/add_user', (req,res)=>{
    res.render("add_user",{title:"Add Users",body:"Add Users"});
});


// create new account api
router.post('/create_new_account',isAuth,async(req,res)=>{
    const {name,phone} = req.body;

    console.log(`name : ${name} and  ${phone}`);

    const userId = req.session.userId;

    console.log(`userId : ${userId}`);

    if(!userId){
        return res.status(404).json({message:"User not found"});
    }
    try{
        let contacts = await Contacts.find({userId:userId});

        let contactExists = false;

        contacts.forEach(contact => {
            if (contact.name === name) {
                contactExists = true;
                 return res.status(400).json({ message: "Contact with this name is already saved to your account" });
            } else if (contact.phone === phone) {
                contactExists = true;
                return res.status(400).json({ message: "This contact number is already added to your account" });
            }
        });

        if (!contactExists) {
            contacts = await Contacts.create({
                userId: userId,
                name: name,
                phone: phone,
            });
    
            console.log(`Contacts data: ${contacts}`);
            if (!contacts) {
                return res.status(404).json({ message: "Couldn't create contact, something went wrong" });
            }
         res.redirect('/view');
        }

    }catch(err){
        return res.status(500).json({message: err.message});
    }
}
);

// edit route
router.get('/edit/:id',
(req,res)=>{
    let id = req.params.id;
    Contacts.findById(id).then(contacts=>{
        if(contacts===null){
            res.redirect('/view');
        }else{
            res.render('edit_user',{
                contacts:contacts,
            });
        }
    }).catch(err=>{
            res.redirect('/view');
    });
});

// update route

router.post('/update/:id',isAuth,async(req,res)=>{
    const {name,phone} = req.body;
    try{

        let id = req.session.userId;
        const getContactsBasedOnUserId = {
            userId:id,
        }

        let contacts = await Contacts.find(getContactsBasedOnUserId);
        let contactExists = false;

        contacts.forEach(contact => {
            if (contact.name === name) {
                contactExists = true;
                    return res.status(400).json({ message: "Contact with this same name is already present in your account" });
            } else if (contact.phone === phone) {
                contactExists = true;
                return res.status(400).json({ message: "Same contact number is already saved in your account" });
            }
        });

        if (!contactExists) {
            contacts = await Contacts.findOneAndUpdate(
            getContactsBasedOnUserId,
            {
                name:name,
                phone:phone
            });

            console.log(`Contacts data: ${contacts}`);
            if (!contacts) {
                return res.status(404).json({ message: "Couldn't create contact, something went wrong" });
            }
            res.redirect('/view');
        }
    
    }catch(err){
        return res.status(500).json({message:err.message});
    }

});

// delete route
router.get('/delete/:id',
    isAuth,
    (req,res)=>{
    let id = req.session.userId;

    Contacts.findOneAndDelete({userId:id}).then(_ =>{
        res.redirect('/view');
    }).catch(err=>{
        console.log(`Error while deleting the users ${err.message}`);
    });
});

//landing page
router.get('/',(req,res)=>{
    res.render('landing');
});

module.exports = router;