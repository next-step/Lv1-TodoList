import TodoList from "./TodoList.js";
import TodoInput from "./TodoInput.js";
import TodoCount from "./TodoCount.js";
import TodoFilter from "./TodoFilter.js";
import { ALL, ACTIVE, EDITING, COMPLETED } from "../utils/constants.js";

export default function TodoApp() {
    this.todoItems = [];

    this.setState = updatedItems => {

        this.todoList.setState(updatedItems);
        this.todoCount.setState(updatedItems);
        this.todoFilter.setState(updatedItems);
    };

    this.onHandleToggle = targetId => {
        const $index =  this.todoItems.findIndex(item => item.id === Number(targetId));

        let updatedItems = [ ...this.todoItems ];
        updatedItems[$index] = {... updatedItems[$index],
            status: updatedItems[$index].status === ACTIVE ? COMPLETED : ACTIVE,
            checked: !updatedItems[$index].checked
        };

        this.todoItems = updatedItems;
        this.setState(updatedItems);
    };

    this.saveTodoItems = (targetId, todoContext) => {
        const $index =  this.todoItems.findIndex(item => item.id === Number(targetId));

        let updatedItems = [ ...this.todoItems ];
        updatedItems[$index] = {... updatedItems[$index],
            status: ACTIVE,
            title: todoContext
        };

        this.todoItems = updatedItems;
        this.setState(updatedItems);
    };

    // editing
    this.onEdit = (targetId) => {
        let updatedItems = [ ...this.todoItems ];
        const $index = this.todoItems.findIndex(item => item.id === Number(targetId));
        if(this.todoItems[$index].status !== COMPLETED) {
            this.todoItems.map(item => {
                if(item.id === Number(targetId)) {
                    updatedItems[$index] = {... updatedItems[$index],
                        status: EDITING
                    };
                } else if(item.id !== Number(targetId) && item.status === EDITING) {
                    const $bfIndex = this.todoItems.findIndex(bf => bf.id === item.id);
                    updatedItems[$bfIndex] = {... updatedItems[$bfIndex],
                        status: ACTIVE
                    };
                }
            });
            this.setState(updatedItems);
            this.todoItems = updatedItems;
        }
    };

    this.onEditOff =targetId => {
        let updatedItems = [ ...this.todoItems ];
        const $index = this.todoItems.findIndex(item => item.id === Number(targetId));
        updatedItems[$index] = {... updatedItems[$index],
            status: ACTIVE
        };
        this.setState(updatedItems);
        this.todoItems = updatedItems;
    };

    this.onDelete = targetId => {
        const $index =  this.todoItems.findIndex(item => item.id === Number(targetId));
        let updatedItems = [ ...this.todoItems ];
        if($index > -1) updatedItems.splice($index, 1);

        this.todoItems = updatedItems;
        this.setState(updatedItems);
    };

    this.filterSelectedType = (type) => {
        let updatedItems;
        if(type === ALL) {
            updatedItems = this.todoItems;
        } else {
            updatedItems = this.todoItems.filter(item => item.status === type);
        }
        this.setState(updatedItems);
    };

    this.todoInput = new TodoInput({
        todoItems: this.todoItems,
        onAdd: item => {
            const maxId = Math.max(...this.todoItems.map(item => item.id), 0);
            this.todoItems.push({ ...item, id: maxId + 1 });
            this.setState(this.todoItems);
        }
    });

    this.todoList = new TodoList({
        onHandleToggle: id => this.onHandleToggle(id),
        onEdit: (id) => this.onEdit(id),
        onEditOff: (id) => this.onEditOff(id),
        onDelete: id => this.onDelete(id),
        saveTodoItems: (targetId, todoContext) => this.saveTodoItems(targetId, todoContext)
    });

    this.todoCount = new TodoCount({
        todoItems: this.todoItems
    });
    this.todoFilter = new TodoFilter({
        todoItems: this.todoItems,
        onFilter: this.filterSelectedType,
    });

    this.init = () => {
        this.setState(this.todoItems);
    };

    this.init();

}
