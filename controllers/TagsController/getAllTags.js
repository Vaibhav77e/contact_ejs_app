const Contact = require('../../models/ContactsModel/contacts_model');

exports.getAllTags = async (req, res, next) => {
    try{
        let userId = req.session.userId;
        const contacts = await Contact.find({userId:userId});

        console.log(contacts);

        filterContacts=contacts

        return res.render('alltags/showTags',{contacts:contacts,filterContacts:filterContacts});
    }catch(err){
        return res.status(500).json({
            message: err.message
        });
    }
}