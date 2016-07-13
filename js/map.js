var map = document.getElementById('googleMap');
var wordList = document.getElementById('pac-input');
var url;
var result;
var regionSize = 100;
//var success = false;
//var jqXHR;

$(document).ready(function(){
    $("#button").click(function(){
        aspectInRegion();
        //diversifyRegion();
    });
});

// send GET request method
function sendGET(url){
    $.getJSON(url, function (data) {
        return data;
    });
}

// draw a rectangle give the bounds
function drawRectangle(bounds){
    //rectangle.setMap(null); to clear existing rectangles
    var rectangle = new google.maps.Rectangle({
        strokeColor: '#FF0000',
        strokeWeight: 2,
        fillOpacity: 0,
        map: map,
        bounds: bounds
    });
}

// Diversified Region Query
function diversifyRegion(){
    // url = 'http://155.69.149.161:8002/region?keyword='+wordList+'&size='+regionSize;
    // result = sendGET(url);
    result = '{"status": "OK","region": {"southwest":{"lat": 1.340105,"lon": 103.679604},"northeast":{"lat": 1.356147,"lon": 103.690042}}}'
    setTimeout(function(){
        // drop(result);
        data = JSON.parse(result);
        var bounds = {
            north: data.region.northeast.lat,
            south: data.region.southwest.lat,
            east: data.region.northeast.lon,
            west: data.region.southwest.lon
        };
        drawRectangle(bounds);
    },5000);
}

// Aspect in region query
function aspectInRegion(){
    // First let user draw a rectangle, the rectangle starts in NTU
    //rectangle.setMap(null); to clear the existing rectangles
    var rectangle = new google.maps.Rectangle({
        strokeColor: '#FF0000',
        strokeWeight: 2,
        fillOpacity: 0,
        map: map,
        bounds: {
            south: 1.340105,
            north: 1.340105,
            west: 103.679604,
            east: 103.679604
        },
        editable: true,
        draggable: true
    });

    rectangle.addListener('click', function(){
        var bounds = {
            north: rectangle.getBounds().getNorthEast().lat(),
            south: rectangle.getBounds().getSouthWest().lat(),
            east: rectangle.getBounds().getNorthEast().lng(),
            west: rectangle.getBounds().getSouthWest().lng()
        };

        // send GET request based on current bounds.
        // url = 'http://155.69.149.161:8080/behavior/baspect?sw='+bounds.south,bounds.west+'&ne='
        // +bounds.north,bounds.east+'&category=CATEGORYID';
        // result = sendGET(url);

        result = '{"status": "OK/Error","aspects_pos": {"count": 4, "list": [{"aspect_id": 1, "aspect_score": 100, "aspect_name": "coffee1", "word_count": 5, "word_list": [{"word": "good", "pro": 50} ] },{"aspect_id": 2, "aspect_score": 90, "aspect_name": "coffee2", "word_count": 5, "word_list": [{"word": "good", "pro": 50} ] },{"aspect_id": 3, "aspect_score": 80, "aspect_name": "coffee3", "word_count": 5, "word_list": [{"word": "good", "pro": 50} ] },{"aspect_id": 4, "aspect_score": 85, "aspect_name": "coffee4", "word_count": 5, "word_list": [{"word": "good", "pro": 50} ] } ] }, "aspects_neg": {"count": 1, "list": [{"aspect_id": 1, "aspect_score": 70, "aspect_name": "coffee", "word_count": 5, "word_list": [{"word": "good", "pro": 50} ] } ] } }';
        
        setTimeout(function(){
            var data = JSON.parse(result);
            var posAspect = classifyAspect(data.aspects_pos);
            var negAspect = classifyAspect(data.aspects_neg);
            var info = new google.maps.InfoWindow({
                content: '<b>Positive aspects:</b><br>'+                
                '1. '+posAspect[0]+'<br>'+                       
                '2. '+posAspect[1]+'<br>'+                      
                '3. '+posAspect[2]+'<br>'+
                '<b>Negative aspects:</b><br>'+                
                '1. '+negAspect[0]+'<br>'+                       
                '2. '+negAspect[1]+'<br>'+                      
                '3. '+negAspect[2]+'<br>'
            });

            var north = bounds.north;
            var midPoint = (bounds.east + bounds.west)/2;
            var location = new google.maps.LatLng(north,midPoint);
            info.setPosition(location);
            info.open(map,rectangle);

        },500); // set time to 500 for testing.
    });  
}

// Return the top 3 highest score in an aspect.
function classifyAspect(aspect){
    var array = new Array();
    var resultArray = new Array();
    var size = aspect.count;
    for(var i = 0;i<size;i++){
        var score = aspect.list[i].aspect_score;
        if(i>2){
            array.sort(function(a, b){return a-b}); // Sort in ascending order.
            if(score > array[0]){
                array[0] = score;
            }
        }else{
            array.push(score);
        }
    }
    alert(array);
    array.sort(function(a, b){return a-b});
    alert(array);
    getResult(aspect,array,2,size,resultArray);
    getResult(aspect,array,1,size,resultArray);
    getResult(aspect,array,0,size,resultArray);
    return resultArray;
}

function getResult(aspect,array,index,size,resultArray){
    for(var i = size - 1;i>=0;i--){
        var name = aspect.list[i].aspect_name;
        var score = aspect.list[i].aspect_score;
        if(array[index] === score){
            resultArray.push(name);
            break;
        } 
    }
}

// Create a marker for each place.
function addMarkerWithTimeout(position, timeout) {
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

/*function dropMarker(url) {
    $(function () {
        $.getJSON(url, function (data) {
            success = true;
            drop(data);
            result = data;
        });
        /*.fail(function(jqXHR) {
            if (jqXHR.status == 404) {
                alert("404 Not Found");
            } else {
                alert(jqXHR.status);
            }
        });
    });
}
*/
