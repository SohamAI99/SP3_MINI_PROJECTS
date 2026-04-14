// Array to store blog posts objects in memory (simulating a database)
let posts = [];

// To track if we're currently editing an existing post
let editIndex = -1; 

// Retrieve DOM Elements
const blogForm = document.getElementById('blog-form');
const titleInput = document.getElementById('post-title');
const contentInput = document.getElementById('post-content');
const postsContainer = document.getElementById('posts-container');
const submitBtn = document.getElementById('submit-btn');
const cancelBtn = document.getElementById('cancel-btn');
const formTitle = document.getElementById('form-title');

/**
 * Handle form submission for Creation & Editing
 */
blogForm.addEventListener('submit', function(e) {
    e.preventDefault(); // Prevent page refresh

    const title = titleInput.value.trim();
    const content = contentInput.value.trim();
    
    // Generate current Date for the post signature
    const date = new Date().toLocaleDateString('en-US', {
        year: 'numeric', month: 'long', day: 'numeric'
    });

    if (title && content) {
        if (editIndex === -1) {
            // Edit Mode OFF: Add new post to array
            // .unshift() adds the item to the START of the array (newest first)
            posts.unshift({ 
                title: title,
                content: content,
                date: date
            });
        } else {
            // Edit Mode ON: Update existing post based on array index
            posts[editIndex].title = title;
            posts[editIndex].content = content;
            
            // Exit Edit Mode
            cancelEdit();
        }

        // Render posts to UI and reset form
        renderPosts();
        
        // Only clear the form completely if we were creating a NEW post. 
        // cancelEdit() already handles form clearing if we were in edit mode.
        if (editIndex === -1) {
            blogForm.reset();
        }
    } else {
        alert('Please fill out both title and content fields.');
    }
});

/**
 * Loops through the array and dynamically generates HTML for each post
 */
function renderPosts() {
    // Clear list
    postsContainer.innerHTML = '';
    
    // Check if empty
    if (posts.length === 0) {
        postsContainer.innerHTML = '<p style="color: #718096; text-align: center; padding: 20px;">No posts yet. Create one on the right!</p>';
        return;
    }

    // Generate HTML for each item
    posts.forEach((post, index) => {
        const postElement = document.createElement('article');
        postElement.classList.add('post-card');

        postElement.innerHTML = `
            <h3 class="post-title">${post.title}</h3>
            <p class="post-date">Published on ${post.date}</p>
            <p class="post-content">${post.content}</p>
            <div class="post-actions">
                <button class="btn btn-edit" onclick="editPost(${index})">Edit Post</button>
                <button class="btn btn-delete" onclick="deletePost(${index})">Delete</button>
            </div>
        `;

        postsContainer.appendChild(postElement);
    });
}

/**
 * Put the form into Edit Mode and load post data into inputs
 * @param {number} index - Index of the post in array
 */
function editPost(index) {
    const post = posts[index];
    
    // Populate form fields
    titleInput.value = post.title;
    contentInput.value = post.content;
    
    // Turn on Edit Mode globally
    editIndex = index;
    
    // Update UI elements to reflect Edit context
    formTitle.innerText = "Edit Post";
    submitBtn.innerText = "Update Post";
    cancelBtn.classList.remove('hidden');
    
    // Scroll to top automatically (helpful for users on small screens)
    window.scrollTo(0, 0);
}

/**
 * Cancel Edit Mode and restore form to Creation state
 */
function cancelEdit() {
    editIndex = -1;
    blogForm.reset();
    formTitle.innerText = "Create New Post";
    submitBtn.innerText = "Publish Post";
    cancelBtn.classList.add('hidden');
}

/**
 * Delete a post from the array
 * @param {number} index - Index of post to delete
 */
function deletePost(index) {
    if (confirm('Are you sure you want to permanently delete this post?')) {
        // Remove 1 item
        posts.splice(index, 1);
        
        // Handle edge-case: If user deletes the post they are currently editing, cancel edit mode
        if (editIndex === index) {
            cancelEdit();
        } else if (editIndex > index) {
            // Adjust the editIndex if a preceding element is removed because array indices shifted down
            editIndex--;
        }
        
        renderPosts();
    }
}

// Initial Render to show "No Posts Yet" message on page load
renderPosts();
