import { Project } from "./project";

/**
 * Project manager stores Projects
 * 
 * this class is created for better
 * storing projects and managing (delete project etc.)
 */
class ProjectManager {
  #projects;

  constructor() {
    this.#projects = [];
  }

  addProject(project) {
    this.#projects.push(project);
  }

  removeProject(id) {
    const index = this.#projects.map( project => project.id ).indexOf(id);
    console.log("INDEX:" + index);
    if (index !== -1) {
      this.#projects.splice(index, 1);
    }
  }

  getProjectById(givenId) {
    return this.#projects.find(({id}) => id === givenId);
  }

  logAllProjects() {
    this.#projects.forEach(project => console.log(project));
    console.log(this.#projects.length);
  }

  setSelectedProject(id) {
    const foundProject = this.getProjectById(id);
    foundProject.selected = true;
  }

  get projects() { return this.#projects }
}

export { ProjectManager };