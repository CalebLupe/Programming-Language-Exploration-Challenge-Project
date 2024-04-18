interface TodoItem {
    id: number;
    content: string;
    completed: boolean;
    date: string;
}

class TodoList {
    private todos: TodoItem[] = [];
    private nextId: number = 1;

    constructor(private todoListElement: HTMLUListElement) {}

    add(content: string): void {
        const inputElement = document.getElementById('todoDate') as HTMLInputElement;
        const date = inputElement.value.trim(); 

        const newTodo: TodoItem = {
            id: this.nextId,
            content: content,
            completed: false,
            date: date
        };
        this.todos.push(newTodo);
        this.nextId++;
        this.render();
    }

    delete(index: number): void {
        this.todos.splice(index, 1);
        this.render();
    }

    toggleCompletion(index: number): void {
        this.todos[index].completed = !this.todos[index].completed;
        this.render();
    }

    edit(index: number, content: string): void {
        this.todos[index].content = content;
        this.render();
    }

    downloadTasks(): void {
        const tasksText = this.todos.map(todo => {
            return `${todo.content}${todo.date ? ' - ' + todo.date : ''}`;
        }).join('\n');

        const blob = new Blob([tasksText], { type: 'text/plain' });
        const url = window.URL.createObjectURL(blob);

        const a = document.createElement('a');
        a.href = url;
        a.download = 'todo_tasks.txt';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
    }

    render(): void {
        this.todoListElement.innerHTML = '';
        this.todos.forEach((todo, index) => {
            const todoItem = document.createElement('li');
    
            const todoContent = document.createElement('span');
            todoContent.textContent = todo.content;
            if (todo.date) {
                todoContent.textContent += ' - ' + todo.date;
            }
            todoItem.appendChild(todoContent);
    
            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Delete';
            deleteButton.addEventListener('click', () => {
                this.delete(index);
            });
            todoItem.appendChild(deleteButton);
    
            const editButton = document.createElement('button');
            editButton.textContent = 'Edit';
            editButton.addEventListener('click', () => {
                const newContent = prompt('Enter new content:', todo.content);
                if (newContent) {
                    this.edit(index, newContent);
                }
            });
            todoItem.appendChild(editButton);
    
            const completionContainer = document.createElement('div');
            completionContainer.classList.add('completion-container');
    
            const checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.checked = todo.completed;
            checkbox.addEventListener('change', () => {
                this.toggleCompletion(index);
            });
            completionContainer.appendChild(checkbox);
    
            const checkboxLabel = document.createElement('label');
            checkboxLabel.textContent = 'Completed';
            completionContainer.appendChild(checkboxLabel);
    
            todoItem.appendChild(completionContainer);
    
            this.todoListElement.appendChild(todoItem);
        });
    }        
}

const todoList = new TodoList(document.getElementById('todoList') as HTMLUListElement);

function addTodo(): void {
    const inputElement = document.getElementById('todoInput') as HTMLInputElement;
    if (inputElement.value) {
        todoList.add(inputElement.value);
        inputElement.value = '';
    }
}

function downloadTasks(): void {
    todoList.downloadTasks();
}
todoList['downloadTasks'] = TodoList.prototype.downloadTasks;
