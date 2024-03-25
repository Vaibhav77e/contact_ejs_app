const Contact = require('../../models/ContactsModel/contacts_model');

exports.createNewContact = async(req,res)=>{
    console.log("Waked")
    const {name,phoneNumber} = req.body;

    const userId = req.user.id;
    if(!userId){
        return res.status(404).json({message:"User not found"});
    }
    try{
        let contact = await Contact.find({userId: userId});
        console.log(`Contacts daa : ${contact}`);
        console.log(`Creating contact ${userId} ${phoneNumber}`);
        
        contact = await Contact.create({
                    //userId: userId,s
                    name:name,
                    phoneNumber:phoneNumber,
        });
        if(!contact){
            return res.status(404).json({message:"Couldn't create contact,something went wrong"});
        }

        console.log("Success"); 

        res.redirect("/");
    }catch(err){
        return res.status(500).json({message: err.message});
    }
}