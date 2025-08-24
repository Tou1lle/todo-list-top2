import { Task } from "./task.js";

/**
 * Project stores Tasks
 * Tasks are stored in array -> enables sorting implementation
 */
class Project {
  #tasks;
  #name;

  constructor(name = "My new Project") {
    this.#tasks = [];
    this.#name = name;
  }

  addTaskWithParam(title, description, dueDate, priority, checked, notes) {
    this.tasks.push(new Task(title, description, dueDate, priority, checked, notes));
  }

  addTask(task) {
    this.tasks.push(task);
  }

  getIndexOfTaskByTitle(title) {
    return this.tasks.map(task => task.title).indexOf(title);
  }

  getIndexOfTaskByID(id) {
    return this.tasks.map(task => task.id).indexOf(id);
  }

  removeTask(index) {
    if (index !== -1) {
      this.tasks.splice(index, 1);
    }
  }

  get tasks() { return this.#tasks; }
  get name() { return this.#name; }

  set name(name) { this.name = name }
}

export { Project };