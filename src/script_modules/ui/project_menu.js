import { Project } from "../logic/project";
import viewIcon from "./../../assets/view-icon2.svg";
import deleteIcon from "./../../assets/delete-icon2.svg";

/**
 * 
 * @param {ProjectManager} projectManagerArg 
 * @returns 
 */
function ProjectMenuController(projectManagerArg) {
  const menuProjects = document.querySelector(".menu-projects");
  const addProjectBtn = document.querySelector(".add-new-project");
  const projectManager = projectManagerArg;
  initial();

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
      deleteProject(id);
      updateMenu();
      projectManager.logAllProjects();
      localStorage.setItem("projects", JSON.stringify(projectManager.projects));
    });

    if (project.selected) {
      projectDiv.classList.add("selected-project");
    }

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

  function deleteProject(id) {
    projectManager.removeProject(id);
  }

  function initial() {
    if (!hasLocalProjects()) {
      const defaultProject = new Project();
      projectManager.addProject(defaultProject);
      projectManager.setFirstSelected();
      addProjectToMenu(createProjectDOM(defaultProject));
      localStorage.setItem("projects", JSON.stringify(projectManager.projects));
      return;
    }

    const localProjects = getLocalProjects();
    localProjects.forEach(project => projectManager.addProject(project));
    projectManager.setFirstSelected();
    projectManager.projects.forEach(project => {
      addProjectToMenu(createProjectDOM(project));
    })
    console.log("Status of Projects after Project Manager inital", projectManager.projects);
  }

  function hasLocalProjects() {
    return localStorage.getItem("projects");
  }

  function getLocalProjects() {
    const projectsJSON = localStorage.getItem("projects");
    const projectsParsed = JSON.parse(projectsJSON);
    const projects = [];

    projectsParsed.forEach(project => {
      const newProject = new Project(project.name, project.id, project.selected);
      projects.push(newProject);
      console.log("The created project from json values: ", newProject);
    })

    const project = projects[0];
    console.log("PARSED: ", projectsParsed);
    const projectsMappedID = projectsParsed.map(project => project.id);
    console.log("ONLY IDs: ", projectsMappedID);
    const localTask = projectsParsed.filter(projectLocal => projectLocal.id === project.id)[0];
    console.log("FILTERED PROJECT: ", localTask);
    console.log(projects);
    return projects;
  }

  addProjectBtn.addEventListener("click", () => {
    const projectName = prompt("Create a name for your new Project", "My new Project");
    if (!checkEnteredName(projectName)) { return };
    const project = new Project(projectName);
    projectManager.addProject(project);
    projectManager.logAllProjects();
    updateMenu();
    localStorage.setItem("projects", JSON.stringify(projectManager.projects));
  })


  //testing local storage
  const h1LocalStorageView = document.querySelector("h1");
  h1LocalStorageView.addEventListener("click", () => {
    localStorage.setItem("projects", JSON.stringify(projectManager.projects));
    getLocalProjects();
  })
}

export { ProjectMenuController };