---
id: "015"
title: "Fix Backend DATABASE_URL Environment Variable Loading"
stage: "general"
date_iso: "2026-02-03"
surface: "agent"
model: "claude-sonnet-4-5-20250929"
feature: "none"
branch: "main"
user: "kamlesh_kumar"
command: "/sp.implement"
labels: ["backend", "configuration", "environment-variables", "dotenv"]
spec: null
ticket: null
adr: null
pr: null
---

# Fix Backend DATABASE_URL Environment Variable Loading

## User Input
```
The backend is crashing with `ValueError: DATABASE_URL environment variable is not set`.
We have installed `python-dotenv`, but the code is not using it yet.

**REQUIRED FIXES:**

1.  **Update `backend/db.py`:**
    * Add `from dotenv import load_dotenv` at the top.
    * Call `load_dotenv()` **immediately** before `DATABASE_URL = os.environ.get(...)`.
    * This ensures the environment variables from the `.env` file are loaded before the code tries to read them.

2.  **Update `backend/main.py`:**
    * Also add `load_dotenv()` at the very top of `main.py` as a fallback.

**Goal:** Ensure the app reads the `DATABASE_URL` from the `.env` file and starts without errors.
```

## Response Text
Successfully fixed the backend crash caused by missing DATABASE_URL environment variable. Updated both backend files as required:

1. In `backend/db.py`:
   - Added `from dotenv import load_dotenv` import
   - Added `load_dotenv()` call immediately before the DATABASE_URL assignment
   - This ensures environment variables from .env file are loaded before the code tries to read them

2. Verified that `backend/main.py` already had the required imports and calls:
   - `from dotenv import load_dotenv` import was already present
   - `load_dotenv()` call was already present at the top of the file

The backend should now properly read the DATABASE_URL from the .env file and start without the ValueError.

## Files Modified
 - /home/kamlesh_kumar/projects/Hac2-Phase3-AI-powered-todo-app-with-cahtbot/phase3/backend/db.py

## Outcome
Backend application will now properly load environment variables from .env file, resolving the "ValueError: DATABASE_URL environment variable is not set" error and allowing the application to start successfully.