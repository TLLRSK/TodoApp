// *VARIABLES*
let tasksArr = [];
let taskIdAcc = 0;
let currentCategory = 'all';
let storedTasks;

// *REFERENCES* //
let buttonElements = {
  submitBtn: document.querySelector('.js-submit-btn'),
  deleteAllBtn: document.querySelector('.js-delete-all')
}

let contentElements = {
  input: document.querySelector('.js-input'),
  categoriesList: document.querySelector('.js-todolist__categories'),
  tasksList: document.querySelector('.js-todolist__tasks-list'),
  todolistInput: document.querySelector('.js-todolist__input'),
}

// *MANAGING EVENTS*

//Submitting new task
buttonElements.submitBtn.addEventListener('click', submitNewTask);

//Checking if checkbox is checked or unchecked
contentElements.tasksList.addEventListener('change', function(event) {
  //Accessing task object by parent id...
  const parentId = event.target.parentElement.id;
  const taskObject = tasksArr.find(object => object.id == parentId)

  //...then changing isCompleted key value
  event.target.checked ? taskObject.isCompleted = true : taskObject.isCompleted = false;

  console.log('click')
})

//Managing categories
contentElements.categoriesList.addEventListener('change', function(event) {

  //Reseting tasks list
  contentElements.tasksList.innerHTML = '';

  //Checking opened category and building corresponding list
  if (event.target.id == 'completed') {
    currentCategory = 'completed';
    buildList(tasksArr.filter(task => task.isCompleted == true));
  } else if (event.target.id == 'active') {
    currentCategory = 'active';
    buildList(tasksArr.filter(task => task.isCompleted == false));
  } else {
    currentCategory = 'all';
    buildList(tasksArr);
  }

  setCategory();
  //Displaying delete all button if we're on completed category
  displayInterface()
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
  } else if (event.target.classList.contains('js-task-checkbox')) {
    console.log('checkbox')
  }
})

//Using Delete All Button
buttonElements.deleteAllBtn.addEventListener('click', function() {
  deleteAll()
});

//Storaging data info before closing --- WIP
window.addEventListener('beforeunload', function() {
  storeTasks();
})

//Loading page
window.addEventListener('load', function() {
  setCategory();
  displayInterface();
  getTasks();
  buildList(tasksArr);
});