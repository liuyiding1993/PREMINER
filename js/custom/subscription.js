function add_subscription() {
    if (chosen_marker == null && chosen_region == null) {
        if (!document.getElementById("chosen_warning"))
            $("#input_group_container").append('<h5><p id="chosen_warning" class="text-danger">Please select a POI or draw a region before subscribe.</p></h5>');
    }
    else {
        if (document.getElementById("chosen_warning")) {
            $("#chosen_warning").remove();
        }

        var keywords = $.trim($("#keywords").val()).replace(/  +/g, ' ').split(' ');
        var query = {
            'lat': chosen_marker.position.lat(),
            'lng': chosen_marker.position.lng(),
            'radius': null,
            'keywords': keywords
        };
    }
    var new_subscription_id = "subscription" + subscription_num;
    subscrbed_markers[new_subscription_id] = chosen_marker;
    subscription_num += 1;

    var new_subscription_code = '';
    new_subscription_code += '<li class="media">';
    new_subscription_code += '<div class="media-left"> ';
    new_subscription_code += '<a id="' + new_subscription_id + '" href="#">';
    new_subscription_code += '<img class="media-object subscribed_poi" src="./pics/poi.png" alt="show subscribed POI">';
    new_subscription_code += '</a> </div>';
    new_subscription_code += '<div class="media-body"> <h4 class="media-heading">' + chosen_marker.title + '</h4>';
    new_subscription_code += '<h5>';
    for (var i = 0; i < keywords.length; i++) {
        new_subscription_code += ' <span class="label label-default">' + keywords[i] + '</span>'
    }
    new_subscription_code += '</h5> </div> </li>';
    $("#subscription_list").append(new_subscription_code);

    $("#" + new_subscription_id).on('click', function () {
        map.setZoom(15);
        map.setCenter(subscrbed_markers[new_subscription_id].getPosition());
    });
}