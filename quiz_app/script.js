// Array holding quiz questions, options, and correct answer text
const quizQuestions = [
    {
        question: "What is the capital of France?",
        options: ["Berlin", "Madrid", "Paris", "Rome"],
        correctAnswer: "Paris"
    },
    {
        question: "Which language runs in a web browser?",
        options: ["Java", "C", "Python", "JavaScript"],
        correctAnswer: "JavaScript"
    },
    {
        question: "What does CSS stand for?",
        options: [
            "Central Style Sheets",
            "Cascading Style Sheets",
            "Cascading Simple Sheets",
            "Cars SUVs Sailboats"
        ],
        correctAnswer: "Cascading Style Sheets"
    },
    {
        question: "What does HTML stand for?",
        options: [
            "Hypertext Markup Language",
            "Hypertext Markdown Language",
            "Hyperloop Machine Language",
            "Helicopters Terminals Motorboats Lamborginis"
        ],
        correctAnswer: "Hypertext Markup Language"
    }
];

// Variables to track quiz state
let currentQuestionIndex = 0;
let score = 0;

// DOM Elements
const questionText = document.getElementById("question-text");
const optionList = document.getElementById("option-list");
const submitBtn = document.getElementById("submit-btn");
const quizContainer = document.getElementById("quiz-container");
const resultContainer = document.getElementById("result-container");
const scoreDisplay = document.getElementById("score-display");
const totalDisplay = document.getElementById("total-display");

/**
 * Function to load and display the current question
 */
function loadQuestion() {
    // Get the current question object
    const currentQuestion = quizQuestions[currentQuestionIndex];
    
    // Set question text
    questionText.textContent = `${currentQuestionIndex + 1}. ${currentQuestion.question}`;
    
    // Clear previous options
    optionList.innerHTML = '';
    
    // Loop through options and create HTML radio buttons
    currentQuestion.options.forEach((option, index) => {
        const li = document.createElement('li');
        
        // Setup radio input and label
        li.innerHTML = `
            <input type="radio" name="answer" id="option${index}" value="${option}">
            <label for="option${index}">${option}</label>
        `;
        
        optionList.appendChild(li);
    });
}

/**
 * Function to grab the selected option
 * @returns {string|undefined} The value of the selected radio button
 */
function getSelectedAnswer() {
    const answers = document.querySelectorAll('input[name="answer"]');
    let selectedValue;
    
    // Loop through radio buttons to find the checked one
    answers.forEach((answer) => {
        if (answer.checked) {
            selectedValue = answer.value;
        }
    });
    
    return selectedValue;
}

// Event listener for Submit Button
submitBtn.addEventListener('click', () => {
    // Get user's selected answer
    const selectedAnswer = getSelectedAnswer();
    
    // Validate if an answer was chosen
    if (selectedAnswer) {
        // Check if answer is correct
        if (selectedAnswer === quizQuestions[currentQuestionIndex].correctAnswer) {
            score++;
        }
        
        // Move to next question
        currentQuestionIndex++;
        
        // Check if we reached the end of the quiz
        if (currentQuestionIndex < quizQuestions.length) {
            loadQuestion(); // Load next question
        } else {
            // Hide quiz container and show result container
            quizContainer.classList.add('hidden');
            resultContainer.classList.remove('hidden');
            
            // Display final score
            scoreDisplay.textContent = score;
            totalDisplay.textContent = quizQuestions.length;
        }
    } else {
        alert("Please select an answer before submitting!");
    }
});

// Initialize the quiz on page load
loadQuestion();
