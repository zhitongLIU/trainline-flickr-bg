var interval = 5000;
var base_url = "https://api.flickr.com/services/feeds/photos_public.gne?tagmode=any&format=json&tags=";
var keyword = "europe";
var element_identifier = ".hero-panel";
var need_to_reload = false;
var panel;

$(document).ready( function() {
  // add event listener
	chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
     if (request.keyword !== undefined && request.keyword !== "" ) {
       keyword = request.keyword;
       need_to_reload = true;
     }
     if (request.element_identifier !== undefined && request.element_identifier !== "" ) {
       element_identifier = request.element_identifier;
     }
     if (request.interval !== undefined && request.interval !== "" ) {
       interval = request.interval;
     }
  });

  // use get class because of trainline use class for hero-panel
  loop_random_image();
});

function loop_random_image() {
  need_to_reload = false;
  var xhr = new XMLHttpRequest();
  var url = base_url + keyword;
  xhr.open("GET", url, true);
  xhr.onreadystatechange = function() {
     if (xhr.readyState == 4) {
       var resp = clean_json_response(xhr.responseText);
       var data = JSON.parse(resp);
       loop_change_bg(data);
     }
  };
  xhr.send();
}

function clean_json_response(res) {
  res = res.replace("jsonFlickrFeed(", "");
  res = res.replace(/\uFFFD/g, "");
  res = res.slice(0, -1);
  return res;
}

function change_bg_image(image_src) {
  if(element_identifier[0] === "\.") {
    panel = document.getElementsByClassName(element_identifier.replace("\.", ""))[0];
  } else {
    panel = document.getElementById(element_identifier);
  }
  if (panel != null) {
    $(element_identifier).css("background-image", "url('" + image_src + "')");
  }
}

function loop_change_bg(data) {
  var rnd, image_src;
  setTimeout(function () {
    rnd = Math.floor(Math.random() * data.items.length);
    image_src = data.items[rnd].media.m.replace("_m", "_b");
    change_bg_image(image_src);
    if (need_to_reload) {
      loop_random_image();
    }
    else {
      loop_change_bg(data);
    }
  }, interval);
}
