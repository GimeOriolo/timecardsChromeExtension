const baseUrl = "https://eclf.fa.em2.oraclecloud.com";
const facesUrl = `${baseUrl}/fscmUI/faces`;
function navigateToOracle(copyTimeCard = false) {
    let url = "";
    const messagesMap = Object.freeze({
        home: url,
        welcome: url,
        overview: `${url}copyTimeCard${copyTimeCard}`,
        close: "window.close",
    });
    chrome.tabs.update({ url: baseUrl });
    chrome.tabs.onUpdated.addListener((_, tab) => {
        if (!tab.url) return;
        chrome.runtime.onMessage.addListener((message, _, sendResponse) => {
            switch (true) {
                case tab.url.startsWith(`${facesUrl}/AtkHomePageWelcome`):
                    url = `${facesUrl}/AtkHomePageWelcome`;
                    sendResponse(messagesMap.home);
                    break;
                case tab.url.startsWith(`${facesUrl}/FuseWelcome`):
                    url = `${facesUrl}/FuseWelcome`;
                    sendResponse(messagesMap.welcome);
                    break;
                case tab.url.startsWith(`${facesUrl}/FndOverview`):
                    url = `${facesUrl}/FndOverview`;
                    sendResponse(messagesMap.overview);
                    break;
                default:
                    break;
            }
        });
    });
}