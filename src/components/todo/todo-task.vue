<template>
    <div class='todo-task'>
        <div class="view">
            <input type="checkbox" class="toggle" :checked="todo.completed" @change="$emit('toggleCompleted', $event.target.checked)">
            <label @dblclick="$emit('editTodo')">{{ todo.title }}</label>
            <button class="destroy" @click="$emit('removeTodo')"></button>
        </div>
        <input class="edit" type="text"
               v-model="todo.title"
               v-todo-focus="todo == editedTodo"
               @blur="$emit('doneEdit')"
               @keyup.enter="$emit('doneEdit')"
               @keyup.esc="$emit('cancelEdit')">
    </div>
</template>

<script>
    export default {
        props: [
            'todo',
            'editedTodo'
        ],
        directives: {
            'todo-focus': function(el, binding) {
                if (binding.value) {
                    el.focus();
                }
            }
        },
    }
</script>

<style lang="scss" scoped>
    @import "../../css/todo-task.scss";
</style>
