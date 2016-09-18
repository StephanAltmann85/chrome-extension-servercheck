//TODO:
//add icon
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
    if(localStorage.getItem("elements")) var elements = JSON.parse(localStorage.getItem("elements"));
    else var elements = { elements: []};


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
        var elementName = $( "input[name=elementName]").val();

        if(elementName)
        {
            console.log(elements.elements);

            elements.elements.push({name: elementName});
            localStorage.setItem("elements", JSON.stringify(elements));

            //TODO: reload list
            chrome.extension.getBackgroundPage().window.location.reload(true);
        }
        console.log(elements);
    });

    //store interval
    elInterval.on('change', function(event) {
        var val = parseInt($( this).val());

        if(!isNaN(val) && val >= 1)
        {
            //save interval option & reload background task
            localStorage.setItem("interval", val);
            chrome.extension.getBackgroundPage().window.location.reload(true);
        }
    });
});



