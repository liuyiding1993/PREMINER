var markers = [];
var map;
var Singapore = {lat: 1.3264129, lng: 103.8077371};

var chosen_marker = null;
var chosen_region = null;


function initMap() {
    map = new google.maps.Map(document.getElementById('googleMap'), {
        center: Singapore,
        zoom: 12
    });

    var myLatlng = {lat: 1.3264129, lng: 103.8077371};
    add_marker(myLatlng, 'hello world!');
    myLatlng = {lat: 1.3264129, lng: 103.9077371};
    add_marker(myLatlng, 'hello world1!');
}


function add_marker(lat_lng, title) {
    var marker = new google.maps.Marker({
        position: lat_lng,
        title: title,
        animation: null,
        is_selected: false
    });
    marker.addListener('click', click_marker);
    marker.setMap(map);
    markers.push(marker);
}


function click_marker() {
    if (this.is_selected)
        unchoose_marker(this);
    else
        choose_marker(this);
}


function choose_marker(marker) {
    for (var i = 0; i < markers.length; i++) {
        unchoose_marker(markers[i]);
    }
    marker.setAnimation(google.maps.Animation.BOUNCE);
    marker.is_selected = true;
    chosen_marker = marker;
}


function unchoose_marker(marker) {
    marker.setAnimation(null);
    marker.is_selected = false;
    chosen_marker = null;
}
