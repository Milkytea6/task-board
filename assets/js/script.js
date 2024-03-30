// Retrieve tasks and nextId from localStorage
let taskList = JSON.parse(localStorage.getItem("tasks"));
let nextId = JSON.parse(localStorage.getItem("nextId"));
let taskArray = localStorage.getItem()

// Todo: create a function to generate a unique task id
function generateTaskId() {

}

// Todo: create a function to create a task card
function createTaskCard(task) {
    let taskCard = $("<div>").addClass("task-card");
    let taskTitle = $("<h3>").text(task.title);
    let taskDescription = $("<p>").text(task.description);
    let taskDueDate = $("<p>").text("DueDate: " + task.DueDate);
    taskCard.append(taskTitle, taskDescription, taskDueDate);
    $("#todo-cards").append(taskCard);
}

// Todo: create a function to render the task list and make cards draggable
function renderTaskList() {

}


const saveChanges = $('#save-changes');
saveChanges.on('click', function(){
    handleAddTask();
})


// Todo: create a function to handle adding a new task
function handleAddTask(event){
    
    const taskTitle = $('#task-title').val();
    const datePicker = $('#datepicker').val();
    const taskDescription = $('#task-description').val();

    let task = {
        title: taskTitle,
        dueDate: datePicker,
        description: taskDescription,
    };
    taskArray.push(task);
    localStorage.setItem(JSON.stringify(taskArray));
    createTaskCard(task);
}

// Todo: create a function to handle deleting a task
function handleDeleteTask(event){

}

// Todo: create a function to handle dropping a task into a new status lane
function handleDrop(event, ui) {

}

// Todo: when the page loads, render the task list, add event listeners, make lanes droppable, and make the due date field a date picker
$(document).ready(function () {

});

$( function() {
    $( "#datepicker" ).datepicker();
  } );
