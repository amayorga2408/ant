let map = L.map('map').setView([4.639386, -74.082412], 5.4)

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map)
document.getElementById('select-location').addEventListener('change', function(e){
    let coords= e.target.value.split(",");
    map.flyTo(coords,13);
 })

 //Agregar mapa base
var carto_light = L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/light_nolabels/{z}/{x}/{y}.png', {attribution: '©OpenStreetMap, ©CartoDB',subdomains: 'abcd',maxZoom: 24});

//Agregar plugin MiniMap
var minimap = new L.Control.MiniMap(carto_light, 
    {
       toggleDisplay: true,
       minimized: false,
       position: "bottomleft"
    }).addTo(map);

//Agregar escala revisar
new L.control.scale({imperial: false}).addTo(map);

//GeoJson departamentos 
L.geoJson(deptos, {
    style: {
        color: '#F7DC6F ',
        opacity: 6,
        fillOpacity: 0
    
    }
}).addTo(map);

// Configurar PopUp
function popup(feature,layer){
    if(feature.properties && feature.properties.ID_ANT){
        layer.bindPopup("<strong>ID_ANT: </strong>" + feature.properties.ID_ANT + "<br/>" + "<strong>Codigo: </strong>" + feature.properties.CODIGO + "<br/>" + "<strong>Departamento: </strong>" + feature.properties.DEPTO + "<br/>" + "<strong>Municipio: </strong>" + feature.properties.MPIO + "<br/>" + "<strong>Predio: </strong>" + feature.properties.PREDIO + "<br/>" + "<strong>FMI: </strong>" + feature.properties.FMI + "<br/>" + "<strong>Avalúo: </strong>" + feature.properties.AVALUO);
    }
}

// Agregar capa en formato GeoJson
L.geoJson(lonjacun).addTo(map);

var lonjacunJS = L.geoJson(lonjacun,{
    onEachFeature: popup
}).addTo(map);

// Agregar leyenda
var legend = L.control({position: 'bottomright'});

legend.onAdd = function (map) {
  var div = L.DomUtil.create('div', 'legend');
  div.innerHTML += '<div class="legend-title">CONVENCIONES</div>'
  div.innerHTML += '<div class="legend-item"><div class="legend-color" style="background-color: #5499C7;"></div>Lonja de Cundinamarca</div>';
  return div;
};

legend.addTo(map);

