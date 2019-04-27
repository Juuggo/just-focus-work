var STORAGE_KEY = 'todos-vuejs';
export default {
    fetch: function() {
        let storageData = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
        let todos = storageData.todos ? storageData.todos : [];
        let todoStatic = storageData.todoStatic ? storageData.todoStatic : {};
        // todos.forEach(function(todo, index) {
            // todo.id = index;
        // })
        // this.uid = todos.length;
        let obj = {};
        obj.todos = todos;
        obj.todoStatic = todoStatic;
        return obj;
    },
    save: function(type, value) {
        let storageData = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
        storageData[type] = value;
        localStorage.setItem(STORAGE_KEY, JSON.stringify(storageData));
    },
}
