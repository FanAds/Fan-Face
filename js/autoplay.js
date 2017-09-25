document.addEventListener("DOMContentLoaded", function(event) {
    var nativeVideos = document.querySelector('.medium-editor-element .video video');
    var nativeVideos2 = document.querySelector('.medium-editor-element .medium-insert-videos video');
    var youtubeIframe = document.querySelector('.medium-editor-element .yt.embed iframe');
    var youtubeIframe2 = document.querySelector('.medium-editor-element .video-youtube iframe');

    var executeYouTube = function(_iframe) {
        _iframe.src = _iframe.src + '?autoplay=1';
    }

    console.log(nativeVideos);

    if (youtubeIframe != null || youtubeIframe2 != null) {
        if (youtubeIframe !== null) {
            executeYouTube(youtubeIframe);
        } else {
            executeYouTube(youtubeIframe2);
        }
    } else if (nativeVideos !== null || nativeVideos2 !== null) {
        if(nativeVideos !== null) {
            nativeVideos.setAttribute('autoplay', 'true');
            nativeVideos.muted = true;
        } else {
            nativeVideos2.setAttribute('autoplay', 'true');
            nativeVideos2.muted = true;
        }
    }

});
