var STORAGE_KEY_POMO = 'pomo-vuejs';
var pomoPropList = {
    initFocus: 25,
    initRest: 5,

    minutes: 25,
    seconds: '00',

    pomoSession: 'idle',
    // isTimerRunning: false,
    dailySeconds: {},
    sessionSec: 25 * 60,
}

var pomoStorage = {
    fetch: function() {
        let storageData = JSON.parse(localStorage.getItem(STORAGE_KEY_POMO) || '{}');
        let obj = {};
        for (var prop in pomoPropList) {
            obj[prop] = (storageData[prop] || storageData[prop] === 0)? storageData[prop] : pomoPropList[prop];
        }
        return obj;
    },
    save: function(obj) {
        let storageData = obj;
        localStorage.setItem(STORAGE_KEY_POMO, JSON.stringify(storageData));
    },
}

export {pomoPropList, pomoStorage};
