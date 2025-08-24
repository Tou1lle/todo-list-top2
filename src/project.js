import { Task } from "./todo";

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

  addTask(title, description, dueDate, priority, checked, notes) {
    this.tasks.push(new Task(title, description, dueDate, priority, checked, notes));
  }

  get tasks() { return this.#tasks; }
}