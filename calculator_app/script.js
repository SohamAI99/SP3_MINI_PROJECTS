// State variables
let currentOperand = '0';
let previousOperand = '';
let operation = undefined;

// DOM Elements
const currentOperandTextElement = document.getElementById('current-operand');
const previousOperandTextElement = document.getElementById('previous-operand');

/**
 * Update the display screen
 */
function updateDisplay() {
    currentOperandTextElement.innerText = currentOperand;
    if (operation != null) {
        // Show previous operand and operator symbol
        previousOperandTextElement.innerText = `${previousOperand} ${operation}`;
    } else {
        previousOperandTextElement.innerText = '';
    }
}

/**
 * Clear the calculator display via AC button
 */
function clearDisplay() {
    currentOperand = '0';
    previousOperand = '';
    operation = undefined;
    updateDisplay();
}

/**
 * Delete a single number via DEL button
 */
function deleteNumber() {
    if (currentOperand === '0') return;
    
    // Remove last character
    currentOperand = currentOperand.toString().slice(0, -1);
    
    // Reset to 0 if we deleted everything
    if (currentOperand === '') currentOperand = '0';
    
    updateDisplay();
}

/**
 * Append a number or decimal point
 * @param {string} number 
 */
function appendNumber(number) {
    // Prevent multiple decimals
    if (number === '.' && currentOperand.includes('.')) return;
    
    // If current is '0', replace it (unless it's a decimal dot)
    if (currentOperand === '0' && number !== '.') {
        currentOperand = number.toString();
    } else {
        currentOperand = currentOperand.toString() + number.toString();
    }
    
    updateDisplay();
}

/**
 * Set the operation (+, -, *, /)
 * @param {string} op 
 */
function appendOperator(op) {
    if (currentOperand === '' && op !== '-') return;
    
    // If we already have a previous operand, calculate first before chaining
    if (previousOperand !== '') {
        calculate();
    }
    
    operation = op;
    previousOperand = currentOperand;
    currentOperand = ''; // Prepare for next number
    updateDisplay();
}

/**
 * Calculate the final result
 */
function calculate() {
    let result;
    const prev = parseFloat(previousOperand);
    const current = parseFloat(currentOperand);
    
    // Check if both numbers exist
    if (isNaN(prev) || isNaN(current)) return;
    
    switch (operation) {
        case '+':
            result = prev + current;
            break;
        case '-':
            result = prev - current;
            break;
        case '*':
            result = prev * current;
            break;
        case '/':
            // Handle division by zero
            result = current === 0 ? "Error" : prev / current;
            break;
        case '%':
            result = prev % current;
            break;
        default:
            return;
    }
    
    // If Error, return 0 to prevent breaking the flow
    if (result === "Error") {
        currentOperand = "Error";
    } else {
        // Round to 8 decimal places max to avoid floating point errors
        currentOperand = Math.round(result * 100000000) / 100000000;
        currentOperand = currentOperand.toString();
    }
    
    operation = undefined;
    previousOperand = '';
    updateDisplay();
}

// Initialize display
updateDisplay();
