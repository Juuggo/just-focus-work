<template>
    <div>
        <p>今日专注时长</p>
        <p>{{ `${todayStatistics.hour}时${todayStatistics.minute}分` }}</p>
    </div>
</template>
<script>
    export default {
        props: [
            'todayStatistics',
        ]
    }
</script>
<style lang="scss" scoped>
    @import "../../css/pomo-today.scss";
</style>
