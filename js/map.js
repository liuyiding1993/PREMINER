var map = document.getElementById('googleMap');
var wordList = document.getElementById('pac-input');
var rectangle;
var url;
var result;
var regionSize = 100;
<<<<<<< HEAD
=======
var
>>>>>>> origin/master
//var success = false;
//var jqXHR;

// jQuery code for Go button
<<<<<<< HEAD
// $(document).ready(function(){
//     $("#button").click(function(){
//         diversifyRegion();
//     });
// });
=======
$(document).ready(function(){
    $("#button").click(function(){
        diversifyRegion();
    });
});
>>>>>>> origin/master

// send GET request method
function sendGET(url){
    $.getJSON(url, function (data) {
        return data;
    });
}

// draw a rectangle give the bounds
function drawRectangle(bounds){
    rectangle = new google.maps.Rectangle({
        strokeColor: '#FF0000',
        strokeWeight: 2,
        fillOpacity: 0,
        map: map,
        bounds: bounds
    });
}

// Diversified Region Query
function diversifyRegion(){
<<<<<<< HEAD
    // url = 'http://155.69.149.161:8002/region?keyword='+wordList+'&size='+regionSize;
    // result = sendGET(url);
    result = '{"status": "OK","region": {"southwest":{"lat": 1.340105,"lon": 103.679604},"northeast":{"lat": 1.356147,"lon": 103.690042}}}'
    console.log(result)
    setTimeout(function(){
        // drop(result);
        data = JSON.parse(result);
        var bounds = {
            north: data.region.northeast.lat,
            south: data.region.southwest.lat,
            east: data.region.northeast.lon,
            west: data.region.southwest.lon
=======
    url = 'http://155.69.149.161:8002/region?keyword='+wordList+'&size='+regionSize;
    result = sendGET(url);
    setTimeout(function(){
        drop(result);
        var region = JSON.parse(result);
        var bounds = {
            north: region.northeast.lat,
            south: region.southwest.lat,
            east: region.northeast.lon,
            west: region.southwest.lon
>>>>>>> origin/master
        };
        drawRectangle(bounds);
    },5000);
}

// Aspect in region query
function aspectInRegion(){
    url = 'http://155.69.149.161:8080/behavior/baspect?sw='+bounds.south,bounds.west+'&ne='
    +bounds.north,bounds.east+'&category=CATEGORYID';
    result = sendGET(url);
    setTimeout(function(){
<<<<<<< HEAD
        var data = JSON.parse(result);
        var posAspect = classifyAspect(data.aspects_pos);
        var negAspect = classifyAspect(data.aspects_neg);
=======
        var apspect = JSON.parse(aspect);
        var posAspect = classifyAspect(aspect.aspects_pos);
        var negAspect = classifyAspect(aspect.aspects_neg);
>>>>>>> origin/master
        var info = new google.maps.InfoWindow({
            content: 'Positve aspects:                Negative aspects:\n'+
            '1. '+posAspect[0]+'                       1. '+negAspect[0]+
            '2. '+posAspect[1]+'                       1. '+negAspect[1]+
<<<<<<< HEAD
            '3. '+posAspect[2]+'                       1. '+negAspect[2]
=======
            '3. '+posAspect[2]+'                       1. '+negAspect[2]+
>>>>>>> origin/master
        });
        rectangle.addListener('click', function(){
            info.open(map,rectangle);
        });
    },5000);
}

// Return the top 3 highest score in an aspect.
function classifyAspect(aspect){
    var array = new Array();
    var resultArray = new Array();
    var size = aspect.count;
    for(var i = 0;i<size;i++){
        var score = aspect.list[i].apsect_score;
        if(i>2){
            array.sort();
            if(score > array[0]){
                array[0] = score;
            }
        }else{
            array.push(score);
        }
    }
    array.sort();
    for(var i = size - 1;i>=0;i--){
        var name = aspect.list[i].apsect_name;
        var score = aspect_list[i].apsect_score;
        if(array[i] === score){
            resultArray.push(name);
        }
    }
    return resultArray;
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
<<<<<<< HEAD
        });
    });
}
*/
=======
        });*/
    });
}
>>>>>>> origin/master
