<template>
    <div>今日专注时长：{{ `${todayStatistics.hour}时${todayStatistics.minute}分` }}</div>
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
