function init_left_panel() {
    var body_height = $("body").height();
    var query_panel_height = $("#query_panel").height();

    var $panel_heading = $("#subscription_heading");
    var panel_heading_height = $panel_heading.height();
    var panel_heading_padding =
        parseInt($panel_heading.css("padding-top"), 10) +
        parseInt($panel_heading.css("padding-bottom"), 10);

    var $subscription_panel_body = $("#subscription_panel_body");
    var subscription_panel_body_padding =
        parseInt($subscription_panel_body.css("padding-top"), 10) +
        parseInt($subscription_panel_body.css("padding-bottom"), 10);
    $("#subscription_list").css("max-height",
        0.98 * (body_height - query_panel_height - panel_heading_height - panel_heading_padding - subscription_panel_body_padding));

    var $left_panel_container = $("#left_panel_container");
    $left_panel_container.BootSideMenu({side:"left", autoClose:false}, "poi");
    $left_panel_container.css("margin-top", $("#navigation").height() + 2);
}


function init_right_panel() {
    var body_height = $("body").height();

    var $panel_heading = $("#subscription_heading");
    var panel_heading_height = $panel_heading.height();
    var panel_heading_padding =
        parseInt($panel_heading.css("padding-top"), 10) +
        parseInt($panel_heading.css("padding-bottom"), 10);

    $("#news_list").css("max-height",
        0.95 * (body_height - panel_heading_height - panel_heading_padding));

    var $right_panel_container = $("#right_panel_container");
    $right_panel_container.BootSideMenu({side:"right", autoClose:true}, "subscription");
    $right_panel_container.css("margin-top", $("#navigation").height() + 2);
}


function setup_tool_tips() {
    $(function () {
        $('[data-toggle="tooltip"]').tooltip()
    });
}


function setup_subscribe_button() {
    $("#subscribe").on('click', function () {
        if (chosen_marker == null && chosen_region == null) {
            if (!document.getElementById("chosen_warning"))
                $("#input_group_container").append('<h5><p id="chosen_warning" class="text-danger">Please select a POI or draw a region before subscribe.</p></h5>');
        }
        else {
            if (document.getElementById("chosen_warning")) {
                $("#chosen_warning").remove();
            }

            //add_subscription();

            var keywords = $.trim($("#keywords").val()).replace(/  +/g, ' ').split(' ');
            var query = {
                'lat': chosen_marker.position.lat(),
                'lng': chosen_marker.position.lng(),
                'radius': null,
                'keywords': keywords
            };

            submit_query(query);
        }
    });
}