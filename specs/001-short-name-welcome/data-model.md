# Data Model: Welcome to Programming Exercises Website

**Date**: 2026-03-21
**Feature**: Static website for JavaScript comment exercises

## Entities

### Exercise
Represents a single programming exercise with comment reading/writing tasks.

**Fields**:
- `id`: string (e.g., "exercise-01") - Unique identifier
- `title`: string - Display title
- `description`: string - Instructions for the exercise
- `difficulty`: enum ["short", "medium", "long"] - Exercise length category
- `type`: enum ["reading", "writing", "mixed"] - Comment interaction type
- `codeTemplate`: string - Initial code with comments to read/write
- `solution`: string - Expected final code with correct comments
- `validationRules`: object - Rules for checking correctness
- `hints`: array[string] - Optional hints for students

**Validation Rules**:
- Comments must be syntactically correct JavaScript comments
- For reading exercises: student must indicate understanding (checkbox/button)
- For writing exercises: comments must match expected patterns
- Mixed exercises: combination of both

**State Transitions**:
- Not Started → In Progress (when opened)
- In Progress → Completed (when validation passes)
- Completed → Restarted (optional reset)

### Course
Container for the exercise collection.

**Fields**:
- `title`: string - "Welcome to Programming"
- `exercises`: array[Exercise] - Ordered list of exercises
- `version`: string - Site version for tracking

### User Progress
Tracks student completion across exercises.

**Fields**:
- `exerciseId`: string - Reference to completed exercise
- `status`: enum ["completed", "attempted"] - Completion state
- `timestamp`: Date - When completed/attempted
- `score`: number (0-100) - Percentage correct (for mixed exercises)

**Relationships**:
- Course has many Exercises (1:N)
- Exercise has many User Progress entries (1:N, stored in localStorage)

## Data Flow

1. **Load**: Exercises loaded from static JSON/data files
2. **Progress**: Stored in browser localStorage as JSON
3. **Validation**: Client-side comparison of user input vs expected output
4. **Persistence**: Automatic save on user actions, survives browser refresh