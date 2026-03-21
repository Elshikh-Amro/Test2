# UI Contracts: Welcome to Programming Exercises Website

**Date**: 2026-03-21
**Purpose**: Define the user interface contracts for the static website

## Homepage Contract (/index.html)

**Purpose**: Entry point displaying course title and exercise navigation

**Input**: None (static page)

**Output**:
- Course title: "Welcome to Programming"
- Exercise list: Array of {id, title, difficulty, status}
- Navigation: Links to individual exercises

**UI Elements**:
- Header: Course title and description
- Exercise grid: Cards with title, difficulty badge, completion status
- Footer: Course credits and version

## Exercise Page Contract (/exercises/exercise-{id}.html)

**Purpose**: Interactive exercise interface for reading/writing comments

**Input**:
- URL parameter: exercise ID
- Local storage: user progress data

**Output**:
- Exercise content: title, description, code editor
- Validation feedback: success/error messages
- Navigation: prev/next exercise links

**UI Elements**:
- Exercise header: title, difficulty, progress indicator
- Instructions panel: text description
- Code editor: textarea with syntax highlighting
- Action buttons: Submit, Reset, Hint
- Feedback area: validation results, hints
- Navigation footer: prev/next links

**Interaction Contract**:
- Submit: Validates user input, shows feedback, updates progress
- Reset: Clears user input, resets to initial state
- Hint: Reveals progressive hints (max 3 per exercise)
- Navigation: Preserves unsaved work with confirmation dialog

## Data Exchange Format

**Exercise Data** (JSON):
```json
{
  "id": "exercise-01",
  "title": "Reading Basic Comments",
  "difficulty": "short",
  "type": "reading",
  "description": "Read the comments aloud and check your understanding",
  "codeTemplate": "// This is a comment\nconsole.log('Hello');",
  "solution": "// This is a comment\nconsole.log('Hello');",
  "validationRules": {
    "requireReading": true,
    "checkComments": false
  },
  "hints": ["Look for lines starting with //", "Read each comment clearly"]
}
```

**Progress Data** (localStorage JSON):
```json
{
  "exercise-01": {
    "status": "completed",
    "timestamp": "2026-03-21T10:00:00Z",
    "attempts": 1
  }
}
```