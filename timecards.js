const baseUrl = "https://eclf.fa.em2.oraclecloud.com/";
let updatedUrl = "";

function navigateToOracle() {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        const tab = tabs[0];
        chrome.tabs.update(tab.id, { url: baseUrl });
    });
}

chrome.tabs.onUpdated.addListener((tabId, tab) => {
    updatedUrl = tab.url.split("?")[0];
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    switch (message) {
        case "navigating":
            sendResponse(updatedUrl);
            break;
        case "close":
        default:
            sendResponse("Closing");
            break;
    }
});