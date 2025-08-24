import { Task } from "./todo.js";

console.log("Hello World!");

const task = new Task();
console.log(task);

const task1 = new Task("Create Project", "Do this to pass semester", new Date(2025, 11, 24), 3, false, "Try your best");
console.log(task1);