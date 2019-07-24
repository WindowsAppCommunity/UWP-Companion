import RedditParser from './parsing.js';

export default {
    config: {
        logo: "assets/logos/clients/Legere.png",
        icon: "assets/icons/clients/Legere.png",
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