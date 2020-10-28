let str;
let datos;
let latitud;
let longitud;
let fecha_hora;
var marker = null;
var marker2 = null;
var greenIcon = new L.Icon({
	iconUrl:
		'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
	shadowUrl:
		'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
	iconSize: [25, 41],
	iconAnchor: [12, 41],
	popupAnchor: [1, -34],
	shadowSize: [41, 41],
});
let map = L.map('map').setView([10.987785, -74.80564], 15);
L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
	attribution:
		'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://cloudmade.com">CloudMade</a>',
	maxZoom: 18,
}).addTo(map);
let poly;
let poly2;
L.control.scale().addTo(map);

async function update1() {
	fetch('/data1', {
		headers: {
			'Content-Type': 'application/json',
		},
	})
		.then((response) => response.json())
		.then((json) => {
			console.log(json);

			latitud = json['latitud'];
			longitud = json['longitud'];
			fecha_hora = json['fechaYhora'];
			medicion = json['medicion'];

			let NewLatLng = new L.LatLng(latitud, longitud);
			if (!poly) {
				poly = L.polyline([{ lat: latitud, lon: longitud }]).addTo(map);
			} else {
				poly.addLatLng(NewLatLng);
			}
			document.getElementById(
				'medicion1'
			).innerHTML = `Medición (en %) : ${medicion}`;
			document.getElementById(
				'showLatitude'
			).innerHTML = `Latitud : ${latitud}`;
			document.getElementById(
				'showLongitude'
			).innerHTML = `Longitud : ${longitud}`;
			document.getElementById(
				'showFecha'
			).innerHTML = `Fecha y hora : ${fecha_hora}`;
			if (marker !== null) {
				map.removeLayer(marker);
			}
			marker = L.marker([latitud, longitud]).addTo(map);
		});
}
async function update2() {
	fetch('/data2', {
		headers: {
			'Content-Type': 'application/json',
		},
	})
		.then((response) => response.json())
		.then((json) => {
			console.log(json);

			latitud = json['latitud'];
			longitud = json['longitud'];
			fecha_hora = json['fechaYhora'];
			id_camion = json['id_camion'];
			medicion = json['medicion'];

			let NewLatLng2 = new L.LatLng(latitud, longitud);

			if (!poly2) {
				poly2 = L.polyline([{ lat: latitud, lon: longitud }]).addTo(map);
			} else {
				poly2.addLatLng(NewLatLng2);
			}

			poly2.setStyle({ color: 'red' });
			document.getElementById(
				'medicion2'
			).innerHTML = `Medición (en %) : ${medicion}`;
			document.getElementById(
				'showLatitude2'
			).innerHTML = `Latitud : ${latitud}`;
			document.getElementById(
				'showLongitude2'
			).innerHTML = `Longitud : ${longitud}`;
			document.getElementById(
				'showFecha2'
			).innerHTML = `Fecha y hora : ${fecha_hora}`;
			if (marker2 !== null) {
				map.removeLayer(marker2);
			}
			marker2 = L.marker([latitud, longitud], { icon: greenIcon }).addTo(map);
		});
}

setInterval(function () {
	update1();
	update2();
}, 1000);

// map.on('refresh', update);
