import { ProjectManager } from "../logic/project-manager";
import { Task } from "../logic/task";

/**
 * TaskViewer displays and adds Tasks to selected Project
 * Other functionalities: sorting and filtering tasks based on user preferences
 * @param {ProjectManager} projectManager 
 */
function TaskViewer(projectManagerArg) {
  const projectManager = projectManagerArg;
  const tasksContainer = document.querySelector(".project-body");
  const menuProjects = document.querySelector(".menu-projects");
  const addTaskBtn = document.querySelector(".add-new-task");
  const dialog = document.querySelector("dialog");
  const form = document.querySelector(".form-task");
  const btnCancel = document.querySelector(".form-cancel-btn");
  const btnSubmit = document.querySelector(".form-submit-btn");
  const taskName = document.querySelector("#task-name");
  const taskDate = document.querySelector("#task-duedate");
  const taskPrio = document.querySelector("#task-prio");
  const taskChecked = document.querySelector("#task-checked");
  const taskNotes = document.querySelector("#task-notes");

  //return array of tasks
  function getSelectedTasks() {
    return projectManager.getSelected().tasks;
  }

  function resetForm() {
    form.reset();
  }

  function openDialog() {
    dialog.showModal();
  }

  function closeDialog() {
    dialog.close();
  }

  function createTask() {
    const name = taskName.value;
    const date = taskDate.value;
    const prio = taskPrio.value;
    const checked = taskChecked.checked;
    const notes = taskNotes.value;

    const task = new Task(name, date, prio, checked, notes)

    return task;
  }

  function createTaskDOM(task) {
    const container = document.createElement("div");
    container.textContent = task.title;
    return container;
  }

  function clearTasksDOM() {
    tasksContainer.textContent = "";
  }

  function updateTasksDOM() {
    clearTasksDOM();
    const tasks = getSelectedTasks();
    tasks.forEach(element => {
      const taskDom = createTaskDOM(element);
      tasksContainer.appendChild(taskDom);
    });
  }

  function getButtonClass(e) {
    return e.target.parentNode.classList;
  }

  function getSelectedProject() {
    console.log(projectManager.getSelected().id);
    return projectManager.getSelected();
  }

  dialog.addEventListener("close", (e) => {
    resetForm();
  });

  btnCancel.addEventListener("click", (e) => {
    e.preventDefault();
    resetForm();
    closeDialog();
  });

  btnSubmit.addEventListener("click", (e) => {
    e.preventDefault();
    const task = createTask();
    const project = getSelectedProject();

    project.addTask(task);
    console.log(project);
    resetForm();
    closeDialog();
  });

  addTaskBtn.addEventListener("click", (e) => {
    console.log("Add Tasks button works");
    openDialog();
  });

  menuProjects.addEventListener("click", (e) => {
    if (!(getButtonClass(e).contains("button-view")) && !(getButtonClass(e).contains("button-delete"))) {
      console.log("Not an appropriate button!");
      return;
    }
    if (projectManager.isEmpty()) return;
    updateTasksDOM();
  });
}

export { TaskViewer }