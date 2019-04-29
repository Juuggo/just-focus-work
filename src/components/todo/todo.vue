<template>
    <div id="component-todo">
        <header>
            <div class="icon"></div>
        </header>
        <div class="topbar">
            <todo-new class="todo-new" @addTodo="addTodo"></todo-new>
            <nav v-show="todos.length" v-cloak
                 @click="toggleNav">
                <div class="spot"></div>
                <div class="darker-cover" v-show="isNavOpen"></div>
                <todo-filter class="todo-filter"
                    :class="{ 'card-show' : isNavOpen }"
                    v-show="isNavOpen"
                    :visibility="visibility"
                    :is-nav-open="isNavOpen"
                    :show="todos.length > remaining"
                    @removeCompleted="removeCompleted"
                ></todo-filter>
            </nav>
        </div>
        <section class="todo-task__container" v-show="todos.length" v-cloak>
            <ul id="todo-drag-list">
                <li v-for="todo in filteredTodos"
                    :key="todo.order">
                    <todo-task 
                        :class="{ completed:todo.completed, editing: todo == editedTodo }"
                        :todo="todo" 
                        :editedTodo="editedTodo"
                        @toggleCompleted="toggleCompleted($event, todo)"
                        @editTodo="editTodo(todo)"
                        @removeTodo="removeTodo(todo)"
                        @doneEdit="doneEdit(todo)"
                        @cancelEdit="cancelEdit(todo)"
                    ></todo-task>
                </li>
            </ul>
        </section>
    </div>
</template>

<script>
    import todoStorage from './todoStorage.js';
    import filters from './filters.js';
    import todoNew from './todo-new.vue';
    import todoTask from './todo-task.vue';
    import todoFilter from './todo-filter.vue';
    import Sortable from 'sortablejs';
    import instructions from '../../js/instructions.js';

    var componentTodo = {
        data: function() {
            return {
                todos: todoStorage.fetch().todos,
                visibility: 'all',
                editedTodo: null,
                dailyCompleted: todoStorage.fetch().dailyCompleted,
                isNavOpen: false,
            }
        },
        mounted: function() {
            let _this = this;
            this.enableDrag();
            if (this.todos.length === 0 && 
                JSON.stringify(this.dailyCompleted) === '{}') {
                instructions.instructions.forEach(function(instruct) {
                    _this.addTodo(instruct);
                });
            }
        },
        components: {
            todoNew,
            todoTask,
            todoFilter
        },
        methods: {
            addTodo: function(newTodo) {
                var value = newTodo && newTodo.trim();
                if (!value) {
                    return;
                }
                this.todos.push({ 
                    title: value, 
                    completed: false,
                    // id: todoStorage.uid++,
                    order: this.todos.length,
                });
            },
            removeTodo: function(todo) {
                var index = this.todos.indexOf(todo);
                this.todos.splice(index, 1);
            },
            editTodo: function(todo) {
                this.beforeEditCache = todo.title;
                this.editedTodo = todo; 
            },
            cancelEdit: function(todo) {
                this.editedTodo = null;
                todo.title = this.beforeEditCache;
            },
            doneEdit: function(todo) {
                if (!this.editedTodo) {
                    return;
                }
                this.editedTodo = null;
                todo.title = todo.title.trim();
                if (!todo.title) {
                    this.removeTodo(todo);
                }
            },
            removeCompleted: function() {
                this.todos = filters['active'](this.todos);
            },
            toggleCompleted: function(checked, todo) {
                todo.completed = checked;

                let completeDate = new Date();
                completeDate = completeDate.toLocaleDateString();
                if (todo.completed) {
                    todo.completeDate = completeDate;
                    if (this.dailyCompleted[completeDate]) {
                        this.$set(this.dailyCompleted, completeDate, this.dailyCompleted[completeDate]+1);
                    } else {
                        this.$set(this.dailyCompleted, completeDate, 1);
                    }
                } else {
                    todo.completeDate = null;
                    this.$set(this.dailyCompleted, completeDate, this.dailyCompleted[completeDate]-1);
                };
            },
            toggleNav: function() {
                this.isNavOpen = !this.isNavOpen;
            },
            enableDrag: function(){
                var el = document.getElementById('todo-drag-list');
                var sortable = new Sortable(el, {
                    animation: 150
                });
            }
        },
        computed: {
            filteredTodos: function(){
                return filters[this.visibility](this.todos);
            },
            remaining: function(){
                return filters['active'](this.todos).length;
            },
        },
        watch: {
            todos: {
                handler: function(todos) {
                    todoStorage.save('todos', todos);
                },
                deep: true,
            },
            dailyCompleted: {
                handler: function(dailyCompleted) {
                    todoStorage.save('dailyCompleted', dailyCompleted);
                },
                deep: true,
            },
            filteredTodos: {
                handler: function() {
                    this.enableDrag();
                    
                },
                deep: true,
            }
        },
    }
    export default componentTodo;
</script>

<style lang="scss" scoped>
    @import '../../css/todo-vue.scss';
</style>
