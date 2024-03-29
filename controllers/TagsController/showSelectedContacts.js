const Contacts = require('../../models/ContactsModel/contacts_model');


exports.getContactsBasedOnSelection = async (req, res, next) => {
    try {
        const { tag } = req.body;
        const userId = req.session.userId;

        let contacts;
        let filterContacts;
        if (tag) {
            // If a tag is provided, filter contacts based on the tag
            contacts = await Contacts.find({ userId: userId, 'tags': tag });
        } else {
            // If no tag is provided, fetch all contacts
            contacts = await Contacts.find({ userId: userId });
        }

        filterContacts = await Contacts.find({ userId: userId });

        // Return the filtered contacts
        return res.render('alltags/showTags',{contacts:contacts,filterContacts:filterContacts});
    } catch (err) {
        console.log(`Error: ${err.message}`);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}
