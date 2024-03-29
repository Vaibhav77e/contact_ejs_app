const Contacts = require('../../models/ContactsModel/contacts_model');

exports.deleteContact = (req,res)=>{
    let id = req.session.userId;

    let getDeleteId = req.params.id;

    // to delete the contact take the id from params and delete it
    Contacts.findByIdAndDelete(getDeleteId).then(_ =>{
        res.redirect('/view');
    }).catch(err=>{
        console.log(`Error while deleting the users ${err.message}`);
    });
}