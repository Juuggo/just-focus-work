<template>
    <ul class="filters">
        <li><a href="#/all" :class="{selected: visibility == 'all'}">全部待办</a></li>
        <li><a href="#/active" :class="{selected: visibility == 'active'}">未完成待办</a></li>
        <li><a href="#/completed" :class="{selected: visibility == 'completed'}">已完成待办</a></li>
        <li><p class="hr"></p></li>
        <li>
            <p class="clear-completed" @click="$emit('removeCompleted')" v-show="show">清空已完成待办</p>
        </li>
    </ul>
</template>

<script>
    export default {
        props: [
            'visibility',
            'show',
        ]
    }
</script>

<style lang='scss' scoped>
    @import "../../css/todo-filter.scss";
</style>
