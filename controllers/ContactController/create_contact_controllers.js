const Contacts = require('../../models/ContactsModel/contacts_model');

exports.createNewContact = async(req,res)=>{
    const {name,phone} = req.body;

    console.log(`name : ${name} and  ${phone}`);

    const userId = req.session.userId;

    console.log(`userId : ${userId}`);

    if(!userId){
        return res.status(404).json({message:"User not found"});
    }
    try{
        let contacts = await Contacts.find({userId:userId});

        let contactExists = false;

        contacts.forEach(contact => {
            if (contact.name === name) {
                contactExists = true;
                 return res.status(400).json({ message: "Contact with this name is already saved to your account" });
            } else if (contact.phone === phone) {
                contactExists = true;
                return res.status(400).json({ message: "This contact number is already added to your account" });
            }
        });

        if (!contactExists) {
            contacts = await Contacts.create({
                userId: userId,
                name: name,
                phone: phone,
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