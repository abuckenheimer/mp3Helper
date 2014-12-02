var backgroundPageConnection = chrome.runtime.connect({
    name: "content"
});

// backgroundPageConnection.postMessage('message' + currentPlayerObj[0].url);
backgroundPageConnection.onMessage.addListener(function (message, sender) {
    // Handle responses from the background page, if any
    console.log('start content =', document.title === message);
    if (document.title === message) {
        console.log('sc_inject');
        var title = document.getElementsByClassName('playbackTitle__link sc-truncate')[0].innerHTML;
        sender.postMessage(title);
    }
});