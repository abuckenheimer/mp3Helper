backgroundPageConnection.onMessage.addListener(function(message, sender) {
    var contents = document.getElementsByClassName('col-small-left');
    contents = contents[0].childNodes[1].childNodes[3].children;
    links = [];
    save = false;
    console.log('here');
    for (var li in contents) {
        if (save) {
            if (li.innerHTML === "Study Tools") {
                break;
            }
            links.push((li.firstChild.innertText, li.firstChild.href));
        }
        else if (li.innerHTML === "Summary &amp; Analysis") {
            save = true;
        }
    }
    console.log(links);
    
    // el = document.getElementById('section');
    // str = '';

    // for (var child in el.childNodes) {
    //     if (child.tagName === 'H4' || child.tagName === 'p') {
    //         str += child.innerHTML + '\n';
    //     }
    // }

    // sender.postMessage(str);
}