const express = require('express');
const router = express.Router();

router.get('/',(req,res)=>{
    res.render("index",{title:"Nation pride",body:"India the great"});
});

router.post('/contacts/add_user',(req,res)=>{
    res.render("add_user",{title:"Add Users",body:"Add Users"});
});

// About route
router.get('/about', (req, res) => {
    res.render('about', { title: 'About Page' });
  });

module.exports = router;