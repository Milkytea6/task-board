// Retrieve tasks and nextId from localStorage
let taskList = JSON.parse(localStorage.getItem("tasks"));
let nextId = JSON.parse(localStorage.getItem("nextId"));
// Establihes an array or pulls array from local storage
let taskArray = JSON.parse(localStorage.getItem('tasks')) || [];
// Logs to console for debugging
console.log(taskList);
console.log(typeof taskList);




// Todo: create a function to generate a unique task id
function generateTaskId() {
    const taskId = Math.floor(Math.random() * 1000);
    return taskId;
}

// Todo: create a function to create a task card
function createTaskCard(task) {
    console.log('hello');
    let taskCard = $("<div>").addClass("task-card draggable ui-widget-content");
    let taskTitle = $("<h3>").text(task.title);
    let taskDescription = $("<p>").text(task.description);
    let taskDueDate = $("<p>").text("DueDate: " + task.dueDate);
    taskCard.append(taskTitle, taskDescription, taskDueDate);
// Checks if the task is due today or overdue and changes the color accordingly
    if (task.status !== "done"){
        const today = dayjs();
        let cardDueDate = task.dueDate;
        if(today.isSame(cardDueDate, "day")){
            taskCard.addClass('bg-warning')
        }
        else if (today.isAfter(cardDueDate)){
            taskCard.addClass('bg-danger');
        }
        else{
            taskCard.addClass('bg-primary');
        }
    }
    console.log(taskCard);
    $("#todo-cards").append(taskCard);
    return taskCard;
}

// Todo: create a function to render the task list and make cards draggable
function renderTaskList() {
    // Selects each progress column to referance
   const todoColumn = $('#todo-cards');
   const inProgressColumn = $('#in-progress-cards');
   const doneColumn = $('#done-cards');
// Loops though each task and puts in in a column
   for(let i = 0; i < taskArray.length; i++){
    if(taskArray[i].status === "todo"){
        todoColumn.append(createTaskCard(taskArray[i]));
    }
    else if(taskArray[i].status === 'in-progress'){
        inProgressColumn.append(createTaskCard(taskArray[i]));
    }
    else{
        doneColumn.append(createTaskCard(taskArray[i]));
    }
   }
//    Makes each task card draggable
$( function() {
    $( ".draggable" ).draggable({
        zIndex: 100,
    });
  } );
}



const saveChanges = $('#save-changes');
saveChanges.on('click', function(){
    handleAddTask();
})


// Todo: create a function to handle adding a new task
function handleAddTask(event){
// Creates an object from the modal values
    let task = {
        title: $('#task-title').val(),
        dueDate: $('#datepicker').val(),
        description: $('#task-description').val(),
        status: "todo"
    };
// Logs to console for debugging
    console.log(task);
    console.log(typeof task);

    taskArray.push(task);
    localStorage.setItem('tasks', JSON.stringify(taskArray));
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
    renderTaskList();
    // $( function() {
    //     $( "#sortable1, #sortable2" ).sortable({
    //       connectWith: ".connectedSortable"
    //     }).disableSelection();
    //   } );
});

$( function() {
    $( "#datepicker" ).datepicker();
  } );
