function GeoObject(name, latitude, longitude, review) {
    this.name = name;
    this.latitude = latitude;
    this.longitude = longitude;
    this.review = review;
}


function getGeoObjects(data) {
    var geoObjectsArray = data["geoObjects"];
    var geoObjects = [];
    $.each(geoObjectsArray, function (index, geoObject) {
        var name = geoObject["name"];
        var latitude = geoObject["latitude"];
        var longitude = geoObject["longitude"];
        var review = geoObject["review"];
        geoObjects.push(new GeoObject(name, latitude, longitude, review));
    });
    return geoObjects
}


var data_lock = null;   // To avoid duplicated data, the reason remains unclear.
function processRetrievedData(data) {
    if (data["timestamp"] != data_lock) {
        if (data["geoObjectCount"] > 0) {
            var geoObjects = getGeoObjects(data);
            display_geoObjects(geoObjects);
            data_lock = data;
        }
        data_lock = data["timestamp"];
    }
}


function keepGetBRCMatchings() {
    $.ajax({
        type: "GET",
        url: "RetrieveBRCMatching",
        dataType: 'json',
        success: function(data) {
            processRetrievedData(data);
        },
        error: function() {
            alert("error in getMatchings");
        },
        complete: function() {
            setTimeout(function() {
                keepGetBRCMatchings();
            }, 5000);
        }
    });
}


keepGetBRCMatchings();


