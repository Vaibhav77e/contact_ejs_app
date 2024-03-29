const Contacts = require('../../models/ContactsModel/contacts_model');
const Tags = require('../../models/TagsModel/tags_model');

exports.createNewContact = async(req,res)=>{
    const {name,phone,tags} = req.body;
    const userId = req.session.userId;


    if(!userId){
        return res.status(404).json({message:"User not found"});
    }
    try{
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

            let getTags = await Tags.find({userId:userId});

            if (getTags.length > 0) {
                const newTagsList = [getTags[0].tags,...tags];

                // newTagsList.push(getTags[0].tags);
                // newTagsList.push(...tags)

                console.log(`Tags : ${newTagsList}`);

                getTags = await Tags.findOneAndUpdate({
                    tags:newTagsList,
                });
            }else{
                getTags = await Tags.create({
                    userId: userId,
                    tags:tags
                });
            }

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