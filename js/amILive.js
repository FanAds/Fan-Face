var fanStories = {};

fanStories.http = {};

fanStories.http.get = function (url, data, onsuccess, onerror) {
    var params = [];
    Object.keys(data).forEach(function(key) {
        params.push(key + "=" + encodeURIComponent(data[key]));
    });

    var xhr = new XMLHttpRequest();

    xhr.addEventListener("readystatechange", function() {
        if (this.readyState === 4) {
            if (this.status == 200) {
                onsuccess(this);
            } else {
                onerror(this);
            }
        }
    });

    xhr.open("GET", url + "?" + params.join('&'));

    xhr.send();
}
var pageId = document.head.querySelector("meta[property='fb:pages']").content;
var params = {};

if(pageId != null && pageId != undefined) {
    params.page_id = pageId;

    var userAgent = navigator.userAgent || navigator.vendor || window.opera;
    if(userAgent.match( /iPad/i ) || userAgent.match( /iPhone/i ) || userAgent.match( /iPod/i )) {
        params.is_ios = 1;
    } else {
        params.is_ios = 0;
    }

    document.addEventListener("DOMContentLoaded", function(event) {
        fanStories.http.get("https://fbfanads.com/fanads-backend/pages/live/getStreamKeyForViewers.php", params, function(response) {
            var amILiveWrapper = document.getElementsByClassName('am-i-live-wrapper')[0];
            amILiveWrapper.classList.remove("fs-hide");
            var amILive = document.getElementById("am-i-live");
            amILive.innerHTML = "<p>I'm live now! Watch me <a href='/live'>here</a></p>";
            }, function(response) {

            });
    });
}