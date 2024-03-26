const Contact = require('../../models/contacts/contacts_models');

exports.deleteContact = async (req, res) => {

    try{
        var userID = req.body.id;
        const {name,phone} = req.body;
        let contacts = await Contact.findByIdAndDelete({userId: userID},
            {name:name,phone:phone},
            {new:true});

        if(!contacts){
            return res.status(404).json({message:"Couldn't update the contact"});
        }

        res.render('index',{contacts: contacts});
    }catch(err){
        res.status(500).json({
            err:err.message
        });
    }
}