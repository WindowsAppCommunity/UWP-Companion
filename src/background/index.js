import libs, { checkLib } from '../libs.js';
import { setSettings, getSettings, settings } from '../helpers/settings.js';
import { debounce } from '../helpers/misc.js';
import { YouTube } from '../lib/youtube/master.js';

if (!(chrome && chrome.tabs) && (browser && browser.tabs)) {
    // Replacing chrome.tabs with browser.tabs for Firefox / other browsers that may need it
    chrome.tabs = browser.tabs;
}

getSettings();

chrome.webRequest.onBeforeRequest.addListener(
    requestCatcher,
    { urls: ["<all_urls>"] },
    ["blocking"]
);

function requestCatcher(requestDetails) {
    let protocolUrl = checkLib(requestDetails.url, requestDetails.tabId, false);

    if (protocolUrl != undefined) {
        return {
            redirectUrl: protocolUrl
        };
    }
}

chrome.runtime.onMessage.addListener(function(request) {
    console.log("message received: ", request);
    if (request.updateSettings != undefined) {
        setSettings(request.updateSettings);
    }

    if (request.pauseVideo != undefined) {
        YouTube.pauseVideo(request.tabId);
    }
});

