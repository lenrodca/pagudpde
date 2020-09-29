var mensaje = 'Hola';

const mysql = require('mysql');
// Credentials for connecting the database
const database = mysql.createConnection({
    host: "xxxxxx",
	user: "xxxxx",
	password: "xxxxx",
	database: "xxxx"
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





