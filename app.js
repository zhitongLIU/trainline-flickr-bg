$(document).ready( function() {
  //first one is the one we need
  var keyword = "europe";

  var xhr = new XMLHttpRequest();
  xhr.open("GET", "https://api.flickr.com/services/feeds/photos_public.gne?tags=europe&tagmode=any&format=json&_=1505690276918", true);
  xhr.onreadystatechange = function() {
        if (xhr.readyState == 4) {
          var resp = xhr.responseText.replace('jsonFlickrFeed(', '');
          resp = resp.slice(0, -1);
          var data = JSON.parse(resp);
          var rnd = Math.floor(Math.random() * data.items.length);
          var image_src = data.items[rnd]['media']['m'].replace("_m", "_b");
          var panel = document.getElementsByClassName('hero-panel')[0];
          $('.hero-panel').css('background-image', "url('" + image_src + "')");
        }
  }
  xhr.send();
});
