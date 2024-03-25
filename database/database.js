const mongoose = require('mongoose');


const databaseConnect = async()=>{
    mongoose.connect(process.env.DB_URL).then(con =>{
        console.log(`Mongoose  database connection established : ${con.connection.host}`);
    }).catch(err=>{
        console.log(`Mongoose database connection error : ${err.message}`);
    });
}


module.exports = databaseConnect;