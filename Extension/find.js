//find.js

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