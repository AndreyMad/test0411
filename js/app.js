function onLoaded (){
  const list =document.querySelector(".todo__list")
  const openModalBtn = document.querySelector('.page__header_addBtn')
  const modal =document.querySelector('.modal__overlay')

  openModalBtn.addEventListener('click', openModal)

  class TodosList {
    constructor(todos = []) {
      this._todos = todos;
    }

    get todos() {
        return this._todos;
      }
      
      saveTodo(todo) {
        fetch('https://jsonplaceholder.typicode.com/todos', {
          method: 'POST',
          body: JSON.stringify({
            title:todo.title,
            completed: todo.completed,
            userId: todo.userId,
          }),
          headers: {
            'Content-type': 'application/json; charset=UTF-8',
          },
        })
          .then((response) => response.json())
          .then((json) => {
            console.log(json)
            this._todos.unshift(json)
            localStorage.setItem('todos',JSON.stringify( this._todos) )
            renderTodos()
          })
          .catch(err=>console.log(err))

        return todo;
      }

      deleteTodo(id) {
        console.log('deleting')
        fetch(`https://jsonplaceholder.typicode.com/todos/${id}`, {
          method: 'DELETE',
        })
        .then(res=>{if(res.status===200){
          this._todos= [...this._todos.filter(el=>el.id!=id)]
          renderTodos()
        }})
        .catch(err=>console.log(err))
      }
}


let todosList=[]
if(!localStorage.getItem('todos')){
    fetch('https://jsonplaceholder.typicode.com/todos')
    .then((response) => response.json())
    .then((json) => todosList = new TodosList(json))
    .then((todosList)=>localStorage.setItem('todos',JSON.stringify(todosList.todos)  )) 
    .then(()=> renderTodos())
    .catch(err=>console.log(err))
  }else{
    const localtodos = JSON.parse(localStorage.getItem('todos'))
     todosList = new TodosList(localtodos)
     renderTodos()
  }
 


  function renderTodos (){
  const markup = todosList.todos.map(el=>template(el) ).join('')
  list.innerHTML=markup
  const delButtons = [...document.querySelectorAll('.todo__delete_btn')]
  delButtons.map(el=>el.addEventListener('click', deleteTodo) )  
}

  function deleteTodo ({target}){
    todosList.deleteTodo(target.closest('li').dataset.key)
    localStorage.setItem('todos',JSON.stringify(todosList.todos) )
  
  }


function openModal(){
  modal.style.display = "block";
  document.body.parentNode.style.overflow = "hidden";
  window.addEventListener('keydown',(e)=>{
   if(e.code==="Escape"){
      closeModal()
    }
  })
  window.onclick = function(e) {
    if (e.target.classList[0]==="modal__overlay") {
      closeModal()
    }
  }
  const modalSubmitBtn = document.querySelector('.modal__submitBtn')
  modalSubmitBtn.addEventListener('click', modalSubmit)
}

function closeModal(){
  modal.style.display = "none";
  document.body.parentNode.style.overflow = "auto";

}

function modalSubmit (e){
  e.preventDefault()
  let noteTitle = document.querySelector('.modal__textarea').value
  let isDone = document.querySelector('#isChecked').checked
  if(noteTitle.length<10){
  return  alert('At least 10 symbols')
  }  
  const newTodo = {
    title: noteTitle,
    completed:isDone,
    userId: 'some id authorized user'
  }
   todosList.saveTodo(newTodo)
  renderTodos()
  closeModal()
  noteTitle.value=''
  isDone=false
}

  function template  (el){
    return `
      <li class="todo__item" data-key=${el.id} >
            <span class="todo__item_text">${el.title}</span>
            <img class="todo__item_svg" src='./assets/svg/${el.completed?'ok':'cancel'}.svg' ></img>
            <button class="todo__delete_btn" >
              <img src='./assets/svg/delete.svg'></img>
            </button>
            <a href="/id:${el.id}" class='todo__link'> </a>
        </li>
    `}
    }

document.addEventListener("DOMContentLoaded", onLoaded);


