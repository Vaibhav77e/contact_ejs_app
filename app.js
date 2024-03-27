const express = require('express');
const app = express();
const dotenv = require('dotenv');
const path = require('path');
const cookieParser = require('cookie-parser');

// set up env file
dotenv.config({path:'./config/config.env'});

// import database setup file
const databaseConnect = require('./database/database');

const PORT = process.env.PORT || 5000;

// convert the data into json format
app.use(express.json());
app.use(express.urlencoded());
app.use(cookieParser());

// call the function that invokes database function
databaseConnect();

// import the routes
const authRoutes = require('./routes/AuthRoutes/auth_routes');
const contactRoutes = require('./routes/ContactsRoutes/contacts_routes');
const staticRoute = require('./routes/staticRoutes');


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
