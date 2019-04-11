const toDoForm=document.querySelector(".js-toDoForm"),
  toDoInput = toDoForm.querySelector("input"),
  toDoList = document.querySelector(".js-toDoList");

const TODOS_LS= 'tdDos';

let toDos=[];

function deleteToDo(){
  const btn = event.target;
  const li = btn.parentNode;
  toDoList.removeChild(li);
  const cleanToDos = toDos.filter(function(toDo){
    return toDo.id !== parseInt(li.id) 
  });
  toDos = cleanToDos;
  saveTodos();
}

function saveTodos(){
  localStorage.setItem(TODOS_LS,JSON.stringify(toDos));
}

function paintTodo(text){
  const li = document.createElement('li');
  const delBtn=document.createElement('button');
  delBtn.innerHTML="X";
  delBtn.addEventListener('click',deleteToDo);
  const span=document.createElement('span');
  const newId = toDos.length+1
  span.innerHTML=text;
  li.appendChild(span);
  li.appendChild(delBtn);
  li.id=newId;
  toDoList.appendChild(li);

  const toDoObj={
     text:text,
     id: newId
  }
  toDos.push(toDoObj);
  saveTodos(toDos);
}

function handleSubmit(event){
  event.preventDefault();
  const currentValue = toDoInput.value;
  paintTodo(currentValue);
  toDoInput.value="";
}

function loadToDos(){
  const loadedToDos = localStorage.getItem(TODOS_LS);
  if(loadedToDos != null){
    const parsedToDos=JSON.parse(loadedToDos);
    parsedToDos.forEach(function(toDo){
      paintTodo(toDo.text);
    })
  } 
}

function init(){
  loadToDos();
  toDoForm.addEventListener("submit",handleSubmit);
} 

init();