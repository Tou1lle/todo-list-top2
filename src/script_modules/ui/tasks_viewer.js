import { ProjectManager } from "../logic/project-manager";
import { Task } from "../logic/task";
import { format } from "date-fns";

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
  const sortBtn = document.querySelector("select[name='project-sort']");
  const filterBtn = document.querySelector("select[name='project-filter']");
  initial();

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
    const prio = parseInt(taskPrio.value);
    const checked = taskChecked.checked;
    const notes = taskNotes.value;

    const task = new Task(name, date, prio, checked, notes)

    return task;
  }

  function createTaskDOM(task) {
    const containerTask = document.createElement("div");
    const containerTaskHead = document.createElement("div");
    const containerTaskBody = document.createElement("div");
    const containerTaskFoot = document.createElement("div");

    const taskTitleValue = task.title;
    const taskDateValue = typeof task.dueDate === "string" ? task.dueDate : format(task.dueDate, "do MMM yyyy");
    const taskPrioValue = convertPrio(task.priority);
    const taskCheckValue = task.checked;
    const taskNotesValue = task.notes;

    const taskTitle = document.createElement("h3");
    const taskDate = document.createElement("p");
    const taskDateSpan = document.createElement("span");
    const taskCheck = document.createElement("input");
    const taskPrio = document.createElement("p");
    const taskPrioSpan = document.createElement("span");
    const taskNotes = document.createElement("textarea");

    taskDate.textContent = "Due Date: ";
    taskPrio.textContent = "Priority: ";
    taskCheck.type = "checkbox";

    taskTitle.textContent = taskTitleValue;
    taskDateSpan.textContent = taskDateValue;
    taskPrioSpan.textContent = taskPrioValue;
    taskCheck.checked = taskCheckValue;
    taskNotes.value = taskNotesValue;

    containerTask.classList.add("task-container");
    if (task.checked) {
      containerTask.classList.add("task-container-done");
    }
    containerTaskHead.classList.add("task-container-header");
    containerTaskBody.classList.add("task-container-body");
    containerTaskFoot.classList.add("task-container-footer");
    taskCheck.classList.add("task-done-button");
    taskDate.classList.add("task-date-created");
    taskPrio.classList.add("task-prio-created");
    taskNotes.classList.add("task-notes-created");
    taskPrioSpan.classList.add(getPrioClass(taskPrioValue))

    containerTask.append(containerTaskHead, containerTaskBody, containerTaskFoot);
    containerTaskHead.append(taskTitle, taskCheck);
    containerTaskBody.append(taskDate, taskPrio);
    containerTaskFoot.append(taskNotes);
    taskPrio.appendChild(taskPrioSpan);
    taskDate.appendChild(taskDateSpan);

    taskCheck.addEventListener("change", (e) => {
      task.toggleChecked();
      containerTask.classList.toggle("task-container-done");
      localStorage.setItem("projects", JSON.stringify(projectManager.projects));
    });

    taskNotes.addEventListener("input", (e) => {
      task.notes = taskNotes.value;
      localStorage.setItem("projects", JSON.stringify(projectManager.projects));
    });

    taskTitle.addEventListener("click", (e) => {
      const newTitle = prompt("New Task name?");
      if (!newTitle) { return };
      task.title = newTitle;
      taskTitle.textContent = task.title;
      localStorage.setItem("projects", JSON.stringify(projectManager.projects));

    });

    taskPrioSpan.addEventListener("click", (e) => {
      const prioMap = {
        "1": 1,
        "2": 2,
        "3": 3,
        "low": 1,
        "mid": 2,
        "high": 3,
      };
      const currentClass = getPrioClass(task.priority);

      const input = prompt("New Task Priority?");
      if (!input) return;

      const normalized = input.trim().toLowerCase();
      const newPrio = prioMap[normalized];
      if (!newPrio) return;

      task.priority = newPrio;
      taskPrioSpan.textContent = convertPrio(task.priority);
      const newPrioClass = getPrioClass(task.priority);
      taskPrioSpan.classList.replace(currentClass, newPrioClass);
      localStorage.setItem("projects", JSON.stringify(projectManager.projects));
    })

    return containerTask;
  }

  function clearTasksDOM() {
    tasksContainer.textContent = "";
  }

  function updateTasksDOM() {
    clearTasksDOM();
    const tasks = getSelectedTasks();
    sortTasks();
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

  function convertPrioToNum(value) {
    return value === "Low" ? 1 :
      value === "Mid" ? 2 :
        value === "High" ? 3 : false;
  }

  function convertPrioToText(value) {
    const valueNum = Number(value);
    return valueNum === 1 ? "Low" :
      valueNum === 2 ? "Mid" :
        valueNum === 3 ? "High" : false;
  }

  function convertPrio(value) {
    return convertPrioToText(value) || convertPrioToNum(value);
  }

  function getPrioClass(prio) {
    return prio === "Low" || prio == 1 ? "task-low" :
      prio === "Mid" || prio == 2 ? "task-mid" :
        prio === "High" || prio == 3 ? "task-high" : false;
  }

  function sortTasks() {
    sortBtn.value === "default" ? projectManager.getSelected().sortByCreation() :
      sortBtn.value === "priority" ? projectManager.getSelected().sortByPrio() :
        sortBtn.value === "checked" ? projectManager.getSelected().sortByChecked() :
          sortBtn.value === "date" ? projectManager.getSelected().sortByDate() : false;
  }

  function initial() {
    const projects = projectManager.projects;
    const projectsJSON = localStorage.getItem("projects");
    const projectsParsed = JSON.parse(projectsJSON);
    const projectMappedID = projectsParsed.map(project => project.id);

    projects.forEach(project => {
      const localTasks = projectsParsed.filter(projectLocal => projectLocal.id === project.id)[0];
      localTasks.tasks.forEach(task => {
        const newTask = new Task(task.title, task.dueDate, task.priority, task.checked, task.notes);
        project.addTask(newTask);
      })
    });

    console.log("Status of Projects after Task Viewer Initial", projects)
    updateTasksDOM();
  }

  /**
   * function initial() {
    const projects = projectManager.projects;
    const projectsJSON = localStorage.getItem("projects");
    const projectsParsed = JSON.parse(projectsJSON);
    const projectMappedID = projectsParsed.map(project => project.id);

    projects.forEach(project => {
      if (projectMappedID.includes(project.id)) {
        const localTask = projectsParsed.filter(projectLocal => projectLocal.id === project.id)[0];
        localTask.tasks.forEach(task => {
          const newTask = new Task(task.title, task.dueDate, task.priority, task.checked, task.notes);
          project.addTask(newTask);
        })
      }
    });

    updateTasksDOM();
  }
   */

  dialog.addEventListener("close", (e) => {
    resetForm();
    updateTasksDOM();
  });

  btnCancel.addEventListener("click", (e) => {
    e.preventDefault();
    resetForm();
    closeDialog();
  });

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const task = createTask();
    const project = getSelectedProject();

    project.addTask(task);
    console.log(project);
    resetForm();
    closeDialog();
    localStorage.setItem("projects", JSON.stringify(projectManager.projects));
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

  sortBtn.addEventListener("change", (e) => {
    sortTasks();
    updateTasksDOM();
  })
}

export { TaskViewer }