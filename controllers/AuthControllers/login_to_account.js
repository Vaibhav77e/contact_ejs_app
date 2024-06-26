const User = require('../../models/UserModel/user_model');
const bcrypt = require('bcryptjs');

exports.loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        var emailRegex = /^[a-zA-Z0-9.a-zA-Z0-9.!#$%&'*+-/=?^_`{|}~]+@[a-zA-Z0-9]+\.[a-zA-Z]+/;
        if (!emailRegex.test(email)) {
            return res.render('login', { error: 'Invalid Email Format' });
        }

        let user = await User.findOne({ email: email }).select('+password');
        if (user === null) {
            console.log(`Email not found`);
            return res.render('login', { error: 'Email not found' });
        }

        const checkPassword = await user.comparePassword(password);
        if (!checkPassword) {
            console.log('Incorrect email or password');
            return res.render('login', { error: 'Incorrect password, please check the provided password' });
            // return res.status(401).send('Incorrect email or password.');
        }

        req.session.userId = user.id;

        console.log(`user in login: ${req.session.userId}`);

        // let contacts = await Contacts.findById(req.session.userId);
        // res.render('index',{contacts:contacts});

         res.redirect('/view');
         
         console.log(`Check after the user logged in`);
         return;

    } catch (e) {
        console.log(`Error while logging into your account: ${e.message}`);
        return;
    }
}
