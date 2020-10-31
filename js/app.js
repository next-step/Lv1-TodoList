import { TodoInput } from './TodoList/TodoInput.js';
import { TodoList } from './TodoList/TodoList.js';
import { TodoFilter } from './TodoList/TodoFilter.js';
import { Template, TemplateEditing, TemplateCompleted } from './TodoList/Templates.js';

console.log('TEST: TodoList init', );

class App {
    constructor () {
        this.ID = 0;
        this.item = [] // {id, context, complete}, {id: ID++, context: 'test', complete: false}
        this.TodoInput = new TodoInput(this);
        this.TodoList = new TodoList(this);
        this.TodoFilter = new TodoFilter(this);
        this.Template = Template

        // this.$TodoInput = document.getElementById('new-todo-title')
        this.$TodoList = document.getElementById('todo-list')
        this.$TodoCount = document.querySelector('.todo-count strong');
    }

    itemBeforeRender () {
        return this.item.map(v => Template(v))
    }
    render() {
        const result = this.itemBeforeRender().join()
        this.$TodoList.innerHTML = '';
        this.$TodoList.insertAdjacentHTML('beforeend', result)
        this.$TodoCount.innerText = this.itemBeforeRender().length
    }
    
    addItem (inputValue) {
        const eachItem = {id: this.ID++, context: inputValue, complete: false}
        console.log('TEST: addItem', eachItem);
        this.item.push(eachItem)
        this.render()
    }
    beforeUpdateItem () {}
    afterUpdateItem (targetElement, value) {
        console.log('TEST: afterUpdateItem', );
        const itemId = targetElement.id.replace('item-', '')
        this.item = this.item.map(v => {
            if ( parseInt(itemId) === v.id) {
                v.context = value
            }
            console.log('TEST: ', v);
            return v
        })
        this.render();
    }
    deleteItem (targetElement) {
        const itemId = targetElement.id.replace('item-', '')
        this.item = this.item.filter( v =>  (parseInt(itemId) === v.id) ? false : true )
        console.log('TEST: deleteItem ', itemId, this.item);
        this.render();
    }
    completeItem (targetElement) {
        // item값 변경 
        const itemId = targetElement.id.replace('item-', '')
        console.log('TEST: completeItem enter', itemId, targetElement);
        this.item = this.item.map(v => {
            console.log('TEST: completeItem map', v);
            if ( v.id === parseInt(itemId) ) {
                v.complete = !v.complete
            }
            return v
        })
    }
}

const todo = new App();