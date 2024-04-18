"use strict";
var TodoList = /** @class */ (function () {
    function TodoList(todoListElement) {
        this.todoListElement = todoListElement;
        this.todos = [];
        this.nextId = 1;
    }
    TodoList.prototype.add = function (content) {
        var inputElement = document.getElementById('todoDate');
        var date = inputElement.value.trim();
        var newTodo = {
            id: this.nextId,
            content: content,
            completed: false,
            date: date
        };
        this.todos.push(newTodo);
        this.nextId++;
        this.render();
    };
    TodoList.prototype.delete = function (index) {
        this.todos.splice(index, 1);
        this.render();
    };
    TodoList.prototype.toggleCompletion = function (index) {
        this.todos[index].completed = !this.todos[index].completed;
        this.render();
    };
    TodoList.prototype.edit = function (index, content) {
        this.todos[index].content = content;
        this.render();
    };
    TodoList.prototype.downloadTasks = function () {
        var tasksText = this.todos.map(function (todo) {
            return "".concat(todo.content).concat(todo.date ? ' - ' + todo.date : '');
        }).join('\n');
        var blob = new Blob([tasksText], { type: 'text/plain' });
        var url = window.URL.createObjectURL(blob);
        var a = document.createElement('a');
        a.href = url;
        a.download = 'todo_tasks.txt';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
    };
    TodoList.prototype.render = function () {
        var _this = this;
        this.todoListElement.innerHTML = '';
        this.todos.forEach(function (todo, index) {
            var todoItem = document.createElement('li');
            var todoContent = document.createElement('span');
            todoContent.textContent = todo.content;
            if (todo.date) {
                todoContent.textContent += ' - ' + todo.date;
            }
            todoItem.appendChild(todoContent);
            var deleteButton = document.createElement('button');
            deleteButton.textContent = 'Delete';
            deleteButton.addEventListener('click', function () {
                _this.delete(index);
            });
            todoItem.appendChild(deleteButton);
            var editButton = document.createElement('button');
            editButton.textContent = 'Edit';
            editButton.addEventListener('click', function () {
                var newContent = prompt('Enter new content:', todo.content);
                if (newContent) {
                    _this.edit(index, newContent);
                }
            });
            todoItem.appendChild(editButton);
            var completionContainer = document.createElement('div');
            completionContainer.classList.add('completion-container');
            var checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.checked = todo.completed;
            checkbox.addEventListener('change', function () {
                _this.toggleCompletion(index);
            });
            completionContainer.appendChild(checkbox);
            var checkboxLabel = document.createElement('label');
            checkboxLabel.textContent = 'Completed';
            completionContainer.appendChild(checkboxLabel);
            todoItem.appendChild(completionContainer);
            _this.todoListElement.appendChild(todoItem);
        });
    };
    return TodoList;
}());
var todoList = new TodoList(document.getElementById('todoList'));
function addTodo() {
    var inputElement = document.getElementById('todoInput');
    if (inputElement.value) {
        todoList.add(inputElement.value);
        inputElement.value = '';
    }
}
function downloadTasks() {
    todoList.downloadTasks();
}
todoList['downloadTasks'] = TodoList.prototype.downloadTasks;
//# sourceMappingURL=app.js.map