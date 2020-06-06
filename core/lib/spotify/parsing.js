function hasAlbum(url) {
    if (typeof url == 'string') {
        let match = url.match(/\/album\/([\w\d]+)\/?/);
        return (match !== null ? match[1] : null);
    } else console.error('Incorrect data recieved while checking for Album');
}

function hasArtist(url) {
    if (typeof url == 'string') {
        let match = url.match(/\/artist\/([\w\d]+)\/?/);
        return (match !== null ? match[1] : null);
    } else console.error('Incorrect data recieved while checking for Artist');
}

function hasPlaylist(url) {
    if (typeof url == 'string') {
        let match = url.match(/\/playlist\/([\w\d]+)\/?/);
        return (match !== null ? match[1] : null);
    } else console.error('Incorrect data recieved while checking for Playlist');
}

function hasShow(url) {
    if (typeof url == 'string') {
        let match = url.match(/\/show\/([\w\d]+)\/?/);
        return (match !== null ? match[1] : null);
    } else console.error('Incorrect data recieved while checking for Playlist');
}

function isSpotify(url) {
    if (typeof url == 'string') {
        let match = url.match(/^http.?:\/\/(?:www\.)?(open.spotify\.[a-z]{0,4})/);
        return (match && match[1]) ? true : false;
    } else console.error('Incorrect data recieved while checking domain');
}

export default {
    hasPlaylist,
    hasArtist,
    hasShow,
    hasAlbum,
    isSpotify
}