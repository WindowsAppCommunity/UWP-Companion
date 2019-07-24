import RedditParser from './parsing.js';

export default {
    config: {
        color: "#FF4500",
        appProtocol: "legere"
    },
    name: "Legere",
    parseUrl: function(url) {
        if (RedditParser.isSubreddit(url) || RedditParser.isUser(url) || RedditParser.isPost(url) || RedditParser.isComment(url) || RedditParser.isMultireddit(url)) {
            return "legere://" + url.replace(/https?:\/\//, "");
        }
        return;
    }
}