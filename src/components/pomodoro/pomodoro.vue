<template>
    <div id="component-pomo" class="pomo" :class="{focusing: pomoSession == 'focus', resting: pomoSession == 'rest'}">
        <header>
            <div class="icon"></div>
        </header>
        <div class="pomo-main">
            <pomo-today class="pomo-today" :today-statistics="getPomoStatic('today')"
            ></pomo-today>
            <pomo-timer class="pomo-timer"
                :minutes="minutes" :seconds="seconds"
                :pomo-session="pomoSession"
                @toggle-settings="toggleSettings"
            ></pomo-timer>
            <pomo-control class="pomo-control"
                :pomo-session="pomoSession"
                @longpress-stop="stopTimer"
                @click-toggle="toggleTimer"
            ></pomo-control>
            <!-- <pomo-bgm ref="bgm"></pomo-bgm> -->
            <pomo-settings 
                :init-focus="initFocus"
                :init-rest="initRest"
                @change="changeInit"
                @toggle-settings="toggleSettings"
                v-show="isSettingsOpen"
            ></pomo-settings>
        </div>
    </div>
</template>

<script>
    import Vue from 'vue';
    // import pomoBgm from './pomo-bgm.vue';
    import pomoControl from './pomo-control.vue';
    import pomoSettings from './pomo-settings.vue';
    import pomoTimer from './pomo-timer.vue';
    import pomoToday from './pomo-today.vue';
    import Vmouse from './Vmouse.js';
    import drawRunningTimer from './drawRunningTimer.js';
    import { pomoPropList, pomoStorage } from './pomoStorage.js';

    // 自定义指令longpress 和 click
    // click 使用自定义指令是为了longpress时不触发click
    Vue.directive('longpress', {
        bind: function(el, binding, vNode) {
            new Vmouse(el, binding, vNode);
        },
    });
    Vue.directive('click', {
        bind: function(el, binding, vNode) {
            new Vmouse(el, binding, vNode);
        },
    });

    export default {
        data: function() {
            var datas = pomoStorage.fetch();
            var obj = {};
            for (var propName in pomoPropList) {
                obj[propName] = datas[propName];
            }
            obj.isSettingsOpen = false;
            obj.isTimerRunning = false;
            return obj;
        },
        mounted: function() {
            let passedSec = this.sessionSec - this.minutes * 60 - Number(this.seconds);
            drawRunningTimer(this.sessionSec, passedSec);
        },
        components: {
            // pomoBgm,
            pomoControl,
            pomoSettings,
            pomoTimer,
            pomoToday
        },
        methods: {
            toggleTimer: function() {
                let date = new Date();
                date = date.toLocaleDateString();
                let _this = this;
                if (!_this.dailySeconds[date]) {
                    _this.dailySeconds[date] = 0;
                } 
                // 倒计时显示逻辑
                // 每秒调用1次
                let countDown = function() {
                    let seconds = Number(_this.seconds);
                    let minutes = _this.minutes;
                    let pomoSession = _this.pomoSession;
                    if (pomoSession === 'idle') {
                        _this.pomoSession = 'focus';
                    }
                    if (seconds === 0 && minutes === 0) {
                    // 00:00 -> 25:00 或 00:00 -> 5:00
                        if(pomoSession === 'focus') {
                            _this.minutes = _this.initRest; 
                            _this.pomoSession = 'rest';
                            _this.sessionSec = _this.initRest * 60;
                            var notiRest = new Notification('专注完成，休息一下~', {
                                body: '看看风景，休息一下大脑吧~',
                            });
                        } else {
                            _this.minutes = _this.initFocus; 
                            _this.pomoSession = 'focus';
                            _this.sessionSec = _this.initFocus * 60;
                            var notiFocus = new Notification('休息结束，开始工作吧！', {
                                body: '专注才有效率。',
                            });
                        }
                    } else if (seconds === 0) {
                        // xx:00 -> xx-1:59
                        _this.minutes--;
                        _this.seconds = '59';
                        if (pomoSession === 'idle') {
                            _this.pomoSession = 'focus';
                        }
                    } else if(seconds <= 10) {
                        // xx:10 -> xx:09
                        _this.seconds = `0${seconds - 1}`
                    } else {
                        // xx:xx -> xx:xx-1
                        _this.seconds = `${seconds - 1}`;
                    }
                    if (pomoSession === 'focus') {
                        _this.$set(_this.dailySeconds, date, _this.dailySeconds[date]+1);
                    }
                    let passedSec = _this.sessionSec - _this.minutes * 60 - Number(_this.seconds);
                    drawRunningTimer(_this.sessionSec, passedSec);
                }
                _this.isTimerRunning ? clearInterval(_this.interval) : _this.interval = setInterval(countDown, 1000);
                _this.isTimerRunning = !_this.isTimerRunning;
            },
            stopTimer: function() {
                if(this.pomoSession !== 'idle') {
                    if (this.interval) {
                        clearInterval(this.interval);
                    }
                    this.minutes = this.initFocus;
                    this.seconds = '00';
                    this.sessionSec = this.initFocus * 60;
                    drawRunningTimer(this.sessionSec, 0);
                    this.isTimerRunning = false;
                    this.pomoSession = 'idle';
                }
            },
            changeInit: function(obj) {
                let type = obj.type;
                let value = obj.value;
                if (type === 'focus') {
                    this.initFocus = value;
                    if (this.pomoSession === 'idle') {
                        this.minutes = value ;
                        this.sessionSec = value * 60;
                    }
                    // if (this.pomoSession !== 'rest') {
                        // this.minutes = value;
                        // this.seconds = '00';
                    // }
                } else {
                    this.initRest = value;
                    // if (this.pomoSession === 'rest') {
                        // this.minutes = value;
                        // this.seconds = '00';
                    // }
                }
            },
            toggleSettings: function() {
                this.isSettingsOpen = !this.isSettingsOpen;
            },
            formatStatic: function(date, sec) {
                let hour = Math.floor(sec/3600);
                let minute = Math.floor((sec%3600)/60);
                let second = Math.floor(sec%60);
                return {'date': date, 'hour': hour, 'minute': minute, 'second': second};
            },
            getPomoStatic: function(filter) {
                let currentDate = new Date();
                if (filter === 'today') {
                    let date = currentDate.toLocaleDateString();
                    let sec = this.dailySeconds[date] ? this.dailySeconds[date] : 0;
                    return this.formatStatic(date, sec);
                } else if (filter === 'week') {
                    let weekDates = getWeekDates(currentDate);
                    let weekStatic = [];
                    let _this = this;
                    weekDates.forEach(function(date) {
                        let sec = _this.dailySeconds[date] ? _this.dailySeconds[date] : 0;
                        weekStatic.push(_this.formatStatic(date, sec));
                    }) 
                    return weekStatic;
                }
            },
        },
        computed: {
            pomoProps: function() {
                var obj = {};
                for (var prop in pomoPropList) {
                    obj[prop] = this[prop];
                }
                return obj;
            },
        },
        watch: {
            pomoProps: {
                handler: function(pomoProps) {
                    pomoStorage.save(pomoProps);
                },
                deep: true,
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import '../../css/pomo-vue.scss'
</style>
