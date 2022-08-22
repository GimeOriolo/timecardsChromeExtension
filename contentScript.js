const clicksDelay = 2500;
let copyCard = true;

chrome.runtime.sendMessage("navigating", (response) => {
    if (!response) return;

    const url = response.split("/");
    const section = url.at(-1);

    switch (section) {
        case "AtkHomePageWelcome":
            setTimeout(() => {
                document.querySelector("a[class*='TabletNavigatorIcon']").click();
                console.log("Clicked on Menu");

                setTimeout(() => {
                    document.querySelectorAll("[class*=svg-navmenu]").forEach((element) => {
                        if (element.innerText == "Home") {
                            element.click();
                            return;
                        }
                    });
                    console.log("Clicked on Home");
                }, clicksDelay);
            }, clicksDelay);
            break;
        case "FuseWelcome":
            setTimeout(function () {
                document.querySelectorAll("[class*=app-nav-item]").forEach((element) => {
                    if (element.innerText == "My TimeCards") {
                        window.location.href = element.getAttribute("destinationurl");
                        return;
                    }
                });
                console.log("Click on My Time Cards");
            }, clicksDelay);
            break;
        case "FndOverview":
            waitClickOnFirstAdd.then(() => {
                setTimeout(() => {
                    document.querySelector("[class*='themeSectionButtonBar'] div[title='Add']").click();
                    console.log("Clicked on Add in Entries");
                }, clicksDelay);

            }).finally(() => {
                setTimeout(() => {
                    chrome.storage.sync.get('times', function (data) {
                        const values = JSON.parse(data.times);

                        setTimeout(() => {
                            document.querySelector("span[aria-label='Project Code'] input").value = values.projectCode;
                            console.log("Input Project Code " + values.projectCode);
                            document.querySelector("span[aria-label='Task Details'] input").value = values.taskDetails;
                            console.log("Input Project Code " + values.taskDetails);
                            document.querySelector("span[aria-label='Time Type'] input").value = values.timeType;
                            console.log("Input Project Code " + values.timeType);
                            document.querySelector("span[aria-label='Location'] input").value = values.location;
                            console.log("Input Project Code " + values.location);
                            document.querySelector("span[aria-label='Relocated Country'] input").value = values.country;
                            console.log("Input Project Code " + values.country);
                            document.querySelector("img[title='Select dates']").click();
                            console.log("Input Dates");
                            document.querySelector("input[placeholder='Start Time']").value = values.startTime;
                            console.log("Start Time " + values.startTime);
                            document.querySelector("input[placeholder='End Time']").value = values.endTime;
                            console.log("End Time " + values.endTime);
                            InputQuantity(values.quantity);
                            document.querySelector("a[title='Select dates']").click();
                            getDates(values.dateStart, values.dateEnd);
                            //clickOK();
                        }, clicksDelay);
                    });
                },clicksDelay);

            });
            break;
        default:
            break;
    }

});
const waitClickOnFirstAdd = new Promise((resolve, reject) => {
    setTimeout(() => {
        document.querySelector("div[title='Add']").click();
        console.log("Clicked on Add");
        resolve();
    }, clicksDelay);
});

function InputQuantity(quantity) {
    setTimeout(() => {
        document.querySelectorAll('span').forEach(element => {
            if (element.innerText == "Quantity") {
                element.querySelector('input').value = quantity;
                return true;
            }
        });
        console.log("Input " + quantity);
    }, clicksDelay);
}

function clickClose() {
    setTimeout(() => {
        document.querySelector("img[title='Close']").click();
        console.log("Click on Close");
    }, clicksDelay);

}

function clickOK() {
    setTimeout(() => {
        document.querySelector("div[title='OK']").click();
        console.log("Click on OK");
    }, clicksDelay);
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
    console.log("el array es " + daysOfWeek);

    setTimeout(function () {
        document.querySelectorAll("table[summary='" + selectorSummary + "'] td").forEach((element) => {
            daysOfWeek.forEach((day) => {
                if (element.innerText == day) {
                    element.click();
                    console.log("hice click en " + day);
                    clickClose();
                }
            });
        });
        return;
    }, clicksDelay);
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









