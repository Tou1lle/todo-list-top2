import { Task } from "./task.js";
import { Project } from "./project.js";

console.log("Hello World!");

const task = new Task();
const task1 = new Task("Create Project", "Do this to pass semester", new Date(2025, 11, 24), 3, false, "Try your best");
const task2 = new Task("Another", "Something", new Date(2025, 2, 3), 2, true, "Gambare");

console.log(task);
console.log(task1);
console.log(task2);

const myProject = new Project("Testing tasks with project");
//Testing adding tasks to Project array
myProject.addTask(task);
myProject.addTask(task1);
myProject.addTask(task2);
console.table(myProject.tasks);
//Testing deleting tasks from Project array by their title
console.log(myProject.getIndexOfTask(task2.title));
myProject.removeTask(myProject.getIndexOfTask(task2.title));
console.table(myProject.tasks);