var backgroundPageConnection = chrome.runtime.connect({
    name: "content"
});

// backgroundPageConnection.postMessage('message' + currentPlayerObj[0].url);
backgroundPageConnection.onMessage.addListener(function (message, sender) {
    // Handle responses from the background page, if any
    console.log('start content =', document.title === message);
    if (document.title === message) {
        var player = document.getElementById('player-nowplaying');
        var artist = player.childNodes[0].innerHTML;
        var track = player.childNodes[2].innerHTML;
        sender.postMessage(artist + '-' + track);
    }
});