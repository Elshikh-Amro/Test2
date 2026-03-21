// Main application logic for Welcome to Programming exercises

document.addEventListener('DOMContentLoaded', function() {
    console.log('Welcome to Programming exercises loaded');

    // Initialize the application
    initApp();
});

function initApp() {
    // Check if we're on the homepage or exercise page
    if (document.getElementById('exercise-list')) {
        // Homepage
        loadExercises();
    } else if (document.getElementById('exercise-content')) {
        // Exercise page
        loadExercisePage();
    }
}

function loadExercises() {
    const exerciseList = document.getElementById('exercise-list');

    if (!exerciseList) {
        console.error('Exercise list container not found');
        return;
    }

    // Get exercises from data
    const exercises = getExercises();
    
    // Update counter
    const counter = document.getElementById('exercise-count');
    if (counter) {
        counter.textContent = `(${exercises.length} exercises)`;
    }

    if (exercises.length === 0) {
        document.getElementById('no-exercises').style.display = 'block';
        return;
    }

    // Render exercise cards
    exercises.forEach(exercise => {
        const card = createExerciseCard(exercise);
        exerciseList.appendChild(card);
    });
}

function createExerciseCard(exercise) {
    const card = document.createElement('div');
    card.className = 'exercise-card';

    const status = getExerciseStatus(exercise.id);

    card.innerHTML = `
        <h3>${exercise.title}</h3>
        <span class="difficulty ${exercise.difficulty}">${exercise.difficulty}</span>
        <p>${exercise.description}</p>
        <div class="status ${status}">${getStatusText(status)}</div>
        <a href="exercises/exercise-${exercise.id}.html" class="btn">Start Exercise</a>
    `;

    return card;
}

function getStatusText(status) {
    switch(status) {
        case 'completed': return '✓ Completed';
        case 'attempted': return '⏳ Attempted';
        default: return 'Not Started';
    }
}

function loadExercisePage() {
    // Get exercise ID from URL
    const urlParams = new URLSearchParams(window.location.search);
    const exerciseId = urlParams.get('id') || getExerciseIdFromPath();

    if (!exerciseId) {
        console.error('No exercise ID found');
        return;
    }

    const exercise = getExerciseById(exerciseId);
    if (!exercise) {
        console.error('Exercise not found:', exerciseId);
        return;
    }

    // Populate exercise data
    document.getElementById('exercise-title').textContent = exercise.title;
    document.getElementById('exercise-difficulty').textContent = exercise.difficulty;
    document.getElementById('exercise-difficulty').className = `difficulty-badge ${exercise.difficulty}`;
    document.getElementById('exercise-description').textContent = exercise.description;

    // Display code with highlighting
    const codeDisplay = document.getElementById('code-input');
    codeDisplay.value = exercise.codeTemplate;

    // Show/hide reading validation based on exercise type
    const readingSection = document.getElementById('reading-validation');
    if (exercise.type === 'reading' || exercise.type === 'mixed') {
        readingSection.style.display = 'block';
    }

    // Setup event listeners
    setupExerciseEventListeners(exercise);
}

function getExerciseIdFromPath() {
    // Extract from path like /exercises/exercise-01.html
    const path = window.location.pathname;
    const match = path.match(/exercise-(\d+)\.html/);
    return match ? match[1].padStart(2, '0') : null;
}

function getExerciseById(id) {
    const exercises = getExercises();
    return exercises.find(ex => ex.id === id);
}

function setupExerciseEventListeners(exercise) {
    const submitBtn = document.getElementById('submit-btn');
    const resetBtn = document.getElementById('reset-btn');
    const hintBtn = document.getElementById('hint-btn');
    const showAnswerBtn = document.getElementById('show-answer-btn');

    if (!submitBtn || !resetBtn || !hintBtn || !showAnswerBtn) {
        console.error('One or more buttons not found:', {
            submitBtn: !!submitBtn,
            resetBtn: !!resetBtn,
            hintBtn: !!hintBtn,
            showAnswerBtn: !!showAnswerBtn
        });
        return;
    }

    submitBtn.addEventListener('click', () => submitExercise(exercise));
    resetBtn.addEventListener('click', () => resetExercise(exercise));
    hintBtn.addEventListener('click', () => showHint(exercise));
    showAnswerBtn.addEventListener('click', () => {
        console.log('Show Answer clicked for exercise:', exercise.id);
        showAnswer(exercise);
    });
}

function submitExercise(exercise) {
    const codeInput = document.getElementById('code-input').value;
    const readingUnderstood = document.getElementById('reading-understood').checked;

    const isValid = validateExercise(exercise, codeInput, readingUnderstood);

    const feedbackArea = document.getElementById('feedback');
    feedbackArea.style.display = 'block';

    if (isValid) {
        feedbackArea.innerHTML = '<div class="success">✓ Correct! Exercise completed.</div>';
        saveProgress(exercise.id, 'completed');
        updateNavigation(exercise);
    } else {
        feedbackArea.innerHTML = '<div class="error">✗ Not quite right. Try again or use a hint.</div>';
        saveProgress(exercise.id, 'attempted');
    }
}

function resetExercise(exercise) {
    document.getElementById('code-input').value = exercise.codeTemplate;
    document.getElementById('reading-understood').checked = false;
    document.getElementById('feedback').style.display = 'none';
    document.getElementById('hint-area').style.display = 'none';
    document.getElementById('answer-area').style.display = 'none';

    // Reset hint system
    const hintBtn = document.getElementById('hint-btn');
    hintBtn.dataset.hintLevel = '0';
    hintBtn.textContent = 'Hint';
    hintBtn.disabled = false;
}

function showHint(exercise) {
    // Progressive hint system
    const hintArea = document.getElementById('hint-area');
    const hintBtn = document.getElementById('hint-btn');

    if (!hintArea) {
        console.error('Hint area not found');
        return;
    }

    // Get current hint level from button data attribute
    let hintLevel = parseInt(hintBtn.dataset.hintLevel || '0');

    if (hintLevel < exercise.hints.length) {
        // Show next hint
        const hint = exercise.hints[hintLevel];
        hintArea.innerHTML = `<div class="hint">💡 Hint ${hintLevel + 1}: ${hint}</div>`;
        hintArea.style.display = 'block';

        // Update hint level
        hintLevel++;
        hintBtn.dataset.hintLevel = hintLevel;

        // Update button text
        if (hintLevel < exercise.hints.length) {
            hintBtn.textContent = `Show Hint ${hintLevel + 1}`;
        } else {
            hintBtn.textContent = 'All Hints Shown';
            hintBtn.disabled = true;
        }
    }
}

function showAnswer(exercise) {
    // Show the correct answer
    console.log('showAnswer called for exercise:', exercise.id);
    console.log('Exercise solution:', exercise.solution);
    
    const answerArea = document.getElementById('answer-area');
    
    if (!answerArea) {
        console.error('Answer area not found');
        return;
    }

    // Toggle answer display
    if (answerArea.style.display === 'none' || answerArea.style.display === '') {
        console.log('Showing answer...');
        answerArea.innerHTML = `<div class="answer"><h3>✓ Correct Answer:</h3><pre><code>${escapeHtml(exercise.solution)}</code></pre></div>`;
        answerArea.style.display = 'block';
        
        // Update button text
        const showAnswerBtn = document.getElementById('show-answer-btn');
        showAnswerBtn.textContent = 'Hide Answer';
        console.log('Answer displayed');
    } else {
        console.log('Hiding answer...');
        answerArea.style.display = 'none';
        document.getElementById('show-answer-btn').textContent = 'Show Answer';
        console.log('Answer hidden');
    }
}

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

function updateNavigation(exercise) {
    // Update prev/next links - to be implemented
}

// Code highlighting function
function highlightCode(code) {
    // Simple comment highlighting for display
    return code.replace(/\/\/(.*)/g, '<span class="comment">//$1</span>');
}

function saveProgress(exerciseId, status) {
    // Use utils.js function
    const currentAttempts = getExerciseProgressData(exerciseId)?.attempts || 0;
    saveExerciseProgress(exerciseId, status, currentAttempts + 1);
}

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    // Check if we're on an exercise page
    if (window.location.pathname.includes('/exercises/')) {
        loadExercisePage();
    } else {
        // We're on the homepage
        loadExercises();
    }
});