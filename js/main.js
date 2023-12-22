// *VARIABLES*
let tasksArr = [];
let taskIdAcc = 0;
let currentCategory = '';
let storedTasks;

// *REFERENCES* //
let contentElements = {
  categoriesList: document.querySelector('.js-todolist__categories'),
  tasksList: document.querySelector('.js-todolist__tasks-list'),
  footer: document.querySelector('.todolist__footer'),
  todolistInput: document.querySelector('.js-todolist__input'),
  addTask: document.querySelector('.js-todolist__add-task'),
  input: document.querySelector('.js-input'),
  submitBtn: document.querySelector('.js-submit-btn'),
  deleteAll: document.querySelector('.js-todolist__delete-all'),
  deleteAllBtn: document.querySelector('.js-delete-all-btn')
}

// *MANAGING EVENTS*

//Checking if checkbox is checked or unchecked
contentElements.tasksList.addEventListener('change', function(event) {
 
  //Accessing task object by parent id...
  const parentId = event.target.parentElement.id;
  const taskObject = tasksArr.find(object => object.id == parentId)

  //...then changing isCompleted key value
  event.target.checked ? taskObject.isCompleted = true : taskObject.isCompleted = false;
})

// Reseting current category when entering
document.addEventListener('DOMContentLoaded', function() {
  currentCategory = 'all';
  setFooterListeners();
});

//Managing categories
contentElements.categoriesList.addEventListener('change', function(event) {
  //Reseting tasks list
  contentElements.tasksList.innerHTML = '';
  setFooterListeners();
  //Checking opened category and building corresponding list
  if (event.target.id == 'completed') {
    currentCategory = 'completed';
    buildList(tasksArr.filter(task => task.isCompleted == true));
    
  } else if (event.target.id == 'active') {
    currentCategory = 'active';
    buildList(tasksArr.filter(task => task.isCompleted == false));
  } else if (event.target.id == 'all') {
    currentCategory = 'all';
    buildList(tasksArr);
  }
  setCategory();
})

// *Managing completed tasks*
//Using delete task button
contentElements.tasksList.addEventListener('click', function(event) {
  if (event.target.classList.contains('js-btn-delete')) {
    //Remove from tasks array
    const parentId = event.target.closest('.js-task-container').id;
    const taskIndex = tasksArr.indexOf(tasksArr.find(object => object.id == parentId))
    tasksArr.splice(taskIndex, 1);

    //Remove from html
    event.target.closest('.js-task-container').remove();
  }
})

//Storaging data info before closing --- WIP
window.addEventListener('beforeunload', function() {
  storeTasks();
})

//Loading page
window.addEventListener('load', function() {
  setCategory();
  getTasks();
  buildList(tasksArr);
});