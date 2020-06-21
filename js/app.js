const todo_ul = document.querySelector(".todo-list")
const todo_input = document.querySelector(".new-todo") 
const count_span = document.querySelector(".todo-count")
const filt_ul = document.querySelector(".filters")
const all_a = filt_ul.querySelector(".all")
const active_a = filt_ul.querySelector(".active")
const complete_a = filt_ul.querySelector(".completed")
const Enter = "Enter"
const Esc = "Escape"
const All = "all"
const Active = 'active'
const Completed = 'completed'
let todo_list = []
let id = 0

function localTodo() {
    const local_todo = localStorage.getItem("todo_list")
    if (local_todo === null || JSON.parse(local_todo).length === 0) {
        todo_list = []
    } else {
        todo_list = JSON.parse(local_todo)
        todo_list.forEach(function(todo){
            drawTodo(todo)
        })
        countTodo()
        id = todo_list[todo_list.length - 1].id + 1
    }
}

function localSave() {
    localStorage.setItem("todo_list", JSON.stringify(todo_list))
}

function allClear() {
    todo_ul.innerHTML = ""
    all_a.classList.remove("selected")
    active_a.classList.remove("selected")
    complete_a.classList.remove("selected")
}

function viewFilter(event) {
    event.preventDefault()
    allClear()
    filterTodo(event.target.classList[0]).forEach(function(todo){
        drawTodo(todo)
    })
}

function filterTodo(click_btn) {
    const filter_todo = todo_list.filter(function(todo){
        if (click_btn === All) {
            all_a.classList.add("selected")
            return true
        } else if (click_btn === Active) {
            active_a.classList.add("selected")
            return !todo.complete
        } else if (click_btn === Completed) {
            complete_a.classList.add("selected")
            return todo.complete
        }
    })
    return filter_todo
}

function countTodo() {
    const total_todo = todo_list.length
    count_span.innerText = `총 ${total_todo} 개`
}

function deleteTodo(event) {
    if (event.target.nodeName === "BUTTON") {
        const li = event.target.closest("li")
        const todo = findTodo(li)
        todo_list.splice(todo_list.indexOf(todo), 1)
        todo_ul.removeChild(li)
        countTodo()
        localSave()
    }
}

function editingTodo(event) {
    if (event.target.nodeName === "INPUT" && event.target.classList[0] === "edit") {
        const li = event.target.parentElement
        const label = li.querySelector(".label")
        if (event.key === Esc) {
            li.classList.remove("editing")
            event.target.value = label.innerText
        } else if (event.key === Enter) {
            if (!checkBlank(event.target.value)) {
                todo = findTodo(li)
                label.innerText = event.target.value
                li.classList.remove("editing")
                todo.todo = label.innerText
                localSave()
            }
        }
    }
}

function editTodo(event) {
    if (event.target.nodeName === "LABEL") {
        const li = event.target.closest("li")
        li.classList.add("editing")
    }
}

function findTodo(li) {
    return todo_list.find(todo => todo.id === parseInt(li.id))
}

function todoComplete(event) {
    if (event.target.nodeName === "INPUT" && event.target.classList[0] === "toggle") {
        const li = event.target.closest("li")
        todo = findTodo(li)
        if (event.target.checked) {
            li.classList.add("completed")
            todo.complete = true
        } else {
            li.classList.remove("completed")
            todo.complete = false
        }
        localSave()
    }
}

function save(current_todo, boolean) {
    todo = {
        'todo': current_todo,
        'complete': boolean,
        id
    }
    id = id + 1
    todo_list.push(todo)
    return todo
}

function checkBlank(input_value){
    return !input_value
}

function inputTodo(event) {
    if (event.key === Enter) {
        current_todo = todo_input.value
        todo_input.value = ""
        if (!checkBlank(current_todo)) {
            const todo = save(current_todo, false)
            drawTodo(todo)
            countTodo()
            localSave()
        }
    }
}

function drawTodo(todo) {
    const todoItemTemplate = function(todo, complete, checked){
        return `
        <li id=${todo.id} class=${complete}>
            <div class="view">
                <input class="toggle" type="checkbox" ${checked} />
                <label class="label">${todo.todo}</label>
                <button class="destroy"></button>
            </div>
            <input class="edit" value="${todo.todo}" />
        </li>
        `
    }
    if (todo.complete) {
        const todoItem = todoItemTemplate(todo, "completed", "checked")
        todo_ul.innerHTML += todoItem
    } else {
        const todoItem = todoItemTemplate(todo, "", "")
        todo_ul.innerHTML += todoItem
    } 
}

function init() {
    todo_input.addEventListener("keyup", inputTodo)
    all_a.addEventListener("click", viewFilter)
    active_a.addEventListener("click", viewFilter)
    complete_a.addEventListener("click", viewFilter)
    todo_ul.addEventListener("change", todoComplete)
    todo_ul.addEventListener("keyup", editingTodo)
    todo_ul.addEventListener("dblclick", editTodo)
    todo_ul.addEventListener("click", deleteTodo)
    localTodo()
}

init()
