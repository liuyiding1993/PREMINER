var DEFUALT_RADIUS = 3;

function submit_query(query) {
    var radius = DEFUALT_RADIUS;
    var eyear = 2050;
    var emonth = 12;
    var edate = 31;
    var email = '';
    var lat = query['lat'];
    var lng = query['lng'];
    var keywords = query['keywords'];
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
            long: lng,
            color: '#D7DF01'
        },
        dataType: 'text',

        beforeSend: function() {
            console.log("before send");
            add_subscription(query);
        },

        success: function(data) {

        },

        error: function() {
            alert("Error in the form. Please validate your form and submit again.");
        }
    });
}