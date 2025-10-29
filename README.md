# todo-list-top2
This project is part of TOP curriculum which aims to create a Todo List. 

In this project I aim to strengthen my skills in separating the application logic from the user interface
so when I need to make changes in either field, it wont drastically affect the other one.

Html
- dialog and forms

CSS
- flexbox, grid

JS
- Classes:
  - ProjectManager - contains Projects -> backbone for localStorage
  - Project - contains Tasks
  - Task

The localStorage has only 1 item - "projects" which is a stringified array of Projects that the code
gets from ProjectManager (since ProjectManager contains Projects and Projects contains Tasks it kinda
creates a dependency graph and only the array from ProjectManager is needed).

The item "projects" gets updated after every important event using setItem and the most recent
Array of Projects.

The code got messy overtime and could for sure use a lot of improvement, but hey.. IT WORKS:)
