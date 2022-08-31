const clicksDelay = 2500;

chrome.runtime.sendMessage("navigating", (response) => {
    if (!response) return;

    let copyCard = false;
    const url = response.split("/");
    if (url.at(-1).includes("_true")) { copyCard = true; }

    const section = url.at(-1).replace("_true", "");

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
            if (!copyCard) {
                const addCards = async () => {
                    await clickAdd();
                    const authorizationAdd = await clickAdd();
                    if (authorizationAdd) {
                        await completeTimeCard();
                        await inputQuantity();
                        await clickDatePicker();
                        const authorizationDate = await getDates();
                        if (authorizationDate) {
                            await clickClose();
                            await clickOK();
                           // await clickOnSaveAndClose();
                           // closePopUp();
                        }
                    }

                };
                addCards();
            }
            else {
                const copycards = async () => {
                    await clickAdd();
                    const authorizationActions = await clickOnActions();
                    if (authorizationActions) {
                        await clickOnCopyPreviousTimePromise();
                        await clickOnSaveAndClose();
                        closePopUp();
                    }
                };
                copycards();
            }
            break;
        default:
            break;
    }

});

function clickAdd() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            document.querySelector("div[title='Add']").click();
            console.log("Clicked on Add");
            resolve(true);
        }, clicksDelay);
    });
};

function clickOnActions() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            document.querySelector("button[title='Actions']").click();
            console.log("Clicked on Actions");
            resolve(true);
        }, clicksDelay);
    });
};

function clickOnCopyPreviousTimePromise() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            document.querySelectorAll("div[id*='ScrollBox'] tr").forEach((element) => {
                if (element.innerText.trim() == "Copy Previous Time Card") {
                    element.click();
                    return;
                }
            });
            console.log("Clicked on Copy Previous Time Card");
            resolve();
        }, clicksDelay);
    });
};

function closePopUp() {
    chrome.runtime.sendMessage("close", () => { });
};

function clickOnSaveAndClose() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            document.querySelector("div[class*='callToActionSaveAndClose'] a").click();
            console.log("Clicked on Save and Close");
            resolve();
        }, clicksDelay);
    });
};

function completeTimeCard() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            chrome.storage.sync.get('times', function (data) {
                const values = JSON.parse(data.times);
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
                resolve();
            });
        }, clicksDelay);
    });
};

function inputQuantity() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            chrome.storage.sync.get('times', function (data) {
                const values = JSON.parse(data.times);
                document.querySelectorAll('span').forEach(element => {
                    if (element.innerText == "Quantity") {
                        element.querySelector('input').value = values.quantity;
                        return;
                    }
                });
                console.log("Input " + values.quantity);
                resolve(true);
            });
        }, clicksDelay);
    });
};

function clickDatePicker() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            document.querySelector("a[title='Select dates']").click();
            resolve();
        }, clicksDelay);
    });
};

function clickClose() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            document.querySelector("img[title='Close']").click();
            console.log("Click on Close");
            resolve(true);
        }, clicksDelay);
    });
};

function clickOK() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            document.querySelector("div[title='OK']").click();
            console.log("Click on OK");
            resolve();
        }, clicksDelay);
    });
};

function getDates() {
    return new Promise((resolve, reject) => {
        const month = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        const d = new Date().addDays(5);
        let name = month[d.getMonth()];
        let year = d.getUTCFullYear();
        let daysOfWeek = new Array(5);
        let firstDayOfweek = getFirstDayOfWeek(d);
        const selectorSummary = name + " " + year;

        for (let i = 0; i < 5; i++) {
            daysOfWeek.push(firstDayOfweek.addDays(i).getDate().toLocaleString());
        }

        setTimeout(() => {
            document.querySelectorAll("table[summary='" + selectorSummary + "'] td").forEach((element) => {
                daysOfWeek.forEach((day) => {
                    if (element.innerText == day) {
                        element.click();
                        console.log("hice click en " + day);
                    }
                });
            });
            resolve(true);
        }, clicksDelay);       
    });
};

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


