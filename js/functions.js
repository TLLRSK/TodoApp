// *FUNCTIONS*
//Set category
const setCategory = () => {
    document.querySelectorAll('.radio').forEach(category => {
      if (category.id === currentCategory) {
        category.checked = true
        category.parentElement.classList.add('category-selected');
      } else {
        category.parentElement.classList.remove('category-selected');
      }
    })
  }
  
//Set interface
const displayInterface = () => {
  if (currentCategory == 'completed') {
    buttonElements.deleteAllBtn.classList.remove('hidden');
    contentElements.todolistInput.classList.add('hidden');
    //Showing functional message
    contentElements.tasksList.innerHTML == '' ? console.log('empty') : console.log('not empty')
  } else {
    buttonElements.deleteAllBtn.classList.add('hidden');
    contentElements.todolistInput.classList.remove('hidden');
  }
}

const deleteButtonTemplate = () => {
  return `
  <div class="task__delete">
    <button class="btn-delete js-btn-delete">Delete</button>
  </div>`
}

const todolistTemplate = (task, deleteBtn) => {
  return `
    <div id="${task.id}" class="task-container js-task-container">
      <input type="checkbox" class="task-checkbox js-task-checkbox" ${task.isCompleted === true ? 'checked' : ''}>
      <label class="task-content" for="task-checkbox js-task-checkbox">${task.content}</label>
      ${currentCategory === 'completed' && task.isCompleted === true ? deleteBtn : ''}
    </div>
  `
}

//Build corresponding list
const buildList = (arr) => {

  //Reseting tasklist html
  contentElements.tasksList.innerHTML = '';

  //Building list
  arr.forEach(task => {

    //Passing functions as arguments...
    const deleteBtn = deleteButtonTemplate();
    const taskTemplate = todolistTemplate(task, deleteBtn);
    //...and building list with their values
    contentElements.tasksList.innerHTML += taskTemplate;

  })
}

//Submit new task
const submitNewTask = () => {

  //Getting input value
  let newTask = document.querySelector('.js-input').value;

  //Checking if input has content
  if (newTask != '') {
    //Pushing task into tasks array
    tasksArr.push({id: taskIdAcc, content: newTask, isCompleted: false});
    contentElements.input.value = '';
    //Rebuilds tasks list in corresponding category
    buildList(currentCategory == 'all' ? tasksArr : tasksArr.filter(task => task.isCompleted == false));
    //Next id
    taskIdAcc++;
  }
}

//Delete all completed tasks
const deleteCompletedTasks = () => {
  tasksArr = tasksArr.filter(task => task.isCompleted === false)
}

//Delete all completed tasks when deleteall button is pushed
const deleteAll = () => {
  deleteCompletedTasks();
  //Rebuilding completed tasks' html
  buildList(tasksArr.filter(task => task.isCompleted == true));
}

//Store tasks in local storage
const storeTasks = () => {
  storedTasks = tasksArr;
  this.localStorage.setItem('storedTasks', JSON.stringify(storedTasks));
  console.log(storedTasks);
}

//Get stored tasks from local storage
const getTasks = () => {
  const tasksArrInText = this.localStorage.getItem('storedTasks');
  tasksArr = JSON.parse(tasksArrInText);
  console.log(tasksArr)
}