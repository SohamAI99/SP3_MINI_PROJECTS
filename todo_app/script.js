// Array to store task objects
let tasks = [];

// Get DOM Elements
const taskInput = document.getElementById('task-input');
const addBtn = document.getElementById('add-btn');
const taskList = document.getElementById('task-list');

/**
 * Function to add a new task
 */
function addTask() {
    const taskText = taskInput.value.trim();

    // Check if input is not empty
    if (taskText !== '') {
        // Create new task object
        const newTask = {
            text: taskText,
            completed: false // Default completion status
        };

        // Add task to array
        tasks.push(newTask);
        
        // Clear input field
        taskInput.value = '';
        
        // Update the display
        renderTasks();
    } else {
        alert("Please enter a task.");
    }
}

/**
 * Function to render all tasks to the DOM
 */
function renderTasks() {
    // Clear current list
    taskList.innerHTML = '';

    // Loop through tasks array
    for(let i = 0; i < tasks.length; i++) {
        const task = tasks[i];
        
        // Create li element
        const li = document.createElement('li');
        
        // Add completed class if task is marked complete
        if (task.completed) {
            li.classList.add('completed');
        }

        // Create HTML content for the list item
        // Use checkbox for completion, span for text, button for deletion
        li.innerHTML = `
            <input type="checkbox" class="checkbox" 
                   ${task.completed ? 'checked' : ''} 
                   onclick="toggleComplete(${i})">
            <span class="task-text">${task.text}</span>
            <button class="delete-btn" onclick="deleteTask(${i})">Delete</button>
        `;

        // Append to the list
        taskList.appendChild(li);
    }
}

/**
 * Function to toggle task completion status
 * @param {number} index - Index of task in array 
 */
function toggleComplete(index) {
    // Flip the boolean completed status
    tasks[index].completed = !tasks[index].completed;
    
    // Re-render list to reflect change
    renderTasks();
}

/**
 * Function to delete a task
 * @param {number} index - Index of task to delete
 */
function deleteTask(index) {
    // Remove 1 element at specified index
    tasks.splice(index, 1);
    
    // Re-render list
    renderTasks();
}

// Add event listener to "Add" button
addBtn.addEventListener('click', addTask);

// Optional: Allow pressing "Enter" key to add task
taskInput.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        addTask();
    }
});
