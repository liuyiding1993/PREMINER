var subscription_id_alloc = 0;
var subscription_num = 0;
var subscribed_markers = {};


function add_subscription(query) {
    console.log("add subscription");
    var new_subscription_id = "subscription" + subscription_num;
    subscribed_markers[new_subscription_id] = chosen_marker;
    subscription_id_alloc += 1;
    subscription_num += 1;

    var new_subscription_code = '';
    new_subscription_code += '<li class="media">';
    new_subscription_code += '<div class="media-left"> ';
    new_subscription_code += '<a id="' + new_subscription_id + '" href="#">';
    new_subscription_code += '<img class="media-object subscribed_poi" src="./pics/poi.png" alt="show subscribed POI">';
    new_subscription_code += '</a> </div>';
    new_subscription_code += '<div class="media-body"> <h4 class="media-heading">' + query["name"] + '</h4>';
    new_subscription_code += '<h5>';

    var keywords = query["keywords"].split(' ');
    console.log(keywords);

    for (var i = 0; i < keywords.length; i++) {
        new_subscription_code += ' <span class="label label-default">' + keywords[i] + '</span>'
    }
    new_subscription_code += '</h5> </div> </li>';
    $("#subscription_list").append(new_subscription_code);

    $("#" + new_subscription_id).on('click', function () {
        map.setZoom(15);
        map.setCenter(subscribed_markers[new_subscription_id].getPosition());
    });
}