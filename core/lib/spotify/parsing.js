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

export default {
    hasPlaylist,
    hasArtist,
    hasAlbum
}