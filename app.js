const express = require('express');
const app = express();
const dotenv = require('dotenv');
const path = require('path');
// const cookieParser = require('cookie-parser');
const csrf = require('csurf');

const csrfProtection = csrf({cookie: true});
const isUserAuthenticated = require('./middlewares/isUserAuthenticated');
const isAuth = require('./middlewares/isAuth');

const session = require('express-session');
const MongoDBSession = require('connect-mongodb-session')(session);


// import the routes
const authRoutes = require('./routes/AuthRoutes/auth_routes');
const contactRoutes = require('./routes/ContactsRoutes/contacts_routes');
const staticRoute = require('./routes/staticRoutes');

// set up env file
dotenv.config({path:'./config/config.env'});

// import database setup file
const databaseConnect = require('./database/database');

const PORT = process.env.PORT || 5000;

// convert the data into json format
// app.use(cookieParser({debug:true}));
app.use(express.json());
app.use(express.urlencoded());


// app.use(csrfProtection);

// app.use(isUserAuthenticated, (req,res,next) => {
//     res.locals.isAuth = req.user;
//     res.locals.csrfToken = req.csrfToken();
//     next()
//     // MaxListenersExceededWarning: Possible EventEmitter memory leak detected. 11 exit listeners added to [Bus].
//     // Use emitter.setMaxListeners() to increase limit
// });

// call the function that invokes database function
databaseConnect();

// set up mongodb session connect for storing the sessions

const store = new MongoDBSession({
    uri:process.env.DB_URL,
    collection:"mySessionsForContacts",
});

app.use(session({
    secret:"secret-key-whatever",
    resave:false,
    saveUninitialized:false,
    store:store
}));


//set template engine
app.set('view engine', 'ejs');
app.set("views",path.resolve("./views"));

// setup the routes for the application

app.use('/api/v1',authRoutes);
app.use('/',staticRoute);
app.use('/contacts',contactRoutes);


app.listen(PORT,()=>{
    console.log(`listening on port: ${PORT}`);
})
