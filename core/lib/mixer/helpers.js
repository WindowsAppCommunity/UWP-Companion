export function pauseStream(tabId) {
    // Mixer seems to have done something to prevent a regular script injection from working until the page is loaded completely, even when using the 'load' event listener + document.readyState. It wasn't throwing errors, it just doesn't run it.
    // The best thing I could do is repeatedly try to pause the video, and if it was a success, declare a string "success"  which will be seen by the results callback, allowing me to cancel the pauseRepeater. Turned out pretty clean actually :)

    let pauseRepeater = setInterval(() => {
        chrome.tabs.executeScript(tabId, {
            code: `
            var vid = document.querySelector('video.light-player'); 
            if (vid) {
                vid.pause();
                if(vid.paused) {
                    "success";
                }
            }`
        }, results => {
            console.log(results);
            if (results && results[0] && results[0] == "success") {
                setTimeout(() => {
                    clearInterval(pauseRepeater);
                }, 3000);
            }
        });
    }, 200);

    // If a user has _really_ slow internet, it could take this long. Any longer is probably an indication of a glitch and the repeating code needs to be stopped
    setTimeout(() => {
        clearInterval(pauseRepeater);
    }, 25000);
}