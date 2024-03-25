const express = require('express');
const router = express.Router();

const {createNewAccount} = require('../../controllers/AuthControllers/create_new_account');
const {loginUser} = require('../../controllers/AuthControllers/login_to_account');

router.post('/auth/create-new-account',createNewAccount);
router.post('/auth/login-to-account',loginUser);


module.exports = router;