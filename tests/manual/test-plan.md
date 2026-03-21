# Manual Test Plan: Welcome to Programming Exercises Website

**Version**: 1.0
**Date**: 2026-03-21
**Feature**: User Story 2 - Complete JavaScript Exercise

## Test Environment

- Browser: Chrome 90+, Firefox 88+, Safari 14+, Edge 90+
- Local server: http://localhost:8001
- Test data: All 15 exercises loaded

## User Story 2: Complete JavaScript Exercise

**Goal**: Students can complete interactive exercises with immediate feedback on comment reading and writing.

### Test Case 2.1: Reading Exercise Validation
- **Steps**:
  1. Navigate to a reading exercise (e.g., exercise-01.html)
  2. Read the instructions and code comments
  3. Click the "I understand" checkbox/button
  4. Click "Submit"
- **Expected Result**: Success message displays, progress saved
- **Pass/Fail**: [ ]

### Test Case 2.2: Writing Exercise Validation
- **Steps**:
  1. Navigate to a writing exercise (e.g., exercise-04.html)
  2. Read the instructions
  3. Write the required comment in the code editor
  4. Click "Submit"
- **Expected Result**: Success message if comment is correct, error message if incorrect
- **Pass/Fail**: [ ]

### Test Case 2.3: Mixed Exercise Validation
- **Steps**:
  1. Navigate to a mixed exercise
  2. Complete both reading and writing requirements
  3. Click "Submit"
- **Expected Result**: Success only when both parts are correct
- **Pass/Fail**: [ ]

### Test Case 2.4: Hint System
- **Steps**:
  1. Start an exercise
  2. Click "Hint" button multiple times
  3. Verify hints are revealed progressively
- **Expected Result**: Hints appear one at a time, max 3 hints
- **Pass/Fail**: [ ]

### Test Case 2.5: Progress Saving
- **Steps**:
  1. Complete an exercise
  2. Refresh the page
  3. Check homepage progress indicators
- **Expected Result**: Completion status persists
- **Pass/Fail**: [ ]

### Test Case 2.6: Feedback Display
- **Steps**:
  1. Submit incorrect answer
  2. Verify error message appears
  3. Submit correct answer
  4. Verify success message appears
- **Expected Result**: Clear, helpful feedback messages
- **Pass/Fail**: [ ]

## Test Results Summary

- Total Tests: 6
- Passed: [ ]
- Failed: [ ]
- Notes: [ ]