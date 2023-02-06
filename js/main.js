//Creating variables
let tasksArr = [];

let taskIdAcc = 0;
let tasksList = document.querySelector('.todolist__tasks-list');

const categoriesList = document.querySelector('.todolist__categories');
let btnDeleteAll = document.querySelector('.todolist__delete-all');
let input = document.querySelector('.todolist__input')

//Categories radio
let currentCategory = 'all';

//Submitting new task to tasks list
const submitNewTask = () => {

  //Getting input value
  const newTask = document.querySelector('.task-input').value;
  if (newTask != '') {
    //Pushing task into tasks array
    tasksArr.push({id: taskIdAcc, content: newTask, isCompleted: false});
    
    //Creating task template
    const taskTemplate = `
      <div id="${taskIdAcc}" class="task-container">
        <input type="checkbox" class="task-checkbox">
        <label class="task-content" for="task-checkbox">${newTask}</label>
      </div>
      `;

    //Adding new task to html if active category isn't completed
    if (currentCategory !== 'completed') {
      tasksList.innerHTML += taskTemplate;
    }

    //Next id
    taskIdAcc++;
  }
}

//Building all tasks list
const buildAllList = () => {

  tasksArr.forEach(task => {
    
    const taskTemplate =`
      <div id="${task.id}" class="task-container">
        <input type="checkbox" class="task-checkbox">
        <label class="task-content" for="task-checkbox">${task.content}</label>
      </div>
      `;

    const taskCompletedTemplate = `
      <div id="${task.id}" class="task-container">
        <input type="checkbox" class="task-checkbox" checked>
        <label class="task-content" for="task-checkbox">${task.content}</label>
      </div>
      `;

    task.isCompleted ? tasksList.innerHTML += taskCompletedTemplate : tasksList.innerHTML += taskTemplate;
  })
}

//Building active tasks list
const buildActiveList = () => {

  tasksArr.forEach(task => {

    const taskTemplate = `
      <div id="${task.id}" class="task-container">
        <input type="checkbox" class="task-checkbox">
        <label class="task-content" for="task-checkbox">${task.content}</label>
      </div>
      `;

    if (!task.isCompleted) {
      tasksList.innerHTML += taskTemplate;
    }
  })
}

//Building completed tasks list

const buildCompletedList = () => {

  tasksArr.forEach(task => {

    const taskCompletedTemplate = `
      <div id="${task.id}" class="task-container">
        <input type="checkbox" class="task-checkbox" checked>
        <label class="task-content" for="task-checkbox">${task.content}</label>
        <div class="btn-container">
          <button class="btn btn-delete">Delete</button>
        </div>
      </div>
      `;

    if (task.isCompleted) {
      tasksList.innerHTML += taskCompletedTemplate;
    }
  })
}

//Submitting new task

document.querySelector('.task-submit').addEventListener('click', submitNewTask)

//Check if checkbox is checked or unchecked

let todolist = document.querySelector('.todolist__tasks-list');

todolist.addEventListener('change', function(event) {

  let checkboxes = document.querySelectorAll('.task-checkbox');
  
  //Accessing task object by parent id...
  const parentId = event.target.parentElement.id;
  const taskObject = tasksArr.find(object => object.id == parentId)

  //...then changing isCompleted key value
  event.target.checked ? taskObject.isCompleted = true : taskObject.isCompleted = false;
})

//Managing categories
categoriesList.addEventListener('change', function(event) {

  //Reseting tasks list
  tasksList.innerHTML = '';

  //Checking opened category and building corresponding list
  if (event.target.classList.contains('completed')) {
    buildCompletedList();
    currentCategory = 'completed';
  } else if (event.target.classList.contains('all')) {
    buildAllList();
    currentCategory = 'all';
  } else {
    buildActiveList();
    currentCategory = 'active';
  }
  console.log(currentCategory)

  //Displaying delete all button if we're on completed category
  if (currentCategory == 'completed') {
    btnDeleteAll.style.display = 'flex';
    input.style.display = 'none';
  } else {
    btnDeleteAll.style.display = 'none';
    input.style.display = 'flex';
  }

})

//Managing completed tasks

//Using delete task button
tasksList.addEventListener('click', function(event) {
  if (event.target.classList.contains('btn-delete')) {
    
    //Remove from tasks array
    const parentId = event.target.closest('.task-container').id;
    const taskIndex = tasksArr.indexOf(tasksArr.find(object => object.id == parentId))
    tasksArr.splice(taskIndex, 1);

    //Remove from html
    event.target.closest('.task-container').remove();


  }
  console.log('tasks array')
  console.log(tasksArr)
  
})

//Using delete all completed tasks  
btnDeleteAll.addEventListener('click', function() {
    //Filter the tasks array by uncompleted tasks
    tasksArr = tasksArr.filter(task => task.isCompleted == false);

    //Reseting completed tasks' html
    tasksList.innerHTML = `
    `;  
});



