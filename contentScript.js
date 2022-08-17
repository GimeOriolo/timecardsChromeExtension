const baseUrl = "https://eclf.fa.em2.oraclecloud.com";
const facesUrl = `${baseUrl}/fscmUI/faces`;
const actionsMap = Object.freeze({
    home: homeAction,
    welcome: welcomeAction,
    overview: overviewAction,
    close: closeAction,
});
function homeAction() {
    console.log("home");
    window.addEventListener("load", () => {
        document.querySelector("a[class*='TabletNavigatorIcon']").click();
        console.log("Click on Menu");
        setTimeout(() => {
            document.querySelectorAll("[class*=svg-navmenu]").forEach((element) => {
                if (element.innerText == "Home") {
                    element.click();
                    return;
                }
            });
            console.log("Click on Home");
        }, 2000);
    });
}
function welcomeAction() {
    console.log("Welcome");
}
function overviewAction() {
    console.log("Overview");
}
function closeAction() {
    console.log("Close");
}
function executeAction(url) {
    console.log(url);
    if (!url) return;   
    switch (url) {
        case url.startsWith(`${facesUrl}/AtkHomePageWelcome`):
            return actionsMap.home();
        case url.startsWith(`${facesUrl}/FuseWelcome`):
            return actionsMap.welcome();
        case url.startsWith(`${facesUrl}/FndOverview`):
            return actionsMap.overview();
        default:
            return actionsMap.close();
    }
}
(() => {
    chrome.runtime.sendMessage("home", executeAction);
    chrome.runtime.sendMessage("welcome", executeAction);
    chrome.runtime.sendMessage("overview", executeAction);
    chrome.runtime.sendMessage("close", executeAction);
    //console.log(flag); //aca sigue siendo false
    //   if (!copyCard && window.location.href.startsWith("https://eclf.fa.em2.oraclecloud.com/hcmUI/faces/FndOverview")) {
    //             setTimeout(function () {
    //                 document.querySelector("div[title='Add']").click();
    //                 console.log("Click on Add");
    //                 setTimeout(function () {
    //                     document.querySelector("[class*='themeSectionButtonBar'] div[title='Add']").click();
    //                     console.log("Click on Add2");
    //                 }, 1000);
    //                 setTimeout(function () {
    //                     setTimeout(function () {
    //                         document.querySelector("[class*='themeSectionButtonBar'] div[title='Add']").click();
    //                         console.log("Click on Add in Cards");
    //                     }, 1000);
    //                     chrome.storage.sync.get('times', function (data) {
    //                         var values = JSON.parse(data.times);
    //                         setTimeout(function () {
    //                             setTimeout(function () {
    //                                 document.querySelector("span[aria-label='Project Code'] input").value = values.projectCode;
    //                                 document.querySelector("span[aria-label='Project Code'] input").click();
    //                                 document.querySelector("span[aria-label='Task Details'] input").value = values.taskDetails;
    //                                 document.querySelector("span[aria-label='Time Type'] input").value = values.timeType;
    //                                 document.querySelector("span[aria-label='Location'] input").value = values.location;
    //                                 document.querySelector("span[aria-label='Relocated Country'] input").value = values.country;
    //                                 document.querySelector("span[aria-label='Relocated Country'] input").click();
    //                                 document.querySelector("input[placeholder='Start Time']").value = values.startTime;
    //                                 document.querySelector("input[placeholder='End Time']").value = values.endTime;
    //                                 InputQuantity(values.quantity);
    //                                 getDates(values.dateStart, values.dateEnd);
    //                                 clickClose(true);
    //                             }, 3000);
    //                         });
    //                     });
    //                 }, 3000);
    //             }, 2000)
    //         }
    //         else {
    //             console.log("entro al else del copycard");
    //             clickActionsAndCopyCard();
    //         };
    function clickActionsAndCopyCard() {
        setTimeout(function () {
            document.querySelector("button[title='Actions']").click();
            console.log("Click on Actions");
            setTimeout(function () {
                document.querySelectorAll("div[class='AFPopupMenuContent'] td td tr").forEach((element) => {
                    if (element.innerText.includes("Copy Previous ")) {
                        element.click();
                        return;
                    }
                });
                console.log("Click on Copy previous");
            }, 2000);
        }, 2000);
    }
    function clickClose(ready) {
        if (ready) {
            setTimeout(() => {
                document.querySelector("img[title='Close']").click();
                console.log("Click on Close");
            }, 2000);
        }
    }
    function clickOK(ready) {
        if (ready) {
            setTimeout(() => {
                document.querySelector("div[title='OK']").click();
                console.log("Click on OK");
            }, 2000);
        }
    }
    function ClickOnDate() {
        setTimeout(function () {
            document.querySelector("img[title='Select dates']").click();
        }, 1000);
    }
    function getDates(start, end) {
        const month = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        const d = new Date();
        let name = month[d.getMonth()];
        let year = d.getUTCFullYear();
        let daysOfWeek = new Array(5);
        let firstDayOfweek = getFirstDayOfWeek(d);
        const selectorSummary = name + " " + year;
        for (let i = 0; i < 5; i++) {
            daysOfWeek.push(firstDayOfweek.addDays(i).getDate().toLocaleString());
        }
        console.log("el summary es " + selectorSummary);
        ClickOnDate();
        window.onload = setTimeout(function () {
            document.querySelectorAll("table[summary='" + selectorSummary + "'] td").forEach((element) => {
                daysOfWeek.forEach((day) => {
                    if (element.innerText == day) {
                        element.click();
                        console.log("hice click en " + day);
                    }
                });
            });
            return;
        }, 3000);
    }
    function InputQuantity(quantity) {
        setTimeout(function () {
            document.querySelectorAll("span").forEach((element) => {
                if (element.innerText == "Quantity") {
                    element.querySelector("input").value = quantity;
                    return true;
                }
            });
            console.log("Input " + quantity);
        }, 2000);
    }
    function getFirstDayOfWeek(d) {
        const date = new Date(d);
        const day = date.getDay();
        const diff = date.getDate() - day + (day === 0 ? -6 : 1);
        return new Date(date.setDate(diff));
    }
    Date.prototype.addDays = function (days) {
        const date = new Date(this.valueOf());
        date.setDate(date.getDate() + days);
        return date;
    };
})();


// (() => {

//     chrome.runtime.sendMessage('home', (response) => {
//         start(response).then(() => {
//             if (window.location.href.startsWith("https://eclf.fa.em2.oraclecloud.com/fscmUI/faces/AtkHomePageWelcome")) {
//                 window.addEventListener("load", () => {
//                     document.querySelector("a[class*='TabletNavigatorIcon']").click();
//                     console.log("Click on Menu");
//                     setTimeout(() => {
//                         document.querySelectorAll('[class*=svg-navmenu]').forEach(element => {
//                             if (element.innerText == "Home") {
//                                 element.click();
//                                 return;
//                             }
//                         });
//                         console.log("Click on Home")
//                     }, 2000);
//                 })
//             };

//             if (window.location.href.startsWith("https://eclf.fa.em2.oraclecloud.com/fscmUI/faces/FuseWelcome")) {
//                 window.addEventListener("load", () => {
//                     document.querySelectorAll('[class*=app-nav-item]').forEach(element => {
//                         if (element.innerText == "My TimeCards") {
//                             element.click();
//                             return;
//                         }
//                     });

//                     console.log("Click on My Time Cards");
//                 })


//             };
//         }).catch(() => console.log("ERRORRRR"))
//     });

//     function start(response) {
//         return new Promise((resolve, reject) => {
//             console.log(response);
//             if (response.split("copyTimeCard")[0] === window.location.href.split("?")[1]) {
//                 resolve();
//                 return
//             }

//             reject()
//         });
//         //chrome.runtime.sendMessage('close', (response) => { });       
//     };

//console.log(flag); //aca sigue siendo false



//   if (!copyCard && window.location.href.startsWith("https://eclf.fa.em2.oraclecloud.com/hcmUI/faces/FndOverview")) {
//             setTimeout(function () {
//                 document.querySelector("div[title='Add']").click();
//                 console.log("Click on Add");
//                 setTimeout(function () {
//                     document.querySelector("[class*='themeSectionButtonBar'] div[title='Add']").click();
//                     console.log("Click on Add2");
//                 }, 1000);
//                 setTimeout(function () {
//                     setTimeout(function () {
//                         document.querySelector("[class*='themeSectionButtonBar'] div[title='Add']").click();
//                         console.log("Click on Add in Cards");
//                     }, 1000);
//                     chrome.storage.sync.get('times', function (data) {
//                         var values = JSON.parse(data.times);
//                         setTimeout(function () {
//                             setTimeout(function () {
//                                 document.querySelector("span[aria-label='Project Code'] input").value = values.projectCode;
//                                 document.querySelector("span[aria-label='Project Code'] input").click();
//                                 document.querySelector("span[aria-label='Task Details'] input").value = values.taskDetails;
//                                 document.querySelector("span[aria-label='Time Type'] input").value = values.timeType;
//                                 document.querySelector("span[aria-label='Location'] input").value = values.location;
//                                 document.querySelector("span[aria-label='Relocated Country'] input").value = values.country;
//                                 document.querySelector("span[aria-label='Relocated Country'] input").click();
//                                 document.querySelector("input[placeholder='Start Time']").value = values.startTime;
//                                 document.querySelector("input[placeholder='End Time']").value = values.endTime;
//                                 InputQuantity(values.quantity);
//                                 getDates(values.dateStart, values.dateEnd);
//                                 clickClose(true);
//                             }, 3000);
//                         });
//                     });
//                 }, 3000);

//             }, 2000)
//         }
//         else {
//             console.log("entro al else del copycard");
//             clickActionsAndCopyCard();

//         };


function clickActionsAndCopyCard() {
    setTimeout(function () {
        document.querySelector("button[title='Actions']").click();
        console.log("Click on Actions");
        setTimeout(function () {
            document.querySelectorAll("div[class='AFPopupMenuContent'] td td tr").forEach(element => {
                if (element.innerText.includes("Copy Previous ")) {
                    element.click();
                    return;
                }
            });
            console.log("Click on Copy previous");
        }, 2000);

    }, 2000);
};

function clickClose(ready) {
    if (ready) {
        setTimeout(() => {
            document.querySelector("img[title='Close']").click();
            console.log("Click on Close");
        }, 2000);
    }
};

function clickOK(ready) {
    if (ready) {
        setTimeout(() => {
            document.querySelector("div[title='OK']").click();
            console.log("Click on OK");
        }, 2000);
    }
};

function ClickOnDate() {
    setTimeout(function () {
        document.querySelector("img[title='Select dates']").click();
    }, 1000);
};

function getDates(start, end) {
    const month = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const d = new Date();
    let name = month[d.getMonth()];
    let year = d.getUTCFullYear();
    let daysOfWeek = new Array(5);
    let firstDayOfweek = getFirstDayOfWeek(d);
    const selectorSummary = name + " " + year;

    for (let i = 0; i < 5; i++) {
        daysOfWeek.push(firstDayOfweek.addDays(i).getDate().toLocaleString());
    };

    console.log("el summary es " + selectorSummary);
    ClickOnDate();

    window.onload = setTimeout(function () {
        document.querySelectorAll("table[summary='" + selectorSummary + "'] td").forEach(element => {
            daysOfWeek.forEach(day => {
                if (element.innerText == day) {
                    element.click();
                    console.log("hice click en " + day);
                }
            });
        });
        return;
    }, 3000);

};

function InputQuantity(quantity) {
    setTimeout(function () {
        document.querySelectorAll('span').forEach(element => {
            if (element.innerText == "Quantity") {
                element.querySelector('input').value = quantity;
                return true;
            }
        });
        console.log("Input " + quantity);
    }, 2000);
}

function getFirstDayOfWeek(d) {
    const date = new Date(d);
    const day = date.getDay();

    const diff = date.getDate() - day + (day === 0 ? -6 : 1);

    return new Date(date.setDate(diff));
};

Date.prototype.addDays = function (days) {
    const date = new Date(this.valueOf());
    date.setDate(date.getDate() + days);
    return date;
};

//})();








