var map, infoWindow;
function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: -34.397, lng: 150.644},
    zoom: 15,
    mapTypeId: google.maps.MapTypeId.MAPA,
    zoomControl: true,
    zoomControlOptions: {
        position: google.maps.ControlPosition.RIGHT_BOTTOM
    },
    scaleControl: true,
    streetViewControl: true,
    streetViewControlOptions: {
        position: google.maps.ControlPosition.LEFT_TOP
    },
    fullscreenControl: true
  });
  infoWindow = new google.maps.InfoWindow;
  

  // Try HTML5 geolocation.
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
     
        lat = position.coords.latitude,
        lng = position.coords.longitude
      
      var myLatlng = new google.maps.LatLng(lat, lng);

      var mapOptions = {
        center: myLatlng,
        zoom: 14,
        mapTypeId: google.maps.MapTypeId.MAP
      };

      infoWindow.setPosition(myLatlng);
      infoWindow.setContent('Este eres tu ');
      infoWindow.open(map);
      map.setCenter(myLatlng);

      infowindow = new google.maps.InfoWindow();

   // Especificamos la localización, el radio y el tipo de lugares que queremos obtener
   var request = {
     location: myLatlng,
     radius: 5000,
     types: ['restaurant', 'cafe', 'food', 'bakery', 'meal_delivery', 'meal_delivery'],
     keywords: "(pizza) AND (sushi) AND (pan) AND (pasta) AND (completos) AND (comida)"
   };

   // Creamos el servicio PlaceService y enviamos la petición.
   var service = new google.maps.places.PlacesService(map);

   service.nearbySearch(request, function(results, status) {
     if (status === google.maps.places.PlacesServiceStatus.OK) {
       for (var i = 0; i < results.length; i++) {
         crearMarcador(results[i]);
       }
     }
   });

    }, function() {
      handleLocationError(true, infoWindow, map.getCenter());
    });
  } else {
    // Browser doesn't support Geolocation
    handleLocationError(false, infoWindow, map.getCenter());
  }
}

function crearMarcador(place)
 {
   // Creamos un marcador
   var marker = new google.maps.Marker({
     map: map,
     position: place.geometry.location
   });

 // Asignamos el evento click del marcador
   google.maps.event.addListener(marker, 'click', function() {
     infowindow.setContent(place.name);
     infowindow.open(map, this);

   });
}
var service = new google.maps.places.PlacesService(map);

function handleLocationError(browserHasGeolocation, infoWindow, myLatln) {
  infoWindow.setPosition(myLatln);
  infoWindow.setContent(browserHasGeolocation ?
                        'Error: The Geolocation service failed.' :
                        'Error: Your browser doesn\'t support geolocation.');
  infoWindow.open(map);
}
let tipoRestaurante = document.getElementById("tipoRestaurante");
function filtrarRestaurantes(){
    crearMarcador.filter(tipoRestaurante);
}


/*var map = L.map('mapContainer').fitWorld();//consumiendo api de geolocalizacion leaveleft

L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
    maxZoom: 18,
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, ' +
        '<a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
        'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    id: 'mapbox.streets'
}).addTo(map);

function onLocationFound(e) {
    var radius = e.accuracy / 2;

    L.marker(e.latlng).addTo(map)
    drawPlaces();
}

function onLocationError(e) {
    alert(e.message);
}

map.on('locationfound', onLocationFound);
map.on('locationerror', onLocationError);

map.locate({ setView: true, maxZoom: 16 });

window.drawPlaces = (filter) => {
    lat = -33.4883118;
    long = -70.5100325;
    var greenIcon = L.icon({
        iconUrl: 'img/leaf-green.png',
        shadowUrl: 'img/leaf-shadow.png',
        iconSize: [38, 95],
        shadowSize: [50, 64],
        iconAnchor: [22, 94],
        shadowAnchor: [4, 62],
        popupAnchor: [-3, -76]
    });
}


var promise = $.getJSON("businesses.json");
promise.then(function(data) {
    
    var allbusinesses = L.geoJson(data);
    // THIS IS NEW
    var cafes = L.geoJson(data, {
        filter: function(feature, layer) {
            return feature.properties.BusType == "restaurante";
        }
    });
    var others = L.geoJson(data, {
        filter: function(feature, layer) {
            return feature.properties.BusType != "restaurante";
        }
    });
   
    map.fitBounds(allbusinesses.getBounds(), {
        padding: [50, 50]
    });
    // THIS IS NEW
    restaurantes.addTo(map)
    others.addTo(map)
});*/
