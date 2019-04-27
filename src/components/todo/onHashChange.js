import filters from './todoFilter.js'

export default function(todoApp) {
    var visibility = window.location.hash.replace(/#\/?/, '');
    if (filters[visibility]) {
        todoApp.visibility = visibility;
    } else {
        window.location.hash = '';
        todoApp.visibility = 'all';
    }
}
