if(window.location.href.startsWith("https://eclf.fa.em2.oraclecloud.com/fscmUI/faces/AtkHomePageWelcome")){
           setTimeout(function(){
            document.querySelector("a[class*='TabletNavigatorIcon']").click();
            console.log("Click on Menu");
            setTimeout(function(){
                document.querySelectorAll('[class*=svg-navmenu]').forEach(element => {
                        if (element.innerText == "Home") {
                            element.click();      
                            return;
                        }
                    });
                console.log("Click on Home");                   
            }, 1000);
        }, 10000);

        //$("iframe[class='AFMaskingFrame']").getAttribute("style")          
}
if (window.location.href.startsWith("https://eclf.fa.em2.oraclecloud.com/fscmUI/faces/FuseWelcome")) {    
    setTimeout(function(){
        document.querySelectorAll('[class*=app-nav-item]').forEach(element => {
            if (element.innerText == "My TimeCards") {
                   element.click();
                }
            });
        console.log("Click on My Time Cards");   
    }, 1000);
}

if (window.location.href.startsWith("https://eclf.fa.em2.oraclecloud.com/hcmUI/faces/FndOverview")) {    
    setTimeout(function(){
        document.querySelector("div[title='Add']").click();
        console.log("Click on Add");  
        setTimeout(function(){
            document.querySelector("[class*='themeSectionButtonBar'] div[title='Add']").click();
            console.log("Click on Add2");  
        }, 1000);
        setTimeout(function(){
            document.querySelector("[class*='themeSectionButtonBar'] div[title='Add']").click();
            console.log("Click on Add3");  
        }, 1000);
    }, 2000);
    
     document.querySelector("span[aria-label='Project Code'] input").value = "Hola";
}