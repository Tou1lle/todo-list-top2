import { ProjectManager } from "../logic/project-manager";

/**
 * TaskViewer displays and adds Tasks to selected Project
 * Other functionalities: sorting and filtering tasks based on user preferences
 * @param {ProjectManager} projectManager 
 */
function TaskViewer(projectManagerArg) {
  const projectManager = projectManagerArg;
  const addTaskBtn = document.querySelector(".add-new-task");
  const dialog = document.querySelector("dialog");
  const form = document.querySelector(".form-task");
  const btnCancel = document.querySelector(".form-cancel-btn");
  const btnSubmit = document.querySelector(".form-submit-btn");

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

  dialog.addEventListener("close", (e) => {
    resetForm();
  })

  addTaskBtn.addEventListener("click", (e) => {
    console.log("Add Tasks button works");
    openDialog();
  });
}

export { TaskViewer }