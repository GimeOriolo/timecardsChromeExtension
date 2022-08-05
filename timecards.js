function navigateToOracle() {
  chrome.tabs.update({ url: "https://eclf.fa.em2.oraclecloud.com/" });
  let newurl;

  chrome.tabs.onUpdated.addListener((tabId, tab) => {
    if (tab.url && tab.url.startsWith("https://eclf.fa.em2.oraclecloud.com/fscmUI/faces/AtkHomePageWelcome")) {
      newurl = tab.url.split("?")[1];     
      chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {        
        if (message === 'home') {
          sendResponse(newurl);
        }
      });
    }
  });

  chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {   
    if (message === 'close') {
      window.close();
    }
  });
};