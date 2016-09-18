//TODO:
//add icon
//save elements
//load elements
//delete elements
//hide & show add form
//periodic checks
//notifictation
//styling

$(document).ready(function() {
    var elInterval = $( "#interval" );

    /* #########################
     ## initial data association
     ###########################  */
    elInterval.val(localStorage.getItem("interval"));

    /* #########################
     ## initial settings
     ###########################  */

    //deactivate keyboard input on numberfield
    $("[type='number']").on('keypress', function (evt) {
        evt.preventDefault();
    });

    /* #########################
     ## event section
     ###########################  */

    //add Element
    $( "#buttonSave" ).on('click', function() {

    });

    //store interval
    elInterval.on('change', function(event) {
        var val = parseInt($( this).val());

        if(!isNaN(val) && val >= 1)
        {
            //save
            localStorage.setItem("interval", val);
            chrome.extension.getBackgroundPage().window.location.reload(true);
        }
    });
});



