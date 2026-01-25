---
id: 001
title: Transform Phase1 to FullStack Web
stage: spec
date: 2026-01-21
surface: agent
model: claude-sonnet-4-5-20250929
feature: none
branch: 001-full-stack-web
user: claude
command: "/sp.specify"
labels: [spec, fullstack, web, authentication]
links:
  spec: /mnt/e/Q4 hackathones/Todo-app-with-ai/specs/001-full-stack-web/spec.md
  ticket: null
  adr: null
  pr: null
files:
 - /mnt/e/Q4 hackathones/Todo-app-with-ai/specs/001-full-stack-web/spec.md
 - /mnt/e/Q4 hackathones/Todo-app-with-ai/specs/001-full-stack-web/checklists/requirements.md
tests:
 - spec validation
---

## Prompt

/sp.specify - Phase II: Full-Stack Web Application

[References]: sp.constitution
[Phase]: Phase II of V (Full-Stack Web Application)

## Project Structure

This hackathon follows a **phase-isolated folder structure** where each phase has its own dedicated folder to prevent interference:
```
hackathon-todo/
├── sp.constitution              # Global constitution (all phases)
├── phase1/                      # Phase I: Console App
│   ├── sp.specify
│   ├── sp.plan
│   ├── sp.tasks
│   └── src/
├── phase2/                      # Phase II: Full-Stack Web ⭐ CURRENT
│   ├── sp.specify               # This file
│   ├── sp.plan                  # To be created
│   ├── sp.tasks                 # To be created
│   ├── specs/                   # Detailed specifications
│   │   ├── features/
│   │   │   ├── task-crud.md
│   │   │   └── authentication.md
│   │   ├── api/
│   │   │   └── rest-endpoints.md
│   │   ├── database/
│   │   │   └── schema.md
│   │   └── ui/
│   │       ├── components.md
│   │       └── pages.md
│   ├── CLAUDE.md                # Phase 2 root AI instructions
│   ├── frontend/                # Next.js application
│   │   ├── CLAUDE.md
│   │   ├── app/
│   │   ├── components/
│   │   ├── lib/
│   │   └── package.json
│   ├── backend/                 # FastAPI application
│   │   ├── CLAUDE.md
│   │   ├── main.py
│   │   ├── models.py
│   │   ├── routes/
│   │   ├── middleware/
│   │   └── requirements.txt
│   ├── .env.example
│   ├── docker-compose.yml
│   └── README.md
├── phase3/                      # Phase III: AI Chatbot (future)
├── phase4/                      # Phase IV: Kubernetes (future)
└── phase5/                      # Phase V: Cloud Deployment (future)
```

**Isolation Principle**: Each phase folder is self-contained. Phase 2 work will NOT modify phase1/ folder.

---

## Target Deliverable

**Objective**: Transform the Phase I console todo application into a modern, production-ready, multi-user web application with persistent database storage and JWT-based authentication.

**Target Users**:
- Multiple end-users managing personal todo lists
- Each user has isolated, secure access to only their own tasks
- Users interact via browser (desktop and mobile responsive)

**Primary Goal**: Demonstrate spec-driven development by implementing a complete full-stack application WITHOUT writing manual code—all implementation generated via AI agents (Claude Code, Qwen Code, CCR).

---

## Focus Areas

### 1. Multi-User Authentication System
- **What**: Secure user signup and signin with JWT token-based authentication
- **Why**: Enable multiple users to use the same application while keeping their data isolated
- **Technology**: Better Auth (frontend) + JWT verification (backend)
- **Evidence of Success**: Users can create accounts, log in, and only see their own tasks

### 2. RESTful API Backend
- **What**: Python FastAPI server exposing 6 HTTP endpoints for task operations
- **Why**: Separate frontend and backend concerns with a stateless API
- **Technology**: FastAPI (async), SQLModel ORM, Neon PostgreSQL
- **Evidence of Success**: API responds to authenticated requests with JSON data

### 3. Modern Web Frontend
- **What**: Next.js 16 web application with responsive UI
- **Why**: Provide intuitive browser-based interface for task management
- **Technology**: Next.js 16 (App Router), TypeScript, Tailwind CSS
- **Evidence of Success**: Users can perform all CRUD operations via web UI

### 4. Database Persistence
- **What**: PostgreSQL database storing users and tasks with proper relationships
- **Why**: Persistent storage that survives server restarts
- **Technology**: Neon Serverless PostgreSQL via SQLModel
- **Evidence of Success**: Data persists across application restarts

### 5. Monorepo Organization
- **What**: Single repository containing frontend, backend, and shared specifications
- **Why**: Simplify AI agent navigation and enable cross-cutting changes
- **Technology**: GitHub monorepo with Spec-Kit Plus structure
- **Evidence of Success**: AI agents can implement changes across both frontend and backend in single context

---

## Success Criteria

### Functional Requirements ✅

#### User Authentication
- ✅ User can sign up with email and password
- ✅ User can sign in with existing credentials
- ✅ Frontend receives JWT token upon successful login
- ✅ JWT token stored securely (HTTP-only cookie or localStorage)
- ✅ Token expires after 7 days
- ✅ Invalid/expired tokens return 401 Unauthorized

#### Task Management (CRUD)
- ✅ User can create task with title (required) and description (optional)
- ✅ User can view list of all their tasks
- ✅ User can update task title and/or description
- ✅ User can delete task
- ✅ User can toggle task completion status (pending ↔ completed)
- ✅ Tasks display creation and update timestamps

#### Data Isolation
- ✅ User A cannot see User B's tasks
- ✅ User A cannot modify User B's tasks
- ✅ API enforces user ownership on all operations
- ✅ Attempting to access other user's tasks returns 403 Forbidden

#### API Functionality
- ✅ `GET /api/{user_id}/tasks` returns array of tasks
- ✅ `POST /api/{user_id}/tasks` creates new task and returns it
- ✅ `GET /api/{user_id}/tasks/{id}` returns single task details
- ✅ `PUT /api/{user_id}/tasks/{id}` updates task and returns updated version
- ✅ `DELETE /api/{user_id}/tasks/{id}` removes task and returns success message
- ✅ `PATCH /api/{user_id}/tasks/{id}/complete` toggles completion status
- ✅ All endpoints require valid JWT token in Authorization header
- ✅ All endpoints return JSON responses
- ✅ Error responses follow consistent format: `{"detail": "Error message"}`

#### Frontend UI
- ✅ Responsive design (works on mobile and desktop)
- ✅ Login page with email/password form
- ✅ Signup page with email/password/confirm fields
- ✅ Dashboard showing user's tasks
- ✅ Add task form (title + description fields)
- ✅ Task list with title, status, timestamps
- ✅ Edit task inline or via modal
- ✅ Delete task with confirmation
- ✅ Mark complete/incomplete with visual indicator (checkbox or toggle)
- ✅ Loading states during API calls
- ✅ Error messages for failed operations

### Technical Requirements ✅

#### Backend Stack
- ✅ FastAPI framework with async endpoints
- ✅ SQLModel for ORM and database models
- ✅ Neon Serverless PostgreSQL as database
- ✅ JWT authentication middleware
- ✅ CORS configuration for frontend domain
- ✅ Environment variables for secrets (DATABASE_URL, BETTER_AUTH_SECRET)
- ✅ Proper HTTP status codes (200, 201, 401, 403, 404, 500)
- ✅ Error handling with try-catch blocks

#### Frontend Stack
- ✅ Next.js 16 with App Router (not Pages Router)
- ✅ TypeScript for type safety
- ✅ Tailwind CSS for styling
- ✅ Better Auth for authentication
- ✅ API client module (`lib/api.ts`) for backend communication
- ✅ Server Components by default, Client Components only when needed
- ✅ Environment variables for API URL

#### Database Schema
- ✅ `users` table (managed by Better Auth): id, email, name, created_at
- ✅ `tasks` table: id, user_id (FK), title, description, completed, created_at, updated_at
- ✅ Foreign key constraint: tasks.user_id → users.id
- ✅ Indexes on user_id and completed columns
- ✅ Timestamps auto-updated on modifications

#### Deployment
- ✅ Frontend deployed to Vercel (or similar)
- ✅ Backend deployed to Railway/Render/Fly.io (or similar)
- ✅ Neon PostgreSQL database provisioned
- ✅ Environment variables configured on both services
- ✅ CORS allows frontend domain
- ✅ Public URLs accessible and functional

### Spec-Driven Development Requirements ✅

#### Specifications
- ✅ `sp.specify` (this file) defines WHAT to build
- ✅ `sp.plan` defines HOW to build (architecture, APIs, components)
- ✅ `sp.tasks` breaks plan into atomic implementation units
- ✅ Detailed specs in `specs/` folder (features, API, database, UI)
- ✅ All specs reference `sp.constitution` principles

#### AI Agent Workflow
- ✅ All code generated via AI agents (Claude Code, Qwen Code, CCR)
- ✅ No manual coding—specs refined until AI produces correct output
- ✅ Every code file includes task reference comment: `# [Task]: T-XXX`
- ✅ CLAUDE.md files guide AI agents at root, frontend, and backend levels
- ✅ Context7 MCP used for querying latest documentation (Next.js 16, FastAPI)

#### Documentation
- ✅ README.md with setup instructions
- ✅ .env.example with required environment variables
- ✅ API documentation (can be auto-generated or markdown)
- ✅ Deployment instructions

---

## Constraints

### Technology Stack Constraints
- **Frontend**: Must use Next.js 16 with App Router (not Pages Router or older versions)
- **Backend**: Must use FastAPI with async/await (not Flask or Django)
- **Database**: Must use Neon Serverless PostgreSQL (not local PostgreSQL or other databases)
- **ORM**: Must use SQLModel (not SQLAlchemy directly or Django ORM)
- **Authentication**: Must use Better Auth on frontend with JWT verification on backend
- **Styling**: Must use Tailwind CSS (not plain CSS or other frameworks)
- **Language**: TypeScript for frontend, Python for backend

### Feature Constraints
- **Basic Level Only**: Implement only the 5 basic features (Add, Delete, Update, View, Mark Complete)
- **No Advanced Features**: Do NOT implement priorities, tags, search, filters, sorting, recurring tasks, or reminders (those are Phase V)
- **No AI Integration**: Do NOT implement chatbot or MCP server (that's Phase III)
- **No Kubernetes**: Do NOT containerize or deploy to Kubernetes (that's Phase IV)

### Data Constraints
- **Title**: 1-200 characters, required
- **Description**: 0-1000 characters, optional
- **Email**: Valid email format, unique across users
- **Password**: Minimum 8 characters (Better Auth enforces)
- **JWT Token**: 7-day expiration

### Performance Constraints
- **API Response Time**: < 500ms for CRUD operations under normal load
- **Database Queries**: Use indexed fields (user_id, completed) for filtering
- **Frontend Bundle**: Code splitting and lazy loading for optimal load time

### Security Constraints
- **No Hardcoded Secrets**: All secrets in environment variables
- **JWT Verification**: Every API endpoint must verify token
- **User ID Matching**: Token user_id must match URL {user_id} parameter
- **SQL Injection Prevention**: Use SQLModel ORM (parameterized queries)
- **CORS**: Restrict to frontend domain only

### Development Environment Constraints
- **OS**: WSL2 with Ubuntu 24.04 LTS
- **AI Tools**: Claude Code, Qwen Code, CCR
- **Spec Tool**: Spec-Kit Plus (https://github.com/panaversity/spec-kit-plus/)
- **Documentation**: Context7 MCP for latest Next.js 16 and FastAPI docs
- **Version Control**: Git with meaningful commits

### Timeline Constraints
- **Due Date**: December 14, 2025
- **Points**: 150 (out of 1000 total hackathon points)
- **Prerequisite**: Phase I must be completed before starting Phase II

---

## Not Building (Out of Scope for Phase II)

### Features NOT in Phase II
- ❌ AI chatbot interface (Phase III)
- ❌ MCP server integration (Phase III)
- ❌ Task priorities or tags (Phase V)
- ❌ Search and filter by keyword (Phase V)
- ❌ Sort by date/priority (Phase V)
- ❌ Recurring tasks (Phase V)
- ❌ Due dates and reminders (Phase V)
- ❌ Browser notifications (Phase V)
- ❌ Multi-language support (Bonus feature)
- ❌ Voice commands (Bonus feature)

### Technical NOT in Phase II
- ❌ Docker containerization (Phase IV)
- ❌ Kubernetes deployment (Phase IV)
- ❌ Helm charts (Phase IV)
- ❌ Kafka/event streaming (Phase V)
- ❌ Dapr integration (Phase V)
- ❌ CI/CD pipelines (Phase V)
- ❌ Advanced monitoring/logging (Phase V)

### Architecture NOT in Phase II
- ❌ Microservices architecture (monolith is fine)
- ❌ Message queues (direct HTTP only)
- ❌ Caching layer (Redis, etc.)
- ❌ CDN integration
- ❌ Load balancing
- ❌ Auto-scaling

### Development NOT in Phase II
- ❌ Comprehensive unit/integration tests (manual testing is sufficient)
- ❌ E2E test automation (Playwright, Cypress)
- ❌ Performance benchmarking
- ❌ Accessibility audit (basic accessibility is fine)
- ❌ SEO optimization

---

## User Journeys

### Journey 1: New User Signup and First Task
**Actor**: Sarah, a new user

1. Sarah visits the application homepage
2. Clicks "Sign Up" button
3. Enters email: sarah@example.com, password: SecurePass123, confirms password
4. Clicks "Create Account"
5. System creates user account and redirects to dashboard
6. Dashboard shows empty task list with "Add Task" button
7. Sarah clicks "Add Task"
8. Enters title: "Buy groceries", description: "Milk, eggs, bread"
9. Clicks "Save"
10. New task appears in task list with "pending" status
11. Sarah logs out

**Success Criteria**: Sarah has an account and one saved task

---

### Journey 2: Returning User Login and Task Management
**Actor**: John, an existing user with 3 tasks

1. John visits login page
2. Enters email: john@example.com, password: MyPassword456
3. Clicks "Sign In"
4. System validates credentials and issues JWT token
5. Dashboard loads showing John's 3 tasks:
   - "Call dentist" (pending)
   - "Submit report" (pending)
   - "Buy birthday gift" (completed)
6. John clicks checkbox next to "Call dentist"
7. Task status changes to "completed" immediately
8. John clicks "Edit" on "Submit report"
9. Changes description from "Q4 report" to "Q4 sales report - due Friday"
10. Clicks "Save"
11. Task updates successfully
12. John clicks "Delete" on "Buy birthday gift"
13. Confirmation modal appears: "Are you sure?"
14. John confirms
15. Task is removed from list
16. John logs out

**Success Criteria**: John's tasks are updated and changes persist

---

### Journey 3: User Isolation Verification
**Actor**: Admin testing security

1. Alice logs in (alice@example.com) → sees 5 tasks
2. Bob logs in (bob@example.com) → sees 3 tasks (different from Alice's)
3. Admin attempts to access Bob's task via Alice's token:
   - Manually crafts request: `GET /api/bob_user_id/tasks` with Alice's JWT token
   - Backend verifies token (valid for Alice)
   - Backend compares token user_id (Alice) with URL user_id (Bob)
   - Mismatch detected → returns 403 Forbidden
4. Alice cannot see or modify Bob's tasks
5. Each user's data is completely isolated

**Success Criteria**: Cross-user access is prevented by backend

---

### Journey 4: Token Expiration Handling
**Actor**: Emma, a user who last logged in 8 days ago

1. Emma opens application (has old JWT token in browser)
2. Frontend attempts to fetch tasks using expired token
3. Backend verifies token → detects expiration (> 7 days old)
4. Backend returns 401 Unauthorized
5. Frontend detects 401 response
6. Frontend redirects Emma to login page
7. Emma logs in again with email/password
8. System issues new JWT token (valid for 7 days)
9. Emma accesses dashboard successfully

**Success Criteria**: Expired tokens are rejected and users must re-authenticate

---

## Acceptance Criteria (Testable)

### Authentication Flow
```
GIVEN a new user
WHEN they submit signup form with valid email and password
THEN user account is created in database
AND user is redirected to dashboard
AND JWT token is stored in browser

GIVEN an existing user
WHEN they submit login form with correct credentials
THEN JWT token is issued
AND token contains user_id and email
AND token is valid for 7 days

GIVEN an API request without token
WHEN request is sent to any /api/* endpoint
THEN backend returns 401 Unauthorized
AND response includes {"detail": "Missing authentication token"}

GIVEN an API request with expired token
WHEN request is sent to any /api/* endpoint
THEN backend returns 401 Unauthorized
AND response includes {"detail": "Token expired"}
```

### Task Creation
```
GIVEN an authenticated user
WHEN they submit new task with title "Buy milk"
THEN POST /api/{user_id}/tasks is called
AND task is saved to database with user_id
AND response includes task object with generated id
AND created_at and updated_at timestamps are set
AND task appears in user's task list

GIVEN an authenticated user
WHEN they submit task with empty title
THEN frontend shows validation error
AND request is not sent to backend
```

### Task Retrieval
```
GIVEN a user with 5 tasks in database
WHEN they load dashboard
THEN GET /api/{user_id}/tasks is called with JWT token
AND backend returns array of 5 task objects
AND each task includes: id, user_id, title, description, completed, created_at, updated_at
AND frontend displays all 5 tasks in list

GIVEN User A with 3 tasks and User B with 4 tasks
WHEN User A loads dashboard
THEN User A sees only their 3 tasks
AND User B's 4 tasks are not visible to User A
```

### Task Update
```
GIVEN an authenticated user viewing their task list
WHEN they edit task #5 and change title to "Updated title"
THEN PUT /api/{user_id}/tasks/5 is called with new title
AND backend updates database record
AND updated_at timestamp is refreshed
AND response includes updated task object
AND frontend displays updated title immediately
```

### Task Deletion
```
GIVEN an authenticated user with task #3
WHEN they click delete and confirm
THEN DELETE /api/{user_id}/tasks/3 is called
AND backend removes task from database
AND response confirms deletion
AND frontend removes task from displayed list

GIVEN User A attempting to delete User B's task #7
WHEN User A sends DELETE /api/{user_b_id}/tasks/7 with User A's token
THEN backend detects user_id mismatch
AND returns 403 Forbidden
AND task #7 remains in database
```

### Task Completion Toggle
```
GIVEN a task with completed=false
WHEN user clicks checkbox/toggle
THEN PATCH /api/{user_id}/tasks/{id}/complete is called
AND backend sets completed=true
AND updated_at is refreshed
AND response includes updated task
AND frontend shows visual indicator (e.g., strikethrough, checkmark)

GIVEN a task with completed=true
WHEN user clicks checkbox/toggle again
THEN completed is set back to false
AND visual indicator is removed
```

---

## Evidence of Spec-Driven Development

### Specification Artifacts Required
1. ✅ `phase2/sp.specify` (this file)
2. ✅ `phase2/sp.plan` (architecture and technical design)
3. ✅ `phase2/sp.tasks` (atomic implementation tasks with IDs)
4. ✅ `phase2/specs/features/task-crud.md`
5. ✅ `phase2/specs/features/authentication.md`
6. ✅ `phase2/specs/api/rest-endpoints.md`
7. ✅ `phase2/specs/database/schema.md`
8. ✅ `phase2/specs/ui/components.md`
9. ✅ `phase2/specs/ui/pages.md`

### AI Agent Interaction Evidence
- ✅ Phase 2 CLAUDE.md files at root, frontend, backend
- ✅ Every generated code file has task reference comment
- ✅ Git commit messages reference spec sections
- ✅ Prompts and iterations documented for review

### Demonstration Requirements
- ✅ Live deployed application (Vercel frontend + Railway backend)
- ✅ Demo video (max 90 seconds) showing:
  - User signup
  - User login
  - Creating task
  - Updating task
  - Deleting task
  - Marking task complete
  - User isolation (two different user accounts)
- ✅ GitHub repository with organized specs/ folder
- ✅ README with setup and deployment instructions

---

## Reader Should Understand

After reviewing this specification, an AI agent or developer should be able to:

1. ✅ Explain the difference between Phase I (console) and Phase II (web)
2. ✅ Describe the authentication flow using JWT tokens
3. ✅ List all 6 API endpoints and their purposes
4. ✅ Understand why user isolation is critical
5. ✅ Identify the technology stack for frontend, backend, and database
6. ✅ Know that this is a monorepo with separate frontend/ and backend/ folders
7. ✅ Recognize that Phase II does NOT include AI chatbot, Kubernetes, or advanced features
8. ✅ Understand the spec-driven workflow: specify → plan → tasks → implement
9. ✅ Know that all code is AI-generated, no manual coding allowed

---

## Validation Checklist

Before proceeding to `sp.plan`, confirm:

- [ ] All success criteria are clear and testable
- [ ] Constraints are explicitly defined
- [ ] User journeys cover main use cases
- [ ] Out-of-scope items are clearly listed
- [ ] Technology stack matches sp.constitution
- [ ] Folder structure isolates Phase II work
- [ ] References to sp.constitution are present
- [ ] Acceptance criteria are written in GIVEN-WHEN-THEN format

---

**Status**: ✅ Specification Complete
**Next Step**: Create `phase2/sp.plan` to define architecture and implementation approach
**Approval Required**: Yes (review before planning)

---

End of Specification

## Response snapshot

I have successfully created the feature specification for the Full-Stack Web Application. Here's what was accomplished:

✅ **Branch Created**: `001-full-stack-web`
✅ **Specification Created**: `/mnt/e/Q4 hackathones/Todo-app-with-ai/specs/001-full-stack-web/spec.md`
✅ **Quality Checklist Created**: `/mnt/e/Q4 hackathones/Todo-app-with-ai/specs/001-full-stack-web/checklists/requirements.md`

The specification includes:
- Comprehensive user scenarios and testing requirements
- All functional requirements for the full-stack web application
- Data isolation and authentication requirements
- Measurable success criteria
- Edge cases and error handling considerations

The specification is technology-agnostic and focuses on user value, meeting all the requirements for a high-quality feature specification. It's now ready for the next phase (`/sp.clarify` or `/sp.plan`).

## Outcome

- ✅ Impact: Created comprehensive specification for transforming Phase I console app to full-stack web application with authentication
- 🧪 Tests: spec validation passed
- 📁 Files: Created spec.md and requirements checklist in specs/001-full-stack-web/
- 🔁 Next prompts: Ready for /sp.clarify or /sp.plan
- 🧠 Reflection: Successfully transformed detailed requirements into a structured, testable specification following the template format

## Evaluation notes (flywheel)

- Failure modes observed: None
- Graders run and results (PASS/FAIL): PASS
- Prompt variant (if applicable): N/A
- Next experiment (smallest change to try): Proceed with planning phase