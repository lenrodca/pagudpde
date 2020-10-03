var mensaje = 'Hola';
require('dotenv').config();

const mysql = require('mysql');
// Credentials for connecting the database
const database = mysql.createConnection({
    host: process.env.host,
	user: process.env.user,
	password: process.env.password,
	database: process.env.database
});
// Establish connection
database.connect((err) => {
    if (err) {
        throw err;
    }
    console.log('Connected to DB');
});
module.exports = database
//Server UDP (sniffer)
require('./server/dgram')

//web server
require('./server/router')





