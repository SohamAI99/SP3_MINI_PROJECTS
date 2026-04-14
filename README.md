# Web Technology Lab: Experiment No. 10 (Mini Projects Portfolio)
**Student Name:** Soham  
**Course:** B.Tech CSE (3rd Year)

This repository contains 10 beginner-friendly, fully functional mini-projects developed for the Web Technology Lab. This guide explains how to run each project locally on your machine.

---

## 🛠️ Category 1: Static HTML/JS/CSS Apps
Projects 1 through 6 are completely static. They do not require a backend or local server to run.

**How to run:** 
1. Navigate to the project's folder.
2. Double-click on `index.html` to open it directly in your web browser.

**Projects in this category:**
- 📁 `student_management/` - Student Management System (CRUD operations using JS Arrays)
- 📁 `todo_app/` - To-Do List Application
- 📁 `quiz_app/` - Online Quiz Application
- 📁 `weather_app/` - Weather App (Mock API Fetching)
- 📁 `calculator_app/` - Calculator App
- 📁 `blog_app/` - Blogging Website

---

## 🚀 Category 2: Node.js Backend Apps (Express & Socket.io)
Projects 7, 8, and 10 utilize a Node.js backend (Express) to handle API requests, database simulation, or WebSockets. *Note: NPM dependencies have already been installed.*

**How to run:**
1. Open your terminal or command prompt.
2. Navigate (`cd`) into the specific project folder.
3. Start the server using Node.
4. Open the provided `localhost` link in your browser.

### 7. E-Commerce Website (React + Node + SQLite)
```bash
# 1. Navigate to folder
cd ecommerce_app

# 2. Start the backend server
node server.js

# 3. Open your browser and go to:
http://localhost:3000/index.html
```

### 8. Real-Time Chat App (Node + Socket.io)
```bash
# 1. Navigate to folder
cd chat_app

# 2. Start the chat server
node server.js

# 3. Open your browser and go to this link in TWO separate tabs to chat with yourself:
http://localhost:3000/index.html
```

### 10. Login & Registration System (React + Node Auth)
```bash
# 1. Navigate to folder
cd login_system

# 2. Start the auth server
node server.js

# 3. Open your browser and go to:
http://localhost:3000/index.html
```

---

## ⚛️ Category 3: Modern Build-Tool Apps (Vite React)
Project 9 was built using an industry-standard modern React setup (`Vite`). Because it requires module bundling, it must be run using an npm development server. *Note: NPM dependencies have already been installed.*

### 9. Expense Tracker (Vite + React)
```bash
# 1. Navigate to folder
cd expense_tracker

# 2. Start the Vite Development Server
npm run dev

# 3. Look at the terminal output. It will tell you the exact local URL to open (usually something like http://localhost:5173).
```

---
*End of README*
