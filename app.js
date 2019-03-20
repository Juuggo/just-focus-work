var STORAGE_KEY = 'todo-vurjs-2.0';
var todoStorage = {
    fetch: function() {
        var todos = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
        todos.forEach(function(todo, index) {
            todo.id = index;
        })
        todoStorage.uid = todos.length;
        return todos;
    },
    save: function(todos) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
    }
}

var filters = {
    all: function(todos) {
        return todos;
    },
    active: function(todos) {
        return todos.filter(function(todo) {
            return !todo.completed;
        });
    },
    completed: function(todos) {
        return todos.filter(function(todo) {
            return todo.completed;
        });
    }
}

var todoApp = new Vue({
    data: {
        todos: todoStorage.fetch(),
        newTodo: '',
        visibility: 'all',
        editedTodo: null,
    },
    methods: {
        addTodo: function() {
            var value = this.newTodo && this.newTodo.trim();
            if (!value) {
                return;
            }
            this.todos.push({ 
                title: value, 
                completed: false,
                id: todoStorage.uid++,
            });
            this.newTodo = '';
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
    },
    computed: {
        filteredTodos: function(){
            return filters[this.visibility](this.todos);
        },
        remaining: function(){
            return filters['active'](this.todos).length;
        }
    },
    directives: {
        'todo-focus': function(el, binding) {
            if (binding.value) {
                el.focus();
            }
        }
    },
    watch: {
        todos: {
            handler: function(todos) {
                todoStorage.save(todos);
            },
            deep: true,
        }
    },
    filters: {
        pluralize: function(n) {
            return n === 1 ? 'item' : 'items';
        }
    },
})

function onHashChange() {
    console.log('hashchanges');
    var visibility = window.location.hash.replace(/#\/?/, '');
    if (filters[visibility]) {
        todoApp.visibility = visibility;
    } else {
        window.location.hash = '';
        todoApp.visibility = 'all';
    }
}

window.addEventListener('hashchange', onHashChange);
onHashChange();

todoApp.$mount('.todoapp');
