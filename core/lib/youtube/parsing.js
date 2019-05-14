function isYoutube(url) {
    if (typeof url == 'string') {
        let match = url.match(/^http.*(youtube\.[a-z]{0,4})|^.*(youtu\.be)/);
        return (match && match[1]) ? true : false;
    } else console.error('Incorrect data recieved while checking domain');
}
function isHomepage(url) {
    if (typeof url == 'string') {
        let match = url.match(/^(?:^http.*youtube\.[a-z]{0,4}|^.*youtu\.be)\/(.+)/);
        // If it matches anything after "youtube.com/", it isn't the homepage 
        return (!match || match[1]) ? false : true;
    } else console.error('Incorrect data recieved while checking homepage');
}
function hasVideo(url) {
    if (typeof url == 'string') {
        let match = url.match(/^.*(?:[&|?]v=)([a-zA-Z0-9-_]{11})/);
        return (match && match[1]) ? match[1] : null;
    } else console.error('Incorrect data recieved while checking for video');
}
function hasPlaylist(url) {
    if (typeof url == 'string') {
        let match = url.match(/^.*(?:list=)([a-zA-Z0-9-_]+)/);
        return (match && match[1]) ? match[1] : null;
    } else console.error('Incorrect data recieved while checking for playlist');
}
function hasTimestamp(url) {
    if (typeof url == 'string') {
        let match = url.match(/^.*(?:\btime_continue=\b|\bt=\b)([0-9]+)/);
        return (match !== null ? toHHMMSS(match[1]) : null);
    } else console.error('Incorrect data recieved while checking for timestamp');
}
function hasChannel(url) {
    if (typeof url == 'string') {
        let match = url.match(/^.*(?:youtube\.[a-z]{0,4})(?:\/channel\/|\/user\/)(.{22,})/);
        return (match && match[1]) ? match[1] : null;
    } else console.error('Incorrect data recieved while checking for channel');
}
function toHHMMSS(secs) {
    if (secs == undefined || secs == null) return null;
    let seconds = parseInt(secs, 10);
    let hours = Math.floor(seconds / 3600);
    let minutes = Math.floor((seconds - (hours * 3600)) / 60);
    seconds = seconds - (hours * 3600) - (minutes * 60);

    if (hours < 10) { hours = "0" + hours; }
    if (minutes < 10) { minutes = "0" + minutes; }
    if (seconds < 10) { seconds = "0" + seconds; }
    return hours + ':' + minutes + ':' + seconds;
}

export default {
    isYoutube: isYoutube,
    hasVideo: hasVideo,
    hasPlaylist: hasPlaylist,
    hasTimestamp: hasTimestamp,
    hasChannel: hasChannel,
    isHomepage: isHomepage,
    toHHMMSS: toHHMMSS
};