var markers = [];
var map;
var Singapore = {lat: 1.3264129, lng: 103.8077371}
var locationCenter = null;

function initMap() {
    //Construct Map
    map = new google.maps.Map(document.getElementById('googleMap'), {
        center: Singapore,
        zoom: 12
    });
    
	//Create a search box and link it to the UI element.
	//The Go button is actually optional
	var input = document.getElementById('pac-input');
	var searchBox = new google.maps.places.SearchBox(input);
	var goButton = document.getElementById('go-button');
	map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);
	map.controls[google.maps.ControlPosition.TOP_LEFT].push(goButton);

	//Listener 1: place marker and bound the searching area
	map.addListener('click', function(e) {
    	placeLocationCenter(e.latLng);
    	updateSearchBoxBounds(searchBox);
  	});
  	
  	//Listener 2: update search box bounds when change zoom or view point
  	map.addListener('zoom_changed', function() {
    	updateSearchBoxBounds(searchBox);
  	});
  	
	//Listener 3: can either use only search box with enter key or with button on-click event  	
	//option1
	searchBox.addListener('places_changed', function(){
 		search(searchBox);
	});
	
	//option2
	google.maps.event.addDomListener(goButton, 'click', function(){
		google.maps.event.trigger(input, 'focus')
		google.maps.event.trigger(input, 'keydown', {keyCode: 13});	
// 		search(searchBox)
    });

}

//update search box bounds
function updateSearchBoxBounds(searchBox){
	//update bounds according to location center and view point (zoom)
	var currentViewBound = map.getBounds();
	if (locationCenter == null){
		searchBox.setBounds(currentViewBound);
	}
	else{
		var viewBoundLatSpan = currentViewBound.toSpan().lat();
		var viewBoundLngSpan = currentViewBound.toSpan().lng();
		var newSW = new google.maps.LatLng(locationCenter.getPosition().lat() - viewBoundLatSpan/4, 
								locationCenter.getPosition().lng() - viewBoundLngSpan/4);
		var newNE = new google.maps.LatLng(locationCenter.getPosition().lat() + viewBoundLatSpan/4, 
								locationCenter.getPosition().lng() + viewBoundLngSpan/4);
		searchBox.setBounds( new google.maps.LatLngBounds(newSW, newNE) );
	}
// 	drawBounds(searchBox.getBounds());
}

//Calling the search function
function search(searchBox){
	//get search results
	var places = searchBox.getPlaces();

	if (places.length == 0)
		return;

	// Clear out the old markers.
	markers.forEach(function(marker) {
		marker.setMap(null);
	});
	markers = [];
	
	// For each place, get the icon, name and location.
	var bounds = new google.maps.LatLngBounds();
	places.forEach(function(place) {
		// Create a marker for each place.
		markers.push(new google.maps.Marker({
			map: map,
			icon: 'http://maps.gstatic.com/mapfiles/markers2/marker.png',
			title: place.name,
			position: place.geometry.location
		}));

		if (place.geometry.viewport) {
			// Only geocodes have viewport.
			bounds.union(place.geometry.viewport);
		}else{
			bounds.extend(place.geometry.location);
		}
	});
// 	drawBounds(searchBox.getBounds());	
// 	map.fitBounds(bounds);
}

//user click on the map to select a location of interest, search around the location center
function placeLocationCenter(latLng){	
	if(locationCenter == null){
		locationCenter = new google.maps.Marker({
			position: latLng,
			map: map,
			icon: 'icon/pin.png'
		});
	}else locationCenter.setPosition(latLng);
}

//draw bounds
function drawBounds(bounds){
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