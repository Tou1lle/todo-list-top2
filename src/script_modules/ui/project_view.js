// This class creates the ProjectManager object
// -> We need to import this module to access the object that contains out Projects
// -> We can't run ProjectMenuController -> we would create a new ProjectManager
// -> Solution: Inject the ProjectMenuController/ProjectManager
import { ProjectMenuController } from "./project_menu";

function ProjectViewController(projectManagerArg) {
  const menuProjects = document.querySelector(".menu-projects");
  const projectManager = projectManagerArg;

  const todoTest = document.querySelector(".todo-logo");
  todoTest.addEventListener("click", () => projectManager.logAllProjects());
  projectManager.logAllProjects();
}

export { ProjectViewController };