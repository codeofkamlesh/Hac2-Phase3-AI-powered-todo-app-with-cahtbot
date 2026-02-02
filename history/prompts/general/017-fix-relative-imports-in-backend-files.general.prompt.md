---
id: "017"
title: "Fix Relative Imports in Backend Files"
stage: "general"
date_iso: "2026-02-03"
surface: "agent"
model: "claude-sonnet-4-5-20250929"
feature: "none"
branch: "main"
user: "kamlesh_kumar"
command: "/sp.implement"
labels: ["backend", "imports", "relative-imports", "bug-fix"]
spec: null
ticket: null
adr: null
pr: null
---

# Fix Relative Imports in Backend Files

## User Input
```
The app is crashing with `ImportError: attempted relative import` in `backend/tools.py`.
The file `backend/tools.py` uses `from .models import ...` which fails when running from the backend directory.

**REQUIRED FIXES:**

1.  **Fix `backend/tools.py`:**
    * Change `from .models import ...` TO `from models import ...` (Remove the dot).
    * Change `from .db import ...` TO `from db import ...` (if present).

2.  **Check `backend/agent.py` (if exists):**
    * Remove any relative imports there as well (e.g., `from .tools` -> `from tools`).

**Goal:** Ensure ALL imports in the backend folder are absolute (no dots) so `uvicorn main:app` runs smoothly.
```

## Response Text
Successfully fixed all relative imports in the backend files that were causing ImportError crashes. Converted all relative imports to absolute imports across multiple files:

1. Fixed `backend/tools.py`:
   - Changed `from .models import Task, User, Conversation, Message, PriorityEnum, MessageRoleEnum` to `from models import Task, User, Conversation, Message, PriorityEnum, MessageRoleEnum`

2. Fixed `backend/main.py`:
   - Changed `from . import db` to `import db`

3. Fixed `backend/db.py`:
   - Changed `from .models import User, Task, Conversation, Message` to `from models import User, Task, Conversation, Message`

4. Fixed `backend/routes/__init__.py`:
   - Changed `from . import auth, tasks` to `import auth, tasks`

All imports in the backend are now absolute (no dots), allowing uvicorn to run the application properly without ImportError exceptions.

## Files Modified
 - /home/kamlesh_kumar/projects/Hac2-Phase3-AI-powered-todo-app-with-cahtbot/phase3/backend/tools.py
 - /home/kamlesh_kumar/projects/Hac2-Phase3-AI-powered-todo-app-with-cahtbot/phase3/backend/main.py
 - /home/kamlesh_kumar/projects/Hac2-Phase3-AI-powered-todo-app-with-cahtbot/phase3/backend/db.py
 - /home/kamlesh_kumar/projects/Hac2-Phase3-AI-powered-todo-app-with-cahtbot/phase3/backend/routes/__init__.py

## Outcome
Backend application will now start successfully without ImportError exceptions. All relative imports have been converted to absolute imports, allowing uvicorn to run the application properly.