const Contacts = require('../../models/ContactsModel/contacts_model');

exports.updateContacts = async(req,res)=>{
    const {name,phone,tags} = req.body;

    const editId = req.params.id;
    try{

        let id = req.session.userId;
        const getContactsBasedOnUserId = {
            userId:id,
        }

        let numericRegex = /^[0-9]+$/;

        let isNumeric = numericRegex.test(phone);

        console.log(`Check Number : ${isNumeric}`);

        if(isNumeric===false){
            return res.render('edit_user',{contacts:contacts,error:'Please provide correct format of number'});
        }

        if(phone.length>10||phone.length<10){
            return res.render('edit_user',{contacts:contacts,error:'PNumber must be at 10 digits can\'t be more or less that'});
        }


        let contacts = await Contacts.find(getContactsBasedOnUserId);
        let contactExists = false;

        contacts.forEach(contact => {
            // console.log(`edited id : ${editId}`);
            // console.log(`Contacts ID : ${contact.id}`);
        // first check whether the id which is passed same as contact.id if the ids are same in that case allow user to edit the contact
           if(editId!==contact.id){
        // after checking if the id's are not same then allow user to edit the contact but the name and phone number should match present in the DB
            if (contact.name === name) {
                contactExists = true;
                return res.render('edit_user',{contacts:contacts,error:'Contact with this same name is already present in your account'});
                return res.status(400).json({ message: "Contact with this same name is already present in your account" });
            } else if (contact.phone === phone) {
                contactExists = true;
                return res.render('edit_user',{contacts:contacts,error:'Same contact number is already saved in your account'});
                return res.status(400).json({ message: "Same contact number is already saved in your account" });
            }
           }
        });

        if (!contactExists) {
            contacts = await Contacts.findByIdAndUpdate(
            editId,
            {
                name:name,
                phone:phone,
                tags:tags
            });
            if (!contacts) {
                return res.status(404).json({ message: "Couldn't create contact, something went wrong" });
            }
            res.redirect('/view');
        }
    
    }catch(err){
        return res.status(500).json({message:err.message});
    }

}