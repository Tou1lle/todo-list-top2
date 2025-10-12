import { ProjectManager } from "../logic/project-manager";

/**
 * 
 * @param {ProjectManager} projectManager 
 */
function TaskViewer(projectManagerArg) {
  const projectManager = projectManagerArg;
  const addTaskBtn = document.querySelector(".add-new-task");

  //return array of tasks
  function getSelectedTasks() {
    return projectManager.getSelected().tasks;
  }

  addTaskBtn.addEventListener("click", (e) => {
    console.log("Add Tasks button works");
  });
}

export { TaskViewer }