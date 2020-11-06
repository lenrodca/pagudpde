let str;
let datos;
let latitud;
let medicion;
let longitud;
let fecha_hora;
let latitud2;
let medicion2;
let longitud2;
let fecha_hora2;
var marker = null;
var marker2 = null;
var popup = document.getElementById('popup-historicos');
let value = 1;
let c1 = document.getElementById('c1');
let c2 = document.getElementById('c2');
let med = document.getElementById('medicion1');
let showLat = document.getElementById('showLatitude');
let showLong = document.getElementById('showLongitude');
let showDate = document.getElementById('showFecha');
let med2 = document.getElementById('medicion2');
let showLat2 = document.getElementById('showLatitude2');
let showLong2 = document.getElementById('showLongitude2');
let showDate2 = document.getElementById('showFecha2');

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

async function llenado1() {
		let resp = await fetch('/data1', {
			headers: {
				'Content-Type': 'application/json',
				},
			});
		let json = await resp.json();
		latitud = json['latitud'];
		longitud = json['longitud'];
		fecha_hora = json['fechaYhora'];
		medicion = json['medicion'];

		let NewLatLng = new L.LatLng(latitud, longitud);
		if (!poly) {
			poly = L.polyline([{ lat: latitud, lon: longitud }])
		} else {
			poly.addLatLng(NewLatLng);
		}
		
}
async function llenado2() {
	let resp = await fetch('/data2', {
		headers: {
			'Content-Type': 'application/json',
			},
		});
	let json = await resp.json();
	latitud2 = json['latitud'];
	longitud2 = json['longitud'];
	fecha_hora2 = json['fechaYhora'];
	medicion2 = json['medicion'];

	let NewLatLng = new L.LatLng(latitud2, longitud2);
	if (!poly2) {
		poly2 = L.polyline([{ lat: latitud2, lon: longitud2 }])
	} else {
		poly2.addLatLng(NewLatLng);
	}
	poly2.setStyle({color: 'red'})
	
}

function update1(){
	med.innerHTML = `Medición (en %) : ${medicion}`;
	showLat.innerHTML = `Latitud : ${latitud}`;
	showLong.innerHTML = `Longitud : ${longitud}`;
	showDate.innerHTML = `Fecha y hora : ${fecha_hora}`;
	if (marker !== null) {
		map.removeLayer(marker);
	}
	marker = L.marker([latitud, longitud]).addTo(map);
	c1.style.display = 'block';
	med.style.display ='list-item';
	showLat.style.display ='list-item';
	showLong.style.display ='list-item';
	showDate.style.display ='list-item';
}
function update2(){
	med2.innerHTML = `Medición (en %) : ${medicion2}`;
	showLat2.innerHTML = `Latitud : ${latitud2}`;
	showLong2.innerHTML = `Longitud : ${longitud2}`;
	showDate2.innerHTML = `Fecha y hora : ${fecha_hora2}`;
	if (marker2 !== null) {
		map.removeLayer(marker2);
	}
	marker2 = L.marker([latitud2, longitud2],{icon: greenIcon}).addTo(map);
	c2.style.display = 'block';
	med2.style.display ='list-item';
	showLat2.style.display ='list-item';
	showLong2.style.display ='list-item';
	showDate2.style.display ='list-item';
}
function mainF(){
	llenado1();
	llenado2();
	if(value == 1){
		// c1.style.display = 'block';
		// med.style.display ='list-item';
		// showLat.style.display ='list-item';
		// showLong.style.display ='list-item';
		// showDate.style.display ='list-item';
		c2.style.display = 'none';
		med2.style.display = 'none';
		showLat2.style.display = 'none';
		showLong2.style.display = 'none';
		showDate2.style.display = 'none';
		if(marker2){
			map.removeLayer(marker2);
		}
		if(poly2){
			map.removeLayer(poly2);
		}
		update1();
		map.addLayer(poly);
		map.flyTo(marker.getLatLng(), 15);
	} else if(value == 2){
		c1.style.display = 'none';
		med.style.display = 'none';
		showLat.style.display = 'none';
		showLong.style.display = 'none';
		showDate.style.display = 'none';
				
		map.removeLayer(marker)
		if(poly){
			map.removeLayer(poly)
		}
		update2();
		map.addLayer(poly2);
		map.flyTo(marker2.getLatLng(), 15);
	}else{
		c1.style.display = 'block';
		c2.style.display = 'block';
		update1();
		map.addLayer(poly);
		update2();
		map.addLayer(poly2);
	}
}
popup.onchange = function (){
	value = popup.value;
	console.log(value);
}
setInterval(function () {
	mainF();
}, 1000);

// map.on('refresh', update);
