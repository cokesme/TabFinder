//background.js

function work(text){
    var all_tabs = [];
    var current_tab = {};
    var before = []; //added to help with splice
    chrome.tabs.query({currentWindow:true, active:true}, function(tabs){
        current_tab = tabs[0];
        //alert(current_tab.index);
        alert(tabs[0].url + ' ' + text);
        chrome.tabs.query({currentWindow:true},function(tabs){
            before = tabs.splice(0,current_tab.index)//grab before
            tabs.splice(0,1)//remove the current tab
            all_tabs = all_tabs.concat(tabs);

            chrome.tabs.query({currentWindow:false}, function(tabs){
                all_tabs = all_tabs.concat(tabs);
                all_tabs = all_tabs.concat(before);//adds the tabs before current to the end so we cycle through everything

                var len = text.length;
                for(var i = 0; i<all_tabs.length;i++){
                    var check = all_tabs[i].url;
                    for(var j = 0; j<=check.length-(len-1); j++){
                        if(check.substr(j, len) == text){
                            chrome.windows.update(all_tabs[i].windowId,{focused:true});
                            chrome.tabs.update(all_tabs[i].id,{active:true});
                            return;
                        }
                    }
                }
            });
        });
    });
}

chrome.omnibox.onInputEntered.addListener(function(text,disposition){
    work(text);
});


//receive message from find.js

chrome.runtime.onMessage.addListener(function(message, sender, sendResponse){
   work(message.value);
});
