// *FUNCTIONS*

// Templates
const deleteButtonTemplate = () => {
  return ` 
    <button class="btn-delete js-btn-delete"></button>
  `;
}

const todolistTemplate = (task, deleteBtn) => {
  return `
    <div id="${task.id}" class="task-container js-task-container">
      <input type="checkbox" id="task-checkbox" class="task-checkbox js-task-checkbox" ${task.isCompleted === true ? 'checked' : ''}>
      <p class="task-content">${task.content}</p>
      ${currentCategory === 'completed' && task.isCompleted === true ? deleteBtn : ''}
    </div>
  `
}

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
  displayFooter();
  setDeleteAllButtonState();
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

// Display footer
const displayFooter = () => {
  if (currentCategory == 'completed') {
    contentElements.deleteAll.classList.remove('hidden');
    contentElements.addTask.classList.add('hidden');
  } else {
    contentElements.deleteAll.classList.add('hidden');
    contentElements.addTask.classList.remove('hidden');
  }
}

// Setting footer listeners when elements are selected
const setFooterListeners = () => {
  contentElements.input.addEventListener('input', setInputBtn);
  contentElements.submitBtn.addEventListener('click', submitNewTask);
  contentElements.deleteAllBtn.addEventListener('click', () => {deleteAll()});
}

//Check if task input has value
const setInputBtn = () => {
  if (contentElements.input.value != '') {
    contentElements.submitBtn.removeAttribute('disabled');
  } else {
    contentElements.submitBtn.setAttribute('disabled', true);
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
    //Reset button status
    setInputBtn();
    //Next id
    taskIdAcc++;
  }
}

// Check if there is any completed task
const checkCompletedTasks = () => {
  return tasksArr.some(task => task.isCompleted);
}
// Set delete all btn style
const setDeleteAllButtonState = () => {
  if (checkCompletedTasks()) {
    contentElements.deleteAllBtn.removeAttribute('disabled');
  } else {
    contentElements.deleteAllBtn.setAttribute('disabled', true);
  }
}

//Delete all completed tasks
const deleteCompletedTasks = () => {
  tasksArr = tasksArr.filter(task => task.isCompleted === false)
 
}

//Delete all completed tasks when delete all tasks button is pushed
const deleteAll = () => {
  deleteCompletedTasks();

  //Rebuilding completed tasks' html
  buildList(tasksArr.filter(task => task.isCompleted == true));
  setDeleteAllButtonState();
}

//Store tasks in local storage
const storeTasks = () => {
  storedTasks = tasksArr;
  this.localStorage.setItem('storedTasks', JSON.stringify(storedTasks));
}

const getTasks = () => {
  storedTasks = JSON.parse(localStorage.getItem('storedTasks'));
  if (storedTasks && storedTasks.length > 0) {
    tasksArr = storedTasks;
  } else {
    tasksArr = [];
  }
}