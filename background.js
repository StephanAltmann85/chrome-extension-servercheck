var interval = parseInt(localStorage.getItem("interval"));

function getStatus()
{
    console.log(interval);
}

//register alarm
if(!isNaN(interval) && interval >= 1) {
    chrome.alarms.create("getStatus", {periodInMinutes: interval});
    chrome.alarms.onAlarm.addListener(function (alarm) {
        getStatus();
    });
}
