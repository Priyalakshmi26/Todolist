window.addEventListener('load', () => {
  if (!localStorage.getItem('theme')) {
      localStorage.setItem('theme', 'light');
  }

  const themeSelector = document.querySelector('#themeSelector');
  if (localStorage.getItem('theme') === 'dark') {
      document.body.classList.add('dark');
      themeSelector.textContent = '☀️';
  } else {
      themeSelector.textContent = '🌙️';
  }

  themeSelector.addEventListener('click', () => {
      if (localStorage.getItem('theme') === 'light') {
          localStorage.setItem('theme', 'dark');
          themeSelector.textContent = '☀️';
      } else {
          localStorage.setItem('theme', 'light');
          themeSelector.textContent = '🌙️';
      }

      document.body.classList.toggle('dark');
  });
});
// selectors
const todoInput = document.querySelector('.todo-input')
const todoButton = document.querySelector('.add-item')
const todoList = document.querySelector('.todo-list')

// window.localStorage.clear()

// event listeners
document.addEventListener('DOMContentLoaded', getTodos)

todoButton.addEventListener('click', addTodo)

 // instead of adding listener to delete and check button seperately we rather will implement the listener to whole list and based on specific target element being clicked different functionality will be executed
todoList.addEventListener('click', deleteCheck)

// funtions
function addTodo(event) {

    // prevent from form submission
    event.preventDefault()

    if (todoInput.value == '') alert('Please enter the data')

    else {
        // creating todo and appending it
        const item = `
            <div class="todo">
                <li class="todo-item">${todoInput.value}</li>
                <button class="trash-btn"><i class="fas fa-trash"></i></button>
            </div>
        `;
        const posotion = "beforeend";
        todoList.insertAdjacentHTML(posotion, item);

        // add todo to local storage
        saveLocalTodos(todoInput.value)

        todoInput.value = ''
    }
}

function deleteCheck(e){
    const item = e.target

    // delete todo
    if(item.classList[0] === 'trash-btn'){  // classList returns an array of classes so use indexing to access them(even if there is a single class in an element)
        const todo = item.parentElement;
        // transition
        todo.classList.add("fall");

        removeLocalTodos(todo)

        // wait for the transition to complete then only after that remove the todo
        todo.addEventListener('transitionend', function(){
            todo.remove();
        })
        
    }

    // check todo
    //if(item.classList[0]==='complete-btn'){
       // item.parentElement.classList.toggle('completed')
    //}
}

// saving to local storage
function saveLocalTodos(todo){
    // check if todo is already there in storage
    let todos;
    if(localStorage.getItem("todos")===null){
        todos=[]; //if nothing is in storage then create a empty array
    } 
    // if not then get the stored items
    else{ 
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    todos.push(todo);
    localStorage.setItem('todos', JSON.stringify(todos))
}

function getTodos(){
    // check if todo is already there in storage
    let todos;
    if(localStorage.getItem("todos")===null){
        todos=[]; //if nothing is in storage then create a empty array
    } 
    // if not then get the stored items
    else{ 
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    todos.forEach(function(todo){
        const item = `
            <div class="todo">
                <li class="todo-item">${todo}</li>
                <button class="trash-btn"><i class="fas fa-trash"></i></button>
            </div>
        `;
        const position = "beforeend";
        todoList.insertAdjacentHTML(position, item);
    })
}

function removeLocalTodos(todo){
    // check if todo is already there in storage
    let todos;
    if(localStorage.getItem("todos")===null){
        todos=[]; //if nothing is in storage then create a empty array
    } 
    // if not then get the stored items
    else{ 
        todos = JSON.parse(localStorage.getItem('todos'));
    }

    const todoIndex = todo.children[0].innerText;  // here todo returns the div with class todo. then we got it's first chindren which is li element then it's innerText which is actually stored in localStorage

    todos.splice(todos.indexOf(todoIndex), 1);
    localStorage.setItem("todos", JSON.stringify(todos));
}
