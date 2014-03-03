//background.js
//not sure if this needs to receive a message since not persistent
//since the omnibox changes this tabs url, we need to keep track  of it
//when searching from box, remove


//no longer checks the only the current tab and stops after it hits name
//will only oscillate
//search forward from current position to fix
//have some seen property

//use index but can get stuck on a window

chrome.omnibox.onInputStarted.addListener(function(){
    var all_tabs = [];
    var current_tab = {};
    var before = []; //added to help with splice
    chrome.tabs.query({currentWindow:true, active:true}, function(tabs){
        current_tab = tabs[0];
        //alert(current_tab.index);
        //alert(tabs[0].url);
    });
    chrome.tabs.query({currentWindow:true},function(tabs){
        before = tabs.splice(0,current_tab.index)//grab before
        tabs.splice(0,1)//remove the current tab
        all_tabs = all_tabs.concat(tabs);
    });
    chrome.tabs.query({currentWindow:false}, function(tabs){
        all_tabs = all_tabs.concat(tabs);
        all_tabs = all_tabs.concat(before);//adds the tabs before current to the end so we cycle through everything
    });
    chrome.omnibox.onInputEntered.addListener(function(text,disposition){
        var len = text.length;
        for(var i = 0; i<all_tabs.length;i++){
            var check = all_tabs[i].url;
            for(var j = 0; j<=check.length-(len-1); j++){
                if(check.substr(j, len) == text){
                    //move to this tab
                    //alert(current_tab.url);
                    //if(all_tabs[i].id != current_tab.id){
                        chrome.windows.update(all_tabs[i].windowId,{focused:true});
                        chrome.tabs.update(all_tabs[i].id,{active:true});
                        return;
                    //}
                }
            }
        }
    });
});
