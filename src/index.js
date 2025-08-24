import { Task } from "./task.js";
import { Project } from "./project.js";

console.log("Hello World!");

const task = new Task();
const task1 = new Task("Create Project", "Do this to pass semester", new Date(2025, 11, 24), 3, false, "Try your best");
const task2 = new Task("Another", "Something", new Date(2025, 2, 3), 2, true, "Gambare");
const task3 = new Task("Task3");
const task4 = new Task("Task4");
const task5 = new Task("Task3");
const task6 = new Task("Task3");


console.log(task);
console.log(task1);
console.log(task2);

const myProject = new Project("Testing tasks with project");
//Testing adding tasks to Project array
myProject.addTask(task);
myProject.addTask(task1);
myProject.addTask(task2);
myProject.addTask(task3);
myProject.addTask(task4);
myProject.addTask(task5);
myProject.addTask(task6);
console.table(myProject.tasks);
//Testing deleting tasks from Project array by their title
console.log(myProject.getIndexOfTaskByTitle(task2.title));
myProject.removeTask(myProject.getIndexOfTaskByTitle(task2.title));
console.table(myProject.tasks);
console.log(myProject.getIndexOfTaskByID(task4.id));
myProject.removeTask(myProject.getIndexOfTaskByID(task4.id));
console.table(myProject.tasks);