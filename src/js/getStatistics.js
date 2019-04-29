import todoStorage from '../components/todo/todoStorage.js';
import { pomoStorage } from '../components/pomodoro/pomoStorage.js';
import getWeekDates from './getWeekDates.js';

var formatSecs = function(sec) {
    let hour = Math.floor(sec/3600);
    let minute = Math.floor((sec%3600)/60);
    let second = Math.floor(sec%60);
    return {'hour': hour, 'minute': minute};
};

export default function() {
    var todoData = todoStorage.fetch().dailyCompleted;
    var pomoData = pomoStorage.fetch().dailySeconds;
    var currentDate = new Date();
    var day = (currentDate.getDay() + 6) % 7;
    var weekDates = getWeekDates(currentDate);
    var todoWeekly = [];
    var pomoWeekly = [];
    var pomoWeeklySec = [];
    var pomoWeeklyTotal = 0;
    var todoWeeklyTotal = 0;

    weekDates.forEach(function(day) {
        var dailyCompleted = todoData[day] ? todoData[day] : 0;
        todoWeekly.push(dailyCompleted);
        todoWeeklyTotal += dailyCompleted;
        var sec = pomoData[day] ? pomoData[day] : 0;
        pomoWeeklySec.push(sec);
        pomoWeekly.push(formatSecs(sec));
        pomoWeeklyTotal += sec;
    })
    pomoWeeklyTotal = formatSecs(pomoWeeklyTotal);

    var todoToday = todoWeekly[day];
    var pomoToday = pomoWeekly[day];
    return {
        todoWeekly,
        pomoWeekly,
        pomoWeeklySec,
        todoToday,
        pomoToday,
        todoWeeklyTotal,
        pomoWeeklyTotal
    };
}
