import faker from 'faker'

export default class Controller {
  constructor(model, view) {
    this.model = model
    this.view = view

    this.view.controllerEvents = {
      addTodo: this.addTodo,
      removeTodo: this.removeTodo,
      completeTodo: this.completeTodo,
      toggleModifyTodo: this.toggleModifyTodo,
      filterStatus: this.filterStatus,
      modifyTodo: this.modifyTodo,
    }
  }

  addTodo = (e) => {
    const { state, setState } = this.model
    const { el, render } = this.view

    if (e.key === 'Enter' && el.todoInput.value !== '') {
      let newState = [...state.todos]
      newState.push({
        id: faker.random.uuid(),
        title: el.todoInput.value,
        status: 'active',
      })

      setState({
        todos: newState,
      })
      render(this.model.state)
      el.todoInput.value = ''
      this.saveTodos()
    }
  }

  removeTodo = (e) => {
    const { state, setState } = this.model
    const { render } = this.view
    if (e.target.classList.contains('destroy')) {
      const id = e.target.closest('li').getAttribute('data-id')
      const newState = state.todos.filter((value) => value.id !== id)

      setState({
        todos: newState,
      })
      render(this.model.state)
      this.saveTodos()
    }
  }

  completeTodo = (e) => {
    const { state, setState } = this.model
    const { render } = this.view

    const filterStatus = (id, status) => {
      return [...state.todos].map((value) => {
        if (value.id === id) value.status = status
        return value
      })
    }

    const type = document.querySelector('.selected').className.split(' ')

    if (e.target.classList.contains('toggle')) {
      const id = e.target.closest('li').getAttribute('data-id')

      if (e.target.checked) {
        setState({ todos: filterStatus(id, 'completed') })
      } else {
        setState({ todos: filterStatus(id, 'active') })
      }

      render(this.model.state, type[0])
      this.saveTodos()
    }
  }

  toggleModifyTodo = (e) => {
    if (!document.querySelector('.editing')) {
      e.target.closest('li').classList.add('editing', 'active')
    }
  }

  modifyTodo = (e) => {
    const { state, setState } = this.model
    const { render } = this.view

    const changeValue = (id, title) => {
      return [...state.todos].map((value) => {
        if (value.id === id) value.title = title
        return value
      })
    }

    const type = document.querySelector('.selected').className.split(' ')

    if (e.key === 'Escape' && document.querySelector('.editing')) {
      document.querySelector('.editing').classList.remove('editing')
    } else if (e.key === 'Enter' && document.querySelector('.editing')) {
      const id = document.querySelector('.editing').getAttribute('data-id')

      setState({
        todos: changeValue(
          id,
          document.querySelector('.editing').getElementsByClassName('edit')[0]
            .value
        ),
      })
      render(this.model.state, type[0])
      this.saveTodos()
    }
  }

  filterStatus = (e) => {
    const { render } = this.view
    if (e.target.tagName === 'A') {
      const type = e.target.className.split(' ')

      if (type.length === 1) {
        document.querySelector('.selected').classList.remove('selected')
        e.target.classList.add('selected')
      }

      render(this.model.state, type[0])
    }
  }

  saveTodos() {
    const { state } = this.model
    localStorage.setItem('todos', JSON.stringify(state.todos))
  }

  getTodos() {
    const todos = localStorage.getItem('todos')
    if (todos) return JSON.parse(todos)
    else return []
  }

  init() {
    const { setState } = this.model
    const { render } = this.view
    const getTodos = this.getTodos()

    setState({ todos: getTodos })
    render(this.model.state)
  }
}
