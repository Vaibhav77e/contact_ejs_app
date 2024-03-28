const express = require('express');
const router = express.Router();
const Contacts = require('../models/ContactsModel/contacts_model');

const User = require('../models/UserModel/user_model');
const bcrypt = require('bcryptjs');

const {viewAllMyContacts} = require('../controllers/ContactController/view_contact_controller');
const isUserAuthenticated = require('../middlewares/isUserAuthenticated');
const sendToken = require('../utils/sendToken');



// router.get('/',(req,res)=>{
//     res.render("index",{title:"Nation pride",body:"India the great"});
// });

// added to check whether the data will load or not working fine now
// router.get('/view_contacts', viewAllMyContacts);


/// <------------- Auth Routes ---------------------->


router.get('/test',(req, res)=>{
    res.render('test');
});

router.get('/secondtest',(req, res)=>{
    res.render('secondtest');
});


// register or create new user
router.post('/auth/createAccount',async(req, res)=>{
    try{
        const {name,email,phone,password} = req.body;

        let user = await User.find({email:email});

        if(!user){
            // return res.status(400).json({
            //     message:"User already exists.Please login different account or create one"
            // });
            console.log("User already exists.Please login different account or create one")
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
            return;
        }

        res.render('secondtest')
    }catch(err){
        console.log(`Error whiling creating account: ${err.message}`)
    }
});


// login to the account

router.post('/auth/login',async(req,res)=>{
    try{
        const {email,password} = req.body;

        console.log(`data : ${req.body.email}`)

        let user = await User.findOne({email: email}).select('+password');

        console.log(`user : ${user}`);
   
       if(user===null){
            console.log(`Email not found`);
            return;
        }

        const checkPassword = await user.comparePassword(password);
        if(!checkPassword){
           return res.status(401).send('Incorrect email or password.');
        }

        // console.log(req.session.userId);
        // res.redirect('/index');

        req.session.userId = user.id;

        console.log(`user in login: ${req.session.userId}`);

        let contacts = await Contacts.findById(req.session.userId);

        res.render('index',{contacts:contacts});

        //sendToken(user,200,req,res);

    }catch(e){
        console.log(`Error whiling logging into your account : ${e.message}`);
        return;
    }
});


/// <------- Contacts Routes --------------------> //////

// get the all contacts
router.get('/',viewAllMyContacts);

// create new account page
router.post('/contacts/add_user', (req,res)=>{
    res.render("add_user",{title:"Add Users",body:"Add Users"});
});


// create new account api
router.post('/create_new_account',
isUserAuthenticated,
async(req,res)=>{
    console.log(`Waked :${req.body}`);
    const {name,phone} = req.body;

    console.log(`name : ${name} and  ${phone}`);

    const userId = req.user.id;

    console.log(`userId : ${userId}`);

    if(!userId){
        return res.status(404).json({message:"User not found"});
    }
    try{
       // let contact = await Contacts.find({userId: userId});
       let contacts = await Contacts.create({
           userId: userId,
           name:name,
           phone:phone,
        });
        console.log(`Contacts daa : ${contacts}`);
        if(!contacts){
            return res.status(404).json({message:"Couldn't create contact,something went wrong"});
        }

        contacts = await Contacts.findBy(userId);

        console.log(`Contacts : ${contacts}`);

        res.render("index",{contacts: contacts});

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
            res.redirect('/');
        }else{
            res.render('edit_user',{
                contacts:contacts,
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

router.get('/delete/:id',
   
    (req,res)=>{
    let id = req.params.id;

    // try{
    //     let contacts = Contacts.findByIdAndDelete(id);
    //     res.render("index",{token:req.token,contacts: contacts});
    // }catch(err){
    //     console.log(`Error while deleting the users ${err.message}`);
    // }

    Contacts.findByIdAndDelete(id).then(_ =>{
        res.redirect('/');
    }).catch(err=>{
        console.log(`Error while deleting the users ${err.message}`);
    });
});


module.exports = router;


/**
 *  working but expected
 <script>
                // Example function to get token from local storage
                function getToken() {
                    return JSON.parse(localStorage.getItem("data"));
                }

                // Function to submit form data via AJAX
                $('#add-form').submit(function(event) {
                    // Prevent the default form submission
                    event.preventDefault();

                    // Get form data
                    const formData = $(this).serializeArray();

                    // AJAX request to submit form data
                    $.ajax({
                        url: '/create_new_account',
                        type: 'POST',
                        data: formData,
                        headers: {
                            'Authorization': `Bearer ${getToken()}`
                        },
                        success: function(response) {
                            console.log(response);
                            // Handle success response here
                        },
                        error: function(xhr, status, error) {
                            console.error(error);
                            // Handle error response here
                        }
                    });
                });
            </script>


 setting token

    <script>
        var data = JSON.parse('<%- JSON.stringify(token) %>');
        localStorage.setItem("data", data);
    </script>
 */