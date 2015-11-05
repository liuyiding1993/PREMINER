var markers = [];
var map;
var Singapore = {lat: 1.3264129, lng: 103.8077371}
function initMap() {
    map = new google.maps.Map(document.getElementById('googleMap'), {
        center: Singapore,
        zoom: 12
    });

    function drawRectangle(bounds){
        var rectangle = new google.maps.Rectangle({
            strokeColor: '#FF0000',
            strokeOpacity: 0.8,
            strokeWeight: 2,
            fillOpacity: 0.35,
            fillColor: '#FF0000',
            map: map,
            bounds: bounds
        });
        return rectangle;
    }

    function diversifyRegion(category, region){};
    function aspectInRegion(category, rectangle){};
}

/* Create a search box and link it to the UI element.
var input = document.getElementById('pac-input');
var searchBox = new google.maps.places.SearchBox(input);
map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

// Bias the SearchBox results towards current map's viewport.
map.addListener('bounds_changed', function() {
    searchBox.setBounds(map.getBounds());
});

// Listen for the event fired when the user selects a prediction and retrieve
// more details for that place.
searchBox.addListener('places_changed', function() {
var places = searchBox.getPlaces();
if (places.length == 0) {
    return;
}
// For each place, get the icon, name and location.
var bounds = new google.maps.LatLngBounds();
places.forEach(function(place) {
    var icon = {
    url: place.icon,
    size: new google.maps.Size(71, 71),
    origin: new google.maps.Point(0, 0),
    anchor: new google.maps.Point(17, 34),
    scaledSize: new google.maps.Size(25, 25)
};*/


    // Create a marker for each place.
/*function addMarkerWithTimeout(position, timeout) {
    window.setTimeout(function() {
        markers.push(new google.maps.Marker({
        position: position,
        map: map,
        animation: google.maps.Animation.DROP
        }));
    }, timeout);
}

// Clear out the old markers.
function clearMarkers() {
    for (var i = 0; i < markers.length; i++) {
        markers[i].setMap(null);
    }
    markers = [];
}

function drop(coos) {
    clearMarkers();
    for (var i = 0; i < coos.length; i++) {
        addMarkerWithTimeout(coos[i], i * 200);
    }
}

function dropMarker() {
    $(function () {
        $.getJSON('data/markerCoo.json', function (data) {
            drop(data)
        });
    });
}
dropMarker();*/