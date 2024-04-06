# Task Board

## Functionality
The user can view a task board of different tasks organized by due date and progress of each task. The user will select "Add Task" then input a title, due date, and description. Then the task will render into the Not Yet Started column. When the user starts the task, they can move it to the In Progress column. Then when the user finished the task, they can move it to the completed column. The tasks will change color accoring to the deadline. The task will also save in local storage if the user closes the page and returns or refreshes the page. 
## User Story
```
AS A project team member with multiple tasks to organize
I WANT a task board 
SO THAT I can add individual project tasks, manage their state of progress and track overall project progress accordingly
```
## Acceptance Criteria
```
GIVEN a task board to manage a project
WHEN I open the task board
THEN the list of project tasks is displayed in columns representing the task progress state (Not Yet Started, In Progress, Completed)
WHEN I view the task board for the project
THEN each task is color coded to indicate whether it is nearing the deadline (yellow) or is overdue (red)
WHEN I click on the button to define a new task
THEN I can enter the title, description and deadline date for the new task into a modal dialog
WHEN I click the save button for that task
THEN the properties for that task are saved in localStorage
WHEN I drag a task to a different progress column
THEN the task's progress state is updated accordingly and will stay in the new column after refreshing
WHEN I click the delete button for a task
THEN the task is removed from the task board and will not be added back after refreshing
WHEN I refresh the page
THEN the saved tasks persist
```