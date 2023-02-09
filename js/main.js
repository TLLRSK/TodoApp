// *VARIABLES*
let tasksArr = [];
let taskIdAcc = 0;
let currentCategory = 'all';

let categoriesList = document.querySelector('.js-todolist__categories');
let tasksList = document.querySelector('.js-todolist__tasks-list');
let btnDeleteAll = document.querySelector('.js-delete-all-container');
let displayInput = document.querySelector('.js-todolist__input');
let inputBtn = document.querySelector('.js-input-btn');
let submit = document.querySelector('.js-submit-btn');

// *FUNCTIONS*
//Set category
const setCategory = () => {
  document.querySelectorAll('.category-radio').forEach(category => {
    category.id === currentCategory ? category.checked = true : '';
  })
}

//Setting interface
const displayInterface = () => {
  if (currentCategory == 'completed') {
    btnDeleteAll.style.display = 'flex';
    displayInput.style.display = 'none';
    tasksList.innerHTML == '' ? console.log('empty') : console.log('not empty')
  } else {
    btnDeleteAll.style.display = 'none';
    displayInput.style.display = 'flex';
  }
}

//Build corresponding list
const buildList = (arr) => {
  //Reseting tasklist html
  tasksList.innerHTML = '';

  //Building list
  arr.forEach(task => {
    const btnDelete = `
      <div class="btn-delete-container">
        <button class="btn btn-delete js-btn-delete">Delete</button>
      </div>`

    const taskTemplate = `
    <div id="${task.id}" class="task-container js-task-container">
      <input type="checkbox" class="task-checkbox js-task-checkbox" ${task.isCompleted === true ? 'checked' : ''}>
      <label class="task-content" for="task-checkbox js-task-checkbox">${task.content}</label>
      ${currentCategory === 'completed' && task.isCompleted === true ? btnDelete : ''}
    </div>
  `
  tasksList.innerHTML += taskTemplate;
  })
}

//Submit new task
const submitNewTask = () => {

  //Getting input value
  let newTask = document.querySelector('.js-input-btn').value;
  
  if (newTask != '') {
    //Pushing task into tasks array
    tasksArr.push({id: taskIdAcc, content: newTask, isCompleted: false});

    inputBtn.value = '';
    //Rebuilds tasks list in corresponding category
    buildList(currentCategory == 'all' ? tasksArr : tasksArr.filter(task => task.isCompleted == false));

    //Next id
    taskIdAcc++;
  }
}

//Delete all completed tasks
const deleteAll = () => {
  //Filter the tasks array by uncompleted tasks
  tasksArr = tasksArr.filter(task => task.isCompleted == false);

  //Rebuilding completed tasks' html
  buildList(tasksArr.filter(task => task.isCompleted == true));
}

// *MANAGING EVENTS*

//Loading page
window.addEventListener('load', function() {
  setCategory();
  buildList(tasksArr);
});


//Submitting new task
submit.addEventListener('click', submitNewTask)

//Checking if checkbox is checked or unchecked
tasksList.addEventListener('change', function(event) {
  
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

  //Displaying delete all button if we're on completed category
  displayInterface()
})


// *Managing completed tasks*
//Using delete task button
tasksList.addEventListener('click', function(event) {
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
btnDeleteAll.addEventListener('click', function() {
  deleteAll()
});

//Storaging tasks info before closing --- WIP
// window.addEventListener('beforeunload', function() {
//   this.localStorage.setItem('tasksArray', JSON.stringify(tasksArr))
// })