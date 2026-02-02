---
id: "006"
title: "AI Backend Structure Creation"
stage: "spec"
date_iso: "2026-02-02"
surface: "agent"
model: "claude-sonnet-4-5-20250929"
feature: "ai-backend-schema-strict"
branch: "006-ai-backend-schema-strict"
user: "kamlesh_kumar"
command: "sp.specify \"Phase 3: AI Backend with Cohere & MCP (Schema Strict)\""
labels: ["ai", "backend", "cohere", "mcp", "sqlmodel", "schema"]
spec: "../specs/006-ai-backend-schema-strict/spec.md"
ticket: "null"
adr: "null"
pr: "null"
files_yaml: |
  - ../backend/models.py
  - ../backend/tools.py
  - ../backend/main.py
  - ../backend/db.py
  - ../specs/006-ai-backend-schema-strict/spec.md
tests_yaml: []
links: []
prompt_text: |
  "Phase 3: AI Backend with Cohere & MCP (Schema Strict)"

  **Project Context:**
  We are adding a Python FastAPI backend to an existing Next.js + Neon DB project.
  The Database is already live and uses **CamelCase** column names (e.g., `userId`, `createdAt`, `dueDate`).

  **Critical Requirement:**
  You must use **SQLModel** to map Python's `snake_case` attributes to the Database's `camelCase` columns using `sa_column`.

  **1. Database Models (Fix & Create):**
     - **User Model:** Keep exactly as provided (already maps `email_verified` -> `emailVerified`).
     - **Task Model:** You MUST update the `Task` model definition to map existing columns correctly:
       - `user_id` -> Map to DB column `userId`
       - `due_date` -> Map to DB column `dueDate`
       - `created_at` -> Map to DB column `createdAt`
       - `updated_at` -> Map to DB column `updatedAt`
       - `recurring_interval` -> Map to DB column `recurrencePattern` (or `recurringInterval` depending on DB schema)
     - [cite_start]**New Tables:** Create `Conversation` and `Message` tables[cite: 18].
       - Ensure their columns also use `sa_column` to map to CamelCase (e.g., `conversation_id` -> `conversationId`).

  **2. Technology Stack:**
     - [cite_start]**Framework:** FastAPI (Port 8000) [cite: 13]
     - **AI:** Cohere API (Command R+)
     - [cite_start]**DB:** Neon Postgres (Shared with Frontend) [cite: 13]
     - [cite_start]**Tooling:** Official MCP SDK [cite: 9]

  **3. MCP Tools (Logic):**
     - [cite_start]Implement tools (`add_task`, `list_tasks`, `complete_task`, `delete_task`, `update_task`)[cite: 25].
     - **Crucial:** When these tools query the DB, they must respect the SQLModel mappings defined above.

  **4. API Endpoint:**
     - [cite_start]`POST /api/chat`: Handles the full RAG/Tool-use loop with Cohere[cite: 40].
     - Stores history in `Message` table.

  **Output:**
  Generate the complete backend structure including `models.py` (with corrected mappings), `main.py`, and `tools.py`.
response_text: |
  Successfully created the complete AI backend structure with proper camelCase schema mapping:

  1. **Updated models.py** with:
     - Proper SQLModel mappings using sa_column_kwargs for camelCase columns
     - Task model with correct mappings: user_id -> userId, due_date -> dueDate, created_at -> createdAt, updated_at -> updatedAt, recurring_interval -> recurringInterval
     - New Conversation and Message models with camelCase column mappings
     - Proper foreign key relationships maintained

  2. **Created tools.py** with:
     - MCP-compliant tool implementations (add_task, list_tasks, complete_task, delete_task, update_task)
     - Proper database session handling
     - Error handling and response formatting

  3. **Updated main.py** with:
     - FastAPI application with Cohere integration
     - Chat endpoint with tool-use capabilities
     - Conversation management
     - CORS configuration for frontend access

  4. **Updated db.py** with:
     - Proper model imports for all entities
     - Database connection and session management
     - Table creation functionality

  All components properly map Python snake_case attributes to database camelCase columns as required.
outcome: "success"
evaluation: "Successfully created the AI backend structure with proper schema mapping and all required components."
---