var selectors = {
    "hypem": {
        "matches": ["http://hypem.com/*"],
        "name": "hypem",
        "authSelector": function(){ return $('#player-nowplaying a')[0].innerHTML;},
        "trackSelector": function(){ return $('#player-nowplaying a')[1].innerHTML;}
    },
    "soundcloud": {
        "matches": ["http://soundcloud.com/*", "https://soundcloud.com/*"],
        "name": "soundcloud",
        "authSelector": function(){
            var title = $('title')[0].innerHTML;
            if (title.split(' - ').length > 1) {
                return title.split(' - ')[0];
            }
            return title.split(' by ')[1];
        },
        "trackSelector": function(){
            var title = $('title')[0].innerHTML;
            if (title.split(' - ').length > 1) {
                return title.split(' - ')[1].split(' by ')[0];
            }
            return title.split(' by ')[0];
        }
    },
    "8tracks": {
        "matches": ["http://8tracks.com/*"],
        "name": "8tracks",
        "authSelector": function(){return $(".now_playing .title_artist span")[1].innerHTML;},
        "trackSelector": function(){return $(".now_playing .title_artist span")[0].innerHTML;}
    }
}