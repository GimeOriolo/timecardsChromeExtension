(() => {
    var flag = false;
    var copyCard = true;

    chrome.runtime.sendMessage('home', (response) => {
        console.log(response);
        if (response == window.location.href.split("?")[1]) {
            start();
            console.log("dentro del start " + flag);
        }

    });

    function start() {
        //const newFlag = true;   
        flag = true;
        console.log("aca entra");

        chrome.runtime.sendMessage('close', (response) => { });

    };

    function copyCards() {
        //const newCopycard = true;   
        copyCard = true;
        console.log("aca entra a la copy card");
        chrome.runtime.sendMessage('close', (response) => { });
    };

    console.log("fuera del start " + flag);

    if (flag && window.location.href.startsWith("https://eclf.fa.em2.oraclecloud.com/fscmUI/faces/AtkHomePageWelcome")) {
        setTimeout(function () {
            document.querySelector("a[class*='TabletNavigatorIcon']").click();
            console.log("Click on Menu");
            setTimeout(function () {
                document.querySelectorAll('[class*=svg-navmenu]').forEach(element => {
                    if (element.innerText == "Home") {
                        element.click();
                        return;
                    }
                });
                console.log("Click on Home");
            }, 2000);

        }, 2000);
    }

    if (flag && window.location.href.startsWith("https://eclf.fa.em2.oraclecloud.com/fscmUI/faces/FuseWelcome")) {
        setTimeout(function () {
            document.querySelectorAll('[class*=app-nav-item]').forEach(element => {
                if (element.innerText == "My TimeCards") {
                    element.click();
                    return;
                }
            });
            console.log("Click on My Time Cards");
        }, 2000);
    }

    if (flag && window.location.href.startsWith("https://eclf.fa.em2.oraclecloud.com/hcmUI/faces/FndOverview")) {        
        setTimeout(function () {
            document.querySelector("div[title='Add']").click();
            console.log("Click on Add");
            setTimeout(function () {
                document.querySelector("[class*='themeSectionButtonBar'] div[title='Add']").click();
                console.log("Click on Add2");
            }, 1000);
            setTimeout(function () {
                setTimeout(function () {
                    document.querySelector("[class*='themeSectionButtonBar'] div[title='Add']").click();
                    console.log("Click on Add in Cards");
                }, 1000);
                chrome.storage.sync.get('times', function (data) {
                    var values = JSON.parse(data.times);
                    setTimeout(function () {
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
                        getDates(values.dateStart, values.dateEnd);
                        clickClose(ready=true);
                        // setTimeout(function () {
                        //     document.querySelector("img[title='Close']").click();  
                        //     clickOK(ready=true);                         
                        // }, 5000);
                    }, 3000);
                });
            }, 3000);

        }, 2000);

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
            console.log("el array es " + daysOfWeek);

            setTimeout(function () {
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

    }
})();








