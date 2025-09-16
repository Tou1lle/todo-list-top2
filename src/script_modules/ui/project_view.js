import { ProjectManager } from "./../logic/project-manager";
import { Project } from "./../logic/project";
import viewIcon from "./../../assets/view-icon2.svg";
import deleteIcon from "./../../assets/delete-icon2.svg";

function ProjectViewController() {
  const menuProjects = document.querySelector(".menu-projects");
  const addProjectBtn = document.querySelector(".add-new-project");
  const projectManager = new ProjectManager();
  initial();

  addProjectBtn.addEventListener("click", () => {
    const projectName = prompt("Create a name for your new Project", "My new Project");
    if (!checkEnteredName(projectName)) { return };
    const project = new Project(projectName);
    projectManager.addProject(project);
    projectManager.logAllProjects();
    updateMenu();
  })

  function checkEnteredName(name) {
    if (name === null) return false;
    if (name === "") {
      alert("Please enter a name for the Project");
      return false;
    }

    return true;
  }

  function clearMenu() {
    menuProjects.textContent = "";
  }

  function createProjectDOM(project) {
    const projectDiv = document.createElement("div");
    const projectName = document.createElement("h3");
    const buttonContainer = document.createElement("div");
    const buttonView = document.createElement("button");
    const buttonDelete = document.createElement("button");
    const viewImg = document.createElement("img");
    const deleteImg = document.createElement("img");

    projectDiv.dataset.id = project.id;
    viewImg.src = viewIcon;
    deleteImg.src = deleteIcon;
    buttonView.appendChild(viewImg);
    buttonDelete.appendChild(deleteImg);
    projectName.textContent = project.name;
    buttonContainer.append(buttonView, buttonDelete);
    projectDiv.append(projectName, buttonContainer);

    projectDiv.classList.add("project-option");
    projectName.classList.add("project-name");
    buttonContainer.classList.add("project-button-container");
    buttonView.classList.add("button-view");
    buttonDelete.classList.add("button-delete");

    buttonDelete.addEventListener("click", e => {
      const id = getProjectID(e);
      console.log(id);
    });

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

  function getProjectID(e) {
    return e.currentTarget.parentNode.parentNode.dataset.id;
  }

  function deleteProject(e) {
    
  }

  function initial() {
    const defaultProject = new Project();
    projectManager.addProject(defaultProject);
    addProjectToMenu(createProjectDOM(defaultProject));
  }
}

export { ProjectViewController };