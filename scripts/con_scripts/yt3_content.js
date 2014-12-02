console.log('start content =', document.title === message);
    if (document.title === message) {
        console.log('yt3 here');
        var dl_link = document.getElementById("dl_link").children;
        for(var link in dl_link) {
            if (dl_link[link].style["cssText"] != "display: none;") {
                console.log(dl_link[link]);
                // window.open(dl_link[link].href);
                break;
            }
        }
}
// window.close();