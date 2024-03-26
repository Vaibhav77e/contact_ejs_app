const Contact = require('../../models/ContactsModel/contacts_model');

exports.viewAllMyContacts = async (req, res) => {
    try {
        const contacts = await Contact.find();
        //res.json(contacts); // Sending contacts as JSON response
        res.render('index',{contacts: contacts});

    } catch (error) {
        console.error('Error fetching contacts:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
