const createTaskInput = document.querySelector('.create-task__input');
const createTaskSubmit = document.querySelector('.create-task__submit');
const taskLists = document.querySelectorAll('.task-list__list');
let draggableTask;

function init() {
  for (const taskList of taskLists) {
    taskList.addEventListener('dragover', dragOver);
    taskList.addEventListener('dragenter', dragEnter);
    taskList.addEventListener('dragleave', dragLeave);
    taskList.addEventListener('drop', dragDrop);
  }
  addDragStartEnd();
  document.addEventListener('keydown', handleCreateTask);
  createTaskSubmit.addEventListener('click', handleCreateTask);
}

function addDragStartEnd() {
  const tasks = document.querySelectorAll('.task');
  if (tasks) {
    for (const task of tasks) {
      task.addEventListener('dragstart', dragStart);
      task.addEventListener('dragend', dragEnd);
    }
  }
}

function dragStart(e) {
  // console.log('Start', e.target);
  draggableTask = e.target;
}

function dragEnd() {
  // console.log('End');
}

function dragOver(e) {
  e.preventDefault();
  // console.log('over', this);
}

function dragEnter(e) {
  e.preventDefault();
  // console.log('enter', this);
}

function dragLeave() {
  // e.preventDefault();
  // console.log('leave', this);
}

function dragDrop() {
  // console.log(('drop', this));
  this.append(draggableTask);
}

function handleDeleteTask() {
  this.parentElement.remove();
}

function saveItems(items) {
  localStorage.setItem(JSON.stringify(items));
}
function loadItems() {
  return JSON.parse(localStorage.getItem());
}
function deleteItems(item) {
  localStorage.removeItem(item);
}

function createTaskElement() {
  const li = document.createElement('li');
  const spanText = document.createElement('span');
  const spanDel = document.createElement('span');
  const createTaskInput = document.querySelector('.create-task__input');

  li.className = 'task';
  li.draggable = true;
  spanText.className = 'task__text';
  spanText.textContent = createTaskInput.value;
  spanDel.className = 'task__delete';
  spanDel.innerHTML = '&#10060;';
  spanDel.addEventListener('click', handleDeleteTask);
  li.append(spanText);
  li.append(spanDel);
  return li;
}

function handleCreateTask(e) {
  if (e.type === 'click' || (e.type === 'keydown' && e.keyCode === 13)) {
    console.log(e.type);
    const li = createTaskElement();
    const selectedTaskGroup = [
      ...document.getElementsByName('task-group'),
    ].find((taskGroup) => taskGroup.checked);
    const id = selectedTaskGroup.id.substring(
      selectedTaskGroup.id.lastIndexOf('-') + 1
    );

    document.getElementById(`task-list-${id}`).append(li);
    addDragStartEnd();
    createTaskInput.value = '';
  } else {
    return;
  }
}

init();
