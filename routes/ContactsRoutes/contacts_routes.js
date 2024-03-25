const express = require('express');
const router = express.Router();

const {createNewContact} = require('../../controllers/ContactController/create_contact_controllers');

router.post('/add',createNewContact)

module.exports = router;