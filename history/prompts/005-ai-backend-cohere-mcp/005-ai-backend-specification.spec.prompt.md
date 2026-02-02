---
id: "005"
title: "AI Backend Specification"
stage: "spec"
date_iso: "2026-02-02"
surface: "agent"
model: "claude-sonnet-4-5-20250929"
feature: "ai-backend-cohere-mcp"
branch: "005-ai-backend-cohere-mcp"
user: "kamlesh_kumar"
command: "sp.specify \"Phase 3: AI Backend with Cohere & MCP\""
labels: ["ai", "backend", "cohere", "mcp", "specification"]
spec: "../specs/005-ai-backend-cohere-mcp/spec.md"
ticket: "null"
adr: "null"
pr: "null"
files_yaml: |
  - specs/005-ai-backend-cohere-mcp/spec.md
  - specs/005-ai-backend-cohere-mcp/checklists/requirements.md
tests_yaml: []
links: []
prompt_text: |
  "Phase 3: AI Backend with Cohere & MCP"

  **Project Context:**
  We have a live Next.js Todo App with a Neon PostgreSQL database. The manual task management is working perfectly using a CamelCase schema (`userId`, `createdAt`). We now need to add the **Intelligence Layer** (Backend) without disturbing the existing functionality.

  **Core Objective:**
  Build a separate **Python FastAPI Backend** that powers the AI Chatbot. It will use **Cohere** for reasoning and the **MCP (Model Context Protocol)** standard to execute task operations on the shared database.

  **Technology Stack:**
  - [cite_start]**Backend Framework:** Python FastAPI (Port 8000) [cite: 13]
  - **AI Model:** Cohere API (Command R+ or similar for tool use)
  - [cite_start]**Database:** Neon Serverless PostgreSQL (Shared with Next.js) [cite: 13]
  - [cite_start]**ORM:** SQLModel (Must map to existing CamelCase columns) [cite: 13]
  - [cite_start]**Tools Standard:** Official MCP SDK [cite: 9, 13]

  **Functional Requirements:**

  1.  **Shared Database Integration:**
      - Connect to the *existing* Neon DB.
      - **Existing Models:** Map Python `Task` and `User` models to the existing tables.
          - *Constraint:* You MUST use `sa_column_kwargs={"name": "camelCaseName"}` in SQLModel to match the existing DB columns (e.g., `user_id` in Python maps to `userId` in DB).
      - [cite_start]**New Models:** Create `Conversation` and `Message` tables for chat history[cite: 18].
          - `Conversation`: id, userId, title, createdAt.
          - `Message`: id, conversationId, role (user/assistant), content, createdAt.

  2.  **MCP Server & Tools:**
      - [cite_start]Implement an internal MCP server that exposes the following tools[cite: 25]:
          - [cite_start]`add_task(title, description, priority)` [cite: 27]
          - [cite_start]`list_tasks(status, limit)` [cite: 30]
          - [cite_start]`complete_task(task_id)` [cite: 32]
          - [cite_start]`delete_task(task_id)` [cite: 34]
          - [cite_start]`update_task(task_id, updates)` [cite: 36]
      - These tools must execute SQL queries on the shared database.

  3.  **Cohere Agent Logic:**
      - Implement a `POST /api/chat` endpoint.
      - **Flow:**
          1.  Receive `message` and `userId` from Frontend.
          2.  [cite_start]Retrieve conversation history from DB[cite: 42].
          3.  Call **Cohere Chat API** with "Tool Use" capabilities enabled.
          4.  If Cohere decides to use a tool (e.g., `add_task`), execute the corresponding MCP tool function.
          5.  Feed the tool result back to Cohere to generate the final natural language response.
          6.  [cite_start]Store user message and assistant response in the `Message` table[cite: 44, 47].

  4.  **API Security:**
      - The Python backend must be accessible from the Next.js Frontend (CORS enabled for localhost:3000).

  **Success Criteria:**
  - [cite_start]User says "Add a task to buy milk" -> Backend adds task to DB -> Task appears in Dashboard immediately (on refresh)[cite: 52].
  - [cite_start]Manual tasks created via Dashboard are visible to the AI[cite: 31].
  - No data loss or schema corruption in the `task` table.
response_text: |
  Successfully created comprehensive specification for the AI Backend with Cohere & MCP:

  1. Created detailed feature specification document covering:
     - User scenarios for AI task creation, management, and conversation context
     - Functional requirements for database integration, MCP tools, and Cohere integration
     - Key entities (Task, User, Conversation, Message, MCP Tool, AI Assistant)
     - Success criteria with measurable outcomes
     - Assumptions and constraints
     - Open questions requiring clarification

  2. Created quality checklist to validate the specification before proceeding to planning

  3. The specification addresses all requirements from the feature description:
     - Shared database integration with camelCase column mapping
     - MCP server with required tools (add_task, list_tasks, complete_task, delete_task, update_task)
     - Cohere integration for natural language processing
     - Conversation and message models for chat history
     - API endpoint for chat interaction
     - CORS configuration for frontend access

  4. Identified 3 key clarifications needed before implementation:
     - Specific Cohere model version for optimal tool use
     - Conversation history limitations
     - Maximum concurrent conversations per user

  The specification is ready for review and planning.
outcome: "success"
evaluation: "Successfully created comprehensive specification for AI Backend with Cohere & MCP feature, including user scenarios, functional requirements, and success criteria."
---