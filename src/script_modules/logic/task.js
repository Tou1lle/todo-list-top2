/**
 * This class is a template for single tasks that
 * the user can create.
 * Tasks will be contained in a "Project"
 */
class Task {
  #title;
  #dueDate;
  #priority;
  #checked
  #notes;
  #id;
  #creationTime;

  /**
   * 
   * @param {string} title the title of the tasks at hand (todo item)
   * @param {Date} dueDate a date object indicating its deadline
   * @param {number} priority a number from 1 - 3 indicating the priority (1 highest)
   * @param {boolean} checked a togle between checked and unchecked task
   * @param {string} notes a longer description of the given task
   */
  constructor(
    title = "My Task"
    , dueDate = new Date()
    , priority = 1
    , checked = false
    , notes = "I am so lazy:(") {
    this.#title = title;
    this.#dueDate = this.checkValidDate(dueDate);
    this.#priority = priority;
    this.#checked = checked;
    this.#notes = notes;
    this.#id = crypto.randomUUID();
    this.#creationTime = Date.now();
  }

  toggleChecked() {
    this.checked = !this.checked;
  }

  checkValidDate(dateArg) {
    if (new Date(dateArg).toString().includes("Invalid")) {
      return "No Due Date";
    } else {
      return new Date(dateArg);
    };
  }

  get title() { return this.#title; }
  get dueDate() { return this.#dueDate; }
  get priority() { return this.#priority; }
  get checked() { return this.#checked; }
  get notes() { return this.#notes; }
  get id() { return this.#id };
  get creationTime() { return this.#creationTime };

  set title(title) { this.#title = title }
  set dueDate(dueDate) { this.#dueDate = dueDate }
  set priority(priority) { this.#priority = priority }
  set checked(checked) { this.#checked = checked }
  set notes(notes) { this.#notes = notes }

  toJSON() {
    return {
      title: this.title,
      dueDate: this.dueDate,
      priority: this.priority,
      checked: this.checked,
      notes: this.notes,
      id: this.id,
      creationTime: this.creationTime
    }
  }
}

export { Task };