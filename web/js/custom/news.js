function display_geoObjects(geoObjects) {
    $.each(geoObjects, function (index, geoObject) {
        add_news(geoObject);
    });
}



function add_news(geoObject) {
    var new_news_code = '';
    new_news_code += '<li class="media">';
    new_news_code += '<div class="media-left"> ';
    new_news_code += '<a id="" href="#">';
    new_news_code += '<img class="media-object subscribed_poi" src="./pics/news.png" alt="">';
    new_news_code += '</a> </div>';
    new_news_code += '<div class="media-body"> <h4 class="media-heading">Anonymous user@xxx</h4>';
    new_news_code += '<h5>17:34 14/07/2016</h5>';
    new_news_code += '<h5>' + geoObject.review + '</h5>';
    new_news_code += '</div> </li>';

    $("#news_list").append(new_news_code);
}