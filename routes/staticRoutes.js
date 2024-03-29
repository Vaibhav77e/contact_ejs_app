const express = require('express');
const router = express.Router();
const Contacts = require('../models/ContactsModel/contacts_model');

/// << ------------------ Auth Controllers imports ----------------------------------->>>

const {createNewAccount} = require('../controllers/AuthControllers/create_new_account');
const {loginUser} = require('../controllers/AuthControllers/login_to_account');
const {logout} = require('../controllers/AuthControllers/logout');

/// << ------------------ Contact Controllers imports ----------------------------------->>>

const {viewAllMyContacts} = require('../controllers/ContactController/view_contact_controller');
const {createNewContact} = require('../controllers/ContactController/create_contact_controllers');
const {updateContacts} = require('../controllers/ContactController/update_contact_controller');
const {deleteContact} = require('../controllers/ContactController/delete_contact_controllers');

//// <<< ------------------- middleware ----------------------->>>>
const isAuth = require('../middlewares/isAuth');



/// <------------- Auth Routes ---------------------->

// to render the register page
router.get('/register',(req, res)=>{
    res.render('register');
});

// to render the login page
router.get('/login',(req, res)=>{
    res.render('login');
});

// register or create new account
router.post('/register',createNewAccount);

// login to your account
router.post('/login',loginUser);

// logout of your account
router.get('/logout',logout);


/// <------- Contacts Routes --------------------> //////

// get the all contacts
router.get('/view',isAuth,viewAllMyContacts);

// create new account page
router.post('/contacts/add_user', (req,res)=>{
    res.render("add_user",{title:"Add Users",body:"Add Users"});
});


// create new account api
router.post('/create_new_account',isAuth,createNewContact);

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
router.post('/update/:id',isAuth,updateContacts);

// delete route
router.get('/delete/:id',isAuth,deleteContact);

//landing page
router.get('/',(req,res)=>{
    res.render('landing');
});

module.exports = router;