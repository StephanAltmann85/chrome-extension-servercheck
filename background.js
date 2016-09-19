//TODO:
//notifictation

var interval = parseInt(localStorage.getItem("interval"));

function getReq() {
    var req = false;
    if(window.XMLHttpRequest) {
        try {
            req = new XMLHttpRequest();
        } catch(e) {
            req = false;
        }
    } else if(window.ActiveXObject) {
        try {
            req = new ActiveXObject("Microsoft.XMLHTTP");
        } catch(e) {
            req = false;
        }
    }
    if (! req) {
        alert("Your browser does not support XMLHttpRequest.");
    }
    return req;
}

function getStatus()
{
    //get elements
    if(localStorage.getItem("elements")) {
        var elements = JSON.parse(localStorage.getItem("elements"));

        if(!elements || !elements.elements || !Array.isArray(elements.elements)) elements = { elements: []};
    }
    else var elements = { elements: []};

    elements.elements.forEach(function(element, index) {
        var xhr = getReq();

        xhr.open("GET", element.name, true);
        xhr.timeout = 5000;
        xhr.onload = function (e)
        {
            if(xhr.readyState === 4 && xhr.status && xhr.status >= 200 && xhr.status <= 300)
            {
                //success
            }
            else
            {
                //output notification with status code
                console.error(xhr.status);
            }
        };
        xhr.onerror = function (e) {
            //output notification with status text
            console.error(xhr.statusText);
        };
        xhr.ontimeout = function (e) {
            //output notification with message timeout
            console.log('timeout');
        };
        xhr.send(null);
    });
}

//register alarm
if(!isNaN(interval) && interval >= 1) {
    getStatus();

    chrome.alarms.create("getStatus", {periodInMinutes: interval});
    chrome.alarms.onAlarm.addListener(function (alarm) {
        getStatus();
    });
}
