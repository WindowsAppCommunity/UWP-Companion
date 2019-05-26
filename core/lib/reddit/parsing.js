function isSubreddit(url) {
    let match = url.match(/^http.?:\/\/(?:www\.)?reddit\.[a-z]{0,4}\/(r\/[a-zA-Z0-9]+)\/?(.*)/);
    return (match && match[2] == "" && match[1]) ? match[1] : undefined;
}

function isUser(url) {
    let match = url.match(/^http.?:\/\/(?:www\.)?reddit\.[a-z]{0,4}\/user\/([a-zA-Z0-9]+)\/?(.*)/);
    return (match && match[1]) ? match[1] : undefined;
}

function isPost(url) {
    let match = url.match(/^http.?:\/\/(?:www\.)?reddit\.[a-z]{0,4}\/r\/[a-zA-Z0-9]+\/comments\/([a-zA-Z0-9]+)\/?/);
    return (match && match[1]) ? match[1] : undefined;
}

function isReddit(url) {
    if (typeof url == 'string') {
        let match = url.match(/^http.?:\/\/(?:www\.)?(reddit\.[a-z]{0,4})/);
        return (match && match[1]) ? true : false;
    } else console.error('Incorrect data recieved while checking domain');
}
// Todo: Multireddit
export default {
    isSubreddit, isUser, isPost, isReddit
}