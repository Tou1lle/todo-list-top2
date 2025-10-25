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
  const projectHead = document.querySelector(".project-header");
  const projectBody = document.querySelector(".project-body");
  const projectBtns = document.querySelector(".project-btn-container");
  const addProjectBtn = document.querySelector(".add-new-project");
  initial();

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
    projectHead.textContent = "";
    projectBody.textContent = "";
  }

  //Finnish this function
  function updateMain() {
    clearMain();
    const h2 = document.createElement("h2");
    const selectedProject = projectManager.getSelected();
    h2.textContent = selectedProject.name;
    projectHead.appendChild(h2);

    const selectedDOM = getDOMbyID(selectedProject.id, getProjectsDOM());
    setSelectedDOM(selectedDOM);

    h2.addEventListener("click", (e) => {
      const newName = prompt("Your new project name?");
      if (!newName) { 
        console.log("No new name");
        return 
      };
      console.log(newName);
      selectedProject.name = newName;
      h2.textContent = selectedProject.name;
      updateNameInOption();
    })

    console.log(getDOMbyID(selectedProject.id, getProjectsDOM()));
  }

  function runView(e) {
    const projectID = getProjectIDViewButton(e);
    projectManager.resetSelected();
    projectManager.setSelected(projectID);
    updateMain();
  }

  function hideBtns() {
    projectBtns.style.display = "none";
  }

  function showBtns() {
    projectBtns.style.display = "flex";
  }

  function runDelete() {
    if (projectManager.isEmpty()) {
      clearMain();
      hideBtns();
      //add function to display some message that there are no projects
      return;
    }
    
    if (!projectManager.hasSelected()) {
      projectManager.setFirstSelected();
      updateMain();
    }
  }

  function getButtonClass(e) {
    return e.target.parentNode.classList;
  }

  function initial() {
    if (!projectManager.hasSelected()) {
      projectManager.setFirstSelected();
      updateMain();
      updateNameInOption();
    }
  }

  function getProjectsDOM() {
    return Array.from(document.querySelectorAll(".project-option"));
  }

  function getDOMbyID(id, array) {
    return array.find(projectDOM => projectDOM.dataset.id === id);
  }

  function resetSelectedDOM() {
    const projectsDOM = getProjectsDOM();
    projectsDOM.forEach(project => project.classList.remove("selected-project"));
  }

  function setSelectedDOM(dom) {
    resetSelectedDOM();
    dom.classList.add("selected-project");
  }

  function updateNameInOption() {
    const selectedProject = projectManager.getSelected();
    const selectedDOM = getDOMbyID(selectedProject.id, getProjectsDOM());
    const title = selectedDOM.querySelector("h3");
    title.textContent = selectedProject.name;
  }

  menuProjects.addEventListener("click", e => {
    if (getButtonClass(e).contains("button-view")) {
      runView(e);
    } 

    if (getButtonClass(e).contains("button-delete")) {
      runDelete();
    }
  });

  addProjectBtn.addEventListener("click", e => {
    if (projectManager.projects.length === 1) {
      projectManager.setFirstSelected();
      updateMain();
      showBtns();
    }
  });

  const todoTest = document.querySelector(".todo-logo");
  todoTest.addEventListener("click", () => {
    projectManager.logAllProjects();
    console.log(getProjectsDOM());
  });
  projectManager.logAllProjects();
}

export { ProjectViewController };