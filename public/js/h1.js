window.onload = function () {
	var lat, lon, fecha, hora, mensaj, poli, mensaje;
	var mensaje2,poli2
	var marcador = L.marker([0, 0]);
	var f1, f2, h1, h2, btn, def;
	def = this.document.getElementById('dtp');
	var road2 = [];
	var roadtime2 = [];
	var mediciones2 = [];
	var road = [];
	var roadtime = [];
	var mediciones = [];
	btn = this.document.getElementById('button');
	let map = L.map('map').setView([10.99304, -74.82814], 12);
	const tileurl2 = 'https://a.tile.openstreetmap.org/{z}/{x}/{y}.png';
	L.tileLayer(tileurl2).addTo(map);
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

	const date = new Date();
	var mes = (date.getMonth() + 1) * 0.01;
	def.value =
		date.getFullYear() +
		'-' +
		mes.toString().slice(2, 5) +
		'-' +
		date.getDate();
	$(function () {
		$('input[name="datetimes"]').daterangepicker(
			{
				timePicker: true,
				timerFormat: 'HH:mm:ss',
				singleDatePicker: false,
				startDate: moment().subtract(12, 'hour'),
				endDate: moment(),
				timePicker24Hour: false,
				timePickerIncrement: 15,
				timePickerSeconds: false,
				maxDate: moment(),
				startValue: moment(),
				locale: {
					format: 'YYYY-MM-DD HH:mm:ss A',
				},
			},
			function (start, end) {}
		);
		$('#dtp').html(
			moment().subtract('days', 29).format('D MMMM YYYY') +
				' - ' +
				moment().format('D MMMM YYYY')
		);
	});

	btn.addEventListener('click', async function () {
		f1 = def.value.slice(0, 10);
		f2 = def.value.slice(24, 35);
		h1 = def.value.slice(11, 19);
		h2 = def.value.slice(36, 44);
		// console.log(def.value)
		data = {
			fecha1: f1,
			fecha2: f2,
			hora1: h1,
			hora2: h2,
		};

		// console.log("La consulta es: ",data)
		var popup = document.getElementById('popup-historicos');
		var opcion = popup.value;
		if (opcion == 1) {
			range2.style.display = 'none';
			Aparecer2.style.display = 'none';
			Texto2.style.display='none'
			let resp = await fetch('/h11', {
				method: 'POST',
				body: JSON.stringify(data),
				headers: {
					'Content-Type': 'application/json',
				},
			});
			mensaje = await resp.json();
			console.log(mensaje);
			road = [];
			map.removeLayer(marcador);
			map.removeLayer(marcador2);
			marcador = L.marker([0, 0]);
			marcador.addTo(map);
			if (poli) {
				map.removeLayer(poli);
			}
			if (poli2) {
				map.removeLayer(poli2);
			}
			if (mensaje.length == 0) {
				alert('Datos vacios, no hay nada que mostrar');
				range1.style.display = 'none';
				Aparecer1.style.display = 'none';
				Texto1.style.display='none'
			} else {
				mensaje.map((d, i) => {
					road[i] = {
						lat: d.latitud,
						lon: d.longitud,
					};
					roadtime[i] = d.fechaYhora;
					mediciones[i] = d.medicion;
				});

				poli = L.polyline(road).addTo(map);

				let range1 = document.getElementById('range1');
				let Aparecer1 = document.getElementById('Aparecer1');
				range1.min = 0;
				range1.max = road.length - 1;
				range1.oninput = () => {
					marcador.setLatLng(road[range1.value]).addTo(map);
					document.getElementById('Texto1').innerHTML = `Su fecha es : ${
						roadtime[range1.value]
					} / La medición es (en %) : ${mediciones[range1.value]}`;
				};
				range1.style.display = 'block';
				Aparecer1.style.display = 'inline';
				Texto1.style.display='list-item';
			}
			
		} else if (opcion == 2) {
			range1.style.display = 'none';
			Aparecer1.style.display = 'none';
			Texto1.style.display='none'
			let resp = await fetch('/h12', {
				method: 'POST',
				body: JSON.stringify(data),
				headers: {
					'Content-Type': 'application/json',
				},
			});
			mensaje = await resp.json();
			console.log(mensaje);
			map.removeLayer(marcador);
			map.removeLayer(marcador2);

			road = [];
			marcador = L.marker([0, 0], { icon: greenIcon });
			marcador.addTo(map);
			if (poli) {
				map.removeLayer(poli);
			}
			if (poli2) {
				map.removeLayer(poli2);
			}
			if (mensaje.length == 0) {
				alert('Datos vacios, no hay nada que mostrar');
				range2.style.display = 'none';
				Aparecer2.style.display = '	none';
				Texto2.style.display='none'
			} else {
				mensaje.map((d, i) => {
					road[i] = {
						lat: d.latitud,
						lon: d.longitud,
					};

					roadtime[i] = d.fechaYhora;
					mediciones[i] = d.medicion;
				});

				poli = L.polyline(road).addTo(map);
				poli.setStyle({ color: 'red' });

				let range2 = document.getElementById('range2');
				let Aparecer2 = document.getElementById('Aparecer2');
				range2.min = 0;
				range2.max = road.length - 1;
				range2.oninput = () => {
					marcador.setLatLng(road[range2.value]).addTo(map);
					document.getElementById('Texto2').innerHTML = `Su fecha es : ${
						roadtime[range2.value]
					} / La medición es (en %) : ${mediciones[range2.value]}`;
				};
				range2.style.display = 'block';
				Aparecer2.style.display = 'inline';
				Texto2.style.display='list-item';
			}
		}else if(opcion==3){
			if (poli) {
				map.removeLayer(poli);
			}
			map.removeLayer(marcador);
			let resp = await fetch('/h11', {
				method: 'POST',
				body: JSON.stringify(data),
				headers: {
					'Content-Type': 'application/json',
				},
			});
			mensaje = await resp.json();
			console.log(mensaje);
			road = [];
			marcador = L.marker([0, 0]);
			marcador.addTo(map);
			if (mensaje.length == 0) {
				alert('Datos vacios, no hay nada que mostrar para el vehículo 1');
				range1.style.display = 'none';
				Aparecer1.style.display = 'none';
				Texto1.style.display='none'
			} else {
				mensaje.map((d, i) => {
					road[i] = {
						lat: d.latitud,
						lon: d.longitud,
					};
					roadtime[i] = d.fechaYhora;
					mediciones[i] = d.medicion;
				});

				poli = L.polyline(road).addTo(map);

				let range1 = document.getElementById('range1');
				let Aparecer1 = document.getElementById('Aparecer1');
				range1.min = 0;
				range1.max = road.length - 1;
				range1.oninput = () => {
					marcador.setLatLng(road[range1.value]).addTo(map);
					document.getElementById('Texto1').innerHTML = `Su fecha es : ${
						roadtime[range1.value]
					} / La medición es (en %) : ${mediciones[range1.value]}`;
				};
				range1.style.display = 'block';
				Aparecer1.style.display = 'inline';
				Texto1.style.display='list-item';
			}
			let resp2 = await fetch('/h12', {
				method: 'POST',
				body: JSON.stringify(data),
				headers: {
					'Content-Type': 'application/json',
				},
			});
			mensaje2 = await resp2.json();
			console.log(mensaje2);
			road2 = [];
			marcador2 = L.marker([0, 0], { icon: greenIcon });
			marcador2.addTo(map);
			
			if (mensaje2.length == 0) {
				alert('Datos vacios, no hay nada que mostrar para el vehículo 2');
				range2.style.display = 'none';
				Aparecer2.style.display = '	none';
				Texto2.style.display='none'
			} else {
				mensaje2.map((d, i) => {
					road2[i] = {
						lat: d.latitud,
						lon: d.longitud,
					};
					roadtime2[i] = d.fechaYhora;
					mediciones2[i] = d.medicion;
				});

				poli2 = L.polyline(road2).addTo(map);
				poli2.setStyle({ color: 'red' });

				let range2 = document.getElementById('range2');
				let Aparecer2 = document.getElementById('Aparecer2');
				range2.min = 0;
				range2.max = road2.length - 1;
				range2.oninput = () => {
					marcador2.setLatLng(road2[range2.value]).addTo(map);
					document.getElementById('Texto2').innerHTML = `Su fecha es : ${
						roadtime2[range2.value]
					} / La medición es (en %) : ${mediciones2[range2.value]}`;
				};
				range2.style.display = 'block';
				Aparecer2.style.display = 'inline';
				Texto2.style.display='list-item';
			}
		}
	});
};
