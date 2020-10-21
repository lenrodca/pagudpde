window.onload = function(){
    let di = document.getElementById("after");
    var lat, lon, fecha, hora, mensaj, poli,contador=0,rect,DATOS,t2;
    let rec = [];
    var f1,f2,h1,h2,btn,def;
    def = this.document.getElementById("dtp")
    var road=[];
    btn = this.document.getElementById("button");
    btn2 = this.document.getElementById("button2");
    let map = L.map('map').setView([10.99304, -74.82814], 12);
    const tileurl2 = 'https://a.tile.openstreetmap.org/{z}/{x}/{y}.png';
    L.tileLayer(tileurl2).addTo(map);
    var greenIcon = new L.Icon({
      iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
      shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      shadowSize: [41, 41]
    });
    marcador = L.marker([0, 0],{icon:greenIcon});
    marcador.addTo(map);
    const date = new Date();
    map.on("click",(e)=>{
      if(contador==0){
        marker1 = L.marker(e.latlng,{draggable:'true'}).addTo(map);
       rec.push(e.latlng)
       marker1.on("drag",cambiar)
      
      } else if (contador==1){
          marker2 = L.marker(e.latlng,{draggable:'true'}).addTo(map);
          rec.push(e.latlng)
          rect=L.rectangle(rec,{color:'#5dbcd2'}).addTo(map)
          marker1.on("drag", cambiar)
          marker2.on("drag",cambiar2)
          
      }else{
          // marker1.on("drag", cambiar)
          // marker2.on("drag",cambiar2)
      }
      contador++;
      console.log(contador);
    });

    btn.addEventListener("click",async function(){
      if(contador >=2){
        data = {
          lat1:rect.getBounds().getSouth(),
          lat2:rect.getBounds().getNorth(),
          lon1:rect.getBounds().getWest(),
          lon2:rect.getBounds().getEast()
        }
        let datos;
        try {
         datos = await consultar(data);    
        } catch (error) {
          parrafo("Hubo un error con el servidor")
        }
        if (datos.length == 0){
          alert("No se encuentran datos en esta ubicación, por favor cambia de zona")
          if (np == 1){
            remove("POPUP")
          }
          if(nf==1){
            remove("range")
          }
        } else {
          DATOS = datos;
          parrafo("Seleccione una fecha.");
          PopUpMenu(datos);
          console.log(datos);
        }
      } else {
        alert("No cumple condición de la busqueda")
      }
    });

    btn2.addEventListener("click",async function(){
      rec = [];
      rect.remove();
      contador = 0;
      marker1.remove();
      marker2.remove();
      marcador.setLatLng(new L.LatLng(10000,10000))
    })

    //Funtions

    function cambiar(event){
      //console.log("marcador1")
      var marker = event.target;
      var position = marker.getLatLng();
      marker.setLatLng(new L.LatLng(position.lat, position.lng),{draggable:'true'});
      rec[0]=position;
      rect.setBounds(rec)
      marcador.setLatLng(new L.LatLng(10000,10000))
    }
    function cambiar2(event) {
      var marker2 = event.target;
      var position = marker2.getLatLng();
      marker2.setLatLng(new L.LatLng(position.lat, position.lng),{draggable:'true'});
      rec[1]=position;
      rect.setBounds(rec)
      marcador.setLatLng(new L.LatLng(10000,10000))

    }
    async function consultar(Data){
      let resp = await fetch("/h2",{
        method: 'POST',
        body: JSON.stringify(Data),
            headers:{
                'Content-Type': 'application/json'
            }
      });
      let data = await resp.json();
      return data;
    }
    function parrafo(Mensaje){
      if (np==1){
        remove("parrafo")
      }
      let pp = document.createElement("p");
      pp.id="parrafo"
      pp.innerText = Mensaje;
      di.appendChild(pp);
    }
    let np = 0;
    function PopUpMenu(datos){  
      let fechaa = [];
      console.log(np==1);
      if (np==1){
        remove("POPUP")
        remove("range")
      }
      np=0;
      var popupmenu = document.createElement("SELECT");
      popupmenu.id="POPUP"
      popupmenu.onchange = fecha;
      fechaa[0]=datos[0].fechaYhora.slice(0,10)
      var aux = fechaa[0]
      for (var i=0;i<datos.length;i++){
          if (aux!=datos[i].fechaYhora.slice(0,10)){
              //console.log(i)
              aux=datos[i].fechaYhora.slice(0,10);
              fechaa.push(datos[i].fechaYhora.slice(0,10))
          }
      }
   
    for (var i=0;i<fechaa.length;i++){
        var c = document.createElement("option")
        c.id = "opciones"
        c.text=fechaa[i];
        popupmenu.options.add(c)
    }
    di.appendChild(popupmenu)
    if(np==0){
      fecha();
    }
    np=1;

    }
    nf=0
    function fecha(datos){
      if(nf==1){
        remove("range");
        remove("t2")
      }

      let range = document.createElement("INPUT");
      let data = datosActualizados(DATOS);
      range.setAttribute("type", "range");
      range.min = 0
      range.max= data.length -1
      range.className = "slider"
      range.oninput = ()=>{
        rangeI(data)
      },
      range.id="range"
      di.appendChild(range);
      nf=1
    }
    function remove(id) {
      var imagen = document.getElementById(id);	
     if (!imagen){
       //alert("El elemento selecionado no existe");
     } else {
       var padre = imagen.parentNode;
       padre.removeChild(imagen);
     }
   }
   nt = 0
   function rangeI(datos){
     let range = document.getElementById("range")
     if(nt == 1){
       remove("t2")
     }
     t2 = document.createElement("p")
     t2.id = "t2"
     t2.innerText = `Lat: ${datos[range.value].latitud} , long: ${datos[range.value].longitud}, fecha y hora: ${datos[range.value].fechaYhora} `
     di.appendChild(t2)
     marcador.setLatLng(new L.LatLng(datos[range.value].latitud,datos[range.value].longitud))
     nt = 1
  }
   function datosActualizados(datos){
    let respuesta=[];
    x = document.getElementById("POPUP")
    var o = x.selectedIndex;
    for (var i=0;i<datos.length;i++){
      if (datos[i].fechaYhora.slice(0,10)==x.options[o].text){
        respuesta.push(datos[i])
      }
    }
    return respuesta;
   }


}