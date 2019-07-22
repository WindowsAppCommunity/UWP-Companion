import { containsBlacklistedKeyword } from '../../helpers/misc.js';
import RedditParser from './parsing.js';

let blacklistedUrlKeywords = ["api", ".js"];
export default {
    config: {
        logo: "https://store-images.s-microsoft.com/image/apps.22759.13510798887562716.38d66c3a-5954-407b-9cdd-af0b9426f21b.8f4b3033-db98-405c-9011-8b18961699cb?mode=scale&q=90&h=500&w=500&background=%23FF4500",
        icon: "https://store-images.s-microsoft.com/image/apps.22759.13510798887562716.38d66c3a-5954-407b-9cdd-af0b9426f21b.8f4b3033-db98-405c-9011-8b18961699cb?mode=scale&q=90&h=48&w=48&background=%23FF4500",
        color: "#FF4500",
        appProtocol: "reddplanet"
    },
    name: "Reddplanet",
    parseUrl: function(url) {
        if (containsBlacklistedKeyword(url, blacklistedUrlKeywords)) return;
        
        if (RedditParser.isSubreddit(url) || RedditParser.isPost(url)) {
            return ("reddplanet://" + url.replace(/https?:\/\//, ""));
        }
        
    }
}