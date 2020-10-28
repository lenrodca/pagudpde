let database = require('../server.js');

const dgram = require('dgram');
const server = dgram.createSocket('udp4');

server.on('error', (err) => {
	console.log(`server error:\n${err.stack}`);
	server.close();
});

server.on('message', (msg, rinfo) => {
	console.log(`server got: ${msg} from ${rinfo.address}:${rinfo.port}`);
	mensaje = msg;
	msg = msg.toString().split(',');
	msg = {
		latitud: msg[0],
		longitud: msg[1],
		fechaYhora: msg[2],
		id_camion: msg[3],
		medicion: msg[4],
	};
	let sql = 'INSERT INTO localitation SET ?';
	database.query(sql, msg, (err, result) => {
		if (err) throw err;
		// console.log(result);
	});
});

server.on('listening', () => {
	const address = server.address();
	console.log(`server listening ${address.address}:${address.port}`);
});

server.bind({
	port: 49153,
});
