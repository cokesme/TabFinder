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

        //talking to background js page
        submit.addEventListener("click", function(e){
            chrome.runtime.sendMessage({"value":find.value,"len":find.value.length});
        });

        //event listener for the enter button
        find.addEventListener("search", function(e){
                submit.dispatchEvent(submit_event);
            });
    };