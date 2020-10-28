window.onload = function () {
	var lat, lon, fecha, hora, mensaj, poli, mensaje;
	var marcador = L.marker([0, 0]);
	var f1, f2, h1, h2, btn, def;
	def = this.document.getElementById('dtp');
	var road = [];
	var roadtime = [];
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
			marcador = L.marker([0, 0]);
			marcador.addTo(map);
			if (poli) {
				map.removeLayer(poli);
			}
			if (mensaje.length == 0) {
				alert('Datos vacios, no hay nada que mostrar');
			} else {
				mensaje.map((d, i) => {
					road[i] = {
						lat: d.latitud,
						lon: d.longitud,
					};
					roadtime[i] = d.fechaYhora;
				});

				poli = L.polyline(road).addTo(map);

				let range = document.getElementById('range');
				let Aparecer=document.getElementById("Aparecer")
				range.min = 0;
				range.max = road.length - 1;
				range.oninput = () => {
					marcador.setLatLng(road[range.value]).addTo(map);
					document.getElementById("Texto").innerHTML= roadtime[range.value]
				};
			}
			range.style.display = 'block';
			Aparecer.style.display="inline"
		} else if (opcion == 2) {
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
			road = [];
			marcador = L.marker([0, 0], { icon: greenIcon });
			marcador.addTo(map);
			if (poli) {
				map.removeLayer(poli);
			}
			if (mensaje.length == 0) {
				alert('Datos vacios, no hay nada que mostrar');
			} else {
				mensaje.map((d, i) => {
					road[i] = {
						lat: d.latitud,
						lon: d.longitud,
					};
					roadtime[i] = d.fechaYhora;
				});

				poli = L.polyline(road).addTo(map);
				poli.setStyle({ color: 'red' });

				let range = document.getElementById('range');
				let Aparecer=document.getElementById("Aparecer")
				range.min = 0;
				range.max = road.length - 1;
				range.oninput = () => {
					marcador.setLatLng(road[range.value]).addTo(map);
					document.getElementById("Texto").innerHTML= roadtime[range.value]
				};
			}
			range.style.display = 'block';
			Aparecer.style.display="inline"
		}
	});
};
