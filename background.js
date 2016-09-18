function getStatus()
{
    console.log('test');
}

//register alarm
chrome.alarms.create("getStatus", {periodInMinutes:1});
chrome.alarms.onAlarm.addListener(function(alarm){
    getStatus();
});
