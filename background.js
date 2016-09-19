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

    //get relevant options
    var timeout = localStorage.getItem("timeout");
    if(!isNaN(timeout) && timeout >= 1) timeout = timeout * 1000;
    else timeout = 5000;

    elements.elements.forEach(function(element, index) {
        var xhr = getReq();

        xhr.open("GET", element.name, true);
        xhr.timeout = timeout;
        xhr.onload = function (e)
        {
            if(xhr.readyState === 4 && xhr.status && xhr.status >= 200 && xhr.status <= 300)
            {
                //used for debug
            }
            else
            {
                chrome.notifications.create(element.name, {
                    type: 'basic',
                    title: element.name,
                    iconUrl: "error.png",
                    message: chrome.i18n.getMessage("errorStatus") + xhr.status
                }, function(notificationId) {});
            }
        };
        xhr.onerror = function (e) {
            chrome.notifications.create(element.name, {
                type: 'basic',
                title: element.name,
                iconUrl: "error.png",
                message: chrome.i18n.getMessage("errorUndefined") + xhr.statusText
            }, function(notificationId) {});
        };
        xhr.ontimeout = function (e) {
            //output notification with message timeout
            chrome.notifications.create(element.name, {
                type: 'basic',
                title: element.name,
                iconUrl: "error.png",
                message: chrome.i18n.getMessage("errorTimeout") + xhr.timeout + 'ms'
            }, function(notificationId) {});
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
