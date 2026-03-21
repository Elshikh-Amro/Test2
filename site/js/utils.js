// Utility functions for Welcome to Programming exercises

// localStorage utilities for progress tracking

const STORAGE_KEYS = {
    EXERCISE_PROGRESS: 'wtp_exercise_progress',
    USER_PREFERENCES: 'wtp_user_preferences'
};

/**
 * Save exercise progress to localStorage
 * @param {string} exerciseId - The exercise ID
 * @param {string} status - 'completed', 'attempted', or 'not-started'
 * @param {number} attempts - Number of attempts made
 */
function saveExerciseProgress(exerciseId, status, attempts = 1) {
    try {
        const progress = getExerciseProgress();
        progress[exerciseId] = {
            status: status,
            timestamp: new Date().toISOString(),
            attempts: attempts
        };
        localStorage.setItem(STORAGE_KEYS.EXERCISE_PROGRESS, JSON.stringify(progress));
    } catch (error) {
        console.error('Failed to save exercise progress:', error);
    }
}

/**
 * Get exercise progress from localStorage
 * @returns {Object} Progress object with exercise IDs as keys
 */
function getExerciseProgress() {
    try {
        const stored = localStorage.getItem(STORAGE_KEYS.EXERCISE_PROGRESS);
        return stored ? JSON.parse(stored) : {};
    } catch (error) {
        console.error('Failed to load exercise progress:', error);
        return {};
    }
}

/**
 * Get progress status for a specific exercise
 * @param {string} exerciseId - The exercise ID
 * @returns {string} Status: 'completed', 'attempted', or 'not-started'
 */
function getExerciseStatus(exerciseId) {
    const progress = getExerciseProgress();
    return progress[exerciseId]?.status || 'not-started';
}

/**
 * Get progress data for a specific exercise
 * @param {string} exerciseId - The exercise ID
 * @returns {Object|null} Progress data or null if not found
 */
function getExerciseProgressData(exerciseId) {
    const progress = getExerciseProgress();
    return progress[exerciseId] || null;
}

/**
 * Clear all progress data (for testing or reset)
 */
function clearAllProgress() {
    try {
        localStorage.removeItem(STORAGE_KEYS.EXERCISE_PROGRESS);
        localStorage.removeItem(STORAGE_KEYS.USER_PREFERENCES);
    } catch (error) {
        console.error('Failed to clear progress:', error);
    }
}

/**
 * Save user preferences
 * @param {Object} preferences - User preference object
 */
function saveUserPreferences(preferences) {
    try {
        localStorage.setItem(STORAGE_KEYS.USER_PREFERENCES, JSON.stringify(preferences));
    } catch (error) {
        console.error('Failed to save user preferences:', error);
    }
}

/**
 * Get user preferences
 * @returns {Object} User preferences object
 */
function getUserPreferences() {
    try {
        const stored = localStorage.getItem(STORAGE_KEYS.USER_PREFERENCES);
        return stored ? JSON.parse(stored) : { theme: 'light', textToSpeech: true };
    } catch (error) {
        console.error('Failed to load user preferences:', error);
        return { theme: 'light', textToSpeech: true };
    }
}

// Make functions available globally for the browser
window.saveExerciseProgress = saveExerciseProgress;
window.getExerciseProgress = getExerciseProgress;
window.getExerciseStatus = getExerciseStatus;
window.getExerciseProgressData = getExerciseProgressData;
window.clearAllProgress = clearAllProgress;
window.saveUserPreferences = saveUserPreferences;
window.getUserPreferences = getUserPreferences;

/**
 * Check if localStorage is available
 * @returns {boolean} True if localStorage is available
 */
function isLocalStorageAvailable() {
    try {
        const test = '__localStorage_test__';
        localStorage.setItem(test, test);
        localStorage.removeItem(test);
        return true;
    } catch (error) {
        return false;
    }
}

/**
 * Get completion statistics
 * @returns {Object} Statistics object
 */
function getCompletionStats() {
    const progress = getExerciseProgress();
    const exercises = getExercises(); // Assuming this is available

    let completed = 0;
    let attempted = 0;
    let total = exercises.length;

    Object.values(progress).forEach(p => {
        if (p.status === 'completed') completed++;
        else if (p.status === 'attempted') attempted++;
    });

    return {
        total: total,
        completed: completed,
        attempted: attempted,
        notStarted: total - completed - attempted
    };
}

// Text-to-speech utilities (for reading exercises)

/**
 * Speak text using Web Speech API
 * @param {string} text - Text to speak
 * @param {Object} options - Speech options
 */
function speakText(text, options = {}) {
    if (!('speechSynthesis' in window)) {
        console.warn('Text-to-speech not supported in this browser');
        return;
    }

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = options.rate || 1;
    utterance.pitch = options.pitch || 1;
    utterance.volume = options.volume || 1;

    if (options.voice) {
        utterance.voice = options.voice;
    }

    speechSynthesis.speak(utterance);
}

/**
 * Get available voices for text-to-speech
 * @returns {Array} Array of available voices
 */
function getAvailableVoices() {
    return speechSynthesis.getVoices();
}

/**
 * Stop current speech
 */
function stopSpeech() {
    if ('speechSynthesis' in window) {
        speechSynthesis.cancel();
    }
}

// Make functions available globally
window.saveExerciseProgress = saveExerciseProgress;
window.getExerciseProgress = getExerciseProgress;
window.getExerciseStatus = getExerciseStatus;
window.getExerciseProgressData = getExerciseProgressData;
window.clearAllProgress = clearAllProgress;
window.saveUserPreferences = saveUserPreferences;
window.getUserPreferences = getUserPreferences;
window.isLocalStorageAvailable = isLocalStorageAvailable;
window.getCompletionStats = getCompletionStats;
window.speakText = speakText;
window.getAvailableVoices = getAvailableVoices;
window.stopSpeech = stopSpeech;