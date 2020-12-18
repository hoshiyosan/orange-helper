function extractPeriod() {
    function parseDateFromFusionString(str) {
        const parts = str.match(/\d{2}/g);
        return new Date("20" + parts[2], Number.parseInt(parts[1]) - 1, parts[0])
    }

    function workoutWeek(firstDate) {
        let week = [];
        let currentDate = firstDate;
        for (let k = 1; k < 8; k++) {
            week.push(new Date(currentDate));
            currentDate.setDate(currentDate.getDate() + 1);
        }
        return week;
    }

    const matches = [...document.querySelectorAll('tr.p_AFReadOnly')]
        .map(str => str.innerText.match(/\d{2}\/\d{2}\/\d{2}/g))
        .filter(match => match);

    if (matches.length === 0) {
        throw "Failed to retrieve period for this time card..."
    } else if (matches.length > 1) {
        throw "Too many matches trying to retrieve period for this time card..."
    } else {
        const firstDay = parseDateFromFusionString(matches[0][0]);
        return workoutWeek(firstDay);
    }
}

function extractImputations() {
    const inputs = [...document.querySelectorAll('tr input')];
    const weekDays = extractPeriod();
    if (inputs.length % 9 !== 0) throw "Unable to retrieve imputations data...";

    const nbEntries = inputs.length / 9;
    const imputations = [];

    for (let i = 0; i < nbEntries; i++) {
        let projectCode = inputs[i * 9].value;
        let projectTask = inputs[i * 9 + 1].value;
        let hours;

        for (let j = 2; j < 9; j++) {
            hours = Number.parseFloat(inputs[i * 9 + j].value);
            if (hours) {
                imputations.push({
                    code: projectCode,
                    task: projectTask,
                    date: weekDays[j - 2],
                    hours: hours
                });
            }
        }
    }
    return imputations;
}

/**
 * Abstraction to asynchronously access storage
 */


class ChromeStorage {
    validateImputation(imputation){
        return (
            !!imputation && !!imputation.date && !!imputation.code
        )
    }
    getImputations(filter = () => true) {
        return new Promise(resolve => {
            chrome.storage.sync.get(['imputations'], (result) => {
                const imputations = (result.imputations || []).map(imputation=>{
                    console.log("imputation date");
                    imputation.date = new Date(imputation.date);
                    return imputation;
                });
                console.log('getImputations', imputations);
                resolve(imputations.filter(filter));
            });

        })
    }
    setImputations(...imputations) {
        return new Promise(resolve => {
            console.log('setImputations', imputations);
            chrome.storage.sync.set({ 
                imputations: [...imputations.map(imputation=>{ imputation.date = imputation.date.toISOString(); return imputation})]
            }, function () {
                resolve();
            });
        });
    }
    removeImputations(filter) {
        console.log('removeImputations');
        return new Promise(resolve => {
            this.getImputations()
                .then(imputations => {
                    imputations = imputations.filter(filter);
                    this.setImputations(...imputations)
                        .then(updatedImputations => resolve(updatedImputations));
                });
        })
    }
    pushImputations(...newImputations) {
        console.log('pushImputations', newImputations);
        const safeImputations = newImputations.filter(imputation => this.validateImputation);
        return new Promise(resolve => {
            this.getImputations()
                .then(imputations => {
                    imputations.push(...safeImputations);
                    this.setImputations(...imputations)
                        .then(updatedImputations => resolve(updatedImputations));
                })
        })
    }
}

chrome.storage.sync.remove("imputations", function () {});

(() => {
    const storage = new ChromeStorage();

    /**
     * Functions to interract with imputations database
     */
    function removeImputationsForWeek() {
        const weekDays = extractPeriod().map(date => date.getTime());
        console.log('weekDays', weekDays);
        return storage.removeImputations(imputation => !weekDays.includes(imputation.date.getTime()));
        //imputations = imputations.filter(imputation => !weekDays.includes(imputation.date.getTime()));
    }

    function addOrUpdateImputations(newImputations) {
        console.log('addOrUpdateImputations', newImputations);
        return new Promise(resolve => {
            removeImputationsForWeek()
                .then(() => {
                    storage.pushImputations(...newImputations)
                        .then(() => resolve())
                })
        })
    }

    function updateImputations() {
        return new Promise(resolve => {
            const _imputations = extractImputations();
            console.log(_imputations);
            addOrUpdateImputations(_imputations)
                .then(() => { console.log('imputations updated'); resolve() });
        })
    }

    function debugImputations() {
        storage.getImputations()
            .then(imputations => console.log(imputations));
    }

    /**
     * Daemon that check page changes and update imputations database when required
     */
    let currentPage = null;

    function daemon() {
        console.log('fusion daemon running');
        let newPage = document.querySelector('h1').innerText;

        if (currentPage !== newPage) {
            try {
                // update imputations on save/submit
                document.querySelector('[accessKey=S]').addEventListener('click', updateImputations);
                document.querySelector('[accessKey=x]').addEventListener('click', updateImputations);
                // update imputations immediately page load (to match last submitted version)
                updateImputations()
                    .then(() => debugImputations());
            } catch {
                console.log('not on imputation page?');
            }

            currentPage = newPage;
        }
    }

    setInterval(daemon, 1000);
})()
