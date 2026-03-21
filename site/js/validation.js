// Validation logic for comment exercises

function validateReading(understood) {
    // For reading exercises, just check if user indicated understanding
    return understood === true;
}

function validateWriting(userCode, template) {
    // For writing exercises, check if comments are present and correct
    // Simple pattern matching - look for // comments
    const userLines = userCode.split('\n');
    const templateLines = template.split('\n');

    // Check if user added appropriate comments
    // This is a simple check - in real implementation, would be more sophisticated
    const hasComments = userLines.some(line => line.trim().startsWith('//'));

    return hasComments;
}

function validateMixed(understood, userCode, template) {
    // For mixed exercises, both reading and writing must be correct
    return validateReading(understood) && validateWriting(userCode, template);
}

function validateExercise(exercise, userCode, readingUnderstood) {
    // Main validation function called from app.js
    switch(exercise.type) {
        case 'reading':
            return validateReading(readingUnderstood);
        case 'writing':
            return validateWriting(userCode, exercise.codeTemplate);
        case 'mixed':
            return validateMixed(readingUnderstood, userCode, exercise.codeTemplate);
        default:
            return false;
    }
}

// Make functions available globally for the browser
window.validateReading = validateReading;
window.validateWriting = validateWriting;
window.validateMixed = validateMixed;
window.validateExercise = validateExercise;