<template>
    <input class="newTodo" type="text" placeholder="新建待办事项" v-model="newTodo" @keyup.enter="addTodo">
</template>

<script>
    export default {
        data: function() {
            return {
                newTodo: ''
            }
        },
        methods: {
            addTodo: function() {
                this.$emit('addTodo', event.target.value);
                this.newTodo = '';
            },
        }
    }
</script>

<style lang="scss" scoped>
    @import '../../css/todo-new.scss';
</style>
