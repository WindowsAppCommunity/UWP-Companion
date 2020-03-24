function isStore(url) {
    if (typeof url == 'string') {
        let match = url.match(/^https?:\/\/(?:www.)?(microsoft\.[a-z]{0,4})?((\/[a-z,\-]*\/p\/)|(\/store\/[a-z,\-]*\/))/);
        return match != null;
    } else console.error('Incorrect data recieved while checking domain');
}
function isHomepage(url) {
    if (typeof url == 'string') {
        let match = url.match(/^(?:^http.*microsoft\.[a-z]{0,4})\/(.+)\/(.+)/);
        // If it matches anything after "microsoft.com/{lang}/", it isn't the homepage 
        return (!match || match[1]) ? false : true;
    } else console.error('Incorrect data recieved while checking homepage');
}
function isApps(url) {
    if (typeof url == 'string') {
        let match = url.match(/^.*(?:apps)/);
        return match != null;
    } else console.error('Incorrect data recieved while checking Apps');
}
function isMoviesAndTv(url) {
    if (typeof url == 'string') {
        let match = url.match(/^.*(?:movies-and-tv)/);
        return match != null;
    } else console.error('Incorrect data recieved while checking Movies & TV');
}

function hasApp(url) {
    if (typeof url == 'string') {
        let match = url.match(/^.*(?:\/store\/apps\/)([a-zA-Z0-9-_]{12})/);
        return (match && match[1]) ? match[1] : null;
    } else console.error('Incorrect data recieved while checking for app');
}
function hasMovie(url) {
    if (typeof url == 'string') {
        let match = url.match(/^.*(?:p\/)(.+\/)([a-zA-Z0-9-_]{12})/);
        return (match && match[1]) ? match[1] : null;
    } else console.error('Incorrect data recieved while checking for movie');
}

export default {
    isStore: isStore,
    isHomepage: isHomepage,
    isApps: isApps,
    isMoviesAndTv: isMoviesAndTv,
    hasApp: hasApp,
    hasMovie: hasMovie,
};