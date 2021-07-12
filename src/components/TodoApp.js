import TodoItem from './TodoItem.js';
import TodoInput from './TodoInput.js';
import TodoList from './TodoList.js';
import TodoCount from './TodoCount.js';
import { TodoFilter, FilterType } from './TodoFilter.js';

export default function TodoApp() {
  const localStorageKey = 'TODOS';
  let id = 0;
  this.todoItems = [];

  this.init = () => {
    const savedItems = localStorage.getItem(localStorageKey);
    if (savedItems) {
      const parsedItems = JSON.parse(localStorage.getItem(localStorageKey));
      this.todoItems = parsedItems ? parsedItems : [];
      id = parsedItems ? parsedItems.length : 0;

      todoList.setState(parsedItems);
      todoCount.setState(parsedItems);
    }
  };

  const saveItems = () => {
    localStorage.setItem(localStorageKey, JSON.stringify(this.todoItems));
  };

  this.setState = (updatedItems) => {
    this.todoItems = updatedItems;
    todoList.setState(this.todoItems);
  };

  const todoCount = new TodoCount();

  new TodoInput({
    onAdd: (contents) => {
      const newTodoItem = new TodoItem(contents, ++id);
      this.todoItems.push(newTodoItem);
      this.setState(this.todoItems);
      todoCount.setState(this.todoItems);

      saveItems();
    },
  });

  const todoList = new TodoList({
    onEditing: (id) => {
      this.todoItems = this.todoItems.map((item) => {
        if (item.id === id) {
          item.editing = !item.editing;
        }
        return item;
      });
      todoList.setState(this.todoItems);
      todoCount.setState(this.todoItems);
      saveItems();
    },
    onComplete: (id) => {
      this.todoItems = this.todoItems.map((item) => {
        if (item.id === id) {
          item.completed = !item.completed;
        }
        return item;
      });
      todoList.setState(this.todoItems);
      todoCount.setState(this.todoItems);
      saveItems();
    },
    onDelete: (id) => {
      this.todoItems = this.todoItems.filter((item) => {
        return item.id !== id;
      });
      todoList.setState(this.todoItems);
      todoCount.setState(this.todoItems);
      saveItems();
    },
    onEdit: (e, id) => {
      if (e.key === 'Enter') {
        this.todoItems = this.todoItems.map((item) => {
          if (item.id === id) {
            item.contents = e.target.value;
            item.editing = false;
          }
          return item;
        });
        todoList.setState(this.todoItems);
        todoCount.setState(this.todoItems);
        saveItems();
      }
      if (e.key === 'Escape') {
        this.todoItems = this.todoItems.map((item) => {
          if (item.id === id) {
            item.editing = false;
          }
          return item;
        });
        todoList.setState(this.todoItems);
        todoCount.setState(this.todoItems);
        saveItems();
      }
    },
  });

  new TodoFilter({
    filtering: (type) => {
      if (type === FilterType.all) {
        todoList.setState(this.todoItems);
        todoCount.setState(this.todoItems);
        return;
      }
      if (type === FilterType.active) {
        const activeItems = this.todoItems.filter((item) => {
          return item.completed === false;
        });
        todoList.setState(activeItems);
        todoCount.setState(activeItems);
        return;
      }
      if (type === FilterType.completed) {
        const completedItems = this.todoItems.filter((item) => {
          return item.completed === true;
        });
        todoList.setState(completedItems);
        todoCount.setState(completedItems);
        return;
      }
    },
  });
}
