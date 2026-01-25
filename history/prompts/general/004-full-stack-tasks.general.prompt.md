---
id: 004
title: Full Stack Tasks Creation
stage: tasks
date: 2026-01-21
surface: agent
model: claude-sonnet-4-5-20250929
feature: none
branch: 001-full-stack-web
user: claude
command: "/sp.tasks"
labels: [tasks, fullstack, web, implementation]
links:
  spec: /mnt/e/Q4 hackathones/Todo-app-with-ai/specs/001-full-stack-web/spec.md
  plan: /mnt/e/Q4 hackathones/Todo-app-with-ai/specs/001-full-stack-web/plan.md
  ticket: null
  adr: null
  pr: null
files:
 - /mnt/e/Q4 hackathones/Todo-app-with-ai/specs/001-full-stack-web/tasks.md
tests:
 - tasks validation
---

## Prompt

You are an AI agent tasked with creating the sp.tasks file for Phase II of a Full-Stack Todo Web Application following Spec-Driven Development principles.

CONTEXT:
- This is Phase II of a 5-phase hackathon project
- We have completed sp.constitution, phase2/sp.specify, and phase2/sp.plan
- Now we need to break the plan into atomic, testable implementation tasks
- Each task must be small enough to implement in 1-4 hours
- Each task must have clear inputs, outputs, and acceptance criteria
- Tasks must reference back to sp.specify and sp.plan sections
- All code will be AI-generated (Claude Code/Qwen Code/CCR)
- Development environment: WSL2 Ubuntu, Next.js 16, FastAPI, Neon PostgreSQL

REFERENCES:
You must reference these existing files:
- sp.constitution (global project principles)
- phase2/sp.specify (requirements and user stories)
- phase2/sp.plan (architecture and technical design)

YOUR TASK:
Create a comprehensive sp.tasks file for phase2/sp.tasks that breaks down the implementation into 75 atomic tasks.

TASK FORMAT (Follow this EXACTLY for every task):

## Task ID: T-XXX
**Title**: [Short descriptive title]
**Category**: [Setup/Backend/Frontend/Integration/Deployment/Documentation]
**Priority**: [High/Medium/Low]
**Estimated Time**: [X hours]
**Dependencies**: [Task IDs or "None"]

**Description**:
[2-3 sentences explaining what needs to be done]

**References**:
- sp.specify: §[section]
- sp.plan: §[section]

**Acceptance Criteria**:
- [ ] Criterion 1
- [ ] Criterion 2
- [ ] Criterion 3

**Implementation Notes**:
- Note 1
- Note 2

**Files to Create/Modify**:
- path/to/file1
- path/to/file2

**Testing**:
[How to verify completion]

**AI Agent Prompt Example**:
```
@phase2/sp.specify @phase2/sp.plan
[Sample prompt]
```

---

TASK BREAKDOWN (Create ALL 75 tasks):

SETUP & CONFIGURATION (T-001 to T-005):
- T-001: Initialize Phase 2 monorepo folder structure
- T-002: Setup Next.js 16 frontend project
- T-003: Setup FastAPI backend project
- T-004: Configure Neon PostgreSQL database
- T-005: Create environment configuration files

DATABASE SETUP (T-006 to T-010):
- T-006: Create SQLModel Task model with all fields
- T-007: Create database connection module (db.py)
- T-008: Implement database initialization function
- T-009: Create database session management with context manager
- T-010: Test database connectivity and model creation

BACKEND AUTHENTICATION (T-011 to T-015):
- T-011: Create JWT utilities module (decode and verify functions)
- T-012: Implement JWT authentication middleware
- T-013: Create user_id validation function
- T-014: Setup CORS middleware in FastAPI
- T-015: Test JWT verification with sample tokens

BACKEND API - SCHEMAS (T-016 to T-020):
- T-016: Create Pydantic TaskCreate schema
- T-017: Create Pydantic TaskUpdate schema
- T-018: Create Pydantic TaskResponse schema
- T-019: Create schemas __init__.py for exports
- T-020: Test schema validation with sample data

BACKEND API - ENDPOINTS (T-021 to T-030):
- T-021: Implement GET /api/{user_id}/tasks endpoint (list all)
- T-022: Implement POST /api/{user_id}/tasks endpoint (create)
- T-023: Implement GET /api/{user_id}/tasks/{id} endpoint (get one)
- T-024: Implement PUT /api/{user_id}/tasks/{id} endpoint (update)
- T-025: Implement DELETE /api/{user_id}/tasks/{id} endpoint (delete)
- T-026: Implement PATCH /api/{user_id}/tasks/{id}/complete endpoint (toggle)
- T-027: Create routes/__init__.py and task router
- T-028: Create main.py with FastAPI app and router inclusion
- T-029: Add error handling to all endpoints
- T-030: Test all API endpoints with curl or Postman

FRONTEND AUTHENTICATION SETUP (T-031 to T-035):
- T-031: Setup Better Auth client configuration
- T-032: Create auth utilities (getToken, setToken, removeToken, isAuthenticated)
- T-033: Create TypeScript types (Task, User interfaces)
- T-034: Create auth layout component (no navbar)
- T-035: Setup protected route middleware

FRONTEND AUTH PAGES (T-036 to T-040):
- T-036: Create Login page with form validation
- T-037: Create Signup page with form validation
- T-038: Implement login submission with Better Auth
- T-039: Implement signup submission with Better Auth
- T-040: Test authentication flow (signup → login → dashboard)

FRONTEND API CLIENT (T-041 to T-045):
- T-041: Create API client base configuration (lib/api.ts)
- T-042: Implement getTasks() method
- T-043: Implement createTask() method
- T-044: Implement updateTask() and deleteTask() methods
- T-045: Implement toggleComplete() method and test all methods

FRONTEND SHARED UI COMPONENTS (T-046 to T-052):
- T-046: Create Button component with variants
- T-047: Create Input component with validation states
- T-048: Create Modal component with overlay
- T-049: Create Checkbox component
- T-050: Create Spinner/Loading component
- T-051: Create Navbar component with logout button
- T-052: Style all shared components with Tailwind CSS

FRONTEND DASHBOARD LAYOUT (T-053 to T-055):
- T-053: Create dashboard layout with navbar
- T-054: Create dashboard page (Server Component)
- T-055: Add error boundary for dashboard

FRONTEND TASK COMPONENTS (T-056 to T-062):
- T-056: Create TaskList component (Client Component with state)
- T-057: Create TaskItem component with edit/delete actions
- T-058: Create AddTaskForm component with validation
- T-059: Create EditTaskModal component
- T-060: Create DeleteConfirm component
- T-061: Implement refresh mechanism for TaskList after CRUD
- T-062: Add loading and error states to all task components

FRONTEND STYLING & RESPONSIVE (T-063 to T-065):
- T-063: Implement responsive design for mobile (375px-767px)
- T-064: Implement responsive design for tablet (768px-1023px)
- T-065: Implement responsive design for desktop (1024px+)

INTEGRATION TESTING (T-066 to T-070):
- T-066: Test complete signup → login → create task flow
- T-067: Test update and delete task flows
- T-068: Test user isolation with two different user accounts
- T-069: Test token expiration and re-authentication
- T-070: Cross-browser testing (Chrome, Firefox, Safari)

DEPLOYMENT (T-071 to T-075):
- T-071: Create comprehensive README.md with setup instructions
- T-072: Deploy frontend to Vercel with environment variables
- T-073: Deploy backend to Railway with environment variables
- T-074: Configure production Neon database and test connection
- T-075: Record 90-second demo video showing all features

---

FILE STRUCTURE:

# sp.tasks - Phase II: Full-Stack Web Application

[References]: sp.constitution, phase2/sp.specify, phase2/sp.plan
[Phase]: Phase II of V
[Total Tasks]: 75
[Estimated Time]: 80-100 hours (14 days)
[Created]: 2025-01-21

---

## Task Breakdown Summary

**Setup & Configuration (T-001 to T-005)**: 5 tasks, ~5 hours
- Initialize project structure, Next.js, FastAPI, database, environment files

**Database Setup (T-006 to T-010)**: 5 tasks, ~8 hours
- SQLModel models, database connection, session management, testing

**Backend Authentication (T-011 to T-015)**: 5 tasks, ~10 hours
- JWT utilities, middleware, user validation, CORS, testing

**Backend API Schemas (T-016 to T-020)**: 5 tasks, ~6 hours
- Pydantic schemas for request/response validation

**Backend API Endpoints (T-021 to T-030)**: 10 tasks, ~20 hours
- All 6 CRUD endpoints, router setup, error handling, testing

**Frontend Authentication Setup (T-031 to T-035)**: 5 tasks, ~8 hours
- Better Auth config, utilities, types, layouts, route protection

**Frontend Auth Pages (T-036 to T-040)**: 5 tasks, ~10 hours
- Login/signup pages, form validation, authentication flow

**Frontend API Client (T-041 to T-045)**: 5 tasks, ~8 hours
- API client methods for all CRUD operations

**Frontend Shared UI (T-046 to T-052)**: 7 tasks, ~10 hours
- Reusable components (Button, Input, Modal, etc.)

**Frontend Dashboard (T-053 to T-055)**: 3 tasks, ~4 hours
- Layout, page structure, error boundaries

**Frontend Task Components (T-056 to T-062)**: 7 tasks, ~15 hours
- TaskList, TaskItem, forms, modals, state management

**Frontend Responsive Design (T-063 to T-065)**: 3 tasks, ~5 hours
- Mobile, tablet, desktop responsiveness

**Integration Testing (T-066 to T-070)**: 5 tasks, ~10 hours
- End-to-end testing, user isolation, cross-browser

**Deployment (T-071 to T-075)**: 5 tasks, ~8 hours
- Documentation, Vercel, Railway, production database, demo video

---

## Implementation Tasks

---

## Task ID: T-001
**Title**: Initialize Phase 2 Monorepo Folder Structure
**Category**: Setup
**Priority**: High
**Estimated Time**: 1 hour
**Dependencies**: None

**Description**:
Create the complete folder structure for Phase 2 following the monorepo pattern. This includes creating separate frontend/ and backend/ directories within phase2/, along with specs/ folder for detailed specifications. Add .gitkeep files to empty directories for Git tracking.

**References**:
- sp.specify: §Project Structure (Folder isolation principle)
- sp.plan: §Component Breakdown §1 (Monorepo organization)

**Acceptance Criteria**:
- [ ] phase2/ root directory created
- [ ] phase2/frontend/ directory created with .gitkeep
- [ ] phase2/backend/ directory created with .gitkeep
- [ ] phase2/specs/ directory with subdirectories (features/, api/, database/, ui/)
- [ ] phase2/CLAUDE.md file created referencing sp.constitution
- [ ] phase2/.env.example created with placeholder variables

**Implementation Notes**:
- Use mkdir -p for nested directory creation
- Add .gitkeep files to empty directories (git add -f .gitkeep)
- CLAUDE.md should contain: @sp.constitution reference
- .env.example should list: DATABASE_URL, BETTER_AUTH_SECRET, NEXT_PUBLIC_API_URL
- Follow exact structure from sp.plan Component Breakdown

**Files to Create/Modify**:
- phase2/frontend/.gitkeep
- phase2/backend/.gitkeep
- phase2/specs/features/.gitkeep
- phase2/specs/api/.gitkeep
- phase2/specs/database/.gitkeep
- phase2/specs/ui/.gitkeep
- phase2/CLAUDE.md
- phase2/.env.example

**Testing**:
```bash
tree phase2/ -L 3
# Verify all directories exist
ls -la phase2/frontend/
ls -la phase2/backend/
ls -la phase2/specs/
```

**AI Agent Prompt Example**:
```
@phase2/sp.plan §Component Breakdown

Create the complete monorepo folder structure for Phase 2:

phase2/
├── frontend/
├── backend/
├── specs/
│   ├── features/
│   ├── api/
│   ├── database/
│   └── ui/
├── CLAUDE.md
└── .env.example

Add .gitkeep files to empty directories.
CLAUDE.md should reference sp.constitution.
.env.example should include: DATABASE_URL, BETTER_AUTH_SECRET, NEXT_PUBLIC_API_URL
```

---

[CONTINUE WITH REMAINING 74 TASKS FOLLOWING THE SAME FORMAT]

## Response snapshot

Successfully created the complete sp.tasks file for Phase II of the Full-Stack Todo Web Application. The file contains 75 atomic tasks organized into 11 categories:

1. Setup & Configuration (T-001 to T-005): 5 tasks
2. Database Setup (T-006 to T-010): 5 tasks
3. Backend Authentication (T-011 to T-015): 5 tasks
4. Backend API Schemas (T-016 to T-020): 5 tasks
5. Backend API Endpoints (T-021 to T-030): 10 tasks
6. Frontend Authentication Setup (T-031 to T-035): 5 tasks
7. Frontend Auth Pages (T-036 to T-040): 5 tasks
8. Frontend API Client (T-041 to T-045): 5 tasks
9. Frontend Shared UI Components (T-046 to T-052): 7 tasks
10. Frontend Dashboard Layout (T-053 to T-055): 3 tasks
11. Frontend Task Components (T-056 to T-062): 7 tasks
12. Frontend Styling & Responsive (T-063 to T-065): 3 tasks
13. Integration Testing (T-066 to T-070): 5 tasks
14. Deployment (T-071 to T-075): 5 tasks

Each task follows the exact format specified with:
- Task ID, Title, Category, Priority, Estimated Time, Dependencies
- Description with 2-3 sentences
- References to sp.specify and sp.plan sections
- Acceptance Criteria with checkboxes
- Implementation Notes
- Files to Create/Modify
- Testing instructions
- AI Agent Prompt Example

The tasks are designed to be atomic (implementable in 1-4 hours), testable, and follow the architecture defined in the plan. They reference back to the specification and plan sections as required, and are organized to support AI-generated implementation.

## Outcome

- ✅ Impact: Created comprehensive task breakdown for full-stack web application implementation
- 🧪 Tests: Tasks validation completed - all tasks are testable and well-defined
- 📁 Files: Created tasks.md in specs/001-full-stack-web/ with complete implementation roadmap
- 🔁 Next prompts: Ready for implementation phase using AI agents
- 🧠 Reflection: Task breakdown enables systematic implementation following the architecture plan

## Evaluation notes (flywheel)

- Failure modes observed: None
- Graders run and results (PASS/FAIL): PASS
- Prompt variant (if applicable): N/A
- Next experiment (smallest change to try): Begin implementation of T-001 using AI agents