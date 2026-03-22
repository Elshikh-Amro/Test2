// Main application logic for Welcome to Programming exercises

document.addEventListener('DOMContentLoaded', function() {
    console.log('DOMContentLoaded fired');
    console.log('Current pathname:', window.location.pathname);

    // Initialize the application
    initApp();
});

function initApp() {
    alert('initApp called!');
    console.log('initApp called');

    // Check if we're on the homepage or exercise page
    const exerciseList = document.getElementById('exercise-list');
    const exerciseContent = document.getElementById('exercise-content');

    console.log('exercise-list element found:', !!exerciseList);
    console.log('exercise-content element found:', !!exerciseContent);

    if (exerciseList) {
        // Homepage
        console.log('Loading homepage exercises');
        loadExercises();
    } else if (exerciseContent) {
        // Exercise page
        console.log('Loading exercise page');
        loadExercisePage();
    } else {
        alert('Neither exercise-list nor exercise-content found!');
        console.log('Neither exercise-list nor exercise-content found');
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
    console.log('loadExercisePage called');

    // Get exercise ID from URL
    const urlParams = new URLSearchParams(window.location.search);
    const exerciseId = urlParams.get('id') || getExerciseIdFromPath();

    console.log('URL params id:', urlParams.get('id'));
    console.log('Path-based id:', getExerciseIdFromPath());
    console.log('Final exerciseId:', exerciseId);

    if (!exerciseId) {
        console.error('No exercise ID found');
        return;
    }

    const exercise = getExerciseById(exerciseId);
    console.log('Exercise found:', !!exercise);
    if (exercise) {
        console.log('Exercise details:', {
            id: exercise.id,
            title: exercise.title,
            hasSolution: !!exercise.solution
        });
    }

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

    console.log('Setting up event listeners for exercise:', exercise.id);
    console.log('Buttons found:', {
        submit: !!submitBtn,
        reset: !!resetBtn,
        hint: !!hintBtn,
        showAnswer: !!showAnswerBtn
    });

    if (submitBtn) submitBtn.addEventListener('click', () => submitExercise(exercise));
    if (resetBtn) resetBtn.addEventListener('click', () => resetExercise(exercise));
    if (hintBtn) hintBtn.addEventListener('click', () => showHint(exercise));
    if (showAnswerBtn) {
        showAnswerBtn.addEventListener('click', () => {
            // Simple test - just change button text
            showAnswerBtn.textContent = 'Button Clicked!';
            showAnswerBtn.style.background = '#4CAF50';
            console.log('Show Answer button clicked for exercise:', exercise.id);
            showAnswer(exercise);
        });
    } else {
        console.warn('Show Answer button not found');
    }
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
    // Show the correct answer - simplified version
    const answerArea = document.getElementById('answer-area');
    
    if (!answerArea) {
        console.error('Answer area not found');
        return;
    }

    // Simple test - just show a message
    answerArea.innerHTML = '<div style="background: #e8f5e8; padding: 15px; border-radius: 4px; border-left: 4px solid #4CAF50;"><h3>✓ Answer Shown!</h3><p>This is a test message. The button is working!</p></div>';
    answerArea.style.display = 'block';
    
    // Update button text
    const showAnswerBtn = document.getElementById('show-answer-btn');
    showAnswerBtn.textContent = 'Hide Answer';
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