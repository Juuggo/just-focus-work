import Vue from 'vue';
import pomodoro from './components/pomodoro/pomodoro.vue';
import todo from './components/todo/todo.vue';
import statistics from './components/statistics/statistics.vue';
import filters from './components/todo/filters.js';
import './css/main.scss';

var app = new Vue({
    el: '#app',
    template: `
        <div id="app">
            <todo ref="todo"></todo>
            <pomodoro></pomodoro>
            <statistics></statistics>
        </div>
    `,
    components: {
        todo,
        pomodoro,
        statistics
    }
})

document.addEventListener('DOMContentLoaded', function() {
    Notification.requestPermission().then(function(permission) {
        if (permission === 'granted') {
            console.log('允许通知');
        } else if(permission === 'denied') {
            console.log('拒绝了推送通知');
        }
    })
})

function onHashChange() {
    var visibility = window.location.hash.replace(/#\/?/, '');
    var todo= app.$refs.todo;
    if (filters[visibility]) {
        todo.visibility = visibility;
    } else {
        window.location.hash = '';
        todo.visibility = 'all';
    }
}

window.addEventListener('hashchange', onHashChange);
onHashChange();

function drawCircle() {
    var canvas = document.getElementById('circle');
    var ctx = canvas.getContext('2d');
    var halfWidth = 100;
    ctx.fillStyle = 'white';
    ctx.strokeStyle = 'white';
    ctx.lineWidth = 10;

    ctx.beginPath();
    ctx.arc(halfWidth, halfWidth, halfWidth - 10, 0, Math.PI*2, false);
    ctx.stroke();
}
drawCircle();
