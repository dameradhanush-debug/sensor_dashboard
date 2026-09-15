// Get input element
const taskInput = document.getElementById("taskInput");


// Get Add button
const addButton = document.getElementById("addButton");


// Get task list
const taskList = document.getElementById("taskList");


// Get Fetch button
const fetchButton = document.getElementById("fetchButton");


// Get tasks from Local Storage
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];


// Function to display tasks
function displayTasks() {

    // Clear the existing task list
    taskList.innerHTML = "";


    // Loop through all tasks
    tasks.forEach(function (task, index) {

        // Create a new list item
        const li = document.createElement("li");


        // Create task text
        const taskText = document.createElement("span");


        // Set task name
        taskText.textContent = task.text;


        // Check if task is completed
        if (task.completed) {

            taskText.classList.add("completed");

        }


        // Event for completing a task
        taskText.addEventListener("click", function () {

            // Change completed status
            tasks[index].completed = !tasks[index].completed;


            // Save tasks
            saveTasks();


            // Display updated tasks
            displayTasks();

        });


        // Create Delete button
        const deleteButton = document.createElement("button");


        // Set button text
        deleteButton.textContent = "Delete";


        // Add CSS class
        deleteButton.classList.add("delete-btn");


        // Delete button event
        deleteButton.addEventListener("click", function () {

            // Remove task
            tasks.splice(index, 1);


            // Save updated tasks
            saveTasks();


            // Display updated list
            displayTasks();

        });


        // Add task text to list item
        li.appendChild(taskText);


        // Add Delete button to list item
        li.appendChild(deleteButton);


        // Add list item to task list
        taskList.appendChild(li);

    });

}


// Function to add a task
function addTask() {

    // Get input value
    const taskText = taskInput.value.trim();


    // Check if input is empty
    if (taskText === "") {

        alert("Please enter a task!");

        return;

    }


    // Add new task
    tasks.push({

        text: taskText,

        completed: false

    });


    // Save tasks
    saveTasks();


    // Clear input
    taskInput.value = "";


    // Display tasks
    displayTasks();

}


// Function to save tasks
function saveTasks() {

    localStorage.setItem(
        "tasks",
        JSON.stringify(tasks)
    );

}


// Add button click event
addButton.addEventListener(
    "click",
    addTask
);


// Enter key event
taskInput.addEventListener(
    "keypress",
    function (event) {

        if (event.key === "Enter") {

            addTask();

        }

    }
);


// Fetch button event
fetchButton.addEventListener(
    "click",
    async function () {

        try {

            // Fetch data from API
            const response = await fetch(
                "https://jsonplaceholder.typicode.com/todos?_limit=5"
            );


            // Convert response to JSON
            const data = await response.json();


            // Add fetched tasks
            data.forEach(function (item) {

                tasks.push({

                    text: item.title,

                    completed: item.completed

                });

            });


            // Save fetched tasks
            saveTasks();


            // Display tasks
            displayTasks();

        }

        catch (error) {

            alert("Failed to fetch tasks!");

            console.error(error);

        }

    }
);


// Display tasks when page loads
displayTasks();