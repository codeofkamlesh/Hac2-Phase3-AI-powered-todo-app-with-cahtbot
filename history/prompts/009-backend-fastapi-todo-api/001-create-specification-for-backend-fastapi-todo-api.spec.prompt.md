---
id: "001"
title: "Create spec for backend FastAPI todo API"
stage: "spec"
date: "2026-01-24"
surface: "agent"
model: "claude-sonnet-4-5-20250929"
feature: "009-backend-fastapi-todo-api"
branch: "009-backend-fastapi-todo-api"
user: "claude"
command: "sp.specify"
labels: ["spec", "backend", "fastapi", "todo-api", "jwt-auth"]
links:
  spec: "specs/009-backend-fastapi-todo-api/spec.md"
  ticket: null
  adr: null
  pr: null
files_yaml:
  - "specs/009-backend-fastapi-todo-api/spec.md"
  - "specs/009-backend-fastapi-todo-api/checklists/requirements.md"
tests_yaml:
  - "Specification created with 3 user stories"
  - "Requirements defined with acceptance criteria"
  - "Success criteria established with measurable outcomes"
  - "Key entities identified"
prompt_text: |

  Phase II Backend: Secure FastAPI REST API with SQLModel, Neon DB, JWT Auth, and All Todo Features
  Target audience: Hackathon II participants and Panaversity students building spec-driven full-stack apps; backend must integrate seamlessly with the completed frontend (landing/signin/signup/dashboard) for multi-user Todo management
  Focus: Develop the complete backend for Phase II using FastAPI, SQLModel, and Neon Serverless PostgreSQL; implement all Basic (CRUD + complete), Intermediate (priorities/tags, search/filter/sort), and Advanced (recurring tasks, due dates/reminders) features; enforce JWT-based security with Better Auth integration for user isolation; set up .env with provided credentials from start for proper Neon DB connection and shared secret; prepare reusable patterns for bonuses like reusable intelligence
  Success criteria:
  - Implements ALL Todo features in backend:
    - Basic: POST /api/{user_id}/tasks (create with title/desc, auto user_id/created_at), GET /api/{user_id}/tasks (list user-owned), GET /api/{user_id}/tasks/{id} (details), PUT /api/{user_id}/tasks/{id} (update), DELETE /api/{user_id}/tasks/{id} (delete), PATCH /api/{user_id}/tasks/{id}/complete (toggle completed)
    - Intermediate: Support priorities (high/medium/low enum), tags (array of strings); query params for search (keyword in title/desc), filter (status/priority/tags/date range), sort (due_date/priority/title asc/desc)
    - Advanced: Recurring tasks (interval str e.g. 'weekly'; on complete, auto-reschedule by adding interval to due_date), due dates (datetime field; no reminders in backend – frontend handles notifications)
  - Authentication & Security: JWT middleware verifies token from header using BETTER_AUTH_SECRET, extracts user_id, matches URL user_id, filters all queries to user-owned tasks; 401 for invalid/missing token, 403 for mismatch/no ownership; stateless auth, no shared sessions
  - Database: SQLModel models for users (id str PK, email unique, name?, created_at – sync with Better Auth) and tasks (id int PK auto, user_id str FK, title str not null, description text?, completed bool default false, priority enum?high|medium|low, tags list[str]?, due_date datetime?, recurring_interval str?, created_at/updated_at timestamps default now/on update); create tables via metadata.create_all; indexes on user_id, completed, priority, due_date
  - API Responses: JSON with Pydantic models (TaskOut, TaskCreate, TaskUpdate); handle errors with HTTPException; success codes (200/201/204)
  - Environment Setup: From start, create/use .env with BETTER_AUTH_SECRET=C0vNMWMmIfiGLMiGvwKKDK7qlFyUl7gL and DATABASE_URL=postgresql://neondb_owner:npg_E5vOzoNWpS2A@ep-holy-credit-a79uzqo7-pooler.ap-southeast-2.aws.neon.tech/neondb?sslmode=require&channel_binding=require; load via dotenv or pydantic-settings
  - Integration with Frontend: API endpoints match frontend calls (from lib/api.ts); test with docker-compose up for full stack
  - Process Adherence: All generated via Claude Code; iterations refine specs; track prompts/iterations
  - Bonus Alignment: Implement reusable middleware/subagents for JWT verification (+200 reusable intelligence); blueprints for spec-driven deployment (+200)
  Constraints:
  - Tech Stack: Python 3.13+, FastAPI, SQLModel, Neon PostgreSQL, pydantic (models), jose/pyjwt (JWT), dotenv/pydantic-settings (.env); always use Context7 MCP server for latest/updated docs on FastAPI, SQLModel, JWT integration
  - Structure: All in /phase2/backend/ (main.py app entry, models.py, routes/tasks.py, db.py session/connection, middleware/auth.py); CLAUDE.md with guidelines (routes under /api/, Pydantic req/res, SQLModel ops)
  - Phase Isolation: No changes to frontend or other phases; build on existing frontend API calls
  - Scope: Only backend API/DB; no frontend mods, no Phase III AI
  - Environment: Use provided .env credentials; commands uvicorn main:app --reload --port 8000
  - Timeline: Phase II (150 pts, Dec 14, 2025)
  Not building:
  - Frontend UI (already complete)
  - AI chatbot (Phase III)
  - Deployment (Phases IV-V)
  - Additional credentials (use only provided)
  - Disallowed activities per safety

response_text: |

  Successfully created a comprehensive specification for the Phase II Backend: Secure FastAPI REST API with SQLModel, Neon DB, JWT Auth, and All Todo Features. The specification includes:

  1. Three prioritized user stories covering:
     - Secure Todo Management API (P1) - Critical authentication and user isolation
     - Complete Todo Feature Set (P1) - Full functionality implementation
     - Reliable Data Persistence & Retrieval (P2) - Database reliability

  2. Fifteen functional requirements (FR-001 to FR-015) addressing:
     - Authentication and security with JWT tokens
     - User isolation and proper access controls
     - Complete CRUD operations for tasks
     - Task completion toggling
     - Priority and tag support
     - Search, filter, and sort functionality
     - Recurring tasks and due dates
     - Proper HTTP status codes and JSON responses
     - Database storage with SQLModel and Neon PostgreSQL
     - Performance indexing requirements

  3. Three key entities (Task, User, Authentication Token) with clear definitions

  4. Ten measurable success criteria (SC-001 to SC-010) focusing on:
     - API performance and reliability (99% success rate, 500ms response times)
     - User isolation accuracy (100%)
     - Authentication effectiveness (proper 401/403 responses)
     - Search and filter performance (1 second response for 10k tasks)
     - Recurring task functionality (99% accuracy)
     - System scalability (1000+ concurrent users)

  5. A complete validation checklist confirming all requirements are met

  The specification is technology-agnostic, focusing on user value and business needs rather than implementation details. It's ready for the planning phase to design the implementation approach.

outcome: "Successfully completed specification for backend FastAPI todo API"
evaluation: "Specification meets all requirements with clear user stories, functional requirements, and measurable success criteria"
---