<template>
    <div id="component-statistics">

        <header>
            <div class="icon"></div>
        </header>

        <div class="topbar refresh-container">
            <button @click="updateData" class="refresh">
                <div>刷新数据</div>
                <img id="refreshImg" src="../../image/refresh.svg">
            </button>
        </div>

        <div class='statistics-main'>
            <div class="statistics-scroll">
                <div class="data-container">
                    <div class="title">任务完成统计</div>
                    <div class="data-text">
                        <span class="todo-data-today">
                            今日：{{ todoToday }}
                        </span>
                        <span class="todo-data-weekly">
                            本周：{{ todoWeeklyTotal }}
                        </span>
                    </div>
                    <ul class="data-graph">
                        <li v-for="(item, index) in todoWeekly"
                            class="bar"
                            :style="{height: getBarHeight(todoWeekly)[index]}"
                            >
                            <p class="show-on-hover">{{ item }}</p>
                            <p class="day">{{ getChineseDay(index) }}</p>
                        </li>
                    </ul>
                </div>
                <div class="data-container">
                    <div class=title>专注时长统计</div>
                    <div class="data-text">
                        <span class="pomo-data-today">
                            今日：{{ pomoToday.hour }}时{{ pomoToday.minute }}分
                        </span>
                        <span class="pomo-data-weekly">
                            本周：{{ pomoWeeklyTotal.hour }}时{{ pomoWeeklyTotal.minute }}分
                        </span>
                    </div>
                    <ul class="data-graph">
                        <li v-for="(item, index) in pomoWeekly"
                            class="bar"
                            :style="{height: getBarHeight(pomoWeeklySec)[index]}"
                            >
                            <p class="show-on-hover">{{ item.hour }}时{{ item.minute }}分</p>
                            <p class="day">{{ getChineseDay(index) }}</p>
                        </li>
                    </ul>
                </div>
            </div>
        </div>

    </div>
</template>

<script>
    import getStatistics from '../../js/getStatistics.js';

    var refreshImgDeg = 0;
    var staticsToData = function(obj) {
        var datas = getStatistics(); 
        for (var item in datas) {
            obj[item] = datas[item];
        }
        return obj;
    }

    export default {
        data: function() {
            let obj = {};
            return staticsToData(obj); 
        },
        computed: {
            todoBarHeight: function() {
            },
            pomoBarHeight: function() {
                var hlist = [];

            }
        },
        methods: {
            updateData: function() {
                staticsToData(this);
                var refreshImg = document.getElementById('refreshImg');
                refreshImgDeg += 360;
                refreshImg.style.transform = 'rotate(' + refreshImgDeg + 'deg)';
            },
            getChineseDay: function(day) {
                var cDay = ['一', '二', '三', '四', '五', '六', '日'];
                return cDay[day];
            },
            getBarHeight: function(arr) {
                var hlist = [];
                var largest = Math.max.apply(null, arr);
                var unit = 100 / largest;
                arr.forEach(function(count) {
                    hlist.push(count * unit + 'px');
                });
                return hlist;
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import '../../css/statistics-vue.scss';
</style>
