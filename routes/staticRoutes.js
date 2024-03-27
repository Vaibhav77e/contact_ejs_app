const express = require('express');
const router = express.Router();
const Contacts = require('../models/ContactsModel/contacts_model');

const {viewAllMyContacts} = require('../controllers/ContactController/view_contact_controller');

// router.get('/',(req,res)=>{
//     res.render("index",{title:"Nation pride",body:"India the great"});
// });

// added to check whether the data will load or not working fine now
// router.get('/view_contacts', viewAllMyContacts);

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