<template>
    <button v-longpress="'stop'" v-click="'toggle'" class="pomo-btn">
        开始/暂停<br />长按结束
    </button>
</template>

<script>
    export default {
        props: [
            'pomoSession',
        ],
        model: {
            prop: 'checked',
            event: 'change',
        }
    }
</script>

<style lang="scss" scoped>
    @import '../../css/pomo-control.scss';
</style>
