import { setTodo } from "../util/localStorage.js";
import TodoList from "./TodoList.js";

function Main({$app, initalState}) {
    this.state = initalState;
    const $main = document.createElement("main");
    $app.appendChild($main);

    const todoList = new TodoList({
        $main,
        initalState: this.state.toDos,
        onClick: (idx, name) => {
            console.log(idx, name);
        }
    })
    this.setState = (nextState) => {
        this.state = nextState;
        setTodo(this.state.toDos)
        todoList.setState(this.state.toDos)
    }
}

export default Main