const express = require('express');
const router = express.Router();

const {createNewContact} = require('../../controllers/ContactController/create_contact_controllers');
const {viewAllMyContacts} = require('../../controllers/ContactController/view_contact_controller');

router.get('/getAllUsers',viewAllMyContacts);
router.post('/create_new_account',createNewContact)

module.exports = router;