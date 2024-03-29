const Contacts = require('../../models/ContactsModel/contacts_model');
const Tags = require('../../models/TagsModel/tags_model');

exports.createNewContact = async(req,res)=>{
    const {name,phone,tags} = req.body;
    const userId = req.session.userId;


    if(!userId){
        return res.status(404).json({message:"User not found"});
    }
    try{
        // Regular expression to match only numeric characters
        let numericRegex = /^[0-9]+$/;

        let isNumeric = numericRegex.test(phone);

        console.log(`Check Number : ${isNumeric}`);

        if(isNumeric===false){
            return res.render("add_user",{title:"Add Users",body:"Add Users",error:'Please provide correct format of number'});
        }

        if(phone.length>10||phone.length<10){
            return res.render("add_user",{title:"Add Users",body:"Add Users",error:'Number must be at 10 digits can\'t be more or less that'});
        }

        let contacts = await Contacts.find({userId:userId});

        let contactExists = false;

        contacts.forEach(contact => {
            if (contact.name === name) {
                contactExists = true;
                return res.render("add_user",{title:"Add Users",body:"Add Users",error:'Contact with this name is already saved to your account'});
                return res.status(400).json({ message: "Contact with this name is already saved to your account" });
            } else if (contact.phone === phone) {
                contactExists = true;
                return res.render("add_user",{title:"Add Users",body:"Add Users",error:'This contact number is already added to your account'});
                return res.status(400).json({ message: "This contact number is already added to your account" });
            }
        });

        if (!contactExists) {

            contacts = await Contacts.create({
                userId: userId,
                name: name,
                phone: phone,
                tags:tags
            });

            console.log(`Contacts data: ${contacts}`);
            if (!contacts) {
                return res.status(404).json({ message: "Couldn't create contact, something went wrong" });
            }
         res.redirect('/view');
        }

    }catch(err){
        return res.status(500).json({message: err.message});
    }
}