const Contact = require('../../models/ContactsModel/contacts_model');

exports.viewAllMyContacts = async (req, res,next) => {
    try {
        console.log('Getting users');
        const contacts = await Contact.find();
        //res.json(contacts); // Sending contacts as JSON response
        res.render('index',{contacts: contacts});
        next();
        console.log('Getting users 2');

    } catch (error) {
        console.error('Error fetching contacts:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
