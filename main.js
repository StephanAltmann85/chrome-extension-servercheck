$(document).ready(function() {
    var elTimeoutInterval = $( "#timeoutInterval" );
    var elInterval = $( "#interval" );
    var elListElements = $( "#listElements" );
    var elOptionsMainLabel = $("#options");
    var elOptionsUnit = $("#optionsUnit");
    var elTimeoutUnit = $("#timeoutUnit");
    var elIntervalLabel = $("#intervalLabel");
    var elTimeoutLabel = $("#timeoutLabel");

    /* #########################
     ## get translations
     ###########################  */
    elOptionsMainLabel.html(chrome.i18n.getMessage("optionsMainLabel"));
    elOptionsUnit.html(chrome.i18n.getMessage("optionsUnit"));
    elIntervalLabel.html(chrome.i18n.getMessage("intervalLabel"));
    elTimeoutLabel.html(chrome.i18n.getMessage("timeoutLabel"));
    elTimeoutUnit.html(chrome.i18n.getMessage("optionsTimeout"));

    /* #########################
     ## initial data association
     ###########################  */
    elInterval.val(localStorage.getItem("interval"));
    elTimeoutInterval.val(localStorage.getItem("timeout"));
    if(localStorage.getItem("elements")) {
        var elements = JSON.parse(localStorage.getItem("elements"));

        if(!elements || !elements.elements || !Array.isArray(elements.elements)) elements = { elements: []};
    }
    else var elements = { elements: []};

    function getList(elements)
    {
        //clear list
        elListElements.empty();

        //draw elements
        elements.elements.forEach(function(element, index) {
            var child = document.createElement( "div" );
            child.id = "element-" + index;
            if(index % 2 == 0) child.className = "even";
            else child.className = "odd";
            child.innerHTML = element.name;

            var linkDel = document.createElement( "span" );
            linkDel.id = "element-del-" + index;
            linkDel.innerHTML = "x";

            child.appendChild(linkDel);
            elListElements.append(child);
        });
    }

    getList(elements);

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
            elements.elements.push({name: elementName});
            localStorage.setItem("elements", JSON.stringify(elements));

            getList(elements);
            chrome.extension.getBackgroundPage().window.location.reload(true);
        }
    });

    //delete element
    $( document ).on('click', "[id^=element-del-]", function(e) {
        var id = $(this).attr("id").replace('element-del-','');

        elements.elements.splice(id, 1);
        localStorage.setItem("elements", JSON.stringify(elements));

        getList(elements);
        chrome.extension.getBackgroundPage().window.location.reload(true);
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

    //store timeout interval
    elTimeoutInterval.on('change', function(event) {
        var val = parseInt($( this).val());

        if(!isNaN(val) && val >= 1)
        {
            //save interval option & reload background task
            localStorage.setItem("timeout", val);
            chrome.extension.getBackgroundPage().window.location.reload(true);
        }
    });
});



