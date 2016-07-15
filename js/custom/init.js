$(document).ready(function(){
    init_body();
    init_left_panel();
    init_right_panel();
    setup_subscribe_button();
    setup_tool_tips();
});


function init_body() {
    $("body").css("padding-top", $("#navigation").height());
}
