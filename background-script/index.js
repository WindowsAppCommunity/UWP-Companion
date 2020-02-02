import libs, { getProtocolUri, getPlatformName, getPrefferedClient } from '../core/libs.js';
import { setSettings, getSettings, settings } from '../core/helpers/settings.js';

if (!(chrome && chrome.tabs) && (browser && browser.tabs)) {
    // Replacing chrome.tabs with browser.tabs for Firefox / other browsers that may need it
    chrome.tabs = browser.tabs;
}

getSettings();
chrome.tabs.query({ currentWindow: true, active: true }, function (tabs) {
    if (!tabs || !tabs[0]) return;
    setupBrowserActionIcon(tabs[0].url, tabs[0].id);
});

function launch(shouldBypassSettings, protocolUrl) {
    chrome.tabs.query({ currentWindow: true, active: true }, function (tabs) {
        if (!tabs || !tabs[0]) return;
        if (!protocolUrl) {
            console.warn(`protocolUrl is missing, getting from current tab`)
            protocolUrl = getProtocolUri(tabs[0].url, tabs[0].id, shouldBypassSettings);
        }

        if (protocolUrl) {
            console.log(`Injecting launch scripts for protocol url "${protocolUrl}"`);
            injectLaunchScript(protocolUrl, tabs[0].id);
            handlePostLaunchTasks(tabs[0]);
        }
    });
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
    }

    chrome.browserAction.setIcon({
        path: iconPath || "../assets/icons/UWPCompanion.png",
        tabId: tabId
    });
}

function handlePostLaunchTasks(tab) {
    let platformName = getPlatformName(tab.url, true);
    let client = getPrefferedClient(platformName);

    // Use that fancy recursion to make sure the page is fully loaded before running post launch tasks. This ensures that all load events fire and no code gets cut off

    let readyStateRepeater = setInterval(() => {
        chrome.tabs.executeScript(tab.id, {
            code: `
                if (document.readyState != "complete") {
                    "notReady";
                } else {
                    "ready";
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
                // If this point is reached without failures, stop the recursion and do the stuff
                clearInterval(readyStateRepeater);

                if (client.postLaunch != undefined && !settings.platforms[platformName].closeOnSwitch) {
                    client.postLaunch(tab.id);
                }

                /* if (settings.platforms[platformName].closeOnSwitch && (libs.platforms[platformName].shouldCloseOnSwitch ? libs.platforms[platformName].shouldCloseOnSwitch(tab.url, tab.id) : true)) {
                    chrome.tabs.remove(tab.id);
                } */
            }
        });

    }, 200);

    // If a user has _really_ slow internet, it could take this long. Any longer is probably an indication of a glitch and the repeating code needs to be stopped
    setTimeout(() => {
        clearInterval(readyStateRepeater);
    }, 30000);
}

function injectLaunchScript(protocolUrl, tabId, trycount = 0) {
    chrome.tabs.executeScript(tabId, {
        code: `
            try {
                // If the element has already been created
                if (document.querySelector(".protoLaunch")) {
                    document.querySelector(".protoLaunch").href = "${protocolUrl}";
                    document.querySelector(".protoLaunch").click();
                }
                else {
                    var protoLaunch = document.createElement("a");
                    protoLaunch.href = "${protocolUrl}";
                    protoLaunch.className = "protoLaunch";
                    
                    document.body.appendChild(protoLaunch);
                    document.querySelector(".protoLaunch").click();
                }
                "success";
            } catch(ex) {
                "notReady";
            }
        `
    }, results => {
        if (results == undefined || results[0] != "success") {
            // Don't retry more than 5 times
            if (trycount >= 5) return;

            setTimeout(() => {
                injectLaunchScript(protocolUrl, tabId, trycount++);
            }, 200);
        }
    });
}

// When the user changes the selected (active) tab
chrome.tabs.onActivated.addListener((activeInfo) => {

    // this event listener doesn't give us the URL, so we have to get it ourselves
    chrome.tabs.query({ currentWindow: true, active: true }, function (tabs) {
        if (!tabs || !tabs[0]) return;

        lastActiveTabUrl = tabs[0].url;

        setupBrowserActionIcon(tabs[0].url, tabs[0].id);
    });
});

let lastActiveTabUrl;

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (!tab || !tab.active) return;

    // Only continue if the url changes
    if (lastActiveTabUrl == tab.url) return;

    lastActiveTabUrl = tab.url;

    let protocolUrl = getProtocolUri(tab.url, tabId, false);
    if (protocolUrl != undefined) {
        launch(false, protocolUrl, tab.url);
    }

    if (tabId && tab.url) setupBrowserActionIcon(tab.url, tabId);
});

chrome.webNavigation.onCommitted.addListener(details => {
    if (!details || !details.tabId || !details.url) return;

    // We only care about this event listener for handling page reloads, which chrome.tabs.onUpdated does not do
    if (details.transitionType != "reload") return;

    chrome.tabs.query({ currentWindow: true, active: true }, function (tabs) {
        // Make sure the current tab is the one being refreshed
        if (!tabs || !tabs[0] || tabs[0].id != details.tabId) return;

        let protocolUrl = getProtocolUri(details.url, details.tabId, false);
        if (protocolUrl != undefined) {
            launch(false, protocolUrl);
        }
    });
});

chrome.runtime.onMessage.addListener(function (request) {
    console.log("message received: ", request);
    if (request.updateSettings != undefined) {
        setSettings(request.updateSettings);
    }

    if (request.launch) {
        launch(true);
    }

    if (request.updateIcon) {
        chrome.tabs.query({ currentWindow: true, active: true }, function (tabs) {
            setupBrowserActionIcon(tabs[0].url, tabs[0].id);
        });
    }
});

function getClipboardData() {
    var t = document.createElement("input");
    document.body.appendChild(t);
    t.focus();
    document.execCommand("paste");
    var clipboardText = t.value;
    document.body.removeChild(t);
    return clipboardText;
}

function copyTextToClipboard(text) {
    var copyFrom = document.createElement("textarea");
    copyFrom.textContent = text;
    document.body.appendChild(copyFrom);
    copyFrom.select();
    document.execCommand('copy');
    copyFrom.blur();
    document.body.removeChild(copyFrom);
}