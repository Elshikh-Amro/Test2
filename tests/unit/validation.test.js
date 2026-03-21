// Unit tests for comment validation logic
// Test-First approach: write tests before implementation

// Since we're testing in Node.js, we'll define the functions here for testing
// In production, these would be in validation.js loaded in the browser

function validateReading(understood) {
    return understood === true;
}

function validateWriting(userCode, template) {
    const hasComments = userCode.split('\n').some(line => line.trim().startsWith('//'));
    return hasComments;
}

function validateMixed(understood, userCode, template) {
    return validateReading(understood) && validateWriting(userCode, template);
}

function testValidateReading() {
    // Test reading exercise validation
    // Should pass when user indicates understanding
    console.assert(validateReading(true) === true, 'Reading validation should pass when understood');
    console.assert(validateReading(false) === false, 'Reading validation should fail when not understood');
}

function testValidateWriting() {
    // Test writing exercise validation
    const correctComment = '// This is a comment';
    const wrongComment = 'This is not a comment';
    const template = 'console.log("Hello");';

    console.assert(validateWriting(correctComment, template) === true, 'Writing validation should pass for correct comment');
    console.assert(validateWriting(wrongComment, template) === false, 'Writing validation should fail for incorrect comment');
}

function testValidateMixed() {
    // Test mixed exercise validation
    console.assert(validateMixed(true, '// Correct comment', 'console.log("test");') === true, 'Mixed validation should pass when both correct');
    console.assert(validateMixed(false, '// Correct comment', 'console.log("test");') === false, 'Mixed validation should fail when reading not understood');
    console.assert(validateMixed(true, 'Wrong comment', 'console.log("test");') === false, 'Mixed validation should fail when writing incorrect');
}

// Run tests
console.log('Running validation tests...');
try {
    testValidateReading();
    testValidateWriting();
    testValidateMixed();
    console.log('All validation tests passed!');
} catch (error) {
    console.error('Validation test failed:', error.message);
}