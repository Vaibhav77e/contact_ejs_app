const Contact = require('../../models/ContactsModel/contacts_model');

exports.viewAllMyContacts = async(req,res)=>{
    const contacts = await Contact.find();
    res.status(200).json({
        data: contacts
    });
}