/**
 * @param {string} url Reddit url to match against
 * @returns {string} Subreddit name, if any
 */
function isSubreddit(url) {
    let match = url.match(/^http.?:\/\/(?:www\.)?reddit\.[a-z]{0,4}\/(r\/[a-zA-Z0-9]+)\/?(.*)/);
    return (match && match[2] == "" && match[1]) ? match[1] : undefined;
}

/**
 * @param {string} url Reddit url to match against
 * @returns {string} Username, if any
 */
function isUser(url) {
    let match = url.match(/^http.?:\/\/(?:www\.)?reddit\.[a-z]{0,4}\/user\/([a-zA-Z0-9]+)\/?(.*)/);
    return (match && match[1]) ? match[1] : undefined;
}

/**
 * @param {string} url Reddit url to match against
 * @returns {string} Post id, if any 
 */
function isPost(url) {
    let match = url.match(/^http.?:\/\/(?:www\.)?reddit\.[a-z]{0,4}\/r\/[a-zA-Z0-9]+\/comments\/([a-zA-Z0-9]+)\/?/);
    return (match && match[1]) ? match[1] : undefined;
}

/**
 * @param {string} url Reddit url to match against
 * @returns {boolean} Boolean
 */
function isReddit(url) {
    let match = url.match(/^http.?:\/\/(?:www\.)?(reddit\.[a-z]{0,4})/);
    return (match && match[1]) ? true : false;
}

/**
 * @param {string} url Reddit url to match against
 * @returns Array containing [username, subreddit] 
 */
function isMultireddit(url) {
    let match = url.match(/^http.?:\/\/(?:www\.)?reddit\.[a-z]{0,4}\/user\/([a-zA-Z0-9]+)\/?\/m\/(.*)/);
    return (match && match[1] && match[2]) ? [match[1], match[2]] : undefined;
}

export default {
    isSubreddit, isUser, isPost, isReddit, isMultireddit
}