var interval = 5000;
var base_url = "https://api.flickr.com/services/feeds/photos_public.gne?tagmode=any&format=json&tags=";

$(document).ready( function() {
  var keyword = "europe";
  var element_identifier = '.hero-panel';
  loop_random_image(element_identifier, keyword);
});

function loop_random_image(element_identifier, keyword) {
  var xhr = new XMLHttpRequest();
  var url = base_url + keyword;
  xhr.open("GET", url, true);
  xhr.onreadystatechange = function() {
     if (xhr.readyState == 4) {
       var resp = clean_json_response(xhr.responseText);
       var data = JSON.parse(resp);
       loop_change_bg(element_identifier, data);
     }
  }
  xhr.send();
}

function clean_json_response(res) {
  res = res.replace('jsonFlickrFeed(', '');
  res = res.replace(/\uFFFD/g, '');
  res = res.slice(0, -1);
  return res;
}

function change_bg_image(element_identifier, image_src) {
  // use get class because of trainline use class for hero-panel
  var panel = document.getElementsByClassName(element_identifier.replace('\.', ''))[0];
  // $(element_identifier).css('transition', "background 1s linear");
  $(element_identifier).css('background-image', "url('" + image_src + "')");
}

function loop_change_bg(element_identifier, data) {
  var rnd, image_src;
  setTimeout(function () {
    rnd = Math.floor(Math.random() * data.items.length);
    image_src = data.items[rnd]['media']['m'].replace("_m", "_b");
    change_bg_image(element_identifier, image_src);
    loop_change_bg(element_identifier, data);
  }, interval);
}
