function navigateToOracle(){
    chrome.tabs.update({url: "https://eclf.fa.em2.oraclecloud.com/"});

    document.querySelectorAll('[id*=_UISmmLink]')[0].click();

    document.querySelectorAll('[class*=svg-navmenu]').forEach(element => {
        if (element.innerText == "Home") {
            element.click();           
        }
    });

    document.querySelectorAll('[class*=app-nav-item]').forEach(element => {
        if (element.innerText == "My TimeCards") {
            element.click();
        }
    });
    
};