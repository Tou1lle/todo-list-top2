import { ProjectManager } from "../logic/project-manager";
import { Project } from "../logic/project";

function ProjectViewController() {
  const menuProjects = document.querySelector(".menu-projects");
  const addProjectBtn = document.querySelector(".add-new-project");
  const projectManager = new ProjectManager();
  initial();

  addProjectBtn.addEventListener("click", () => {
    const projectName = prompt("Create a name for your new Project", "My new Project");
    const project = new Project(projectName);
    projectManager.addProject(project);
    projectManager.logAllProjects();
    updateMenu();
  })

  function clearMenu() {
    menuProjects.textContent = "";
  }

  function createProjectDOM(project) {
    const projectDiv = document.createElement("div");
    const projectName = document.createElement("h3");
    const buttonView = document.createElement("button");
    const buttonDelete = document.createElement("button");

    projectName.textContent = project.name;
    projectDiv.append(projectName, buttonView, buttonDelete);

    return projectDiv;
  }

  function addProjectToMenu(projectDiv) {
    menuProjects.appendChild(projectDiv);
  }

  function updateMenu() {
    clearMenu();
    projectManager.projects.forEach(project => {
      const projectDiv = createProjectDOM(project);
      addProjectToMenu(projectDiv);
    });
  }

  function initial() {
    const defaultProject = new Project();
    projectManager.addProject(defaultProject);
    addProjectToMenu(createProjectDOM(defaultProject));
  }
}

export { ProjectViewController };