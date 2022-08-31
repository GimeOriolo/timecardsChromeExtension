const baseUrl = "https://eclf.fa.em2.oraclecloud.com/";
let updatedUrl = "";
let copyCard = "";

function navigateToOracle(copy) {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        const tab = tabs[0];
        chrome.tabs.update(tab.id, { url: baseUrl });
    });
    if (copy) {
        copyCard= "_true";
    }
}

chrome.tabs.onUpdated.addListener((tabId, tab) => {
    updatedUrl = tab.url.split("?")[0];
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    switch (message) {
        case "navigating":
            console.log(copyCard);
            sendResponse(updatedUrl + copyCard);
            break;
        case "close":
            window.close();
        default:
            sendResponse("Closing");
            break;
    }
});