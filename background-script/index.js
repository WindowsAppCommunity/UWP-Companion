import { getProtocolUri } from '../core/libs.js';
import { setSettings, getSettings } from '../core/helpers/settings.js';
import { debounce, calculateStringSimilarity } from '../core/helpers/misc.js';
import { pauseVideo } from '../core/lib/youtube/master.js';

if (!(chrome && chrome.tabs) && (browser && browser.tabs)) {
    // Replacing chrome.tabs with browser.tabs for Firefox / other browsers that may need it
    chrome.tabs = browser.tabs;
}

let currentTabId;
getSettings();
launch = debounce(launch, 1500, true);

chrome.webRequest.onBeforeRequest.addListener(
    requestCatcher,
    {
        urls: ["<all_urls>"],
        tabId: currentTabId
    }
);

function requestCatcher(requestDetails) {
    let protocolUrl = getProtocolUri(requestDetails.url, requestDetails.tabId, false);
    if (protocolUrl != undefined) {
        launch(protocolUrl, requestDetails);
    }
}

function launch(protocolUrl, requestDetails) {
    chrome.tabs.query({ currentWindow: true, active: true }, function(tabs) {
        if (!tabs || !tabs[0]) return;

        console.log("Current tab URL: " + tabs[0].url, "Request URL: " + requestDetails.url, "Similarity: " + calculateStringSimilarity(tabs[0].url, requestDetails.url));
        if (calculateStringSimilarity(tabs[0].url, requestDetails.url) > 0.55) {
            document.getElementsByTagName("iframe")[0].src = protocolUrl;
        }
    });
}

chrome.tabs.onActivated.addListener((activeInfo) => {
    currentTabId = activeInfo.tabId;
});

chrome.runtime.onMessage.addListener(function(request) {
    console.log("message received: ", request);
    if (request.updateSettings != undefined) {
        setSettings(request.updateSettings);
    }

    if (request.pauseVideo != undefined) {
        pauseVideo(request.tabId);
    }

    if (request.launch) {
        chrome.tabs.query({ currentWindow: true, active: true }, function(tabs) {
            if (!tabs || !tabs[0]) return;

            let protocolUrl = getProtocolUri(tabs[0].url, tabs[0].id, true);
            document.getElementsByTagName("iframe")[0].src = protocolUrl;
        });
    }
});

