const Contact = require('../../models/ContactsModel/contacts_model');

exports.viewAllMyContacts = async(req,res)=>{
    const contacts = await Contact.find();
    // res.render('/',{contacts: contacts});
}