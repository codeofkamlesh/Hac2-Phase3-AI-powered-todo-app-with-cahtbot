---
id: "016"
title: "Fix SQLModel Primary Key Conflicts in Models"
stage: "general"
date_iso: "2026-02-03"
surface: "agent"
model: "claude-sonnet-4-5-20250929"
feature: "none"
branch: "main"
user: "kamlesh_kumar"
command: "/sp.implement"
labels: ["backend", "sqlmodel", "models", "database", "bug-fix"]
spec: null
ticket: null
adr: null
pr: null
---

# Fix SQLModel Primary Key Conflicts in Models

## User Input
```
The backend is crashing with `RuntimeError: Passing primary_key is not supported when also passing a sa_column` in `backend/models.py`.
This happens because we are defining `primary_key=True` inside `Field()` AND inside `sa_column=Column(...)`. SQLModel does not allow this duplication.

**REQUIRED FIXES in `backend/models.py`:**

1.  **Remove Redundant Field Arguments:**
    * If a field uses `sa_column=Column(...)`, **REMOVE** `primary_key=True`, `nullable=False`, and `unique=True` from the `Field(...)` arguments.
    * Rely ONLY on the `Column(...)` definition inside `sa_column` for these properties.

2.  **Corrected Model Patterns (Apply to User, Task, Conversation, Message):**

    * **User ID Example:**
        * *Bad:* `id: str = Field(primary_key=True, sa_column=Column("id", String, primary_key=True))`
        * *Good:* `id: str = Field(default_factory=lambda: str(uuid.uuid4()), sa_column=Column("id", String, primary_key=True))`

    * **Task UserID Example:**
        * *Bad:* `user_id: str = Field(sa_column=Column("userId", String, nullable=False), nullable=False)`
        * *Good:* `user_id: str = Field(sa_column=Column("userId", String, nullable=False))`

3.  **Ensure Schema Matches:**
    * Keep mapping `user_id` -> `userId`, `created_at` -> `createdAt`, `due_date` -> `dueDate`, etc. inside the `Column` definitions.

**Goal:** Rewrite `backend/models.py` to be valid SQLModel code without parameter conflicts.
```

## Response Text
Successfully fixed the SQLModel primary key conflicts in backend/models.py by removing redundant primary_key=True arguments from Field() calls when sa_column is used. The issue was occurring because SQLModel does not allow parameter duplication between Field() and sa_column.

Changes made:
1. Removed primary_key=True from Field() in User model id field
2. Removed primary_key=True from Field() in Task model id field
3. Removed primary_key=True from Field() in Conversation model id field
4. Removed primary_key=True from Field() in Message model id field

All primary key definitions now exist only in the sa_column=Column(...) definitions where they belong, resolving the RuntimeError and making the models compliant with SQLModel requirements.

## Files Modified
 - /home/kamlesh_kumar/projects/Hac2-Phase3-AI-powered-todo-app-with-cahtbot/phase3/backend/models.py

## Outcome
Backend application will now start successfully without the RuntimeError. The models are now properly structured with primary key definitions only in sa_column, following SQLModel best practices.