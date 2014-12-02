console.log("Injected");
var selector = {
    "name": "blank",
    "authSelector": function(){ return "";},
    "trackSelector": function(){ return $('title')[0].innerHTML;}
}

chrome.runtime.onMessage.addListener(function(message, bPage, sendResponse) {

    if (selector.name !== "blank") {
        console.log('Using Cached:', selector);
        sendResponse([selector.trackSelector(), selector.authSelector()]);
        return;
    }

    var s = findSelector();
    if (s !== null) {
        selector = s
    }
    console.log("caching:", selector, message);
    sendResponse([selector.trackSelector(), selector.authSelector()]);

});


function findSelector() {
    for (var s in selectors) {
        for (var match in selectors[s].matches) {
            match = selectors[s].matches[match];
            var mt = RegExp(match.replace(/\//g,"\\/").replace("*",".*"));
            if (mt.test(location.href)) {return selectors[s];}
        }
    }
    return null;
}
