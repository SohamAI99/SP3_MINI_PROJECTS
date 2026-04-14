// Initialize Socket.io connection pointing to the host server
const socket = io();

// Define state variables
let myUsername = '';

// DOM Elements - Setup Phase
const setupScreen = document.getElementById('setup-screen');
const usernameInput = document.getElementById('username-input');
const joinBtn = document.getElementById('join-btn');

// DOM Elements - Chat Phase
const chatScreen = document.getElementById('chat-screen');
const chatForm = document.getElementById('chat-form');
const messageInput = document.getElementById('message-input');
const messagesList = document.getElementById('messages');

/**
 * Handle joining the chat room
 */
joinBtn.addEventListener('click', () => {
    const name = usernameInput.value.trim();
    if (name) {
        myUsername = name;
        
        // Hide setup screen and show chat screen
        setupScreen.classList.add('hidden');
        chatScreen.classList.remove('hidden');
        
        // Auto-focus the message input box
        messageInput.focus();
    }
});

// Allow hitting the Enter key to join
usernameInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        joinBtn.click();
    }
});

/**
 * Handle sending a chat message to the Server
 */
chatForm.addEventListener('submit', (e) => {
    e.preventDefault(); // Prevent page reload
    
    const msgText = messageInput.value.trim();
    
    if (msgText) {
        // Create a structured message object
        const msgInfo = {
            author: myUsername,
            text: msgText
        };
        
        // Execute socket emit event. Server listens for 'chat message'
        socket.emit('chat message', msgInfo);
        
        // Clear input field after sending
        messageInput.value = '';
    }
});

/**
 * Listen for incoming messages broadcasted from the Server
 */
socket.on('chat message', (msgInfo) => {
    // Create new list item
    const li = document.createElement('li');
    li.classList.add('message-item');
    
    // Determine CSS class based on who sent the message
    if (msgInfo.author === myUsername) {
        li.classList.add('self');
    } else {
        li.classList.add('other');
    }
    
    // Construct HTML content inside the message bubble
    li.innerHTML = `
        <span class="msg-author">${msgInfo.author}</span>
        <div class="msg-text">${msgInfo.text}</div>
    `;
    
    // Add to the DOM
    messagesList.appendChild(li);
    
    // Auto-scroll logic to automatically keep latest message in view
    messagesList.scrollTop = messagesList.scrollHeight;
});
