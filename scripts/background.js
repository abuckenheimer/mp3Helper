resources = {};

function saveResource(details) {
    console.log('Found Song:', details);
    if (!(details.url in resources)) {
        resources[details.url] = ["","",details.url];
        chrome.tabs.sendMessage(details.tabId, "", function(resp) {
            console.log('Saving Song Info"', resp);
            resources[details.url] = resp.concat(details.url);
        });
    }
}
filter = {urls: ["http://*/*.mp3*","https://*/*.mp3*"]};
e_opts = [];

chrome.webRequest.onBeforeRequest.addListener(saveResource, filter, e_opts);



chrome.runtime.onConnect.addListener(function(dlPage) {
    dlPage.onMessage.addListener(function (confirm, sender) {
        console.log('confirming:',confirm);
        for (var key in confirm) {
            delete resources[confirm[key]];
        }
    });
    var dataset = [];
    for (var key in resources) {
        if (resources.hasOwnProperty(key)) {
            dataset.unshift(resources[key]);
        }
    }
    console.log("Sending dl dataset", dataset);
    dlPage.postMessage(dataset);
});

