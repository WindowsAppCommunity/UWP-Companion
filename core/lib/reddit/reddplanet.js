import { containsBlacklistedKeyword } from '../../helpers/misc.js';
import RedditParser from './parsing.js';

let blacklistedUrlKeywords = ["api", ".js"];
export default {
    config: {
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