//background.js
//not sure if this needs to receive a message since not persistent

chrome.omnibox.onInputStarted.addListener(function(){
    alert("hello");
});