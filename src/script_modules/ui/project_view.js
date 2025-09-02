import { ProjectManager } from "../logic/project-manager";

function ProjectViewController() {
  const menuProjects = document.querySelector(".menu-projects");
  const addProjectBtn = document.querySelector(".add-new-project");
  const projectManager = new ProjectManager();

  addProjectBtn.addEventListener("click", () => {
    alert("Button listens!");
  })  
}

export { ProjectViewController };