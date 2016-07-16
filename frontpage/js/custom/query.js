var DEFUALT_RADIUS = 3;

function submit_query(query) {
    var radius = DEFUALT_RADIUS;
    var eyear = 2050;
    var emonth = 12;
    var edate = 31;
    var email = '';
    var lat = query['lat'];
    var lng = query['lng'];
    $.ajax({
        type: "POST",
        url: "QuerySubmission",
        data: {
            radius: radius,
            keywords: keywords,
            eyear: eyear,
            emonth: emonth,
            edate: edate,
            email: email,
            lat: lat,
            long: lng
    //        color: colors[numOfQueries % colors.length]
        },
        dataType: 'text',
        beforeSend: function() {
            //do necessary error checking here;
        },
        success: function(data) {
    //        var circle = {
    //            clickable: false,
    //            strokeColor: colors[numOfQueries % colors.length],
    //            strokeOpacity: 0.3,
    //            strokeWeight: 1,
    //            fillColor: colors[numOfQueries % colors.length],
    //            fillOpacity: 0.5,
    //            map: map,
    //            center: new google.maps.LatLng(lat, long),
    //            radius: radius * 1000
    //        };
    //        var queryCircle = new google.maps.Circle(circle);
    //        queryCirclesList.push(queryCircle);
    //        numOfQueries++;
    //        alert("Query Successfully Submitted.");
        },
        error: function() {
            alert("Error in the form. Please validate your form and submit again.");
        }
    });
}