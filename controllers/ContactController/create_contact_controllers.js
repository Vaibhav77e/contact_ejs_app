const Contact = require('../../models/ContactsModel/contacts_model');

exports.createNewContact = async(req,res)=>{
    console.log(`Waked 2:${req.body}`);
    const {name,phone} = req.body;

    console.log(`name : ${name} and  ${phone}`);

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
                    phone:phone,
        });
        if(!contact){
            return res.status(404).json({message:"Couldn't create contact,something went wrong"});
        }

        // contact = await Contact.find();

        // console.log(`Success ${contact}`);

        res.redirect("/",);

        //res.render('index', {contacts: contact});
    }catch(err){
        return res.status(500).json({message: err.message});
    }
}