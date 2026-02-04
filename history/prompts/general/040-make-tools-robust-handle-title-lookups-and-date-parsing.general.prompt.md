---
id: 040
title: "make-tools-robust-handle-title-lookups-and-date-parsing"
stage: "green"
date_iso: "2026-02-04"
surface: "agent"
model: "claude-sonnet-4-5-20250929"
feature: "general"
branch: "main"
user: "kamlesh_kumar"
command: "sp.implement"
labels: ["tools", "robustness", "task-resolution", "date-parsing", "parameter-mapping"]
links:
  spec: null
  ticket: null
  adr: null
  pr: null
files_yaml:
  - "/home/kamlesh_kumar/projects/Hac2-Phase3-AI-powered-todo-app-with-cahtbot/phase3/backend/tools.py"
tests_yaml:
  - "/home/kamlesh_kumar/projects/Hac2-Phase3-AI-powered-todo-app-with-cahtbot/phase3/backend/test_robust_tools.py"
prompt_text: |
  "Make Tools Robust: Handle Title Lookups and Date Parsing" ; The user is facing two critical issues:
  1. `ValueError: invalid literal for int()`: The AI passes task titles (e.g., "first") instead of IDs to `update_task`.
  2. `dueDate` ignored: The AI passes date strings, but the DB expects datetime objects.

  **REQUIRED REWRITE of Tool Functions in `backend/main.py`:**

  1.  **Add Imports:**
      * `from dateutil import parser` (for smart date parsing).
      * `from sqlmodel import select`

  2.  **Create Helper `resolve_task_id`:**
      ```python
      def resolve_task_id(session: Session, user_id: str, identifier: str | int) -> int | None:
          # Try converting to int (Direct ID)
          try:
              return int(identifier)
          except ValueError:
              # It's a title, look it up
              statement = select(Task).where(Task.title == str(identifier), Task.user_id == user_id)
              task = session.exec(statement).first()
              return task.id if task else None
      ```

  3.  **Update `add_task`:**
      * Parse `due_date` if provided: `parsed_date = parser.parse(due_date)`.

  4.  **Update `update_task` (Robust Version):**
      * **Step A:** `db_task_id = resolve_task_id(session, user_id, task_id)`
      * **Step B:** If `db_task_id` is None, return "Task not found."
      * **Step C (Date Parsing):**
          * Check for `dueDate` or `due_date` in `updates`.
          * If found, parse it: `updates['dueDate'] = parser.parse(original_value)`.
      * **Step D (Mapping):** Keep the existing `recurrencePattern` mapping logic.
      * **Step E:** Apply updates and save.

  5.  **Update `delete_task` & `complete_task`:**
      * Use `resolve_task_id` to handle titles or IDs gracefully.

  **Goal:** The tools must never crash on string inputs or date strings. They should auto-resolve titles to IDs and parse dates automatically.
response_text: |
  Successfully implemented robust tools with title lookups and date parsing. The changes made:

  1. Added dateutil.parser import for smart date parsing
  2. Created resolve_task_id helper function to handle both IDs and titles
  3. Updated add_task to accept both due_date and dueDate parameters and parse dates
  4. Updated update_task with robust title resolution and date parsing
  5. Updated delete_task and complete_task to use the resolver function
  6. Enhanced parameter normalization to handle AI variations

  The tools now handle both numeric IDs and task titles seamlessly, and automatically parse various date formats without crashing.
outcome: "Made tools robust with title lookups and date parsing"
evaluation: "Tools now handle both task IDs and titles, parse dates automatically, and no longer crash on invalid inputs."
---

# Make Tools Robust: Handle Title Lookups and Date Parsing

## Summary
Successfully implemented robust tools that handle title lookups and date parsing, resolving the two critical issues where AI passes task titles instead of IDs and date strings instead of datetime objects.

## Changes Made

### 1. Added Required Imports
- Added `from dateutil import parser` for smart date parsing
- The helper function and tools now use proper imports

### 2. Created Helper Function `resolve_task_id`
- Handles both numeric IDs and task titles
- Performs user-scoped title lookups to ensure security
- Returns database task ID or None if not found

### 3. Updated `add_task` Function
- Accepts both `due_date` and `dueDate` parameters
- Parses date strings using `parser.parse()`
- Gracefully handles invalid date formats
- Added proper error handling for date parsing

### 4. Updated `update_task` Function
- Uses `resolve_task_id` to handle both IDs and titles
- Implements robust date parsing for dueDate/due_date in updates
- Maintains existing parameter mapping logic
- Improved error handling and validation

### 5. Updated `delete_task` and `complete_task` Functions
- Both now use `resolve_task_id` for robust task identification
- Handle both numeric IDs and task titles seamlessly
- Maintain user ownership verification

## Files Modified
- `phase3/backend/tools.py` - Updated all tool functions with robust logic
- `phase3/backend/test_robust_tools.py` - Verification tests

## Verification
- All tool functions now handle both numeric IDs and task titles
- Date parsing works for various formats (YYYY-MM-DD, Month DD, YYYY, etc.)
- Tools gracefully handle invalid inputs without crashing
- User ownership verification maintained across all operations
- All existing functionality preserved while adding robustness