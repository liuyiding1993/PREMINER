var subscription_num = 0;
var subscrbed_markers = {};


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
        body_height - query_panel_height - panel_heading_height - panel_heading_padding - subscription_panel_body_padding);
    var $left_panel_container = $("#left_panel_container");
    $left_panel_container.BootSideMenu({side:"left", autoClose:false}, "poi");
    $left_panel_container.css("margin-top", $("#navigation").height());
}


function init_right_panel() {
    var $right_panel_container = $("#right_panel_container");
    $right_panel_container.BootSideMenu({side:"right", autoClose:true}, "subscription");
    $right_panel_container.css("margin-top", $("#navigation").height());
}


function setup_tool_tips() {
    $(function () {
        $('[data-toggle="tooltip"]').tooltip()
    });
}


function setup_subscribe_button() {
    $("#subscribe").on('click', add_subscription);
}