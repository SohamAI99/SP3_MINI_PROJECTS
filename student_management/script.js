// Array to act as our database for strong student objects
let students = [];

// Index tracker to know if we are editing an existing record
let editIndex = -1; 

// Retrieve DOM Elements
const studentForm = document.getElementById('student-form');
const nameInput = document.getElementById('name');
const rollInput = document.getElementById('roll');
const courseInput = document.getElementById('course');
const studentList = document.getElementById('student-list');
const submitBtn = document.getElementById('submit-btn');

/**
 * Handle Form Submission for both Add and Update operations
 */
studentForm.addEventListener('submit', function(e) {
    e.preventDefault(); // Prevents page from reloading upon submit

    // Get values from inputs and remove extra whitespace
    const name = nameInput.value.trim();
    const roll = rollInput.value.trim();
    const course = courseInput.value.trim();

    // Basic validation to ensure fields are not empty
    if (name !== '' && roll !== '' && course !== '') {
        
        if (editIndex === -1) {
            // No editIndex set: Add new student object to array
            students.push({ 
                name: name, 
                roll: roll, 
                course: course 
            });
        } else {
            // Edit mode: Update existing student data
            students[editIndex] = { 
                name: name, 
                roll: roll, 
                course: course 
            };
            
            // Reset edit mode state
            editIndex = -1; 
            submitBtn.textContent = 'Add Student';
        }
        
        // Reset the input fields
        studentForm.reset();
        
        // Update the HTML table with the new array contents
        renderStudents();
    } else {
        alert('Please fill out all fields.');
    }
});

/**
 * Renders the students array into HTML table rows
 */
function renderStudents() {
    // Clear out existing rows before re-rendering
    studentList.innerHTML = ''; 

    // Loop through each student in the array
    for (let i = 0; i < students.length; i++) {
        const student = students[i];
        
        // Create a new table row element
        const tr = document.createElement('tr');

        // Populate the row with student data and Action buttons
        tr.innerHTML = `
            <td>${student.roll}</td>
            <td>${student.name}</td>
            <td>${student.course}</td>
            <td>
                <!-- Pass the array index 'i' to the edit and delete functions -->
                <button class="action-btn edit-btn" onclick="editStudent(${i})">Edit</button>
                <button class="action-btn delete-btn" onclick="deleteStudent(${i})">Delete</button>
            </td>
        `;

        // Add the row to the table body
        studentList.appendChild(tr);
    }
}

/**
 * Loads a student's data into the form inputs for editing
 * @param {number} index - the array index of the student to edit
 */
function editStudent(index) {
    const student = students[index];
    
    // Fill form fields with student data
    nameInput.value = student.name;
    rollInput.value = student.roll;
    courseInput.value = student.course;
    
    // Set the global editIndex so form submission knows we are updating
    editIndex = index; 
    
    // Change button text to indicate update mode
    submitBtn.textContent = 'Update Student';
}

/**
 * Deletes a student from the array and re-renders the table
 * @param {number} index - the array index of the student to delete
 */
function deleteStudent(index) {
    // Display confirmation dialog before deleting
    if (confirm('Are you sure you want to delete this record?')) {
        // Remove 1 element from array at the specified index
        students.splice(index, 1); 
        
        // Re-render the HTML table to reflect the deletion
        renderStudents(); 
    }
}
