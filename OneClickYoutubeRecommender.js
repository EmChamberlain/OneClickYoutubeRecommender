// ==UserScript==
// @name        One Click Youtube Recommender
// @version     1.0
// @description Adds two links below each youtube video that will save you 3 clicks!
// @match       *://www.youtube.com/*
// @run-at      document-end
// @require     https://cdn.jsdelivr.net/npm/jquery@3.5.1/dist/jquery.min.js
// ==/UserScript==
function alreadyWatched(cell) {
    var closest = cell.find("ytd-menu-renderer.style-scope.ytd-rich-grid-media");
    closest.find("button.style-scope.yt-icon-button").click();
    setTimeout(function(){
        $("yt-formatted-string:contains('Not interested')").click();
    }, 25);
    setTimeout(function(){
        $("yt-formatted-string:contains('I've already watched the video')").click();
    }, 25);
    setTimeout(function(){
        $("ytd-button-renderer#submit").click();
    }, 25);
};

function notInterested(cell) {
    var closest = cell.closest("ytd-rich-item-renderer");
    closest.find("button.style-scope.yt-icon-button").click();
    setTimeout(function(){
        $("yt-formatted-string:contains('Not interested')").click();
    }, 25);
    setTimeout(function(){
        $("yt-formatted-string:contains('I don't like the video')").click();
    }, 25);
    setTimeout(function(){
        $("ytd-button-renderer#submit").click();
    }, 25);
};

(function() {
    'use strict';
    if (/youtube\.com\/?$/.test(location.href)) {
        console.log("Found Home Page");

        setInterval((function () {
            let cells = $("ytd-rich-item-renderer.style-scope.ytd-rich-grid-row:not(.added-already)");
            if(cells.length == 0) {
                console.log("Can't find any rows.");
            }
            cells.each(function(){
                let cell = $(this);
                let metadataContainer = cell.find("div.style-scope.ytd-video-meta-block#metadata");
                var linkAlreadyWatched = document.createElement("a");
                linkAlreadyWatched.href = "#";
                linkAlreadyWatched.textContent = "Already watched";
                linkAlreadyWatched.style.fontSize = "20px";
                linkAlreadyWatched.style.textDecoration = "none";
                linkAlreadyWatched.style.textDecorationColor = "#007bff";
                linkAlreadyWatched.addEventListener("click", function(event) {
                    event.preventDefault();
                    alreadyWatched(cell);
                });
                metadataContainer.append(linkAlreadyWatched);

                var linkNotInterested = document.createElement("a");
                linkNotInterested.href = "#";
                linkNotInterested.textContent = "Not interested";
                linkNotInterested.style.fontSize = "20px";
                linkNotInterested.style.textDecoration = "none";
                linkNotInterested.style.textDecorationColor = "#007bff";
                linkNotInterested.addEventListener("click", function(event) {
                    event.preventDefault();
                    notInterested(cell);
                });
                metadataContainer.append(linkNotInterested);

            });
            cells.addClass("added-already");
        }), 2000);
    }
})();
