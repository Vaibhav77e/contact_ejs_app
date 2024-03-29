const Contact = require('../../models/ContactsModel/contacts_model');

exports.getAllTags = async (req, res, next) => {
    try{
        let userId = req.session.userId;
        const contacts = await Contact.find({userId:userId});

        console.log(contacts);

        return res.render('alltags/showTags',{contacts:contacts});
    }catch(err){
        return res.status(500).json({
            message: err.message
        });
    }
}