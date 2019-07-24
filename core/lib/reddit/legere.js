import RedditParser from './parsing.js';

export default {
    config: {
        logo: "https://arlo.site/projects/UWPCompanion/logos/clients/Legere.png",
        icon: "https://arlo.site/projects/UWPCompanion/icons/clients/Legere.png",
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