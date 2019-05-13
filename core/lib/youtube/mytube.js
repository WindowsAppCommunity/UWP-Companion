import { settings } from '../../helpers/settings.js';
import YTParser from './parsing.js';

function urlToProtocolRaw(url) {
    if (YTParser.hasPlaylist(url) !== null) { // Is a playlist
        if (YTParser.hasVideo(url) !== null) { // Is a playlist with a video
            if (YTParser.hasTimestamp(url) !== null) { // Is a playlist with a video and a timestamp
                console.info('Playlist, video and timestamp detected. Will use protocol: ');
                return `rykentube:PlayVideo?ID=${YTParser.hasVideo(url)}&PlaylistID=${YTParser.hasPlaylist(url)}&Position=${YTParser.hasTimestamp(url)}`;
            } else {
                console.info('Playlist and video detected. Will use protocol: ');
                return `rykentube:PlayVideo?ID=${YTParser.hasVideo(url)}&PlaylistID=${YTParser.hasPlaylist(url)}`;
            }
        } else { // Is just a playlist with no video
            console.info('Playlist detected. Will use protocol: ');
            return `rykentube:Playlist?ID=${YTParser.hasPlaylist(url)}`;
        }
    } else if (YTParser.hasVideo(url) !== null) { // Is a video
        if (YTParser.hasTimestamp(url) !== null) { // Is a video with a timestamp
            console.info('Video and timestamp detected. Will use protocol:');
            return `rykentube:PlayVideo?ID=${YTParser.hasVideo(url)}&Position=${YTParser.hasTimestamp(url)}`;
        } else {
            console.info('Video detected. Will use protocol: \n ');
            return `rykentube:PlayVideo?ID=${YTParser.hasVideo(url)}`;
        }
    } else if (YTParser.hasChannel(url) !== null) { // Is a channel
        console.info('Channel detected. Will use protocol: ');
        return `rykentube:Channel?ID=${YTParser.hasChannel(url)}`;
    } else if(YTParser.isYoutube(url)) {
        return "rykentube:"
    } else {
        return undefined
    }
}

function getProtocolFromUrl(url, tabId) {
    let protocol = urlToProtocolRaw(url);

    if (protocol != undefined) {
        console.log(protocol);
        console.log("Url: " + url);
        if (settings.platforms.YouTube.closeOnSwitch == false && tabId != undefined) {
            //pauseVideo(tabId);
        }
    }

    return protocol;
}

function postLaunch(tabId) {
    pauseVideo(tabId);
}

export default {
    name: "myTube",
    parseUrl: getProtocolFromUrl,
    postLaunch: postLaunch,
    config: {
        logo: "https://arlo.site/projects/community/logos/light-theme/myTube.png",
        color: "#303030"
    }
};

function pauseVideo(tabId) {
    chrome.tabs.executeScript(tabId, {
        // Confirm that the videos are playing and loaded before trying to pause it
        code: `
                function recursiveVideoCheck() {
                    document.querySelectorAll('video').forEach(vid => {
                        if(vid.currentTime > 0 && !vid.paused) {
                           vid.pause();
                        } else {
                            setTimeout(()=>{
                                recursiveVideoCheck();
                            }, 200);
                        }
                    });
                }
                window.addEventListener("load", function(event) { 
                    recursiveVideoCheck(); // For when it fires before the page is loaded
                });
                recursiveVideoCheck(); // For when it fires after the page is loaded
                `
    });
}