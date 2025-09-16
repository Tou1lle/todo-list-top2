import { ProjectManager } from "../logic/project-manager";
import { Project } from "../logic/project";

function ProjectViewController() {
  const menuProjects = document.querySelector(".menu-projects");
  const addProjectBtn = document.querySelector(".add-new-project");
  const projectManager = new ProjectManager();

  addProjectBtn.addEventListener("click", () => {
    const projectName = prompt("Create a name for your new Project", "My new Project");
    const project = new Project(projectName);
    projectManager.addProject(project);
    projectManager.logAllProjects();
  })  
}

export { ProjectViewController };