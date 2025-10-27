import { Task } from "./task.js";
import { compareAsc } from "date-fns";

/**
 * Project stores Tasks
 * Tasks are stored in array -> enables sorting implementation
 */
class Project {
  #tasks;
  #name;
  #id;
  #selected;

  /**
   * 
   * @param {string} name name of the project that the user creates
   */
  constructor(name = "My new Project") {
    this.#tasks = [];
    this.#name = name;
    this.#id = crypto.randomUUID();
    this.#selected = false;
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

  comparePriority(taskA, taskB) {
    return taskB.priority - taskA.priority;
  }

  compareChecked(taskA, taskB) {
    //false values first;
    return (taskA.checked === taskB.checked) ? 0 : taskA.checked ? 1 : -1;
  }

  compareDates(taskA, taskB) {
    const typeA = typeof taskA.dueDate;
    const typeB = typeof taskB.dueDate;

    if (typeA === "string" && typeB === "string") return 0;
    if (typeA === "string" && typeB !== "string") return 1;
    if (typeA !== "string" && typeB === "string") return -1;

    return taskA.dueDate - taskB.dueDate;
  }

  compareCreationTime(taskA, taskB) {
    return taskA.creationTime - taskB.creationTime;
  }

  isEmpty() {
    return this.tasks.length === 0;
  }

  toggleSelected() {
    this.selected = !this.selected;
  }

  sortByPrio() {
    this.tasks.sort(this.comparePriority);
  }

  sortByChecked() {
    this.tasks.sort(this.compareChecked);
  }

  sortByCreation() {
    this.tasks.sort(this.compareCreationTime);
  }

  sortByDate() {
    this.tasks.sort(this.compareDates);
  }

  get tasks() { return this.#tasks; }
  get name() { return this.#name; }
  get id() { return this.#id; }
  get selected() { return this.#selected; }

  set tasks(arr) { this.#tasks = arr }
  set name(name) { this.#name = name }
  set id(randomID) { this.#id = randomID };
  set selected(bool) { this.#selected = bool; } 

  toJSON() {
    return {
      name: this.name,
      selected: this.selected,
      id: this.id,
      tasks: this.tasks
    }
  }
}

export { Project };