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
  } else {
    buttonElements.deleteAllBtn.classList.add('hidden');
    contentElements.todolistInput.classList.remove('hidden');
  }
}

const deleteButtonTemplate = () => {
  return ` 
  <button class="btn-delete js-btn-delete"></button>`
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
  if (arr) {
    arr.forEach(task => {

      //Passing functions as arguments...
      const deleteBtn = deleteButtonTemplate();
      const taskTemplate = todolistTemplate(task, deleteBtn);
      //...and building list with their values
      contentElements.tasksList.innerHTML += taskTemplate;
  
    })
  }
}

//Checking if task input has value
const checkInputValue = () => {
  if (contentElements.input.value != '') {
    buttonElements.submitBtn.removeAttribute('disabled');
  } else {
    buttonElements.submitBtn.setAttribute('disabled', true);
  }
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
  this.localStorage.setItem('miStoredTasks', JSON.stringify(storedTasks));
}

const getTasks = () => {
  storedTasks = JSON.parse(localStorage.getItem('miStoredTasks'));
  if (storedTasks && storedTasks.length > 0) {
    tasksArr = storedTasks;
  } else {
    tasksArr = [];
  }
}