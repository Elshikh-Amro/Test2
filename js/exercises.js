// Exercise data model and utilities for Welcome to Programming

// Exercise data structure
class Exercise {
    constructor(id, title, description, difficulty, type, codeTemplate, solution, validationRules, hints) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.difficulty = difficulty; // 'short', 'medium', 'long'
        this.type = type; // 'reading', 'writing', 'mixed'
        this.codeTemplate = codeTemplate;
        this.solution = solution;
        this.validationRules = validationRules;
        this.hints = hints || [];
    }
}

// Course data
const COURSE_DATA = {
    title: "Welcome to Programming",
    version: "1.0.0",
    exercises: []
};

// Initialize exercises
function initializeExercises() {
    COURSE_DATA.exercises = [
        new Exercise(
            "01",
            "Understanding Single-Line Comments",
            "Read and understand what each comment explains about the code below.",
            "short",
            "reading",
            "// Declare a variable to store the user's name\nlet userName = 'Alice';\n\n// Print a welcome message to the console\nconsole.log('Welcome, ' + userName + '!');\n\n// Calculate the user's age next year\nlet currentAge = 25;\nlet nextYearAge = currentAge + 1;",
            "// Declare a variable to store the user's name\nlet userName = 'Alice';\n\n// Print a welcome message to the console\nconsole.log('Welcome, ' + userName + '!');\n\n// Calculate the user's age next year\nlet currentAge = 25;\nlet nextYearAge = currentAge + 1;",
            { requireReading: true, checkComments: false },
            ["Read each comment aloud", "Connect the comment to the code it describes", "Notice how comments explain the purpose of each line"]
        ),
        new Exercise(
            "02",
            "Adding Comments to Variables",
            "Add single-line comments to explain what each variable stores.",
            "short",
            "writing",
            "let score = 95;\nlet level = 3;\nlet isGameOver = false;\nlet playerName = 'Sam';",
            "// Store the player's current score\nlet score = 95;\n\n// Track the current game level\nlet level = 3;\n\n// Flag to check if the game has ended\nlet isGameOver = false;\n\n// The name of the current player\nlet playerName = 'Sam';",
            { requireReading: false, checkComments: true },
            ["Add a comment above each variable declaration", "Explain what data the variable holds", "Use clear, descriptive language"]
        ),
        new Exercise(
            "03",
            "Reading Multi-Line Comments",
            "Read the multi-line comment and understand the function's purpose before looking at the code.",
            "short",
            "reading",
            "/*\n * This function calculates the area of a rectangle\n * It takes two parameters: width and height\n * Returns the calculated area as a number\n */\nfunction calculateArea(width, height) {\n    return width * height;\n}",
            "/*\n * This function calculates the area of a rectangle\n * It takes two parameters: width and height\n * Returns the calculated area as a number\n */\nfunction calculateArea(width, height) {\n    return width * height;\n}",
            { requireReading: true, checkComments: false },
            ["Read the entire comment block first", "Note the function parameters and return value", "Understand what the function does before seeing the implementation"]
        ),
        new Exercise(
            "04",
            "Commenting Function Parameters",
            "Add comments to explain what each function parameter represents.",
            "short",
            "writing",
            "function sendMessage(recipient, message, urgent) {\n    if (urgent) {\n        console.log('URGENT: ' + message + ' to ' + recipient);\n    } else {\n        console.log(message + ' to ' + recipient);\n    }\n}",
            "function sendMessage(recipient, message, urgent) {\n    // The person who will receive the message\n    // The content of the message to send\n    // Whether this is an urgent message that needs immediate attention\n    if (urgent) {\n        console.log('URGENT: ' + message + ' to ' + recipient);\n    } else {\n        console.log(message + ' to ' + recipient);\n    }\n}",
            { requireReading: false, checkComments: true },
            ["Add comments for each parameter in the function signature", "Explain what type of data each parameter expects", "Describe the parameter's purpose in the function"]
        ),
        new Exercise(
            "05",
            "Understanding Code Flow Comments",
            "Read the comments to understand the logical flow of this conditional statement.",
            "medium",
            "reading",
            "// Check if the user is logged in\nif (userLoggedIn) {\n    // User is authenticated, show dashboard\n    showDashboard();\n} else {\n    // User needs to log in first\n    showLoginForm();\n    \n    // After login, redirect to dashboard\n    redirectToDashboard();\n}",
            "// Check if the user is logged in\nif (userLoggedIn) {\n    // User is authenticated, show dashboard\n    showDashboard();\n} else {\n    // User needs to log in first\n    showLoginForm();\n    \n    // After login, redirect to dashboard\n    redirectToDashboard();\n}",
            { requireReading: true, checkComments: false },
            ["Follow the logical flow described by the comments", "Understand the decision points in the code", "See how comments explain the program's behavior"]
        ),
        new Exercise(
            "06",
            "Adding Loop Comments",
            "Add comments to explain what this loop does and how it works.",
            "medium",
            "writing",
            "let shoppingList = ['apples', 'bread', 'milk', 'eggs'];\nlet itemCount = 0;\n\nfor (let i = 0; i < shoppingList.length; i++) {\n    console.log('Item ' + (i + 1) + ': ' + shoppingList[i]);\n    itemCount++;\n}\n\nconsole.log('Total items: ' + itemCount);",
            "// List of items to buy at the store\nlet shoppingList = ['apples', 'bread', 'milk', 'eggs'];\n\n// Counter to track how many items we've processed\nlet itemCount = 0;\n\n// Loop through each item in the shopping list\nfor (let i = 0; i < shoppingList.length; i++) {\n    // Display the current item with its position number\n    console.log('Item ' + (i + 1) + ': ' + shoppingList[i]);\n    // Increment the counter for each item processed\n    itemCount++;\n}\n\n// Show the total number of items in the list\nconsole.log('Total items: ' + itemCount);",
            { requireReading: false, checkComments: true },
            ["Comment what the loop is iterating over", "Explain what happens inside the loop", "Describe the loop's overall purpose"]
        ),
        new Exercise(
            "07",
            "Reading JSDoc Documentation",
            "Study this JSDoc comment to understand the function's interface and behavior.",
            "medium",
            "reading",
            "/**\n * Converts a temperature from Celsius to Fahrenheit\n * @param {number} celsius - The temperature in Celsius\n * @returns {number} The equivalent temperature in Fahrenheit\n * @example\n * // returns 32\n * celsiusToFahrenheit(0);\n * @example\n * // returns 212\n * celsiusToFahrenheit(100);\n */\nfunction celsiusToFahrenheit(celsius) {\n    return (celsius * 9/5) + 32;\n}",
            "/**\n * Converts a temperature from Celsius to Fahrenheit\n * @param {number} celsius - The temperature in Celsius\n * @returns {number} The equivalent temperature in Fahrenheit\n * @example\n * // returns 32\n * celsiusToFahrenheit(0);\n * @example\n * // returns 212\n * celsiusToFahrenheit(100);\n */\nfunction celsiusToFahrenheit(celsius) {\n    return (celsius * 9/5) + 32;\n}",
            { requireReading: true, checkComments: false },
            ["Read the function description", "Check the parameter and return types", "Look at the examples to understand usage"]
        ),
        new Exercise(
            "08",
            "Commenting Complex Logic",
            "Add detailed comments to explain this algorithm step by step.",
            "medium",
            "writing",
            "function findLargestNumber(numbers) {\n    if (numbers.length === 0) {\n        return null;\n    }\n    \n    let largest = numbers[0];\n    \n    for (let i = 1; i < numbers.length; i++) {\n        if (numbers[i] > largest) {\n            largest = numbers[i];\n        }\n    }\n    \n    return largest;\n}",
            "// Function to find the largest number in an array\nfunction findLargestNumber(numbers) {\n    // Handle empty array case\n    if (numbers.length === 0) {\n        return null;\n    }\n    \n    // Start by assuming the first number is the largest\n    let largest = numbers[0];\n    \n    // Check each remaining number in the array\n    for (let i = 1; i < numbers.length; i++) {\n        // If current number is larger than our current largest\n        if (numbers[i] > largest) {\n            // Update largest to this new number\n            largest = numbers[i];\n        }\n    }\n    \n    // Return the largest number found\n    return largest;\n}",
            { requireReading: false, checkComments: true },
            ["Explain the algorithm's approach", "Comment edge cases and error handling", "Describe each step of the logic"]
        ),
        new Exercise(
            "09",
            "Understanding Error Handling Comments",
            "Read the comments to understand how this function handles potential errors.",
            "medium",
            "reading",
            "// Function to safely divide two numbers\nfunction safeDivide(dividend, divisor) {\n    // Check for division by zero\n    if (divisor === 0) {\n        // Cannot divide by zero, throw an error\n        throw new Error('Division by zero is not allowed');\n    }\n    \n    // Perform the division\n    return dividend / divisor;\n}",
            "// Function to safely divide two numbers\nfunction safeDivide(dividend, divisor) {\n    // Check for division by zero\n    if (divisor === 0) {\n        // Cannot divide by zero, throw an error\n        throw new Error('Division by zero is not allowed');\n    }\n    \n    // Perform the division\n    return dividend / divisor;\n}",
            { requireReading: true, checkComments: false },
            ["Understand what errors the function checks for", "See how the function responds to invalid inputs", "Learn about defensive programming practices"]
        ),
        new Exercise(
            "10",
            "Writing Professional Documentation",
            "Add comprehensive comments following professional standards for this class.",
            "long",
            "writing",
            "class TodoList {\n    constructor() {\n        this.tasks = [];\n        this.nextId = 1;\n    }\n    \n    addTask(description) {\n        const task = {\n            id: this.nextId++,\n            description: description,\n            completed: false\n        };\n        this.tasks.push(task);\n        return task.id;\n    }\n    \n    completeTask(id) {\n        const task = this.tasks.find(t => t.id === id);\n        if (task) {\n            task.completed = true;\n            return true;\n        }\n        return false;\n    }\n    \n    getIncompleteTasks() {\n        return this.tasks.filter(task => !task.completed);\n    }\n}",
            "// TodoList class for managing a collection of tasks\nclass TodoList {\n    // Constructor initializes a new todo list\n    constructor() {\n        // Array to store all tasks\n        this.tasks = [];\n        // Counter for generating unique task IDs\n        this.nextId = 1;\n    }\n    \n    // Method to add a new task to the list\n    addTask(description) {\n        // Create a new task object with unique ID\n        const task = {\n            id: this.nextId++,\n            description: description,\n            completed: false\n        };\n        // Add the task to the tasks array\n        this.tasks.push(task);\n        // Return the ID of the newly created task\n        return task.id;\n    }\n    \n    // Method to mark a task as completed\n    completeTask(id) {\n        // Find the task with the matching ID\n        const task = this.tasks.find(t => t.id === id);\n        // If task exists, mark it as completed\n        if (task) {\n            task.completed = true;\n            return true;\n        }\n        // Task not found\n        return false;\n    }\n    \n    // Method to get all incomplete tasks\n    getIncompleteTasks() {\n        // Filter tasks to return only those not completed\n        return this.tasks.filter(task => !task.completed);\n    }\n}",
            { requireReading: false, checkComments: true },
            ["Add class-level documentation", "Comment all methods with their purpose and parameters", "Explain complex logic and data structures"]
        ),
        new Exercise(
            "11",
            "Reading API Documentation",
            "Study this API documentation to understand how to use the library function.",
            "medium",
            "reading",
            "/**\n * Formats a date according to the specified format string\n * @param {Date} date - The date object to format\n * @param {string} format - Format string (e.g., 'YYYY-MM-DD', 'MM/DD/YYYY')\n * @returns {string} The formatted date string\n * @throws {TypeError} If date is not a valid Date object\n * @example\n * const date = new Date('2023-12-25');\n * formatDate(date, 'MM/DD/YYYY'); // returns '12/25/2023'\n */\nfunction formatDate(date, format) {\n    // Implementation details...\n}",
            "/**\n * Formats a date according to the specified format string\n * @param {Date} date - The date object to format\n * @param {string} format - Format string (e.g., 'YYYY-MM-DD', 'MM/DD/YYYY')\n * @returns {string} The formatted date string\n * @throws {TypeError} If date is not a valid Date object\n * @example\n * const date = new Date('2023-12-25');\n * formatDate(date, 'MM/DD/YYYY'); // returns '12/25/2023'\n */\nfunction formatDate(date, format) {\n    // Implementation details...\n}",
            { requireReading: true, checkComments: false },
            ["Read the function description and parameters", "Check the examples for usage patterns", "Note error conditions and return types"]
        ),
        new Exercise(
            "12",
            "Commenting Event Handlers",
            "Add comments to explain this event-driven code and its behavior.",
            "medium",
            "writing",
            "document.getElementById('submit-btn').addEventListener('click', function(event) {\n    event.preventDefault();\n    \n    const name = document.getElementById('name-input').value;\n    const email = document.getElementById('email-input').value;\n    \n    if (name && email) {\n        submitForm(name, email);\n    } else {\n        showError('Please fill in all fields');\n    }\n});",
            "// Add click event listener to the submit button\ndocument.getElementById('submit-btn').addEventListener('click', function(event) {\n    // Prevent the default form submission behavior\n    event.preventDefault();\n    \n    // Get the values from the input fields\n    const name = document.getElementById('name-input').value;\n    const email = document.getElementById('email-input').value;\n    \n    // Validate that both fields have values\n    if (name && email) {\n        // Both fields filled, submit the form\n        submitForm(name, email);\n    } else {\n        // Missing required fields, show error message\n        showError('Please fill in all fields');\n    }\n});",
            { requireReading: false, checkComments: true },
            ["Explain the event listener setup", "Comment form validation logic", "Describe error handling and user feedback"]
        ),
        new Exercise(
            "13",
            "Understanding Asynchronous Code Comments",
            "Read the comments to understand how this asynchronous operation works.",
            "medium",
            "reading",
            "// Function to fetch user data from the server\nasync function fetchUserData(userId) {\n    try {\n        // Make an HTTP request to get user data\n        const response = await fetch(`/api/users/${userId}`);\n        \n        // Check if the request was successful\n        if (!response.ok) {\n            throw new Error('Failed to fetch user data');\n        }\n        \n        // Parse the JSON response\n        const userData = await response.json();\n        \n        // Return the user data\n        return userData;\n    } catch (error) {\n        // Handle any errors that occurred\n        console.error('Error fetching user data:', error);\n        throw error;\n    }\n}",
            "// Function to fetch user data from the server\nasync function fetchUserData(userId) {\n    try {\n        // Make an HTTP request to get user data\n        const response = await fetch(`/api/users/${userId}`);\n        \n        // Check if the request was successful\n        if (!response.ok) {\n            throw new Error('Failed to fetch user data');\n        }\n        \n        // Parse the JSON response\n        const userData = await response.json();\n        \n        // Return the user data\n        return userData;\n    } catch (error) {\n        // Handle any errors that occurred\n        console.error('Error fetching user data:', error);\n        throw error;\n    }\n}",
            { requireReading: true, checkComments: false },
            ["Understand the async/await pattern", "Follow the error handling flow", "See how promises are used for asynchronous operations"]
        ),
        new Exercise(
            "14",
            "Writing Algorithm Documentation",
            "Add comprehensive comments to document this sorting algorithm implementation.",
            "long",
            "writing",
            "function quickSort(arr) {\n    if (arr.length <= 1) {\n        return arr;\n    }\n    \n    const pivot = arr[0];\n    const left = [];\n    const right = [];\n    \n    for (let i = 1; i < arr.length; i++) {\n        if (arr[i] < pivot) {\n            left.push(arr[i]);\n        } else {\n            right.push(arr[i]);\n        }\n    }\n    \n    return [...quickSort(left), pivot, ...quickSort(right)];\n}",
            "// QuickSort algorithm implementation using divide and conquer\nfunction quickSort(arr) {\n    // Base case: arrays with 0 or 1 element are already sorted\n    if (arr.length <= 1) {\n        return arr;\n    }\n    \n    // Choose the first element as the pivot\n    const pivot = arr[0];\n    // Arrays to hold elements smaller and larger than pivot\n    const left = [];\n    const right = [];\n    \n    // Partition the array around the pivot\n    for (let i = 1; i < arr.length; i++) {\n        if (arr[i] < pivot) {\n            // Elements smaller than pivot go to left array\n            left.push(arr[i]);\n        } else {\n            // Elements larger than or equal to pivot go to right array\n            right.push(arr[i]);\n        }\n    }\n    \n    // Recursively sort left and right arrays, then combine with pivot\n    return [...quickSort(left), pivot, ...quickSort(right)];\n}",
            { requireReading: false, checkComments: true },
            ["Explain the algorithm's name and approach", "Document the partitioning logic", "Describe the recursive nature of the algorithm"]
        ),
        new Exercise(
            "15",
            "Reading Code with Mixed Comment Styles",
            "Read and understand this code that uses different commenting styles and techniques.",
            "long",
            "reading",
            "// ==========================================\n// USER AUTHENTICATION MODULE\n// Handles user login, logout, and session management\n// ==========================================\n\n/**\n * Authenticates a user with email and password\n * @param {string} email - User's email address\n * @param {string} password - User's password\n * @returns {Promise<Object>} User object if successful\n * @throws {AuthenticationError} If credentials are invalid\n */\nasync function authenticateUser(email, password) {\n    // Validate input parameters\n    if (!email || !password) {\n        throw new Error('Email and password are required');\n    }\n    \n    // Hash the password for comparison\n    const hashedPassword = hashPassword(password);\n    \n    /*\n     * Query database for user with matching email\n     * This is a potentially expensive operation\n     */\n    const user = await db.findUserByEmail(email);\n    \n    if (!user) {\n        throw new AuthenticationError('User not found');\n    }\n    \n    // Compare hashed passwords\n    if (user.passwordHash !== hashedPassword) {\n        throw new AuthenticationError('Invalid password');\n    }\n    \n    // Create and return session token\n    return createSessionToken(user);\n}",
            "// ==========================================\n// USER AUTHENTICATION MODULE\n// Handles user login, logout, and session management\n// ==========================================\n\n/**\n * Authenticates a user with email and password\n * @param {string} email - User's email address\n * @param {string} password - User's password\n * @returns {Promise<Object>} User object if successful\n * @throws {AuthenticationError} If credentials are invalid\n */\nasync function authenticateUser(email, password) {\n    // Validate input parameters\n    if (!email || !password) {\n        throw new Error('Email and password are required');\n    }\n    \n    // Hash the password for comparison\n    const hashedPassword = hashPassword(password);\n    \n    /*\n     * Query database for user with matching email\n     * This is a potentially expensive operation\n     */\n    const user = await db.findUserByEmail(email);\n    \n    if (!user) {\n        throw new AuthenticationError('User not found');\n    }\n    \n    // Compare hashed passwords\n    if (user.passwordHash !== hashedPassword) {\n        throw new AuthenticationError('Invalid password');\n    }\n    \n    // Create and return session token\n    return createSessionToken(user);\n}",
            { requireReading: true, checkComments: false },
            ["Notice the different comment styles used", "Read the module-level documentation first", "Understand how comments serve different purposes"]
        )
    ];
}

// Export functions for use in other modules
function getExercises() {
    // Ensure exercises are initialized
    if (COURSE_DATA.exercises.length === 0) {
        initializeExercises();
    }
    return COURSE_DATA.exercises;
}

function getExerciseById(id) {
    const exercises = getExercises();
    return exercises.find(ex => ex.id === id);
}

function getCourseData() {
    return COURSE_DATA;
}

// Make functions available globally for the browser
window.getExercises = getExercises;
window.getExerciseById = getExerciseById;
window.getCourseData = getCourseData;