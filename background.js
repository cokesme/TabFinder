//background.js
//not sure if this needs to receive a message since not persistent
//since the omnibox changes this tabs url, we need to keep track  of it
//when searching from box, remove


//helper function because concat does not do what I think it should do
chrome.omnibox.onInputStarted.addListener(function(){
    var all_tabs = [];
    var current_tab = {};
    chrome.tabs.query({currentWindow:true, active:true}, function(tabs){
        current_tab = tabs[0];
        //alert(tabs[0].url);
    });
    chrome.tabs.query({currentWindow:true},function(tabs){
        all_tabs = all_tabs.concat(tabs);
    });
    chrome.tabs.query({currentWindow:false}, function(tabs){
        all_tabs = all_tabs.concat(tabs);
    });
    chrome.omnibox.onInputEntered.addListener(function(text,disposition){
        var len = text.length;
        for(var i = 0; i<all_tabs.length;i++){
            var check = all_tabs[i].url;
            for(var j = 0; j<=check.length-(len-1); j++){
                if(check.substr(j, len) == text){
                    //move to this tab
                    chrome.windows.update(all_tabs[i].windowId,{focused:true});
                    chrome.tabs.update(all_tabs[i].id,{active:true});
                }
            }
        }
    });
});
