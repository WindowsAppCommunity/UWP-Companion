import { settings } from '../../helpers/settings.js';
import YTParser from './parsing.js';
import { pauseVideo } from './helpers.js';

function urlToProtocolRaw(url) {
    if (YTParser.hasVideo(url) !== null) { // Is a video
        console.info('Video detected. Will use protocol: \n ');
        return `youtu.beast:PlayVideo?ID=${YTParser.hasVideo(url)}`;
    }

    if (YTParser.isHomepage(url)) {
        return "youtu.beast:"
    }
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
        color: "#302d2d",
        appProtocol: "youtu.beast"
    }
};