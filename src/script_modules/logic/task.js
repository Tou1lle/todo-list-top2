/**
 * This class is a template for single tasks that
 * the user can create.
 * Tasks will be contained in a "Project"
 */
class Task {
  #title;
  #description;
  #dueDate;
  #priority;
  #checked
  #notes;
  #id;

  /**
   * 
   * @param {string} title the title of the tasks at hand (todo item)
   * @param {string} description a short description of the todo item
   * @param {Date} dueDate a date object indicating its deadline
   * @param {number} priority a number from 1 - 3 indicating the priority (3 highest)
   * @param {boolean} checked a togle between checked and unchecked task
   * @param {string} notes a longer description of the given task
   */
  constructor(
    title = "My Task"
    , description = "Let's do this!"
    , dueDate = new Date()
    , priority = 1
    , checked = false
    , notes = "I am so lazy:(") {
    this.#title = title;
    this.#description = description;
    this.#dueDate = dueDate;
    this.#priority = priority;
    this.#checked = checked;
    this.#notes = notes;
    this.#id = crypto.randomUUID();
  }

  get title() { return this.#title; }
  get description() { return this.#description; }
  get dueDate() { return this.#dueDate; }
  get priority() { return this.#priority; }
  get checked() { return this.#checked; }
  get notes() { return this.#notes; }
  get id() { return this.#id };

  set title(title) { this.#title = title }
  set description(description) { this.#description = description }
  set dueDate(dueDate) { this.#dueDate = dueDate }
  set priority(priority) { this.#priority = priority }
  set checked(checked) { this.#checked = checked }
  set notes(notes) { this.#notes = notes }

}

export { Task };