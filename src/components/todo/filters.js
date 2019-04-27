export default {
    all: function(todos) {
        todos.forEach(function(e, i) {
        })
        return todos;
    },
    active: function(todos) {
        var activeTodos = todos.filter(function(todo) {
            return !todo.completed;
        });
        activeTodos.forEach(function(e, i) {
        });
        return activeTodos;
    },
    completed: function(todos) {
        var completedTodos = todos.filter(function(todo) {
            return todo.completed;
        });
        completedTodos.forEach(function(e, i) {
        });
        return completedTodos;
    }
}
