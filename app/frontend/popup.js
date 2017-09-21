document.addEventListener("DOMContentLoaded", documentEvents  , false);

function changeElementClass(input) {
  if(input.value !== "") {
    send_message({ element_identifier: input.value });
  }
}
function changeKeyword(input) {
  if(input.value !== "") {
    send_message({ keyword: input.value });
  }
}

function changeInterval(input) {
  if(input.value !== "") {
    send_message({ interval: input.value });
  }
}

function documentEvents() {
  document.getElementById("ok_btn1").addEventListener("click",
    function() { changeElementClass(document.getElementById("element_class"));
  });

  document.getElementById("ok_btn2").addEventListener("click",
    function() { changeKeyword(document.getElementById("keyword"));
  });

  document.getElementById("ok_btn3").addEventListener("click",
    function() { changeInterval(document.getElementById("interval"));
  });
}

function send_message(message_dic) {
  chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
    chrome.tabs.sendMessage(tabs[0].id, message_dic, function(response) {
    });
  });
}
