//find.js
//may need something about overriding tabs

//?? Grab all windows and should have all tab info
//only grabs tabs from current window now
//want to do async search while typing, but tab window closes :P


//? fire events in js
//originally had the submit button being grabbed

//changing html to be type seach so we can use search event "enter"

//windowId: chrome.windows.WINDOW_ID_CURRENT

//random hacks and fun for now

//does the custom even break the shit

//should I just have to listeners

//it is still cool to see

//what is the object in customevent

//make sure we aren't checking current tab, maybe need the background script to keep track of that
//need the background script for cycling or use other storage to keep track of the most recently visited tab

window.onload=
    function(){
        //grab the two elements that matter

        var submit = document.getElementById("submit");
        var find = document.getElementById("find");

        //go straight to the search box
        find.focus();

        //create event if firing from enter or just have to eventlisteners and pre-built function
        var submit_event = new CustomEvent("click", {});


        //if they click the select button, should I just include the function in something called search and then
        submit.addEventListener("click", function(e){
            //var input = this;//document.getElementById("find");
            var string = find.value;
            var first = string[0];
            var len = string.length;
            chrome.tabs.query({currentWindow: true},function(tabs){
                for(var i = 0; i<tabs.length;i++){
                    var check = tabs[i].url;
                    for(var j = 0; j<=check.length-(len-1); j++){
                        if(check.substr(j, len) == string){
                            //move to this tab
                            chrome.windows.update(tabs[i].windowId,{focused:true});
                            chrome.tabs.update(tabs[i].id,{active:true});
                            return;
                        }
                    }
                }
                chrome.tabs.query({currentWindow: false},function(tabs){
                    for(var i = 0; i<tabs.length;i++){
                        var check = tabs[i].url;
                        for(var j = 0; j<=check.length-(len-1); j++){
                            if(check.substr(j, len) == string){
                                //move to this tab
                                chrome.windows.update(tabs[i].windowId,{focused:true});
                                chrome.tabs.update(tabs[i].id,{active:true});
                            }
                        }
                    }
                });
            });
        });

        //event listener for the enter button
        find.addEventListener("search", function(e){
                submit.dispatchEvent(submit_event);
            });
    };