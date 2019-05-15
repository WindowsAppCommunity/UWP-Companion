function isSubreddit(url) {
    let match = url.match(/^http.?:\/\/(?:www\.)?reddit\.[a-z]{0,4}\/(r\/[a-zA-Z0-9]+)\/?(.*)/);
    return (match && match[2] == "" && match[1]) ? match[1] : undefined;
}

export default {
    isSubreddit
}