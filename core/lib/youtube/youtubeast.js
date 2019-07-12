import { settings } from '../../helpers/settings.js';
import YTParser from './parsing.js';
import { pauseVideo } from './helpers.js';

function urlToProtocolRaw(url) {
    if (YTParser.isYoutube(url)) {

        if (YTParser.hasPlaylist(url) !== null) { // Is a playlist
            if (YTParser.hasVideo(url) !== null) { // Is a playlist with a video
                if (YTParser.hasTimestamp(url) !== null) { // Is a playlist with a video and a timestamp
                    console.info('Playlist, video and timestamp detected. Will use protocol: ');
                    return `youtu.beast:PlayVideo?ID=${YTParser.hasVideo(url)}&PlaylistID=${YTParser.hasPlaylist(url)}&Position=${YTParser.hasTimestamp(url)}`;
                } else {
                    console.info('Playlist and video detected. Will use protocol: ');
                    return `youtu.beast:PlayVideo?ID=${YTParser.hasVideo(url)}&PlaylistID=${YTParser.hasPlaylist(url)}`;
                }
            } else { // Is just a playlist with no video
                console.info('Playlist detected. Will use protocol: ');
                return `youtu.beast:Playlist?ID=${YTParser.hasPlaylist(url)}`;
            }
        } else if (YTParser.hasVideo(url) !== null) { // Is a video
            if (YTParser.hasTimestamp(url) !== null) { // Is a video with a timestamp
                console.info('Video and timestamp detected. Will use protocol:');
                return `youtu.beast:PlayVideo?ID=${YTParser.hasVideo(url)}&Position=${YTParser.hasTimestamp(url)}`;
            } else {
                console.info('Video detected. Will use protocol: \n ');
                return `youtu.beast:PlayVideo?ID=${YTParser.hasVideo(url)}`;
            }
        } else if (YTParser.hasChannel(url) !== null) { // Is a channel
            console.info('Channel detected. Will use protocol: ');
            return `youtu.beast:Channel?ID=${YTParser.hasChannel(url)}`;
        }
    }

    if (YTParser.isHomepage(url)) {
        return "youtu.beast:"
    }
    return;
}

function getProtocolFromUrl(url, tabId) {
    let protocol = urlToProtocolRaw(url);
    if (protocol) console.log(protocol);
    return protocol;
}

function postLaunch(tabId) {
    if (settings.platforms.YouTube.closeOnSwitch == false && tabId != undefined) {
        pauseVideo(tabId);
    }
}

export default {
    name: "Youtubeast",
    parseUrl: getProtocolFromUrl,
    postLaunch: postLaunch,
    config: {
        logo: "https://res.cloudinary.com/dfbht6vj9/image/upload/v1562960997/Logo_225_rbe0nf.png",
        icon: "https://res.cloudinary.com/dfbht6vj9/image/upload/v1562960997/icon_48_faqsgu.png",
        color: "#303030",
        appProtocol: "youtu.beast"
    }
};