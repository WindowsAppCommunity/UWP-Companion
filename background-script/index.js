import libs, { getProtocolUri, getPlatformName, getPrefferedClient } from '../core/libs.js';
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
        launch(false, protocolUrl, requestDetails.url);
    }
}

function setupBrowserActionIcon(url, tabId) {
    let iconPath;

    let platformName = getPlatformName(url, true);

    if (platformName) {
        let client = getPrefferedClient(platformName);

        if (client && client.config && client.config.icon) {
            iconPath = client.config.icon;
        } else if (client && client.config) {
            // Fall back to platform icon if there's still a supported client
            let platform = libs.platforms[platformName];
            if (platform.icon) iconPath = platform.icon;
        }
    } else {
        // Not a supported platform, use default icon
        iconPath = "../assets/logos/BrowserAction.png";
    }

    chrome.browserAction.setIcon({
        path: iconPath,
        tabId: tabId
    });
}

function launch(shouldBypassSettings, protocolUrl, originalRequestUrl) {
    setTimeout(() => {
        chrome.tabs.query({ currentWindow: true, active: true }, function(tabs) {
            if (!tabs || !tabs[0]) return;
            if (!protocolUrl) {
                protocolUrl = getProtocolUri(tabs[0].url, tabs[0].id, shouldBypassSettings);
            }

            if (originalRequestUrl) console.log("Current tab URL: " + tabs[0].url, "Request URL: " + originalRequestUrl, "Similarity: " + calculateStringSimilarity(tabs[0].url, originalRequestUrl));

            // If no original request url isn't given, don't check it. This counts as a bypass for when manually launched by the user and the url used to generate a protocol is grabbed from the current tab
            if (originalRequestUrl == undefined || calculateStringSimilarity(tabs[0].url, originalRequestUrl) > 0.55) {
                if (protocolUrl) injectLaunchScript(protocolUrl, tabs[0].id);
            }
        });
    }, 200);
}

function injectLaunchScript(protocolUrl, tabId) {
    // Some spicey recursion to check the loading state of a page and make sure it's ready before trying to run something
    let readyStateRepeater = setInterval(() => {
        chrome.tabs.executeScript(tabId, {
            code: `
            if (document.readyState != "complete") {
                "notReady";
            } else {
                let a = document.createElement("a");
                    a.href = "${protocolUrl}";
                    a.click();
                    "success";
            }
            `
        }, results => {
            if (results) {
                for (let result of results) {
                    // If document isn't ready, return out of the callback. It will be tried again
                    if (result == "notReady" || result == null) {
                        return;
                    }
                }
                // If this point is reached without failures, stop the recursion
                clearInterval(readyStateRepeater);
            }
        });
    }, 200);

    // If a user has _really_ slow internet, it could take this long. Any longer is probably an indication of a glitch and the repeating code needs to be stopped
    setTimeout(() => {
        clearInterval(readyStateRepeater);
    }, 15000);
}

chrome.tabs.onActivated.addListener((activeInfo) => {
    currentTabId = activeInfo.tabId;

    chrome.tabs.query({ currentWindow: true, active: true }, function(tabs) {
        if (!tabs || !tabs[0]) return;
        setupBrowserActionIcon(tabs[0].url, tabs[0].id);
    });
});

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (tabId && changeInfo.url) setupBrowserActionIcon(changeInfo.url, tabId);
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
        launch(true);
    }
});

