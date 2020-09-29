var mensaje = 'Hola';

const mysql = require('mysql');
// Credentials for connecting the database
const database = mysql.createConnection({
    host: "dedb.ch8kmdx12rux.us-east-2.rds.amazonaws.com",
	user: "Valentina",
	password: "vale229810",
	database: "Diseno"
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





