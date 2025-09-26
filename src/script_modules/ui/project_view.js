// This class creates the ProjectManager object
// -> We need to import this module to access the object that contains out Projects
// -> We can't run ProjectMenuController -> we would create a new ProjectManager
// -> Solution: Inject the ProjectMenuController/ProjectManager

import { ProjectManager } from "../logic/project-manager";

/**
 * 
 * @param {ProjectManager} projectManagerArg 
 */
function ProjectViewController(projectManagerArg) {
  const projectManager = projectManagerArg;
  const menuProjects = document.querySelector(".menu-projects");
  const projectDisplay = document.querySelector(".project-display");

  function getProjectIDViewButton(e) {
    const id = e.target.parentNode.parentNode.parentNode.dataset.id;
    //check if button(image technically) was clicked
    if (!id) return;
    //only get the ID when View button is clicked
    if (e.target.parentNode.classList.contains("button-delete")) return;
    console.log(id);
    return id;
  }

  function clearMain() {
    projectDisplay.textContent = "";
  }

  function updateMain() {
    clearMain();
    const h2 = document.createElement("h2");
    const selectedProject = projectManager.getSelected();
    h2.textContent = selectedProject.name;
    projectDisplay.appendChild(h2);
  }

  function runView(e) {
    const projectID = getProjectIDViewButton(e);
    projectManager.resetSelected();
    projectManager.setSelected(projectID);
    updateMain();
  }

  function getButtonClass(e) {
    //console.log(e.target.parentNode.classList);
    return e.target.parentNode.classList;
  }

  menuProjects.addEventListener("click", e => {
    if (getButtonClass(e).contains("button-view")) {
      runView(e);
    } 

    if (getButtonClass(e).contains("button-delete")) {
      console.log("Second event listener on this button fired!")
    }
  });

  const todoTest = document.querySelector(".todo-logo");
  todoTest.addEventListener("click", () => projectManager.logAllProjects());
  projectManager.logAllProjects();
}

export { ProjectViewController };