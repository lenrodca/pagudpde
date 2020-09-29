let str;
let datos;
let latitud;
let longitud;
let fecha_hora;
var marker = null;
let map = L.map('map').setView([10.987785, -74.805640], 15);
L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution:
        'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://cloudmade.com">CloudMade</a>',
    maxZoom: 18,
}).addTo(map);
let poly 
L.control.scale().addTo(map);
function update() {
    fetch('/data',{headers:{
        'Content-Type': 'application/json'
    }})
        .then((response) => response.json())
        .then((json) => {
            console.log(json);
            
            latitud = json['latitud'];
            longitud = json['longitud'];
            fecha_hora = json['fechaYhora'];
            let NewLatLng = new L.LatLng(latitud,longitud)
            if(!poly){
                poly = L.polyline([{lat:latitud,lon:longitud}]).addTo(map)
            }else{
                poly.addLatLng(NewLatLng)
            }
            map.setView(NewLatLng)
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

setInterval(update,1000)



// map.on('refresh', update);