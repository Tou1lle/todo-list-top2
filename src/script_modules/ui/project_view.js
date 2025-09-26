// This class creates the ProjectManager object
// -> We need to import this module to access the object that contains out Projects
// -> We can't run ProjectMenuController -> we would create a new ProjectManager
// -> Solution: Inject the ProjectMenuController/ProjectManager

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

  function runView(e) {
    const projectID = getProjectIDViewButton(e);
    projectManager.resetSelected();
    projectManager.setSelected(projectID);
  }

  menuProjects.addEventListener("click", runView);

  const todoTest = document.querySelector(".todo-logo");
  todoTest.addEventListener("click", () => projectManager.logAllProjects());
  projectManager.logAllProjects();
}

export { ProjectViewController };