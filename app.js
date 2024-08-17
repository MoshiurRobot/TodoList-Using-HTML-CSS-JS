//selectors

const TodoInput = document.querySelector('.todo-input')
const TodoButton = document.querySelector('.todo-button')
const TodoList = document.querySelector('.todo-list')
const filterOption = document.querySelector('.filter-todo')

//Event Listener

document.addEventListener('DOMContentLoaded', getTodos);
TodoButton.addEventListener('click',addTodo)
TodoList.addEventListener('click',deleteCheck)
filterOption.addEventListener('click',filterTodo)


//Functions

function addTodo(event){
    //preventing from resubmitting 
    event.preventDefault();

    //Todo Div making 
    const todoDiv = document.createElement('div');
    //Naming div class
    todoDiv.classList.add('todo')
    //creating list (<li>)
    const newTodo = document.createElement('li')
    newTodo.innerText= TodoInput.value
    newTodo.classList.add('todo-item')
    todoDiv.appendChild(newTodo)

    //adding to local
    saveLocalTodos(TodoInput.value)
    //Completed btn
    const completedButton = document.createElement('button')
    completedButton.innerHTML = '<i class="fas fa-check"></i>'
    completedButton.classList.add('complete-btn')
    todoDiv.appendChild(completedButton)

    //Trash btn
    const trashButton = document.createElement('button')
    trashButton.innerHTML = '<i class="fas fa-trash"></i>'
    trashButton.classList.add('trash-btn')
    todoDiv.appendChild(trashButton)

    //append into TodoList to get structure like ul>div>li
    TodoList.appendChild(todoDiv)
    // clear the text input area
    TodoInput.value = ''
}

function deleteCheck(dcEvent){
    const item = dcEvent.target
   
    //Delete items
    if(item.classList[0] == 'trash-btn'){
        const todo = item.parentElement

        //animation for deleting
        todo.classList.add('fall')
        //hitting deletion from localStorage
        RemoveLocalTodos(todo);
        //transitionend wait until the animation over then remove the item
        todo.addEventListener('transitionend',function(){
            todo.remove()
        })
    }

    //check Mark as done
    if(item.classList[0] == 'complete-btn'){
        const todo = item.parentElement
        todo.classList.toggle('completed')
    }
}

//filtering tasks
function filterTodo(fEvent){
    const todos = TodoList.childNodes
    console.log(todos)
    todos.forEach(function(todo){
        switch(fEvent.target.value){
            case "all":
                todo.style.display = "flex"
                break;
            case "completed":
                if(todo.classList.contains('completed')){
                    todo.style.display = "flex"
                }else{
                    todo.style.display = "none"
                }
                break;
            case "uncompleted":
                if(!todo.classList.contains('completed')){
                    todo.style.display = "flex"
                }else{
                    todo.style.display = "none"
                }
                break;
        }
    })
}


//save to local

function saveLocalTodos(todo){
    let todos
    if (localStorage.getItem('todos') === null){
        todos =[];
    }else{
        todos = JSON.parse(localStorage.getItem('todos'))
    }

    todos.push(todo)
    localStorage.setItem('todos', JSON.stringify(todos))
}

function getTodos(){
    let todos
    if (localStorage.getItem('todos') === null){
        todos =[];
    }else{
        todos = JSON.parse(localStorage.getItem("todos"))
    }
    todos.forEach(function(todo){
        const todoDiv = document.createElement('div');
        //Naming div class
        todoDiv.classList.add('todo')
        //creating list (<li>)
        const newTodo = document.createElement('li')
        newTodo.innerText = todo
        newTodo.classList.add('todo-item')
        todoDiv.appendChild(newTodo)
    
        //Completed btn
        const completedButton = document.createElement('button')
        completedButton.innerHTML = '<i class="fas fa-check"></i>'
        completedButton.classList.add('complete-btn')
        todoDiv.appendChild(completedButton)
    
        //Trash btn
        const trashButton = document.createElement('button')
        trashButton.innerHTML = '<i class="fas fa-trash"></i>'
        trashButton.classList.add('trash-btn')
        todoDiv.appendChild(trashButton)
    
        //append into TodoList to get structure like ul>div>li
        TodoList.appendChild(todoDiv)
    })
}

function RemoveLocalTodos(todo){
    let todos
    if (localStorage.getItem('todos') === null){
        todos =[];
    }else{
        todos = JSON.parse(localStorage.getItem("todos"))
    }
    const TodoIndex = todo.children[0].innerHTML
    todos.splice(todos.indexOf(TodoIndex), 1)
    localStorage.setItem('todos', JSON.stringify(todos));
}
