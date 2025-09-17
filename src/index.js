import { Task } from "./script_modules/logic/task.js";
import { Project } from "./script_modules/logic/project.js";
import { ProjectManager } from "./script_modules/logic/project-manager.js";
import { ProjectMenuController } from "./script_modules/ui/project_menu.js";
import { ProjectViewController } from "./script_modules/ui/project_view.js";
import "./styles/josh_comeau_reset.css";
import "./styles/style.css";

console.log("Hello World!");
const projectMenuController = ProjectMenuController();
const projectViewController = ProjectViewController(projectMenuController.getProjectManager());

/*
// Creating tasks
const task = new Task();
task.priority = 3;
task.checked = true;
const task1 = new Task("Create Project", "Do this to pass semester", new Date(2025, 11, 24), 3, false, "Try your best");
task1.priority = 3
const task2 = new Task("Another", "Something", new Date(2026, 2, 3), 1, true, "Gambare");
const task3 = new Task("Task3");
task3.priority = 2;
const task4 = new Task("Task4");
task4.checked = true;
const task5 = new Task("Task5");
task5.priority = 3;
const task6 = new Task("Task6");
task6.priority = 2;
task6.dueDate = new Date(2024, 2, 2);

// Loging some tasks
console.log("LOGGING SOME TASKS");
console.log("------------------");
console.log(task);
console.log(task1);
console.log(task2);

// Creating Project
const myProject = new Project("Testing tasks with project");
const myProject1 = new Project("Testing more projects with project manager")

console.log("LOGGING PROJECT EMPTINESS");
console.log("------------------");
// Check project emptiness
console.log("Project is empty: " + myProject.isEmpty());

//Testing adding tasks to Project array
myProject.addTask(task);
myProject.addTask(task1);
myProject.addTask(task2);
myProject.addTask(task3);
myProject.addTask(task4);
myProject.addTask(task5);
myProject.addTask(task6);
console.log("Project is empty: " + myProject.isEmpty());
console.log("LOGGING TASKS FROM PROJECT BY ORDER ADDED")
console.log("------------------");
console.table(myProject.tasks);

//Testing sort by priority
console.log("LOGGING SORTED BY PRIORITY -> HIGHEST FIRST");
myProject.tasks.sort(myProject.comparePriority);
console.table(myProject.tasks)
console.log("LOGGING SORTED BY CHECKED -> UNCHECKED FIRST");
myProject.tasks.sort(myProject.compareChecked);
console.table(myProject.tasks)
console.log("LOGGING SORTED BY DUE DATE - CLOSEST FIRST");
myProject.tasks.sort(myProject.compareDates);
console.table(myProject.tasks);

//Testing deleting tasks from Project array by their title
console.log(myProject.getIndexOfTaskByTitle(task2.title));
myProject.removeTask(myProject.getIndexOfTaskByTitle(task2.title));
console.table(myProject.tasks);
console.log(myProject.getIndexOfTaskByID(task4.id));
myProject.removeTask(myProject.getIndexOfTaskByID(task4.id));
console.table(myProject.tasks);

console.log("LOGGING PROJECT MANAGER");
console.log("------------------");
const projectManager = new ProjectManager();
projectManager.addProject(myProject);
projectManager.addProject(myProject1);
console.log(myProject1.id);
console.log(myProject.id);
console.log(projectManager.getProjectById(myProject.id));
projectManager.removeProject(myProject1.id)
console.log(projectManager);
*/