const express = require('express');
const router = express.Router();

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




// About route
router.get('/about', (req, res) => {
    res.render('about', { title: 'About Page' });
});

module.exports = router;