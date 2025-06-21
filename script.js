document.addEventListener('DOMContentLoaded',()=>{
    const toDoInput=document.getElementById("todo-input");
const addTaskButton=document.getElementById("add-task-btn");
const toDoList = document.getElementById("todo-list");

let tasks = JSON.parse(localStorage.getItem('tasks')) || []

tasks.forEach(task => renderTask(task));

addTaskButton.addEventListener("click", () => {
    const taskTest=toDoInput.value.trim()
    
    if(taskTest==="")
        return;

    const newTask = {
        id: Date.now(),
        text:taskTest,
        completed:false
    }
    tasks.push(newTask)
    saveTasks()
    toDoInput.value= "" // cleared input
    console.log(tasks);
    renderTask(newTask)
    // const li=document.createElement('li');
    // li.innerHTML=`${newTask.text}<button id ="b${newTask.id}">Delete</button>`;
    // li.id=newTask.id;
    // toDoList.appendChild(li);
})

function renderTask(task){
    console.log(task);
    const li=document.createElement('li');
    if(task.completed) li.classList.add("completed")
    li.innerHTML=`${task.text}<button id ="${task.id}">Delete</button>`;
    li.id=task.id;
    li.addEventListener('click', (e)=>{
        if(e.target.tagName==="BUTTON")return;
        task.completed=!task.completed
        li.classList.toggle('completed')
        saveTasks()
    })
    toDoList.appendChild(li);

    li.querySelector('button').addEventListener('click',(e)=>{
        e.stopPropagation()
        console.log(e.target.id);
        
        tasks=tasks.filter(t=> t.id!==task.id)
        saveTasks()
        document.getElementById(e.target.id).remove()
    })
}

function saveTasks(){
    localStorage.setItem('tasks',JSON.stringify(tasks))
}
})