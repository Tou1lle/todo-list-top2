// This class creates the ProjectManager object
// -> We need to import this module to access the object that contains out Projects
// -> We can't run ProjectMenuController -> we would create a new ProjectManager
// -> Solution: Inject the ProjectMenuController/ProjectManager
import { ProjectMenuController } from "./project_menu";

function ProjectViewController(projectManagerArg) {
  const projectManager = projectManagerArg;
  const menuProjects = document.querySelector(".menu-projects");

  function getProjectIDViewButton(e) {
    const id = e.target.parentNode.parentNode.parentNode.dataset.id;
    //check if button(image technically) was clicked
    if (!id) return;
    //only get the ID when View button is clicked
    if (e.target.parentNode.classList.contains("button-delete")) return;
    console.log(id);
  }

  menuProjects.addEventListener("click", getProjectIDViewButton);

  const todoTest = document.querySelector(".todo-logo");
  todoTest.addEventListener("click", () => projectManager.logAllProjects());
  projectManager.logAllProjects();
}

export { ProjectViewController };