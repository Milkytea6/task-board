// Retrieve tasks and nextId from localStorage
// let taskList = JSON.parse(localStorage.getItem("tasks"));
let nextId = JSON.parse(localStorage.getItem("nextId"));
// Establihes an array or pulls array from local storage
let taskArray = JSON.parse(localStorage.getItem('tasks')) || [];

// Todo: create a function to generate a unique task id
function generateTaskId() {
    return crypto.randomUUID();
}

// Todo: create a function to create a task card
function createTaskCard(task) {
    let taskCard = $("<div>").addClass("task-card draggable ui-widget-content").attr('task-id', task.id);
    let taskTitle = $("<h3>").text(task.title);
    let taskDescription = $("<p>").text(task.description);
    let taskDueDate = $("<p>").text("DueDate: " + task.dueDate);
    let deleteBtn = $('<button>').text('Delete').addClass('delete-task').attr('task-id', task.id).on('click', handleDeleteTask);
    taskCard.append(taskTitle, taskDescription, taskDueDate, deleteBtn);
    // Checks if the task is due today or overdue and changes the color accordingly
    if (task.status !== "done") {
        const today = dayjs();
        let cardDueDate = task.dueDate;
        if (today.isSame(cardDueDate, "day")) {
            taskCard.addClass('bg-warning')
        }
        else if (today.isAfter(cardDueDate)) {
            taskCard.addClass('bg-danger');
        }
        else {
            taskCard.addClass('bg-primary');
        }
    }
    $("#todo-cards").append(taskCard);
    $('.draggable').draggable({
        zIndex: 100,
        revert: 'invalid', // If not dropped on a droppable target, it will revert back
        cursor: 'move' // Change cursor to indicate draggable element
    });
    return taskCard;
}

// Todo: create a function to render the task list and make cards draggable
function renderTaskList() {
    let taskArray = JSON.parse(localStorage.getItem('tasks')) || [];
    // Selects each progress column to referance
    const todoColumn = $('#todo-cards');
    todoColumn.empty();//Clears the column before the new array renders with the deleted task

    const inProgressColumn = $('#in-progress-cards');
    inProgressColumn.empty();

    const doneColumn = $('#done-cards');
    doneColumn.empty();

    // Loops though each task and puts in in a column
    for (let i = 0; i < taskArray.length; i++) {
        // check for "to-do" status and appends to to-do column if it matches.
        if (taskArray[i].status === "to-do") {
            todoColumn.append(createTaskCard(taskArray[i]));
        }
        else if (taskArray[i].status === 'in-progress') {
            inProgressColumn.append(createTaskCard(taskArray[i]));
        }
        else {
            doneColumn.append(createTaskCard(taskArray[i]));
        }
    }

    $('.draggable').draggable({
        zIndex: 100,
        revert: 'invalid', // If not dropped on a droppable target, it will revert back
        cursor: 'move' // Change cursor to indicate draggable element
    });
}



// Todo: create a function to handle adding a new task
function handleAddTask(event) {
    // Creates an object from the modal values
    let task = {
        title: $('#task-title').val(),
        dueDate: $('#datepicker').val(),
        description: $('#task-description').val(),
        status: "to-do",// fixed a typo bug from "todo" to "to-do"
        id: generateTaskId(),
    };
    // Logs to console for debugging
    console.log(task);
    console.log(typeof task);

    taskArray.push(task);
    localStorage.setItem('tasks', JSON.stringify(taskArray));
    createTaskCard(task);
}

// Todo: create a function to handle deleting a task
function handleDeleteTask(event) {
    console.log("handleDeleteTask");
    const taskId = $(this).attr('task-id');
    // Loop through the tasks and remove the task with  the matching ID
    taskArray.forEach((task) => {
        if (task.id === taskId) {
          taskArray.splice(taskArray.indexOf(task), 1);
        }
      });
    
    // Saves new array to local storage
    localStorage.setItem('tasks', JSON.stringify(taskArray));
    // Renders the tasks back on the page
    renderTaskList();
}

// Todo: create a function to handle dropping a task into a new status lane
function handleDrop(event, ui) {
    // get array from local storage
    let taskArray = JSON.parse(localStorage.getItem('tasks'));
    // get the id of the task we are dragging
    let taskId = ui.draggable.attr('task-id');
    // sets the lanes id status to a varibale
    const newStatus = event.target.id;
    for (let task of taskArray) {
        // find the id of the task and set a new status matching the lane it is dropped into.
        if (task.id === taskId) {
          task.status = newStatus;
        }
      }
     // Saves new array to local storage
    localStorage.setItem('tasks', JSON.stringify(taskArray));
    // Renders the tasks back on the page
    renderTaskList();
}

// Todo: when the page loads, render the task list, add event listeners, make lanes droppable, and make the due date field a date picker
$(document).ready(function () {
    renderTaskList();


    const saveChanges = $('#save-changes');
    saveChanges.on('click', function () {
        handleAddTask();
    })

    $('.lane').droppable({
        accept: '.draggable',
        drop: handleDrop,
    });
});


$(function () {
    $("#datepicker").datepicker();
});

