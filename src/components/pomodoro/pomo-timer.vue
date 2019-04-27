<template>
    <div>
        <div class="pomoSession" v-if="pomoSession == 'idle' ">~开始工作吧~</div>
        <div class="pomoSession" v-else>{{ pomoSession == "focus" ? "～沉浸工作～" : "～休息一下～" }} </div>
        <div class="canvas-container">
            <canvas id="circle" width="200px" height="200px"></canvas>
            <canvas id="timer" width="200px" height="200px"></canvas>
        </div>
        <div class="pomo-countdown" @click="openSettings">
            {{`${minutes}:${seconds}`}}
        </div>
    </div>
</template>

<script>
    export default {
        props: [
            'minutes',
            'seconds',
            'pomoSession',
        ],
        methods: {
            openSettings: function() {
                this.$emit('toggle-settings');
            }
        },
    }
</script>

<style lang="scss" scoped>
    @import '../../css/pomo-timer.scss';
</style>
