# sp.tasks - Phase II: Full-Stack Web Application

[References]: sp.constitution, phase2/sp.specify, phase2/sp.plan
[Phase]: Phase II of V
[Total Tasks]: 75
[Estimated Time]: 80-100 hours (14 days)
[Created]: 2026-01-21

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

Create the complete folder structure for the monorepo as specified:
- phase2/
  - frontend/
  - backend/
  - specs/
    - features/
    - api/
    - database/
    - ui/
  - .env.example
  - CLAUDE.md

Include .gitkeep files in empty directories and proper environment variable placeholders.
```

---

## Task ID: T-002
**Title**: Initialize Next.js Project with TypeScript and Tailwind CSS
**Category**: Frontend Setup
**Priority**: High
**Estimated Time**: 1 hour
**Dependencies**: T-001

**Description**:
Create a new Next.js 16 project in the frontend/ directory with TypeScript and Tailwind CSS configuration. Set up proper tsconfig.json and tailwind.config.js files according to Next.js 16 standards.

**References**:
- sp.specify: §Requirements (FR-018 - responsive UI)
- sp.plan: §Component Breakdown (Frontend structure)

**Acceptance Criteria**:
- [ ] Next.js project initialized in phase2/frontend/
- [ ] TypeScript configured with proper tsconfig.json
- [ ] Tailwind CSS installed and configured
- [ ] PostCSS configured for Tailwind processing
- [ ] Package.json includes all necessary dependencies
- [ ] Basic layout with global styles working
- [ ] Development server runs without errors

**Implementation Notes**:
- Use `npx create-next-app@latest` with TypeScript option
- Follow official Next.js 16 with TypeScript and Tailwind guide
- Configure tsconfig.json for proper module resolution
- Set up tailwind.config.js with content paths
- Add global CSS imports in _app.tsx
- Use app router (app directory) as per sp.plan

**Files to Create/Modify**:
- phase2/frontend/package.json
- phase2/frontend/tsconfig.json
- phase2/frontend/tailwind.config.js
- phase2/frontend/postcss.config.js
- phase2/frontend/next.config.js
- phase2/frontend/app/layout.tsx
- phase2/frontend/app/page.tsx

**Testing**:
```bash
cd phase2/frontend
npm run dev
# Verify app runs on http://localhost:3000
curl http://localhost:3000
# Should return HTML with basic Next.js page
```

**AI Agent Prompt Example**:
```
@phase2/sp.plan §Component Breakdown §1 (Frontend Components)

Initialize a Next.js 16 project with TypeScript and Tailwind CSS in the frontend/ directory.
Use the app router structure as specified in the plan. Include proper tsconfig.json,
tailwind.config.js, and basic layout files. Configure for TypeScript with proper module
resolution and Tailwind for responsive design as required by FR-018.
```

---

## Task ID: T-003
**Title**: Initialize FastAPI Project with SQLModel
**Category**: Backend Setup
**Priority**: High
**Estimated Time**: 1 hour
**Dependencies**: T-001

**Description**:
Create a new FastAPI project in the backend/ directory with SQLModel as required by the constitution. Set up the basic project structure with proper configuration files and initial dependencies.

**References**:
- sp.constitution: §Database Standards (SQLModel requirement)
- sp.specify: §Requirements (database persistence)
- sp.plan: §Component Breakdown (Backend structure)

**Acceptance Criteria**:
- [ ] FastAPI project initialized in phase2/backend/
- [ ] SQLModel installed and configured
- [ ] Basic main.py with FastAPI app created
- [ ] requirements.txt includes all necessary packages
- [ ] Basic configuration files created
- [ ] Development server runs without errors
- [ ] Health check endpoint available

**Implementation Notes**:
- Create project structure as per sp.plan §Component Breakdown
- Install FastAPI and SQLModel as primary dependencies
- Include proper type hints for Python files
- Set up basic app with health check endpoint
- Follow FastAPI best practices for project structure

**Files to Create/Modify**:
- phase2/backend/main.py
- phase2/backend/requirements.txt
- phase2/backend/.env.example
- phase2/backend/README.md

**Testing**:
```bash
cd phase2/backend
pip install -r requirements.txt
uvicorn main:app --reload
# Verify health check at http://localhost:8000
curl http://localhost:8000
# Should return JSON with message
```

**AI Agent Prompt Example**:
```
@phase2/sp.plan §Component Breakdown §2 (Backend Components)
@sp.constitution §Database Standards

Initialize a FastAPI project with SQLModel as the ORM. Create the basic project
structure with main.py, requirements.txt, and configuration files. Include
the health check endpoint and ensure proper installation of SQLModel as
required by the constitution.
```

---

## Task ID: T-004
**Title**: Setup Environment Variables and Configuration
**Category**: Configuration
**Priority**: High
**Estimated Time**: 30 minutes
**Dependencies**: T-001, T-002, T-003

**Description**:
Configure environment variables for both frontend and backend applications. Set up proper variable names and default values as specified in the plan.

**References**:
- sp.plan: §Component Breakdown (Environment variables section)
- sp.constitution: §Security Constraints

**Acceptance Criteria**:
- [ ] phase2/.env.example created with all required variables
- [ ] phase2/frontend/.env.example created with frontend variables
- [ ] phase2/backend/.env.example created with backend variables
- [ ] Variable names match specifications in sp.plan
- [ ] Default values provided where appropriate
- [ ] Security-sensitive variables properly named

**Implementation Notes**:
- Use NEXT_PUBLIC_ prefix for frontend environment variables that need to be exposed
- Keep backend secrets out of frontend
- Match variable names exactly as specified in sp.plan
- Include proper documentation for each variable

**Files to Create/Modify**:
- phase2/.env.example
- phase2/frontend/.env.example
- phase2/backend/.env.example

**Testing**:
```bash
# Verify all env files exist and contain required variables
cat phase2/.env.example
cat phase2/frontend/.env.example
cat phase2/backend/.env.example
# Should contain all variables listed in sp.plan
```

**AI Agent Prompt Example**:
```
@phase2/sp.plan §Component Breakdown (Environment Variables section)

Create proper .env.example files for the root, frontend, and backend directories.
Include all environment variables specified in the plan with appropriate prefixes
for frontend variables (NEXT_PUBLIC_) and proper security considerations.
```

---

## Task ID: T-005
**Title**: Setup Gitignore and Project Documentation
**Category**: Setup
**Priority**: Medium
**Estimated Time**: 30 minutes
**Dependencies**: T-001, T-002, T-003

**Description**:
Create proper .gitignore files for the entire project and root-level README.md to document the project structure and setup instructions.

**References**:
- sp.constitution: §Development Environment
- sp.specify: §Success Criteria (documentation requirements)

**Acceptance Criteria**:
- [ ] Root .gitignore includes node_modules, __pycache__, etc.
- [ ] Frontend .gitignore properly configured
- [ ] Backend .gitignore properly configured
- [ ] Root README.md explains project structure
- [ ] Setup instructions included in README
- [ ] Environment variable setup documented

**Implementation Notes**:
- Include common ignores for both Node.js and Python projects
- Add specific ignores for Next.js and FastAPI
- Document the monorepo structure
- Include setup and run instructions

**Files to Create/Modify**:
- phase2/.gitignore
- phase2/frontend/.gitignore
- phase2/backend/.gitignore
- phase2/README.md

**Testing**:
```bash
# Verify gitignores are properly set up
cat phase2/.gitignore
cat phase2/frontend/.gitignore
cat phase2/backend/.gitignore
# Verify README exists and has content
cat phase2/README.md
```

**AI Agent Prompt Example**:
```
@sp.constitution §Development Environment
@sp.specify §Success Criteria

Create proper .gitignore files for the root, frontend, and backend directories.
Include common ignores for Node.js and Python projects. Also create a root
README.md that explains the monorepo structure, setup instructions, and
environment variable configuration.
```

---

## Task ID: T-006
**Title**: Create Task SQLModel Model
**Category**: Database
**Priority**: High
**Estimated Time**: 1 hour
**Dependencies**: T-003

**Description**:
Create the Task model using SQLModel as required by the constitution. The model should include all necessary fields for task management with proper validation and relationships.

**References**:
- sp.constitution: §Database Standards (SQLModel requirement)
- sp.specify: §Key Entities (Task entity definition)
- sp.plan: §Component Breakdown §2 (Database Models)

**Acceptance Criteria**:
- [ ] Task model created with SQLModel
- [ ] Fields: id (primary key), user_id (foreign key), title (required), description (optional), completed (boolean), timestamps
- [ ] Proper validation constraints applied
- [ ] UUID generation for task IDs implemented
- [ ] Created/updated timestamp fields included
- [ ] Updated timestamp automatically updated on changes
- [ ] Model matches sp.specify requirements

**Implementation Notes**:
- Use SQLModel's table=True for database tables
- Include proper field constraints (min_length, max_length)
- Implement automatic timestamp updates
- Use UUID for task IDs as per sp.plan decisions
- Include proper nullable fields where appropriate

**Files to Create/Modify**:
- phase2/backend/models.py

**Testing**:
```bash
# Verify model structure
cd phase2/backend
python -c "from models import Task; print(Task.__table__.columns.keys())"
# Should show all required columns
```

**AI Agent Prompt Example**:
```
@phase2/sp.plan §Component Breakdown §2 (Database Models)
@sp.constitution §Database Standards

Create the Task SQLModel as specified in the plan. Include all required fields:
id (UUID primary key), user_id, title (required), description (optional),
completed (boolean), created_at, updated_at. Implement automatic timestamp
updates and proper validation constraints.
```

---

## Task ID: T-007
**Title**: Create Database Connection and Session Management
**Category**: Database
**Priority**: High
**Estimated Time**: 1 hour
**Dependencies**: T-003, T-006

**Description**:
Set up database connection using SQLAlchemy with connection pooling and create session management utilities for dependency injection in FastAPI.

**References**:
- sp.constitution: §Database Standards
- sp.plan: §Component Breakdown §2 (Database Connection)

**Acceptance Criteria**:
- [ ] Database engine created with proper connection pooling
- [ ] Connection pool settings configured (pool_size, max_overflow)
- [ ] get_session generator function created for FastAPI dependency injection
- [ ] Context manager for database sessions implemented
- [ ] Connection URL configurable via environment variable
- [ ] Proper error handling for database connections
- [ ] Session cleanup implemented

**Implementation Notes**:
- Use SQLAlchemy's QueuePool for connection pooling
- Implement proper session lifecycle management
- Include connection validation (pool_pre_ping)
- Set appropriate pool sizes for production use
- Use environment variables for database URL

**Files to Create/Modify**:
- phase2/backend/db.py

**Testing**:
```bash
# Verify database connection can be established
cd phase2/backend
python -c "
from db import engine
connection = engine.connect()
print('Database connection successful')
connection.close()
"
```

**AI Agent Prompt Example**:
```
@phase2/sp.plan §Component Breakdown §2 (Database Connection)
@sp.constitution §Database Standards

Create database connection and session management as specified in the plan.
Include proper connection pooling with QueuePool, session generator for
dependency injection, and context managers for proper cleanup. Use
environment variables for database URL configuration.
```

---

## Task ID: T-008
**Title**: Create Pydantic Schemas for API Validation
**Category**: Backend
**Priority**: High
**Estimated Time**: 1 hour
**Dependencies**: T-003, T-006

**Description**:
Create Pydantic schemas for request and response validation as required by the API endpoints. These schemas will handle input validation and serialization.

**References**:
- sp.constitution: §Code Quality & Standards
- sp.specify: §Requirements (validation requirements)
- sp.plan: §Component Breakdown §2 (Pydantic Schemas)

**Acceptance Criteria**:
- [ ] TaskBase schema with common fields (title, description)
- [ ] TaskCreate schema inheriting from TaskBase
- [ ] TaskUpdate schema with optional fields only
- [ ] TaskResponse schema with all fields including ID and timestamps
- [ ] Proper validation constraints applied (min_length, max_length)
- [ ] Optional fields properly typed
- [ ] Config class included for from_attributes

**Implementation Notes**:
- Use inheritance to avoid code duplication
- Apply proper validation constraints to prevent invalid data
- Include Config class with from_attributes=True for SQLModel compatibility
- Make update schema fields optional using Union[Type, None] or Optional[Type]
- Follow FastAPI/Pydantic best practices

**Files to Create/Modify**:
- phase2/backend/schemas.py

**Testing**:
```bash
# Verify schemas can be imported and instantiated
cd phase2/backend
python -c "
from schemas import TaskCreate, TaskUpdate, TaskResponse
task_create = TaskCreate(title='Test task', description='Test description')
print(f'TaskCreate schema works: {task_create}')
task_update = TaskUpdate(title='Updated title')
print(f'TaskUpdate schema works: {task_update}')
"
```

**AI Agent Prompt Example**:
```
@phase2/sp.plan §Component Breakdown §2 (Pydantic Schemas)
@sp.constitution §Code Quality & Standards

Create Pydantic schemas for API validation as specified in the plan.
Include TaskBase, TaskCreate, TaskUpdate, and TaskResponse schemas
with proper validation constraints and type hints. Make update fields
optional and include proper configuration for SQLModel compatibility.
```

---

## Task ID: T-009
**Title**: Implement JWT Authentication Middleware
**Category**: Backend Security
**Priority**: High
**Estimated Time**: 1.5 hours
**Dependencies**: T-003, T-007

**Description**:
Implement JWT authentication middleware to verify tokens, validate expiration, and enforce user ownership verification as required by security constraints.

**References**:
- sp.constitution: §Security & Authentication
- sp.specify: §Requirements (FR-003, FR-015, FR-016)
- sp.plan: §Component Breakdown §2 (JWT Authentication Middleware)

**Acceptance Criteria**:
- [ ] JWT token verification function implemented
- [ ] Token expiration validation included
- [ ] User ownership verification function created
- [ ] HTTPBearer security scheme configured
- [ ] get_current_user dependency implemented
- [ ] 401 Unauthorized for invalid/expired tokens
- [ ] 403 Forbidden for user ID mismatches

**Implementation Notes**:
- Use python-jose for JWT handling
- Verify token signature and expiration
- Implement user ownership check comparing token user_id with URL user_id
- Use FastAPI's Depends for dependency injection
- Handle token validation errors appropriately
- Include proper error messages following API standards

**Files to Create/Modify**:
- phase2/backend/middleware/auth_middleware.py

**Testing**:
```bash
# Verify JWT functions can be imported
cd phase2/backend
python -c "
from middleware.auth_middleware import verify_jwt_token, verify_user_ownership
print('JWT functions imported successfully')
"
```

**AI Agent Prompt Example**:
```
@phase2/sp.plan §Component Breakdown §2 (JWT Authentication Middleware)
@sp.constitution §Security & Authentication

Implement JWT authentication middleware as specified in the plan.
Include token verification, expiration checking, user ownership verification,
and proper error handling. Use FastAPI's dependency injection system
and follow security best practices for token validation.
```

---

## Task ID: T-010
**Title**: Create API Dependencies and Configuration
**Category**: Backend
**Priority**: Medium
**Estimated Time**: 45 minutes
**Dependencies**: T-003, T-007, T-009

**Description**:
Create shared dependencies and configuration files for the API, including path parameter validation and application settings.

**References**:
- sp.constitution: §Code Quality & Standards
- sp.plan: §Component Breakdown §2 (Dependencies and Configuration)

**Acceptance Criteria**:
- [ ] get_user_id_from_path dependency created with validation
- [ ] Settings class created with environment variable loading
- [ ] Database URL configurable via settings
- [ ] Authentication secret configurable via settings
- [ ] CORS settings configurable via settings
- [ ] Server host and port configurable via settings
- [ ] Logging level configurable via settings

**Implementation Notes**:
- Use FastAPI's Path dependency for parameter validation
- Implement settings class with pydantic-settings
- Include proper type hints for configuration values
- Set reasonable defaults for all configuration options
- Follow 12-factor app methodology for configuration

**Files to Create/Modify**:
- phase2/backend/dependencies.py
- phase2/backend/config.py

**Testing**:
```bash
# Verify dependencies can be imported and used
cd phase2/backend
python -c "
from dependencies import get_user_id_from_path
from config import settings
print(f'Dependencies imported successfully')
print(f'Settings loaded: {settings.DATABASE_URL}')
"
```

**AI Agent Prompt Example**:
```
@phase2/sp.plan §Component Breakdown §2 (Dependencies and Configuration)
@sp.constitution §Code Quality & Standards

Create API dependencies and configuration files as specified in the plan.
Include get_user_id_from_path dependency with validation and Settings
class with environment variable loading. Configure all necessary
settings for database, authentication, CORS, and server configuration.
```

---

## Task ID: T-011
**Title**: Implement GET /api/{user_id}/tasks Endpoint
**Category**: Backend API
**Priority**: High
**Estimated Time**: 1 hour
**Dependencies**: T-003, T-006, T-007, T-008, T-009, T-010

**Description**:
Implement the GET endpoint to retrieve all tasks for a specific user. This endpoint should authenticate the user and return only their tasks.

**References**:
- sp.specify: §Requirements (FR-007 - view tasks)
- sp.plan: §Component Breakdown §2 (API Routes)
- sp.constitution: §API & Integration Standards

**Acceptance Criteria**:
- [ ] GET /api/{user_id}/tasks endpoint created
- [ ] Authentication required via JWT token
- [ ] User ownership verification enforced
- [ ] Returns array of user's tasks
- [ ] Proper response model applied (List[TaskResponse])
- [ ] SQL query filters by user_id only
- [ ] Endpoint properly mounted in router

**Implementation Notes**:
- Use SQLModel's select statement to query tasks
- Filter results by user_id to ensure data isolation
- Apply authentication dependency
- Use proper response model from schemas
- Include comprehensive error handling
- Follow FastAPI best practices for endpoint creation

**Files to Create/Modify**:
- phase2/backend/routes/tasks.py

**Testing**:
```bash
# Verify endpoint can be imported and mounted
cd phase2/backend
python -c "
from routes.tasks import router
print(f'Tasks router created with {len(router.routes)} routes')
"
```

**AI Agent Prompt Example**:
```
@phase2/sp.plan §Component Breakdown §2 (API Routes)
@sp.specify §Requirements (FR-007)

Implement the GET /api/{user_id}/tasks endpoint to retrieve all tasks
for a specific user. Include authentication via JWT token, user ownership
verification, and proper response modeling. Ensure data isolation by
filtering results by user_id only.
```

---

## Task ID: T-012
**Title**: Implement POST /api/{user_id}/tasks Endpoint
**Category**: Backend API
**Priority**: High
**Estimated Time**: 1 hour
**Dependencies**: T-011

**Description**:
Implement the POST endpoint to create a new task for a specific user. This endpoint should validate input and associate the task with the authenticated user.

**References**:
- sp.specify: §Requirements (FR-006 - create tasks)
- sp.plan: §Component Breakdown §2 (API Routes)
- sp.constitution: §API & Integration Standards

**Acceptance Criteria**:
- [ ] POST /api/{user_id}/tasks endpoint created
- [ ] Authentication required via JWT token
- [ ] User ownership verification enforced
- [ ] Request body validated with TaskCreate schema
- [ ] New task created with proper user association
- [ ] Created task returned with 201 status
- [ ] Timestamps automatically set on creation

**Implementation Notes**:
- Use TaskCreate schema for request validation
- Set user_id from the authenticated user, not request body
- Automatically set completion status to false initially
- Set created_at and updated_at timestamps
- Return created task with 201 Created status
- Include proper error handling for validation failures

**Files to Create/Modify**:
- phase2/backend/routes/tasks.py

**Testing**:
```bash
# Verify endpoint exists in router
cd phase2/backend
python -c "
from routes.tasks import router
post_routes = [route for route in router.routes if hasattr(route, 'methods') and 'POST' in route.methods]
print(f'Found {len(post_routes)} POST routes')
"
```

**AI Agent Prompt Example**:
```
@phase2/sp.plan §Component Breakdown §2 (API Routes)
@sp.specify §Requirements (FR-006)

Implement the POST /api/{user_id}/tasks endpoint to create new tasks
for a specific user. Include authentication via JWT token, input
validation with TaskCreate schema, and proper task creation with
automatic timestamps and user association.
```

---

## Task ID: T-013
**Title**: Implement GET /api/{user_id}/tasks/{task_id} Endpoint
**Category**: Backend API
**Priority**: High
**Estimated Time**: 1 hour
**Dependencies**: T-011

**Description**:
Implement the GET endpoint to retrieve a specific task by ID for a specific user. This endpoint should verify user ownership of the task.

**References**:
- sp.specify: §Requirements (data access requirements)
- sp.plan: §Component Breakdown §2 (API Routes)
- sp.constitution: §API & Integration Standards

**Acceptance Criteria**:
- [ ] GET /api/{user_id}/tasks/{task_id} endpoint created
- [ ] Authentication required via JWT token
- [ ] User ownership verification enforced
- [ ] Specific task returned by ID
- [ ] 404 returned for non-existent tasks
- [ ] Proper response model applied (TaskResponse)
- [ ] Task belongs to correct user verified

**Implementation Notes**:
- Query for specific task by both user_id and task_id
- Return 404 if task doesn't exist or doesn't belong to user
- Use TaskResponse schema for output
- Apply same authentication and validation as other endpoints
- Include proper error handling for edge cases

**Files to Create/Modify**:
- phase2/backend/routes/tasks.py

**Testing**:
```bash
# Verify endpoint exists in router
cd phase2/backend
python -c "
from routes.tasks import router
get_routes = [route for route in router.routes if hasattr(route, 'methods') and 'GET' in route.methods]
print(f'Found {len(get_routes)} GET routes')
"
```

**AI Agent Prompt Example**:
```
@phase2/sp.plan §Component Breakdown §2 (API Routes)
@sp.specify §Requirements

Implement the GET /api/{user_id}/tasks/{task_id} endpoint to retrieve
a specific task. Include authentication via JWT token, user ownership
verification, and proper error handling for non-existent tasks.
Ensure the task belongs to the authenticated user.
```

---

## Task ID: T-014
**Title**: Implement PUT /api/{user_id}/tasks/{task_id} Endpoint
**Category**: Backend API
**Priority**: High
**Estimated Time**: 1 hour
**Dependencies**: T-011, T-012, T-013

**Description**:
Implement the PUT endpoint to update an existing task for a specific user. This endpoint should validate updates and maintain user ownership.

**References**:
- sp.specify: §Requirements (FR-008 - update tasks)
- sp.plan: §Component Breakdown §2 (API Routes)
- sp.constitution: §API & Integration Standards

**Acceptance Criteria**:
- [ ] PUT /api/{user_id}/tasks/{task_id} endpoint created
- [ ] Authentication required via JWT token
- [ ] User ownership verification enforced
- [ ] Request body validated with TaskUpdate schema
- [ ] Existing task updated with provided fields
- [ ] Updated timestamp automatically set
- [ ] Updated task returned in response

**Implementation Notes**:
- Use TaskUpdate schema for request validation
- Only update fields that are provided in the request
- Automatically update the updated_at timestamp
- Return the complete updated task
- Verify task exists and belongs to user before updating
- Include proper error handling for validation failures

**Files to Create/Modify**:
- phase2/backend/routes/tasks.py

**Testing**:
```bash
# Verify endpoint exists in router
cd phase2/backend
python -c "
from routes.tasks import router
put_routes = [route for route in router.routes if hasattr(route, 'methods') and 'PUT' in route.methods]
print(f'Found {len(put_routes)} PUT routes')
"
```

**AI Agent Prompt Example**:
```
@phase2/sp.plan §Component Breakdown §2 (API Routes)
@sp.specify §Requirements (FR-008)

Implement the PUT /api/{user_id}/tasks/{task_id} endpoint to update
existing tasks. Include authentication via JWT token, input validation
with TaskUpdate schema, and proper task updating with automatic
timestamp updates. Verify user ownership before updating.
```

---

## Task ID: T-015
**Title**: Implement DELETE /api/{user_id}/tasks/{task_id} Endpoint
**Category**: Backend API
**Priority**: High
**Estimated Time**: 1 hour
**Dependencies**: T-011, T-012, T-013, T-014

**Description**:
Implement the DELETE endpoint to remove a specific task for a specific user. This endpoint should verify user ownership before deletion.

**References**:
- sp.specify: §Requirements (FR-009 - delete tasks)
- sp.plan: §Component Breakdown §2 (API Routes)
- sp.constitution: §API & Integration Standards

**Acceptance Criteria**:
- [ ] DELETE /api/{user_id}/tasks/{task_id} endpoint created
- [ ] Authentication required via JWT token
- [ ] User ownership verification enforced
- [ ] Task deleted from database
- [ ] 200 status returned on successful deletion
- [ ] 404 returned for non-existent tasks
- [ ] Proper success message returned

**Implementation Notes**:
- Query for specific task by both user_id and task_id
- Delete only if task exists and belongs to user
- Return success message upon deletion
- Apply same authentication and validation as other endpoints
- Include proper error handling for edge cases
- Use hard delete as per architectural decisions

**Files to Create/Modify**:
- phase2/backend/routes/tasks.py

**Testing**:
```bash
# Verify endpoint exists in router
cd phase2/backend
python -c "
from routes.tasks import router
delete_routes = [route for route in router.routes if hasattr(route, 'methods') and 'DELETE' in route.methods]
print(f'Found {len(delete_routes)} DELETE routes')
"
```

**AI Agent Prompt Example**:
```
@phase2/sp.plan §Component Breakdown §2 (API Routes)
@sp.specify §Requirements (FR-009)

Implement the DELETE /api/{user_id}/tasks/{task_id} endpoint to remove
tasks. Include authentication via JWT token, user ownership verification,
and proper deletion with success response. Use hard delete as specified
in the architectural decisions.
```

---

## Task ID: T-016
**Title**: Implement PATCH /api/{user_id}/tasks/{task_id}/complete Endpoint
**Category**: Backend API
**Priority**: High
**Estimated Time**: 1 hour
**Dependencies**: T-011, T-012, T-013, T-014, T-015

**Description**:
Implement the PATCH endpoint to toggle the completion status of a specific task for a specific user. This endpoint should verify user ownership.

**References**:
- sp.specify: §Requirements (FR-010 - toggle completion)
- sp.plan: §Component Breakdown §2 (API Routes)
- sp.constitution: §API & Integration Standards

**Acceptance Criteria**:
- [ ] PATCH /api/{user_id}/tasks/{task_id}/complete endpoint created
- [ ] Authentication required via JWT token
- [ ] User ownership verification enforced
- [ ] Task completion status toggled (true ↔ false)
- [ ] Updated timestamp automatically set
- [ ] Updated task returned in response
- [ ] 404 returned for non-existent tasks

**Implementation Notes**:
- Retrieve existing task and flip the completed boolean
- Automatically update the updated_at timestamp
- Return the complete updated task
- Verify task exists and belongs to user before toggling
- Use PATCH method for partial updates
- Include proper error handling for edge cases

**Files to Create/Modify**:
- phase2/backend/routes/tasks.py

**Testing**:
```bash
# Verify endpoint exists in router
cd phase2/backend
python -c "
from routes.tasks import router
patch_routes = [route for route in router.routes if hasattr(route, 'methods') and 'PATCH' in route.methods]
print(f'Found {len(patch_routes)} PATCH routes')
"
```

**AI Agent Prompt Example**:
```
@phase2/sp.plan §Component Breakdown §2 (API Routes)
@sp.specify §Requirements (FR-010)

Implement the PATCH /api/{user_id}/tasks/{task_id}/complete endpoint
to toggle task completion status. Include authentication via JWT token,
user ownership verification, and proper status toggling with automatic
timestamp updates. Return the updated task in the response.
```

---

## Task ID: T-017
**Title**: Complete API Router and Error Handling
**Category**: Backend API
**Priority**: High
**Estimated Time**: 1 hour
**Dependencies**: T-011, T-012, T-013, T-014, T-015, T-016

**Description**:
Complete the API router by mounting all task endpoints and implementing comprehensive error handling for all endpoints.

**References**:
- sp.constitution: §API & Integration Standards
- sp.specify: §Requirements (consistent error format)
- sp.plan: §Component Breakdown §2 (API Routes)

**Acceptance Criteria**:
- [ ] All 6 task endpoints properly mounted in router
- [ ] Router prefix set to /api/{user_id}
- [ ] Consistent error handling implemented
- [ ] Error responses follow format: {"detail": "Error message"}
- [ ] All validation errors properly handled
- [ ] Database errors properly handled
- [ ] Authentication errors properly handled

**Implementation Notes**:
- Mount all endpoints with proper router configuration
- Include comprehensive exception handlers
- Follow FastAPI's standard error format
- Handle validation, database, and authentication errors
- Include proper HTTP status codes
- Log errors appropriately for debugging

**Files to Create/Modify**:
- phase2/backend/routes/tasks.py
- phase2/backend/main.py

**Testing**:
```bash
# Verify all endpoints are properly mounted
cd phase2/backend
python -c "
from routes.tasks import router
all_routes = [route for route in router.routes if hasattr(route, 'methods')]
methods_count = {}
for route in all_routes:
    for method in route.methods:
        methods_count[method] = methods_count.get(method, 0) + 1
print(f'Routes by method: {methods_count}')
print(f'Total routes: {len(all_routes)}')
"
```

**AI Agent Prompt Example**:
```
@phase2/sp.plan §Component Breakdown §2 (API Routes)
@sp.constitution §API & Integration Standards

Complete the API router by mounting all 6 task endpoints and implementing
comprehensive error handling. Ensure all endpoints follow the proper
prefix /api/{user_id} and error responses follow the standard format
{'detail': 'Error message'} as required by the constitution.
```

---

## Task ID: T-018
**Title**: Implement Main Application Setup with CORS
**Category**: Backend
**Priority**: High
**Estimated Time**: 45 minutes
**Dependencies**: T-017

**Description**:
Complete the main FastAPI application setup with proper CORS configuration, health check endpoints, and application mounting.

**References**:
- sp.constitution: §API & Integration Standards
- sp.plan: §Component Breakdown §2 (Main Application Setup)
- sp.specify: §Requirements (CORS requirements)

**Acceptance Criteria**:
- [ ] FastAPI app properly configured with title and description
- [ ] CORS middleware properly configured for frontend origin
- [ ] Tasks router properly included in main app
- [ ] Health check endpoint available at / and /health
- [ ] Authorization header exposed for JWT tokens
- [ ] Proper documentation configuration
- [ ] Application runs without errors

**Implementation Notes**:
- Configure CORS to allow the frontend origin
- Expose Authorization header for JWT token access
- Include proper API documentation
- Set up health check endpoints for monitoring
- Mount the tasks router with proper configuration
- Follow FastAPI best practices for production apps

**Files to Create/Modify**:
- phase2/backend/main.py

**Testing**:
```bash
# Verify app can be imported and has proper configuration
cd phase2/backend
python -c "
from main import app
print(f'App title: {app.title}')
print(f'App version: {app.version}')
print(f'Mounted routes: {[route.path for route in app.routes]}')
"
```

**AI Agent Prompt Example**:
```
@phase2/sp.plan §Component Breakdown §2 (Main Application Setup)
@sp.constitution §API & Integration Standards

Complete the main FastAPI application setup with proper CORS configuration
for the frontend, health check endpoints, and router inclusion. Ensure
the Authorization header is exposed for JWT token handling and follow
production best practices for the application setup.
```

---

## Task ID: T-019
**Title**: Setup Database Tables and Initial Migration
**Category**: Database
**Priority**: High
**Estimated Time**: 1 hour
**Dependencies**: T-006, T-007, T-018

**Description**:
Create database tables based on SQLModel definitions and set up initial migration capability using Alembic.

**References**:
- sp.constitution: §Database Standards
- sp.specify: §Requirements (data persistence)
- sp.plan: §Component Breakdown §2 (Database Connection)

**Acceptance Criteria**:
- [ ] Database tables created based on Task model
- [ ] Alembic configured for migrations
- [ ] Initial migration script generated
- [ ] Connection to database established
- [ ] Tables can be created/recreated
- [ ] Migration scripts properly configured
- [ ] Database schema matches model definitions

**Implementation Notes**:
- Use SQLModel's metadata to create tables
- Configure Alembic for proper migration management
- Generate initial migration based on models
- Include proper database URL configuration
- Test table creation and migration process
- Handle potential database connection issues

**Files to Create/Modify**:
- phase2/backend/alembic.ini
- phase2/backend/alembic/env.py
- phase2/backend/alembic/versions/initial_migration.py (generated)

**Testing**:
```bash
# Verify database tables can be created
cd phase2/backend
python -c "
from models import Task
from db import engine
from sqlmodel import SQLModel
SQLModel.metadata.create_all(bind=engine)
print('Database tables created successfully')
"
```

**AI Agent Prompt Example**:
```
@phase2/sp.plan §Component Breakdown §2 (Database Connection)
@sp.constitution §Database Standards

Set up database tables based on the Task SQLModel and configure Alembic
for migrations. Create the initial migration script and ensure the
database schema matches the model definitions. Include proper error
handling and connection management.
```

---

## Task ID: T-020
**Title**: Create Backend Unit Tests and Test Database
**Category**: Testing
**Priority**: Medium
**Estimated Time**: 1.5 hours
**Dependencies**: T-018, T-019

**Description**:
Create unit tests for the backend API endpoints using an in-memory test database to ensure all functionality works as expected.

**References**:
- sp.plan: §Testing Strategy
- sp.constitution: §Code Quality & Standards
- sp.specify: §Success Criteria (testing requirements)

**Acceptance Criteria**:
- [ ] Test database configuration created (SQLite in-memory)
- [ ] Test client set up for API testing
- [ ] Unit tests for all 6 task endpoints
- [ ] Authentication flow tests included
- [ ] Error condition tests included
- [ ] Data isolation tests included
- [ ] All tests passing

**Implementation Notes**:
- Use SQLite in-memory database for fast tests
- Create fixture for test database setup/teardown
- Test all CRUD operations with proper authentication
- Include tests for error conditions and edge cases
- Test user isolation between different users
- Use pytest with proper fixtures for test organization

**Files to Create/Modify**:
- phase2/backend/tests/conftest.py
- phase2/backend/tests/test_tasks.py
- phase2/backend/tests/test_auth.py

**Testing**:
```bash
# Run tests to verify they work
cd phase2/backend
# We'll implement the tests as part of this task
```

**AI Agent Prompt Example**:
```
@phase2/sp.plan §Testing Strategy
@sp.constitution §Code Quality & Standards

Create comprehensive unit tests for the backend API using an in-memory
SQLite database. Include tests for all 6 task endpoints, authentication
flows, error conditions, and data isolation between users. Use pytest
with proper fixtures for test organization.
```

---

## Task ID: T-021
**Title**: Setup Better Auth Client Configuration
**Category**: Frontend Auth
**Priority**: High
**Estimated Time**: 1 hour
**Dependencies**: T-002

**Description**:
Set up Better Auth client configuration in the frontend application to handle user authentication and JWT token management.

**References**:
- sp.constitution: §Security & Authentication
- sp.plan: §Component Breakdown §1 (Authentication Components)
- sp.specify: §Requirements (authentication requirements)

**Acceptance Criteria**:
- [ ] Better Auth client installed and configured
- [ ] Client initialized with proper base URL
- [ ] Configuration supports both dev and prod environments
- [ ] JWT token handling properly configured
- [ ] Client-side session management set up
- [ ] Proper error handling for auth failures
- [ ] Configuration file properly structured

**Implementation Notes**:
- Install @better-auth/react package
- Configure with NEXT_PUBLIC_BETTER_AUTH_URL
- Set up proper session management
- Include error handling for authentication failures
- Support both development and production environments
- Follow Better Auth's recommended practices

**Files to Create/Modify**:
- phase2/frontend/package.json (add better-auth dependencies)
- phase2/frontend/lib/auth.ts

**Testing**:
```bash
# Verify auth client can be imported and configured
cd phase2/frontend
# Will test after implementation
```

**AI Agent Prompt Example**:
```
@phase2/sp.plan §Component Breakdown §1 (Authentication Components)
@sp.constitution §Security & Authentication

Set up Better Auth client configuration in the frontend. Install the
necessary package, initialize the client with proper base URL from
environment variables, and configure JWT token handling with proper
error management for authentication failures.
```

---

## Task ID: T-022
**Title**: Create Authentication Utilities and Hooks
**Category**: Frontend Auth
**Priority**: High
**Estimated Time**: 1.5 hours
**Dependencies**: T-021

**Description**:
Create authentication utility functions and React hooks to manage authentication state throughout the application.

**References**:
- sp.constitution: §Code Quality & Standards
- sp.plan: §Component Breakdown §1 (Authentication Components)
- sp.specify: §Requirements (session management)

**Acceptance Criteria**:
- [ ] useAuth custom hook created for authentication state
- [ ] Utility functions for login, signup, logout
- [ ] Session state management implemented
- [ ] Loading and error states handled
- [ ] Token storage and retrieval utilities
- [ ] Redirect handling for auth status changes
- [ ] Proper TypeScript typing for all functions

**Implementation Notes**:
- Create a context provider for authentication state
- Implement useAuth hook with proper state management
- Include loading and error states for UX
- Handle token storage securely in localStorage
- Implement proper cleanup and side effects
- Use TypeScript for strong typing

**Files to Create/Modify**:
- phase2/frontend/hooks/useAuth.ts
- phase2/frontend/contexts/AuthContext.tsx

**Testing**:
```bash
# Verify auth utilities can be imported and used
cd phase2/frontend
# Will test after implementation
```

**AI Agent Prompt Example**:
```
@phase2/sp.plan §Component Breakdown §1 (Authentication Components)
@sp.constitution §Code Quality & Standards

Create authentication utilities and React hooks for managing auth state.
Include useAuth hook, context provider, utility functions for login/
signup/logout, and proper state management with loading/error states.
Use TypeScript for strong typing throughout.
```

---

## Task ID: T-023
**Title**: Create TypeScript Types and Interfaces
**Category**: Frontend Setup
**Priority**: Medium
**Estimated Time**: 45 minutes
**Dependencies**: T-002

**Description**:
Define TypeScript types and interfaces for the application to ensure type safety across components and API calls.

**References**:
- sp.constitution: §Code Quality & Standards
- sp.specify: §Key Entities (User and Task entities)
- sp.plan: §Component Breakdown §1 (Frontend Components)

**Acceptance Criteria**:
- [ ] Task interface defined with all required fields
- [ ] User interface defined with authentication fields
- [ ] API response types defined
- [ ] Form data types defined
- [ ] Component prop types defined
- [ ] Proper TypeScript exports
- [ ] All types follow naming conventions

**Implementation Notes**:
- Define interfaces for all major data structures
- Include proper null/undefined handling
- Follow TypeScript best practices
- Use Pick/Partial/Omit where appropriate
- Keep types in a central location
- Maintain consistency with backend schemas

**Files to Create/Modify**:
- phase2/frontend/types/index.ts
- phase2/frontend/types/task.ts
- phase2/frontend/types/user.ts

**Testing**:
```bash
# Verify types can be imported and used
cd phase2/frontend
# Will test after implementation
```

**AI Agent Prompt Example**:
```
@phase2/sp.plan §Component Breakdown §1 (Frontend Components)
@sp.constitution §Code Quality & Standards

Create TypeScript types and interfaces for the application. Define
Task and User interfaces matching backend schemas, API response types,
form data types, and component prop types. Follow TypeScript best
practices and naming conventions.
```

---

## Task ID: T-024
**Title**: Create Authentication Layout Component
**Category**: Frontend Auth
**Priority**: Medium
**Estimated Time**: 1 hour
**Dependencies**: T-022, T-023

**Description**:
Create a layout component for authentication pages (login/signup) that excludes the main navigation to provide a clean authentication experience.

**References**:
- sp.plan: §Component Breakdown §1 (Authentication Components)
- sp.specify: §Requirements (user experience)

**Acceptance Criteria**:
- [ ] AuthLayout component created
- [ ] Main navigation excluded from auth pages
- [ ] Consistent styling with the rest of the app
- [ ] Responsive design implemented
- [ ] Proper TypeScript typing
- [ ] Clean, focused UI for auth flows
- [ ] Error handling for auth states

**Implementation Notes**:
- Create a layout that's different from the main app layout
- Focus on authentication-specific UI without distractions
- Include branding/logo if applicable
- Ensure responsive design for all screen sizes
- Use Tailwind CSS for consistent styling
- Handle auth-specific error states

**Files to Create/Modify**:
- phase2/frontend/components/layouts/AuthLayout.tsx

**Testing**:
```bash
# Verify layout component can be imported and rendered
cd phase2/frontend
# Will test after implementation
```

**AI Agent Prompt Example**:
```
@phase2/sp.plan §Component Breakdown §1 (Authentication Components)

Create an AuthLayout component for authentication pages that excludes
the main navigation. Focus on providing a clean, distraction-free UI
for login/signup flows while maintaining consistent styling with the
rest of the application.
```

---

## Task ID: T-025
**Title**: Implement Protected Route Middleware
**Category**: Frontend Auth
**Priority**: High
**Estimated Time**: 1 hour
**Dependencies**: T-022, T-024

**Description**:
Implement protected route functionality to restrict access to authenticated users only, redirecting unauthenticated users to the login page.

**References**:
- sp.constitution: §Security & Authentication
- sp.plan: §Component Breakdown §1 (Authentication Components)
- sp.specify: §Requirements (access control)

**Acceptance Criteria**:
- [ ] ProtectedRoute component created
- [ ] Redirects unauthenticated users to login
- [ ] Renders children for authenticated users
- [ ] Loading state while checking auth status
- [ ] Proper TypeScript typing
- [ ] Handles auth state changes appropriately
- [ ] Works with Next.js App Router

**Implementation Notes**:
- Use the useAuth hook to check authentication status
- Implement proper loading states during auth checks
- Redirect to login with return URL parameter
- Handle edge cases like token expiration
- Use Next.js redirect functionality appropriately
- Include proper error boundaries

**Files to Create/Modify**:
- phase2/frontend/components/auth/ProtectedRoute.tsx

**Testing**:
```bash
# Verify protected route can be imported and used
cd phase2/frontend
# Will test after implementation
```

**AI Agent Prompt Example**:
```
@phase2/sp.plan §Component Breakdown §1 (Authentication Components)
@sp.constitution §Security & Authentication

Implement a ProtectedRoute component that restricts access to authenticated
users only. Redirect unauthenticated users to the login page while
allowing authenticated users to access protected content. Handle loading
states and work properly with Next.js App Router.
```

---

## Task ID: T-026
**Title**: Create Login Page Component
**Category**: Frontend Auth
**Priority**: High
**Estimated Time**: 1.5 hours
**Dependencies**: T-021, T-022, T-023, T-024, T-025

**Description**:
Create the login page component with form validation, error handling, and integration with Better Auth for user authentication.

**References**:
- sp.specify: §User Story 1 (authentication flow)
- sp.plan: §Component Breakdown §1 (Authentication Components)
- sp.constitution: §User Experience Standards

**Acceptance Criteria**:
- [ ] Login form with email and password fields
- [ ] Form validation for email format and password length
- [ ] Error messaging for authentication failures
- [ ] Loading state during authentication
- [ ] Redirect to dashboard after successful login
- [ ] Link to signup page for new users
- [ ] Responsive design for all screen sizes

**Implementation Notes**:
- Use React Hook Form for form handling and validation
- Integrate with Better Auth client for authentication
- Show appropriate error messages from auth provider
- Implement proper loading states during submission
- Handle successful authentication with redirects
- Include "Remember me" functionality if needed

**Files to Create/Modify**:
- phase2/frontend/app/login/page.tsx
- phase2/frontend/components/auth/LoginForm.tsx

**Testing**:
```bash
# Verify login page can be imported and rendered
cd phase2/frontend
# Will test after implementation
```

**AI Agent Prompt Example**:
```
@phase2/sp.plan §Component Breakdown §1 (Authentication Components)
@sp.specify §User Story 1

Create a login page component with form validation and Better Auth
integration. Include proper error handling, loading states, and
redirection after successful authentication. Ensure responsive
design and good user experience.
```

---

## Task ID: T-027
**Title**: Create Signup Page Component
**Category**: Frontend Auth
**Priority**: High
**Estimated Time**: 1.5 hours
**Dependencies**: T-026

**Description**:
Create the signup page component with form validation, password confirmation, and integration with Better Auth for user registration.

**References**:
- sp.specify: §User Story 1 (registration flow)
- sp.plan: §Component Breakdown §1 (Authentication Components)
- sp.constitution: §User Experience Standards

**Acceptance Criteria**:
- [ ] Signup form with email, password, and password confirmation
- [ ] Form validation for email format and password strength
- [ ] Password confirmation validation
- [ ] Error messaging for registration failures
- [ ] Loading state during registration
- [ ] Redirect to dashboard after successful signup
- [ ] Link to login page for existing users

**Implementation Notes**:
- Use React Hook Form for form handling and validation
- Implement password strength requirements
- Validate password confirmation matches
- Integrate with Better Auth client for registration
- Show appropriate error messages from auth provider
- Handle successful registration with redirects

**Files to Create/Modify**:
- phase2/frontend/app/signup/page.tsx
- phase2/frontend/components/auth/SignupForm.tsx

**Testing**:
```bash
# Verify signup page can be imported and rendered
cd phase2/frontend
# Will test after implementation
```

**AI Agent Prompt Example**:
```
@phase2/sp.plan §Component Breakdown §1 (Authentication Components)
@sp.specify §User Story 1

Create a signup page component with form validation and Better Auth
integration. Include password confirmation validation, proper error
handling, loading states, and redirection after successful registration.
Ensure responsive design and good user experience.
```

---

## Task ID: T-028
**Title**: Implement Login Submission with Better Auth
**Category**: Frontend Auth
**Priority**: High
**Estimated Time**: 1 hour
**Dependencies**: T-026

**Description**:
Implement the login submission logic to connect the login form with Better Auth's authentication API and handle the response appropriately.

**References**:
- sp.constitution: §Security & Authentication
- sp.specify: §Requirements (authentication flow)
- sp.plan: §Component Breakdown §1 (Authentication Components)

**Acceptance Criteria**:
- [ ] Login form properly connects to Better Auth
- [ ] Credentials passed securely to auth provider
- [ ] Successful login redirects to dashboard
- [ ] Error handling for invalid credentials
- [ ] Loading state during authentication
- [ ] Proper JWT token handling
- [ ] Session establishment after login

**Implementation Notes**:
- Use Better Auth's signIn method for email/password
- Handle authentication response appropriately
- Store JWT token securely if needed
- Redirect to dashboard with success feedback
- Display error messages for failed attempts
- Clear form after successful submission

**Files to Create/Modify**:
- phase2/frontend/components/auth/LoginForm.tsx

**Testing**:
```bash
# Verify login submission logic works
cd phase2/frontend
# Will test after implementation
```

**AI Agent Prompt Example**:
```
@phase2/sp.plan §Component Breakdown §1 (Authentication Components)
@sp.constitution §Security & Authentication

Implement login submission logic connecting the form to Better Auth.
Handle successful authentication with proper redirects, error handling
for failed attempts, and secure JWT token management. Include proper
loading states during the authentication process.
```

---

## Task ID: T-029
**Title**: Implement Signup Submission with Better Auth
**Category**: Frontend Auth
**Priority**: High
**Estimated Time**: 1 hour
**Dependencies**: T-027

**Description**:
Implement the signup submission logic to connect the signup form with Better Auth's registration API and handle the response appropriately.

**References**:
- sp.constitution: §Security & Authentication
- sp.specify: §Requirements (registration flow)
- sp.plan: §Component Breakdown §1 (Authentication Components)

**Acceptance Criteria**:
- [ ] Signup form properly connects to Better Auth
- [ ] User credentials passed securely to auth provider
- [ ] Successful registration redirects to dashboard
- [ ] Error handling for registration failures
- [ ] Loading state during registration
- [ ] Account creation confirmed
- [ ] Session establishment after signup

**Implementation Notes**:
- Use Better Auth's signUp method for email/password
- Handle registration response appropriately
- Validate password confirmation before submission
- Redirect to dashboard after successful registration
- Display error messages for failed attempts
- Clear form after successful submission

**Files to Create/Modify**:
- phase2/frontend/components/auth/SignupForm.tsx

**Testing**:
```bash
# Verify signup submission logic works
cd phase2/frontend
# Will test after implementation
```

**AI Agent Prompt Example**:
```
@phase2/sp.plan §Component Breakdown §1 (Authentication Components)
@sp.constitution §Security & Authentication

Implement signup submission logic connecting the form to Better Auth.
Handle successful registration with proper redirects, error handling
for failed attempts, and account creation confirmation. Include proper
loading states during the registration process.
```

---

## Task ID: T-030
**Title**: Test Authentication Flow (Signup → Login → Dashboard)
**Category**: Testing
**Priority**: High
**Estimated Time**: 1 hour
**Dependencies**: T-026, T-027, T-028, T-029

**Description**:
Test the complete authentication flow from signup to login to dashboard access, ensuring all components work together seamlessly.

**References**:
- sp.plan: §Testing Strategy
- sp.specify: §User Story 1 (complete flow)
- sp.constitution: §Quality Assurance

**Acceptance Criteria**:
- [ ] New user can successfully register via signup form
- [ ] Registered user can successfully log in
- [ ] Authentication redirects work correctly
- [ ] Session is properly established after auth
- [ ] Protected routes accessible after authentication
- [ ] Error states handled appropriately
- [ ] All auth functionality works end-to-end

**Implementation Notes**:
- Test the complete user journey from registration to dashboard
- Verify JWT token handling works correctly
- Check that protected routes are properly restricted
- Validate error handling for incorrect credentials
- Ensure session persistence across page navigation
- Test both success and failure scenarios

**Files to Create/Modify**:
- phase2/frontend/tests/auth.test.tsx (or integration tests)

**Testing**:
```bash
# Manually test the complete auth flow
# Or implement automated tests
```

**AI Agent Prompt Example**:
```
@phase2/sp.plan §Testing Strategy
@sp.specify §User Story 1

Test the complete authentication flow from signup to login to dashboard
access. Verify that new users can register, log in successfully,
and access protected routes. Test both success and error scenarios
to ensure the auth flow works end-to-end.
```

---

## Task ID: T-031
**Title**: Create API Client Base Configuration
**Category**: Frontend API
**Priority**: High
**Estimated Time**: 1 hour
**Dependencies**: T-002, T-023

**Description**:
Create the base API client configuration with proper error handling, authentication headers, and base URL setup for all API calls.

**References**:
- sp.constitution: §API & Integration Standards
- sp.plan: §Component Breakdown §1 (API Client Module)
- sp.specify: §Requirements (API communication)

**Acceptance Criteria**:
- [ ] Base API client module created
- [ ] Base URL configurable via environment variable
- [ ] Authentication headers automatically included
- [ ] Proper error handling implemented
- [ ] Loading and error states managed
- [ ] Consistent request/response format
- [ ] TypeScript interfaces for API calls

**Implementation Notes**:
- Use fetch API or axios for HTTP requests
- Include JWT token in Authorization header automatically
- Handle common error scenarios (401, 403, 500, etc.)
- Implement proper TypeScript typing for requests/responses
- Create reusable request functions
- Follow REST API best practices

**Files to Create/Modify**:
- phase2/frontend/lib/api.ts

**Testing**:
```bash
# Verify API client can be imported and configured
cd phase2/frontend
# Will test after implementation
```

**AI Agent Prompt Example**:
```
@phase2/sp.plan §Component Breakdown §1 (API Client Module)
@sp.constitution §API & Integration Standards

Create the base API client configuration with proper error handling,
authentication headers, and environment-based base URL. Include
reusable request functions with proper TypeScript typing and
follow REST API best practices for consistency.
```

---

## Task ID: T-032
**Title**: Implement getTasks() API Method
**Category**: Frontend API
**Priority**: High
**Estimated Time**: 45 minutes
**Dependencies**: T-031

**Description**:
Implement the getTasks() method to retrieve all tasks for a specific user from the backend API.

**References**:
- sp.specify: §Requirements (FR-007 - view tasks)
- sp.plan: §Component Breakdown §1 (API Client Module)

**Acceptance Criteria**:
- [ ] getTasks() function created and exported
- [ ] Accepts user_id parameter
- [ ] Makes GET request to /api/{user_id}/tasks
- [ ] Authentication headers included automatically
- [ ] Returns array of Task objects
- [ ] Proper error handling for API failures
- [ ] TypeScript typing for return value

**Implementation Notes**:
- Use the base API client configuration
- Include proper error handling for API failures
- Return strongly-typed Task array
- Handle authentication token inclusion
- Follow the API endpoint specification
- Include proper error messaging

**Files to Create/Modify**:
- phase2/frontend/lib/api.ts

**Testing**:
```bash
# Verify getTasks function works
cd phase2/frontend
# Will test after implementation
```

**AI Agent Prompt Example**:
```
@phase2/sp.plan §Component Breakdown §1 (API Client Module)
@sp.specify §Requirements (FR-007)

Implement the getTasks() API method to retrieve all tasks for a user.
Include proper parameter handling, authentication headers, error
handling, and TypeScript typing for the returned Task array.
```

---

## Task ID: T-033
**Title**: Implement createTask() API Method
**Category**: Frontend API
**Priority**: High
**Estimated Time**: 45 minutes
**Dependencies**: T-031

**Description**:
Implement the createTask() method to create a new task for a specific user via the backend API.

**References**:
- sp.specify: §Requirements (FR-006 - create tasks)
- sp.plan: §Component Breakdown §1 (API Client Module)

**Acceptance Criteria**:
- [ ] createTask() function created and exported
- [ ] Accepts user_id and task data parameters
- [ ] Makes POST request to /api/{user_id}/tasks
- [ ] Authentication headers included automatically
- [ ] Returns created Task object
- [ ] Proper error handling for API failures
- [ ] TypeScript typing for parameters and return value

**Implementation Notes**:
- Use the base API client configuration
- Include proper error handling for API failures
- Accept task data with title and optional description
- Return strongly-typed Task object
- Handle authentication token inclusion
- Follow the API endpoint specification

**Files to Create/Modify**:
- phase2/frontend/lib/api.ts

**Testing**:
```bash
# Verify createTask function works
cd phase2/frontend
# Will test after implementation
```

**AI Agent Prompt Example**:
```
@phase2/sp.plan §Component Breakdown §1 (API Client Module)
@sp.specify §Requirements (FR-006)

Implement the createTask() API method to create new tasks for a user.
Include proper parameter handling, authentication headers, error
handling, and TypeScript typing for parameters and return value.
```

---

## Task ID: T-034
**Title**: Implement updateTask() and deleteTask() API Methods
**Category**: Frontend API
**Priority**: High
**Estimated Time**: 1 hour
**Dependencies**: T-031

**Description**:
Implement the updateTask() and deleteTask() methods to modify and remove tasks via the backend API.

**References**:
- sp.specify: §Requirements (FR-008, FR-009 - update/delete tasks)
- sp.plan: §Component Breakdown §1 (API Client Module)

**Acceptance Criteria**:
- [ ] updateTask() function created and exported
- [ ] deleteTask() function created and exported
- [ ] Both accept user_id and task_id parameters
- [ ] updateTask makes PUT request to /api/{user_id}/tasks/{task_id}
- [ ] deleteTask makes DELETE request to /api/{user_id}/tasks/{task_id}
- [ ] Authentication headers included automatically
- [ ] Proper error handling for API failures
- [ ] TypeScript typing for all parameters and return values

**Implementation Notes**:
- Use the base API client configuration
- Include proper error handling for API failures
- updateTask should accept partial task updates
- deleteTask should return void or success confirmation
- Handle authentication token inclusion for both methods
- Follow the API endpoint specifications

**Files to Create/Modify**:
- phase2/frontend/lib/api.ts

**Testing**:
```bash
# Verify updateTask and deleteTask functions work
cd phase2/frontend
# Will test after implementation
```

**AI Agent Prompt Example**:
```
@phase2/sp.plan §Component Breakdown §1 (API Client Module)
@sp.specify §Requirements (FR-008, FR-009)

Implement updateTask() and deleteTask() API methods for modifying
and removing tasks. Include proper parameter handling, authentication
headers, error handling, and TypeScript typing for all parameters
and return values.
```

---

## Task ID: T-035
**Title**: Implement toggleComplete() API Method and Test All Methods
**Category**: Frontend API
**Priority**: High
**Estimated Time**: 1 hour
**Dependencies**: T-031, T-032, T-033, T-034

**Description**:
Implement the toggleComplete() method and create comprehensive tests for all API client methods to ensure they work correctly.

**References**:
- sp.specify: §Requirements (FR-010 - toggle completion)
- sp.plan: §Component Breakdown §1 (API Client Module)
- sp.constitution: §Quality Assurance

**Acceptance Criteria**:
- [ ] toggleComplete() function created and exported
- [ ] Accepts user_id and task_id parameters
- [ ] Makes PATCH request to /api/{user_id}/tasks/{task_id}/complete
- [ ] Authentication headers included automatically
- [ ] Returns updated Task object
- [ ] All API methods tested for proper functionality
- [ ] Error handling verified for all methods

**Implementation Notes**:
- Use the base API client configuration
- Include proper error handling for API failures
- Return the updated Task object after toggle
- Handle authentication token inclusion
- Test all methods with mock responses
- Verify proper parameter passing and response handling

**Files to Create/Modify**:
- phase2/frontend/lib/api.ts
- phase2/frontend/tests/api.test.ts

**Testing**:
```bash
# Verify all API methods work properly
cd phase2/frontend
# Will test after implementation
```

**AI Agent Prompt Example**:
```
@phase2/sp.plan §Component Breakdown §1 (API Client Module)
@sp.specify §Requirements (FR-010)

Implement the toggleComplete() API method to toggle task completion
status. Include comprehensive testing for all API methods to verify
proper functionality, parameter handling, and error handling.
```

---

## Task ID: T-036
**Title**: Create Button Component with Variants
**Category**: Frontend UI
**Priority**: Medium
**Estimated Time**: 1 hour
**Dependencies**: T-002

**Description**:
Create a reusable Button component with different variants (primary, secondary, danger, etc.) using Tailwind CSS for styling.

**References**:
- sp.constitution: §UI/UX Standards
- sp.plan: §Component Breakdown §1 (Shared Components)
- sp.specify: §Requirements (responsive UI)

**Acceptance Criteria**:
- [ ] Button component created with TypeScript typing
- [ ] Multiple variants supported (primary, secondary, danger, etc.)
- [ ] Size variations (small, medium, large)
- [ ] Loading state with spinner
- [ ] Disabled state styling
- [ ] Proper accessibility attributes
- [ ] Responsive design for all screen sizes

**Implementation Notes**:
- Use React forwardRef for proper DOM element forwarding
- Implement variant and size props with enum-like types
- Include loading and disabled states
- Add proper aria attributes for accessibility
- Use Tailwind utility classes for styling
- Follow button best practices for UX

**Files to Create/Modify**:
- phase2/frontend/components/ui/Button.tsx

**Testing**:
```bash
# Verify Button component can be imported and used
cd phase2/frontend
# Will test after implementation
```

**AI Agent Prompt Example**:
```
@phase2/sp.plan §Component Breakdown §1 (Shared Components)
@sp.constitution §UI/UX Standards

Create a reusable Button component with multiple variants and sizes
using Tailwind CSS. Include loading and disabled states, proper
accessibility attributes, and responsive design for all screen sizes.
```

---

## Task ID: T-037
**Title**: Create Input Component with Validation States
**Category**: Frontend UI
**Priority**: Medium
**Estimated Time**: 1 hour
**Dependencies**: T-002

**Description**:
Create a reusable Input component with validation states, error messaging, and proper accessibility features.

**References**:
- sp.constitution: §UI/UX Standards
- sp.plan: §Component Breakdown §1 (Shared Components)
- sp.specify: §Requirements (form validation)

**Acceptance Criteria**:
- [ ] Input component created with TypeScript typing
- [ ] Support for different input types (text, email, password, etc.)
- [ ] Validation states (valid, invalid, warning)
- [ ] Error message display capability
- [ ] Proper label and accessibility attributes
- [ ] Responsive design for all screen sizes
- [ ] Consistent styling with Tailwind CSS

**Implementation Notes**:
- Use React forwardRef for proper DOM element forwarding
- Implement validation state props
- Include proper aria-describedby for error messages
- Support for label integration
- Use Tailwind utility classes for styling
- Follow form input best practices

**Files to Create/Modify**:
- phase2/frontend/components/ui/Input.tsx

**Testing**:
```bash
# Verify Input component can be imported and used
cd phase2/frontend
# Will test after implementation
```

**AI Agent Prompt Example**:
```
@phase2/sp.plan §Component Breakdown §1 (Shared Components)
@sp.constitution §UI/UX Standards

Create a reusable Input component with validation states and error
messaging. Include support for different input types, proper
accessibility attributes, and consistent Tailwind CSS styling.
```

---

## Task ID: T-038
**Title**: Create Modal Component with Overlay
**Category**: Frontend UI
**Priority**: Medium
**Estimated Time**: 1.5 hours
**Dependencies**: T-002

**Description**:
Create a reusable Modal component with backdrop overlay, close functionality, and proper accessibility features.

**References**:
- sp.constitution: §UI/UX Standards
- sp.plan: §Component Breakdown §1 (Shared Components)
- sp.specify: §Requirements (interactive UI elements)

**Acceptance Criteria**:
- [ ] Modal component created with TypeScript typing
- [ ] Backdrop overlay with click-to-close functionality
- [ ] Close button and ESC key support
- [ ] Proper focus management for accessibility
- [ ] Animation for opening/closing
- [ ] Responsive design for all screen sizes
- [ ] Trap focus within modal when open

**Implementation Notes**:
- Use portals to render modal outside parent DOM hierarchy
- Implement proper focus trapping for accessibility
- Handle ESC key presses for closing
- Include smooth animations for better UX
- Use Tailwind CSS for styling
- Follow modal accessibility best practices

**Files to Create/Modify**:
- phase2/frontend/components/ui/Modal.tsx

**Testing**:
```bash
# Verify Modal component can be imported and used
cd phase2/frontend
# Will test after implementation
```

**AI Agent Prompt Example**:
```
@phase2/sp.plan §Component Breakdown §1 (Shared Components)
@sp.constitution §UI/UX Standards

Create a reusable Modal component with backdrop overlay and proper
accessibility features. Include focus management, ESC key support,
click-to-close functionality, and smooth animations for better UX.
```

---

## Task ID: T-039
**Title**: Create Checkbox Component
**Category**: Frontend UI
**Priority**: Medium
**Estimated Time**: 1 hour
**Dependencies**: T-002

**Description**:
Create a reusable Checkbox component with proper styling, accessibility features, and controlled/uncontrolled implementations.

**References**:
- sp.constitution: §UI/UX Standards
- sp.plan: §Component Breakdown §1 (Shared Components)
- sp.specify: §Requirements (interactive UI elements)

**Acceptance Criteria**:
- [ ] Checkbox component created with TypeScript typing
- [ ] Controlled and uncontrolled implementations
- [ ] Proper accessibility attributes (aria-label, etc.)
- [ ] Visual states for checked, unchecked, indeterminate
- [ ] Label integration capability
- [ ] Responsive design for all screen sizes
- [ ] Consistent styling with Tailwind CSS

**Implementation Notes**:
- Use React forwardRef for proper DOM element forwarding
- Implement both controlled and uncontrolled patterns
- Include proper accessibility attributes
- Support for label integration
- Use Tailwind CSS for styling
- Follow checkbox accessibility best practices

**Files to Create/Modify**:
- phase2/frontend/components/ui/Checkbox.tsx

**Testing**:
```bash
# Verify Checkbox component can be imported and used
cd phase2/frontend
# Will test after implementation
```

**AI Agent Prompt Example**:
```
@phase2/sp.plan §Component Breakdown §1 (Shared Components)
@sp.constitution §UI/UX Standards

Create a reusable Checkbox component with proper accessibility
features and styling. Include both controlled and uncontrolled
implementations, visual states, and consistent Tailwind CSS styling.
```

---

## Task ID: T-040
**Title**: Create Spinner/Loading Component
**Category**: Frontend UI
**Priority**: Medium
**Estimated Time**: 45 minutes
**Dependencies**: T-002

**Description**:
Create a reusable Spinner component to indicate loading states throughout the application.

**References**:
- sp.constitution: §UI/UX Standards
- sp.plan: §Component Breakdown §1 (Shared Components)
- sp.specify: §Requirements (user feedback)

**Acceptance Criteria**:
- [ ] Spinner component created with TypeScript typing
- [ ] Different sizes available (small, medium, large)
- [ ] Accessible loading indication
- [ ] Smooth animation for loading state
- [ ] Responsive design for all screen sizes
- [ ] Consistent styling with Tailwind CSS
- [ ] Optional text label support

**Implementation Notes**:
- Use SVG or CSS for spinner animation
- Include proper aria attributes for accessibility
- Support different sizes for various contexts
- Use Tailwind CSS for styling
- Follow loading indicator best practices

**Files to Create/Modify**:
- phase2/frontend/components/ui/Spinner.tsx

**Testing**:
```bash
# Verify Spinner component can be imported and used
cd phase2/frontend
# Will test after implementation
```

**AI Agent Prompt Example**:
```
@phase2/sp.plan §Component Breakdown §1 (Shared Components)
@sp.constitution §UI/UX Standards

Create a reusable Spinner component for loading states. Include
different sizes, proper accessibility attributes, smooth animation,
and consistent Tailwind CSS styling.
```

---

## Task ID: T-041
**Title**: Create Navbar Component with Logout Button
**Category**: Frontend UI
**Priority**: Medium
**Estimated Time**: 1.5 hours
**Dependencies**: T-022, T-036

**Description**:
Create a navigation bar component with user information and logout functionality for authenticated users.

**References**:
- sp.constitution: §UI/UX Standards
- sp.plan: §Component Breakdown §1 (Shared Components)
- sp.specify: §Requirements (navigation and user controls)

**Acceptance Criteria**:
- [ ] Navbar component created with TypeScript typing
- [ ] User information display (email/name)
- [ ] Logout button with confirmation
- [ ] Responsive design (collapses on mobile)
- [ ] Proper accessibility attributes
- [ ] Consistent styling with Tailwind CSS
- [ ] Integration with auth state management

**Implementation Notes**:
- Use the useAuth hook to get user information
- Include logout functionality with proper confirmation
- Implement responsive behavior with hamburger menu
- Use Tailwind CSS for styling
- Follow navigation accessibility best practices
- Include proper aria attributes

**Files to Create/Modify**:
- phase2/frontend/components/ui/Navbar.tsx

**Testing**:
```bash
# Verify Navbar component can be imported and used
cd phase2/frontend
# Will test after implementation
```

**AI Agent Prompt Example**:
```
@phase2/sp.plan §Component Breakdown §1 (Shared Components)
@sp.constitution §UI/UX Standards

Create a Navbar component with user information and logout functionality.
Include responsive design, proper accessibility attributes, and
integration with the authentication state management system.
```

---

## Task ID: T-042
**Title**: Style All Shared Components with Tailwind CSS
**Category**: Frontend Styling
**Priority**: Medium
**Estimated Time**: 1 hour
**Dependencies**: T-036, T-037, T-038, T-039, T-040, T-041

**Description**:
Apply consistent Tailwind CSS styling to all shared UI components to ensure a cohesive design language across the application.

**References**:
- sp.constitution: §UI/UX Standards
- sp.plan: §Component Breakdown §1 (Shared Components)
- sp.specify: §Requirements (consistent UI)

**Acceptance Criteria**:
- [ ] All shared components styled consistently
- [ ] Color palette applied uniformly
- [ ] Typography scales applied consistently
- [ ] Spacing system followed throughout
- [ ] Responsive breakpoints respected
- [ ] Interactive states properly styled
- [ ] Dark mode support if applicable

**Implementation Notes**:
- Define color palette in tailwind.config.js
- Apply consistent spacing using Tailwind's spacing scale
- Use typography utilities for consistent text sizing
- Implement responsive design with Tailwind's breakpoints
- Include hover, focus, and active states
- Ensure accessibility contrast ratios

**Files to Create/Modify**:
- phase2/frontend/tailwind.config.js
- All component files from T-036 to T-041

**Testing**:
```bash
# Verify styling is consistent across components
cd phase2/frontend
# Will test after implementation
```

**AI Agent Prompt Example**:
```
@phase2/sp.plan §Component Breakdown §1 (Shared Components)
@sp.constitution §UI/UX Standards

Apply consistent Tailwind CSS styling to all shared components.
Ensure uniform color palette, typography, spacing, and responsive
design across all UI elements for a cohesive user experience.
```

---

## Task ID: T-043
**Title**: Create Dashboard Layout with Navbar
**Category**: Frontend Dashboard
**Priority**: High
**Estimated Time**: 1 hour
**Dependencies**: T-041

**Description**:
Create the main dashboard layout that includes the navigation bar and provides the structure for the authenticated user experience.

**References**:
- sp.plan: §Component Breakdown §1 (Dashboard Components)
- sp.specify: §User Story 2 (dashboard functionality)
- sp.constitution: §UI/UX Standards

**Acceptance Criteria**:
- [ ] Dashboard layout component created
- [ ] Navbar integrated at the top
- [ ] Main content area defined
- [ ] Responsive design implemented
- [ ] Proper authentication state integration
- [ ] Consistent styling with Tailwind CSS
- [ ] Accessibility attributes included

**Implementation Notes**:
- Use Next.js App Router layout structure
- Include the Navbar component
- Define main content area for dashboard pages
- Implement responsive behavior
- Integrate with auth context
- Use Tailwind CSS for styling

**Files to Create/Modify**:
- phase2/frontend/app/dashboard/layout.tsx

**Testing**:
```bash
# Verify dashboard layout can be imported and rendered
cd phase2/frontend
# Will test after implementation
```

**AI Agent Prompt Example**:
```
@phase2/sp.plan §Component Breakdown §1 (Dashboard Components)

Create a dashboard layout component that includes the Navbar and
defines the main content area. Implement responsive design and
integrate with the authentication state for the user dashboard.
```

---

## Task ID: T-044
**Title**: Create Dashboard Page (Server Component)
**Category**: Frontend Dashboard
**Priority**: High
**Estimated Time**: 1 hour
**Dependencies**: T-043

**Description**:
Create the main dashboard page as a Server Component that serves as the entry point for authenticated users.

**References**:
- sp.plan: §Component Breakdown §1 (Dashboard Components)
- sp.specify: §User Story 2 (dashboard functionality)
- sp.constitution: §Performance Standards

**Acceptance Criteria**:
- [ ] Dashboard page created as Server Component
- [ ] Protected route functionality implemented
- [ ] Redirects unauthenticated users to login
- [ ] Displays welcome message or user info
- [ ] Includes navigation to task management
- [ ] Proper error handling
- [ ] Optimized for initial render

**Implementation Notes**:
- Use Server Component for initial render optimization
- Implement authentication check server-side
- Redirect to login if not authenticated
- Include server-side user information
- Add navigation links to task management
- Handle potential server errors

**Files to Create/Modify**:
- phase2/frontend/app/dashboard/page.tsx

**Testing**:
```bash
# Verify dashboard page can be rendered
cd phase2/frontend
# Will test after implementation
```

**AI Agent Prompt Example**:
```
@phase2/sp.plan §Component Breakdown §1 (Dashboard Components)

Create the main dashboard page as a Server Component. Implement
protected route functionality, display user information, and provide
navigation to task management features.
```

---

## Task ID: T-045
**Title**: Add Error Boundary for Dashboard
**Category**: Frontend Dashboard
**Priority**: Medium
**Estimated Time**: 45 minutes
**Dependencies**: T-043, T-044

**Description**:
Add error boundary protection to the dashboard layout to gracefully handle JavaScript errors and prevent app crashes.

**References**:
- sp.constitution: §Reliability Standards
- sp.plan: §Component Breakdown §1 (Dashboard Components)
- sp.specify: §Requirements (error handling)

**Acceptance Criteria**:
- [ ] ErrorBoundary component created
- [ ] Dashboard layout wrapped with error boundary
- [ ] Fallback UI displayed on error
- [ ] Error logging implemented
- [ ] Proper error recovery options
- [ ] Accessibility considerations
- [ ] Consistent styling with application

**Implementation Notes**:
- Create ErrorBoundary class component
- Implement componentDidCatch lifecycle
- Design user-friendly fallback UI
- Include error reporting/logging
- Provide option to retry or navigate elsewhere
- Use Tailwind CSS for styling

**Files to Create/Modify**:
- phase2/frontend/components/ErrorBoundary.tsx
- phase2/frontend/app/dashboard/layout.tsx

**Testing**:
```bash
# Verify error boundary works properly
cd phase2/frontend
# Will test after implementation
```

**AI Agent Prompt Example**:
```
@phase2/sp.plan §Component Breakdown §1 (Dashboard Components)
@sp.constitution §Reliability Standards

Add error boundary protection to the dashboard layout. Create a
user-friendly fallback UI, implement error logging, and ensure
graceful error handling to prevent app crashes.
```

---

## Task ID: T-046
**Title**: Create TaskList Component (Client Component with State)
**Category**: Frontend Task Components
**Priority**: High
**Estimated Time**: 1.5 hours
**Dependencies**: T-023, T-032, T-042

**Description**:
Create the TaskList component as a Client Component that manages task state and displays all tasks for the current user.

**References**:
- sp.specify: §User Story 2 (task management)
- sp.plan: §Component Breakdown §1 (Dashboard Components)
- sp.constitution: §Performance Standards

**Acceptance Criteria**:
- [ ] TaskList component created as Client Component
- [ ] Fetches tasks from API using getTasks()
- [ ] Manages loading and error states
- [ ] Displays tasks in a clean, organized list
- [ ] Handles empty state (no tasks)
- [ ] Implements refresh mechanism
- [ ] Proper TypeScript typing for props and state

**Implementation Notes**:
- Use useState and useEffect for data fetching
- Implement proper loading and error states
- Handle the case when no tasks exist
- Include refresh functionality for updates
- Use the Task interface for type safety
- Follow React best practices for state management

**Files to Create/Modify**:
- phase2/frontend/app/dashboard/components/TaskList.tsx

**Testing**:
```bash
# Verify TaskList component can be imported and used
cd phase2/frontend
# Will test after implementation
```

**AI Agent Prompt Example**:
```
@phase2/sp.plan §Component Breakdown §1 (Dashboard Components)
@sp.specify: §User Story 2

Create the TaskList component as a Client Component that manages
task state and displays all tasks for the current user. Include
proper loading/error states, empty state handling, and refresh
functionality for data updates.
```

---

## Task ID: T-047
**Title**: Create TaskItem Component with Edit/Delete Actions
**Category**: Frontend Task Components
**Priority**: High
**Estimated Time**: 1.5 hours
**Dependencies**: T-046

**Description**:
Create the TaskItem component to display individual tasks with options to edit, delete, and toggle completion status.

**References**:
- sp.specify: §User Story 2 (task management)
- sp.plan: §Component Breakdown §1 (Dashboard Components)
- sp.constitution: §UI/UX Standards

**Acceptance Criteria**:
- [ ] TaskItem component created with TypeScript typing
- [ ] Displays task title, description, and status
- [ ] Edit button opens edit modal
- [ ] Delete button triggers delete confirmation
- [ ] Checkbox for completion status toggle
- [ ] Timestamps displayed for created/updated
- [ ] Visual indication of completion status

**Implementation Notes**:
- Display task information clearly and concisely
- Include visual feedback for completed tasks
- Handle edit and delete actions appropriately
- Use consistent styling with other components
- Implement proper event handling
- Follow accessibility best practices

**Files to Create/Modify**:
- phase2/frontend/components/tasks/TaskItem.tsx

**Testing**:
```bash
# Verify TaskItem component can be imported and used
cd phase2/frontend
# Will test after implementation
```

**AI Agent Prompt Example**:
```
@phase2/sp.plan §Component Breakdown §1 (Dashboard Components)
@sp.specify §User Story 2

Create the TaskItem component to display individual tasks with
edit, delete, and completion toggle functionality. Include proper
visual indication of completion status and timestamp information.
```

---

## Task ID: T-048
**Title**: Create AddTaskForm Component with Validation
**Category**: Frontend Task Components
**Priority**: High
**Estimated Time**: 1.5 hours
**Dependencies**: T-037, T-036

**Description**:
Create the AddTaskForm component with proper validation, error handling, and integration with the task creation API.

**References**:
- sp.specify: §User Story 2 (task creation)
- sp.plan: §Component Breakdown §1 (Dashboard Components)
- sp.constitution: §UI/UX Standards

**Acceptance Criteria**:
- [ ] AddTaskForm component created with TypeScript typing
- [ ] Input fields for task title and description
- [ ] Form validation for required fields
- [ ] Error messaging for validation failures
- [ ] Loading state during submission
- [ ] Success feedback after creation
- [ ] Integration with createTask() API method

**Implementation Notes**:
- Use React Hook Form for form handling
- Include validation for required title field
- Handle asynchronous submission properly
- Provide user feedback during and after submission
- Reset form after successful creation
- Include accessibility attributes

**Files to Create/Modify**:
- phase2/frontend/components/tasks/AddTaskForm.tsx

**Testing**:
```bash
# Verify AddTaskForm component can be imported and used
cd phase2/frontend
# Will test after implementation
```

**AI Agent Prompt Example**:
```
@phase2/sp.plan §Component Breakdown §1 (Dashboard Components)
@sp.specify §User Story 2

Create the AddTaskForm component with proper validation and API
integration. Include input fields, validation, error handling,
loading states, and success feedback for task creation.
```

---

## Task ID: T-049
**Title**: Create EditTaskModal Component
**Category**: Frontend Task Components
**Priority**: High
**Estimated Time**: 1.5 hours
**Dependencies**: T-038, T-048

**Description**:
Create the EditTaskModal component that allows users to modify existing tasks in a modal interface.

**References**:
- sp.specify: §User Story 2 (task modification)
- sp.plan: §Component Breakdown §1 (Dashboard Components)
- sp.constitution: §UI/UX Standards

**Acceptance Criteria**:
- [ ] EditTaskModal component created with TypeScript typing
- [ ] Pre-populates with existing task data
- [ ] Input fields for task title and description
- [ ] Form validation for required fields
- [ ] Error messaging for validation failures
- [ ] Loading state during update
- [ ] Integration with updateTask() API method

**Implementation Notes**:
- Pre-fill form with current task data
- Include validation similar to AddTaskForm
- Handle update submission properly
- Provide user feedback during and after update
- Close modal after successful update
- Include proper accessibility attributes

**Files to Create/Modify**:
- phase2/frontend/components/tasks/EditTaskModal.tsx

**Testing**:
```bash
# Verify EditTaskModal component can be imported and used
cd phase2/frontend
# Will test after implementation
```

**AI Agent Prompt Example**:
```
@phase2/sp.plan §Component Breakdown §1 (Dashboard Components)
@sp.specify §User Story 2

Create the EditTaskModal component for modifying existing tasks.
Include pre-population with existing data, form validation,
error handling, loading states, and integration with the
updateTask API method.
```

---

## Task ID: T-050
**Title**: Create DeleteConfirm Component
**Category**: Frontend Task Components
**Priority**: High
**Estimated Time**: 1 hour
**Dependencies**: T-038

**Description**:
Create the DeleteConfirm component that provides a confirmation dialog before permanently deleting a task.

**References**:
- sp.specify: §User Story 2 (task deletion)
- sp.plan: §Component Breakdown §1 (Dashboard Components)
- sp.constitution: §UI/UX Standards

**Acceptance Criteria**:
- [ ] DeleteConfirm component created with TypeScript typing
- [ ] Displays task title for confirmation
- [ ] Confirmation and cancel buttons
- [ ] Loading state during deletion
- [ ] Error handling for deletion failures
- [ ] Integration with deleteTask() API method
- [ ] Proper accessibility attributes

**Implementation Notes**:
- Display clear confirmation message with task title
- Include both confirmation and cancellation options
- Handle deletion asynchronously with loading state
- Provide appropriate error feedback
- Close modal after successful deletion
- Follow accessibility best practices

**Files to Create/Modify**:
- phase2/frontend/components/tasks/DeleteConfirmModal.tsx

**Testing**:
```bash
# Verify DeleteConfirm component can be imported and used
cd phase2/frontend
# Will test after implementation
```

**AI Agent Prompt Example**:
```
@phase2/sp.plan §Component Breakdown §1 (Dashboard Components)
@sp.specify §User Story 2

Create the DeleteConfirm component for safe task deletion.
Include clear confirmation message, action buttons,
loading states, and integration with the deleteTask API method.
```

---

## Task ID: T-051
**Title**: Implement Refresh Mechanism for TaskList After CRUD
**Category**: Frontend Task Components
**Priority**: High
**Estimated Time**: 1 hour
**Dependencies**: T-046, T-047, T-048, T-049, T-050

**Description**:
Implement a refresh mechanism that updates the TaskList component after any CRUD operation to reflect the latest state.

**References**:
- sp.constify: §User Story 2 (real-time updates)
- sp.plan: §Component Breakdown §1 (Dashboard Components)
- sp.constitution: §Performance Standards

**Acceptance Criteria**:
- [ ] TaskList accepts refresh callback prop
- [ ] CRUD operations trigger TaskList refresh
- [ ] State updates immediately after operations
- [ ] No unnecessary re-fetching of data
- [ ] Optimistic updates where appropriate
- [ ] Error handling for refresh failures
- [ ] Proper loading states during refresh

**Implementation Notes**:
- Pass refresh function to child components
- Call refresh after successful CRUD operations
- Consider optimistic updates for better UX
- Handle errors during refresh appropriately
- Minimize unnecessary data fetching
- Use React best practices for state updates

**Files to Create/Modify**:
- phase2/frontend/app/dashboard/components/TaskList.tsx
- phase2/frontend/components/tasks/TaskItem.tsx
- phase2/frontend/components/tasks/AddTaskForm.tsx
- phase2/frontend/components/tasks/EditTaskModal.tsx
- phase2/frontend/components/tasks/DeleteConfirmModal.tsx

**Testing**:
```bash
# Verify refresh mechanism works properly
cd phase2/frontend
# Will test after implementation
```

**AI Agent Prompt Example**:
```
@phase2/sp.plan §Component Breakdown §1 (Dashboard Components)
@sp.specify §User Story 2

Implement a refresh mechanism for TaskList that updates the
display after CRUD operations. Pass refresh callbacks to child
components and ensure state updates reflect the latest data
without unnecessary re-fetching.
```

---

## Task ID: T-052
**Title**: Add Loading and Error States to All Task Components
**Category**: Frontend Task Components
**Priority**: Medium
**Estimated Time**: 1 hour
**Dependencies**: T-046, T-047, T-048, T-049, T-050

**Description**:
Add comprehensive loading and error state handling to all task management components for improved user experience.

**References**:
- sp.constitution: §UI/UX Standards
- sp.plan: §Component Breakdown §1 (Dashboard Components)
- sp.specify: §Requirements (user feedback)

**Acceptance Criteria**:
- [ ] Loading states implemented in all task components
- [ ] Error states displayed for API failures
- [ ] Consistent loading indicator across components
- [ ] Meaningful error messages for users
- [ ] Retry mechanisms where appropriate
- [ ] Proper accessibility attributes
- [ ] Consistent styling with Tailwind CSS

**Implementation Notes**:
- Use the Spinner component for loading states
- Display error messages clearly and helpfully
- Implement retry functionality for failed operations
- Include proper aria attributes for accessibility
- Use Tailwind CSS for consistent styling
- Follow error handling best practices

**Files to Create/Modify**:
- phase2/frontend/app/dashboard/components/TaskList.tsx
- phase2/frontend/components/tasks/TaskItem.tsx
- phase2/frontend/components/tasks/AddTaskForm.tsx
- phase2/frontend/components/tasks/EditTaskModal.tsx
- phase2/frontend/components/tasks/DeleteConfirmModal.tsx

**Testing**:
```bash
# Verify loading and error states work properly
cd phase2/frontend
# Will test after implementation
```

**AI Agent Prompt Example**:
```
@phase2/sp.plan §Component Breakdown §1 (Dashboard Components)
@sp.constitution §UI/UX Standards

Add comprehensive loading and error states to all task components.
Include consistent loading indicators, meaningful error messages,
retry mechanisms, and proper accessibility attributes for better
user experience.
```

---

## Task ID: T-053
**Title**: Implement Responsive Design for Mobile (375px-767px)
**Category**: Frontend Styling
**Priority**: Medium
**Estimated Time**: 1.5 hours
**Dependencies**: All previous UI components

**Description**:
Implement responsive design adjustments for mobile devices (375px-767px) to ensure optimal user experience on small screens.

**References**:
- sp.constitution: §UI/UX Standards
- sp.specify: §Requirements (FR-018 - responsive UI)
- sp.plan: §Component Breakdown §1 (Frontend Components)

**Acceptance Criteria**:
- [ ] All components adapt to mobile screen sizes
- [ ] Navigation collapses to hamburger menu
- [ ] Forms adjust for smaller input areas
- [ ] Task list displays properly on mobile
- [ ] Modals adjust to mobile dimensions
- [ ] Touch targets meet accessibility standards
- [ ] No horizontal scrolling required

**Implementation Notes**:
- Use Tailwind's mobile-first approach with breakpoint modifiers
- Adjust padding and margins for smaller screens
- Implement collapsible navigation for mobile
- Optimize forms for touch interaction
- Ensure adequate touch target sizes (44px minimum)
- Test with actual mobile device sizes

**Files to Create/Modify**:
- All component files created so far
- phase2/frontend/styles/globals.css (if needed)

**Testing**:
```bash
# Verify responsive design works on mobile sizes
# Will test after implementation
```

**AI Agent Prompt Example**:
```
@phase2/sp.plan §Component Breakdown §1 (Frontend Components)
@sp.specify §Requirements (FR-018)

Implement responsive design for mobile devices (375px-767px).
Adjust navigation, forms, task lists, and modals for optimal
mobile experience with proper touch targets and no horizontal
scrolling required.
```

---

## Task ID: T-054
**Title**: Implement Responsive Design for Tablet (768px-1023px)
**Category**: Frontend Styling
**Priority**: Medium
**Estimated Time**: 1 hour
**Dependencies**: T-053

**Description**:
Implement responsive design adjustments for tablet devices (768px-1023px) to ensure optimal user experience on medium screens.

**References**:
- sp.constitution: §UI/UX Standards
- sp.specify: §Requirements (FR-018 - responsive UI)
- sp.plan: §Component Breakdown §1 (Frontend Components)

**Acceptance Criteria**:
- [ ] All components adapt to tablet screen sizes
- [ ] Layout adjusts between mobile and desktop
- [ ] Navigation behavior optimized for tablets
- [ ] Forms utilize available space effectively
- [ ] Task list displays properly on tablets
- [ ] Readability maintained on medium screens
- [ ] Touch interactions remain intuitive

**Implementation Notes**:
- Use Tailwind's md breakpoint (768px) for tablet styles
- Balance between mobile simplicity and desktop functionality
- Optimize navigation for touchscreen tablets
- Adjust grid layouts for intermediate screen sizes
- Ensure readability with appropriate font sizes
- Maintain touch-friendly interface elements

**Files to Create/Modify**:
- All component files created so far
- phase2/frontend/styles/globals.css (if needed)

**Testing**:
```bash
# Verify responsive design works on tablet sizes
# Will test after implementation
```

**AI Agent Prompt Example**:
```
@phase2/sp.plan §Component Breakdown §1 (Frontend Components)
@sp.specify §Requirements (FR-018)

Implement responsive design for tablet devices (768px-1023px).
Optimize layout, navigation, and forms for medium screen sizes
while maintaining readability and intuitive touch interactions.
```

---

## Task ID: T-055
**Title**: Implement Responsive Design for Desktop (1024px+)
**Category**: Frontend Styling
**Priority**: Medium
**Estimated Time**: 1 hour
**Dependencies**: T-053, T-054

**Description**:
Implement responsive design optimizations for desktop devices (1024px+) to ensure optimal user experience on larger screens.

**References**:
- sp.constitution: §UI/UX Standards
- sp.specify: §Requirements (FR-018 - responsive UI)
- sp.plan: §Component Breakdown §1 (Frontend Components)

**Acceptance Criteria**:
- [ ] All components adapt to desktop screen sizes
- [ ] Full navigation displayed on larger screens
- [ ] Task list utilizes wider layout effectively
- [ ] Forms take advantage of available space
- [ ] Content area maximizes usable space
- [ ] Multi-column layouts where appropriate
- [ ] Mouse interactions optimized for desktop

**Implementation Notes**:
- Use Tailwind's lg and xl breakpoints for desktop styles
- Implement full navigation menu for desktop
- Utilize wider screen real estate for better organization
- Optimize for mouse interactions vs touch
- Consider multi-column layouts for task lists
- Maximize content area while maintaining usability

**Files to Create/Modify**:
- All component files created so far
- phase2/frontend/styles/globals.css (if needed)

**Testing**:
```bash
# Verify responsive design works on desktop sizes
# Will test after implementation
```

**AI Agent Prompt Example**:
```
@phase2/sp.plan §Component Breakdown §1 (Frontend Components)
@sp.specify §Requirements (FR-018)

Implement responsive design for desktop devices (1024px+).
Optimize navigation, task lists, and forms for larger screens
while maximizing usable space and optimizing for mouse interactions.
```

---

## Task ID: T-056
**Title**: Complete TaskList Component with API Integration
**Category**: Frontend Task Components
**Priority**: High
**Estimated Time**: 1 hour
**Dependencies**: T-046

**Description**:
Complete the TaskList component by fully integrating it with the API, implementing proper error handling, and ensuring it works with the TaskItem component.

**References**:
- sp.specify: §User Story 2 (task management)
- sp.plan: §Component Breakdown §1 (Dashboard Components)
- sp.plan: §1.2 Dashboard Components (reference to the code in the original request)

**Acceptance Criteria**:
- [ ] TaskList component fully implements the code from sp.plan §1.2
- [ ] Proper API integration with error handling
- [ ] Loading and error states properly displayed
- [ ] Empty state handling implemented
- [ ] TaskItem components properly rendered
- [ ] onUpdate and onDelete callbacks working
- [ ] TypeScript typing complete and correct

**Implementation Notes**:
- Implement the exact code from sp.plan §1.2 Dashboard Components
- Use the api.getTasks function to fetch data
- Implement proper loading and error state handling
- Handle the case when no tasks exist
- Pass appropriate callbacks to TaskItem components
- Ensure proper TypeScript typing throughout

**Files to Create/Modify**:
- phase2/frontend/app/dashboard/components/TaskList.tsx

**Testing**:
```bash
# Verify TaskList component is fully functional
cd phase2/frontend
# Will test after implementation
```

**AI Agent Prompt Example**:
```
@phase2/sp.plan §Component Breakdown §1.2 Dashboard Components
[Task]: T-056

Complete the TaskList component with the exact implementation from
the plan section 1.2. Include proper API integration, loading/error
states, empty state handling, and callbacks to TaskItem components.
Ensure proper TypeScript typing and error handling.
```

---

## Task ID: T-057
**Title**: Test Complete Signup → Login → Create Task Flow
**Category**: Integration Testing
**Priority**: High
**Estimated Time**: 1.5 hours
**Dependencies**: All previous tasks

**Description**:
Test the complete user flow from signup to login to creating tasks, ensuring all components work together seamlessly.

**References**:
- sp.plan: §Testing Strategy
- sp.specify: §User Story 1, §User Story 2
- sp.constitution: §Quality Assurance

**Acceptance Criteria**:
- [ ] New user can register successfully
- [ ] Newly registered user can log in
- [ ] User redirected to dashboard after authentication
- [ ] Task creation form accessible and functional
- [ ] New tasks appear in task list immediately
- [ ] All authentication states handled properly
- [ ] Error states tested and working

**Implementation Notes**:
- Test the complete user journey from registration
- Verify JWT token handling works throughout
- Check that protected routes are properly accessible
- Validate form submissions and data persistence
- Ensure proper state management across components
- Test both success and error scenarios

**Files to Create/Modify**:
- phase2/frontend/tests/integration/auth-flow.test.ts

**Testing**:
```bash
# Manual test of complete flow or automated test
# Will implement after component completion
```

**AI Agent Prompt Example**:
```
@phase2/sp.plan §Testing Strategy
@sp.specify §User Story 1, §User Story 2

Test the complete user flow from signup to login to task creation.
Verify that new users can register, log in, access the dashboard,
and create tasks with all components working together properly.
Test both success and error scenarios.
```

---

## Task ID: T-058
**Title**: Test Update and Delete Task Flows
**Category**: Integration Testing
**Priority**: High
**Estimated Time**: 1.5 hours
**Dependencies**: T-057

**Description**:
Test the task update and delete flows to ensure users can modify and remove their tasks properly.

**References**:
- sp.plan: §Testing Strategy
- sp.specify: §User Story 2
- sp.constitution: §Quality Assurance

**Acceptance Criteria**:
- [ ] Users can edit existing tasks
- [ ] Updated tasks save properly to backend
- [ ] Updated tasks reflect in UI immediately
- [ ] Users can delete tasks
- [ ] Deleted tasks removed from UI and backend
- [ ] Confirmation dialogs work properly
- [ ] Error handling for update/delete works

**Implementation Notes**:
- Test task editing through the EditTaskModal
- Verify updates persist to the backend
- Test task deletion with confirmation
- Ensure proper error handling for failed operations
- Check that UI updates immediately after operations
- Validate that other users' tasks remain unaffected

**Files to Create/Modify**:
- phase2/frontend/tests/integration/task-operations.test.ts

**Testing**:
```bash
# Manual test of update/delete flows or automated test
# Will implement after component completion
```

**AI Agent Prompt Example**:
```
@phase2/sp.plan §Testing Strategy
@sp.specify §User Story 2

Test the task update and delete flows. Verify that users can edit
tasks through the modal interface, updates persist to the backend,
tasks can be deleted with proper confirmation, and all operations
are properly reflected in the UI with appropriate error handling.
```

---

## Task ID: T-059
**Title**: Test User Isolation with Two Different User Accounts
**Category**: Integration Testing
**Priority**: High
**Estimated Time**: 2 hours
**Dependencies**: T-057, T-058

**Description**:
Test user data isolation by creating and testing with two different user accounts to ensure each user only sees their own tasks.

**References**:
- sp.plan: §Testing Strategy
- sp.specify: §User Story 4 (data isolation)
- sp.constitution: §Security & Authentication

**Acceptance Criteria**:
- [ ] User A creates account and tasks
- [ ] User B creates separate account and tasks
- [ ] User A logs in and sees only their tasks
- [ ] User B logs in and sees only their tasks
- [ ] Neither user can access other's tasks
- [ ] API enforces user ID validation
- [ ] Frontend properly isolates user data

**Implementation Notes**:
- Create two separate user accounts with different emails
- Have each user create different sets of tasks
- Verify that each user only sees their own tasks
- Test API endpoints to ensure user ID validation
- Verify that attempting to access another user's data fails
- Check both frontend and backend enforcement of isolation

**Files to Create/Modify**:
- phase2/backend/tests/test_isolation.py
- phase2/frontend/tests/integration/user-isolation.test.ts

**Testing**:
```bash
# Manual test with two user accounts or automated test
# Will implement after component completion
```

**AI Agent Prompt Example**:
```
@phase2/sp.plan §Testing Strategy
@sp.specify §User Story 4

Test user data isolation by creating two separate user accounts
and verifying that each user can only see their own tasks. Ensure
the API enforces user ID validation and the frontend properly
isolates user data as required by the data isolation requirements.
```

---

## Task ID: T-060
**Title**: Test Token Expiration and Re-authentication
**Category**: Integration Testing
**Priority**: High
**Estimated Time**: 1.5 hours
**Dependencies**: All previous auth tasks

**Description**:
Test the token expiration handling and re-authentication flow to ensure users are properly redirected when tokens expire.

**References**:
- sp.plan: §Testing Strategy
- sp.specify: §User Story 5 (session management)
- sp.constitution: §Security & Authentication

**Acceptance Criteria**:
- [ ] Expired tokens are properly detected
- [ ] Users redirected to login page when token expires
- [ ] Error messages displayed appropriately
- [ ] Session state properly cleared on expiration
- [ ] Users can re-authenticate successfully
- [ ] API calls handle 401 responses correctly
- [ ] Frontend gracefully handles expired sessions

**Implementation Notes**:
- Simulate token expiration through testing
- Verify 401 responses are handled properly
- Test automatic redirect to login page
- Ensure session data is cleared appropriately
- Verify re-authentication flow works smoothly
- Check that UI responds gracefully to auth changes

**Files to Create/Modify**:
- phase2/backend/tests/test_auth_expiration.py
- phase2/frontend/tests/integration/session-expiration.test.ts

**Testing**:
```bash
# Manual test of token expiration or automated test
# Will implement after component completion
```

**AI Agent Prompt Example**:
```
@phase2/sp.plan §Testing Strategy
@sp.specify §User Story 5

Test token expiration handling and re-authentication flow.
Verify that expired tokens are detected, users are redirected
to login, sessions are properly cleared, and users can
successfully re-authenticate with appropriate error handling.
```

---

## Task ID: T-061
**Title**: Cross-Browser Testing (Chrome, Firefox, Safari)
**Category**: Integration Testing
**Priority**: Medium
**Estimated Time**: 2 hours
**Dependencies**: All previous tasks

**Description**:
Perform cross-browser testing to ensure the application works consistently across Chrome, Firefox, and Safari browsers.

**References**:
- sp.plan: §Testing Strategy
- sp.specify: §Requirements (FR-018 - responsive UI)
- sp.constitution: §Quality Assurance

**Acceptance Criteria**:
- [ ] Application loads correctly in Chrome
- [ ] Application loads correctly in Firefox
- [ ] Application loads correctly in Safari
- [ ] All functionality works in each browser
- [ ] Responsive design works in each browser
- [ ] Authentication works in each browser
- [ ] Task management works in each browser

**Implementation Notes**:
- Test on actual browsers, not just simulated
- Check for browser-specific CSS issues
- Verify JavaScript functionality works consistently
- Test responsive behavior on each browser
- Check form submissions and API calls
- Verify that all interactive elements work
- Document any browser-specific issues

**Files to Create/Modify**:
- phase2/testing/browser-compatibility-report.md

**Testing**:
```bash
# Manual cross-browser testing
# Test on Chrome, Firefox, Safari
```

**AI Agent Prompt Example**:
```
@phase2/sp.plan §Testing Strategy
@sp.specify §Requirements (FR-018)

Perform cross-browser testing on Chrome, Firefox, and Safari.
Verify that the application loads correctly, all functionality
works consistently, responsive design functions properly,
and authentication/task management features work in each browser.
```

---

## Task ID: T-062
**Title**: Create Comprehensive README.md with Setup Instructions
**Category**: Documentation
**Priority**: High
**Estimated Time**: 1 hour
**Dependencies**: All previous tasks

**Description**:
Create a comprehensive README.md file with detailed setup instructions, environment configuration, and project documentation.

**References**:
- sp.constitution: §Documentation Standards
- sp.specify: §Success Criteria (documentation requirements)
- sp.plan: §Next Steps After sp.plan

**Acceptance Criteria**:
- [ ] Project overview and features documented
- [ ] Prerequisites and setup instructions included
- [ ] Environment variable configuration explained
- [ ] Frontend and backend setup instructions
- [ ] Development workflow documented
- [ ] API endpoints documented
- [ ] Deployment instructions included

**Implementation Notes**:
- Include project purpose and features
- List all prerequisites (Node.js, Python, etc.)
- Document environment setup process
- Explain how to run both frontend and backend
- Include API endpoint documentation
- Describe the development workflow
- Add deployment instructions

**Files to Create/Modify**:
- phase2/README.md

**Testing**:
```bash
# Verify README is comprehensive and accurate
cat phase2/README.md
```

**AI Agent Prompt Example**:
```
@phase2/sp.plan §Next Steps After sp.plan
@sp.constitution §Documentation Standards

Create a comprehensive README.md with project overview, setup
instructions, environment configuration, API documentation,
and deployment instructions. Include all necessary information
for someone to set up and run the project successfully.
```

---

## Task ID: T-063
**Title**: Deploy Backend to Railway
**Category**: Deployment
**Priority**: High
**Estimated Time**: 1.5 hours
**Dependencies**: T-062

**Description**:
Deploy the backend FastAPI application to Railway with proper environment variables and production configuration.

**References**:
- sp.plan: §Decisions Needing Documentation §7 (Deployment Platform)
- sp.specify: §Deployment Requirements
- sp.constitution: §Deployment Standards

**Acceptance Criteria**:
- [ ] Railway account created/logged in
- [ ] Backend connected to Railway project
- [ ] Environment variables configured (DATABASE_URL, BETTER_AUTH_SECRET)
- [ ] Production build successful
- [ ] Backend accessible via Railway URL
- [ ] All API endpoints functional
- [ ] Proper error logging configured

**Implementation Notes**:
- Create Railway account if needed
- Connect backend repository to Railway
- Set environment variables securely
- Configure proper startup command
- Verify all endpoints work in production
- Set up logging for monitoring
- Test with frontend application

**Files to Create/Modify**:
- phase2/backend/Dockerfile (if needed)
- phase2/backend/railway.json (if needed)
- phase2/README.md (deployment section)

**Testing**:
```bash
# Verify backend is deployed and accessible
curl https://your-project.up.railway.app
# Should return API health check
```

**AI Agent Prompt Example**:
```
@phase2/sp.plan §Decisions Needing Documentation §7
@sp.specify §Deployment Requirements

Deploy the FastAPI backend to Railway with proper environment
variables and production configuration. Ensure all API endpoints
are functional and properly secured with logging configured.
```

---

## Task ID: T-064
**Title**: Deploy Frontend to Vercel
**Category**: Deployment
**Priority**: High
**Estimated Time**: 1.5 hours
**Dependencies**: T-063

**Description**:
Deploy the Next.js frontend to Vercel with proper environment variables and production configuration.

**References**:
- sp.plan: §Decisions Needing Documentation §7 (Deployment Platform)
- sp.specify: §Deployment Requirements
- sp.constitution: §Deployment Standards

**Acceptance Criteria**:
- [ ] Vercel account created/logged in
- [ ] Frontend connected to Vercel project
- [ ] Environment variables configured (NEXT_PUBLIC_API_URL, BETTER_AUTH_SECRET)
- [ ] Production build successful
- [ ] Frontend accessible via Vercel URL
- [ ] No build errors or warnings
- [ ] HTTPS enabled by default

**Implementation Notes**:
- Create Vercel account if needed
- Connect frontend repository to Vercel
- Set environment variables properly (NEXT_PUBLIC_ prefix)
- Ensure API URL points to Railway backend
- Verify build process completes successfully
- Test all functionality in production
- Update README with deployment URLs

**Files to Create/Modify**:
- phase2/frontend/vercel.json (if needed)
- phase2/README.md (deployment section)

**Testing**:
```bash
# Verify frontend is deployed and accessible
curl https://your-project.vercel.app
# Should return frontend application
```

**AI Agent Prompt Example**:
```
@phase2/sp.plan §Decisions Needing Documentation §7
@sp.specify §Deployment Requirements

Deploy the Next.js frontend to Vercel with proper environment
variables. Ensure NEXT_PUBLIC_API_URL points to Railway backend
and all functionality works correctly in the production environment.
```

---

## Task ID: T-065
**Title**: Configure Production Database and Test Connection
**Category**: Deployment
**Priority**: High
**Estimated Time**: 1 hour
**Dependencies**: T-063

**Description**:
Configure the production database using Neon PostgreSQL and test the connection from the deployed backend.

**References**:
- sp.plan: §Architecture Overview (Database section)
- sp.specify: §Requirements (data persistence)
- sp.constitution: §Database Standards

**Acceptance Criteria**:
- [ ] Neon PostgreSQL database created
- [ ] Database connection string configured in Railway
- [ ] SSL connection enabled for production
- [ ] Database tables created in production
- [ ] Connection pooling configured properly
- [ ] Read/write operations tested in production
- [ ] Backup and monitoring configured

**Implementation Notes**:
- Create Neon PostgreSQL database for production
- Configure connection string with SSL requirements
- Set up proper connection pooling for production traffic
- Run initial migration in production database
- Test all CRUD operations in production environment
- Configure monitoring and backup settings
- Update security settings appropriately

**Files to Create/Modify**:
- phase2/backend/production-config.md
- phase2/README.md (database section)

**Testing**:
```bash
# Verify production database connection
# Will test after deployment
```

**AI Agent Prompt Example**:
```
@phase2/sp.plan §Architecture Overview
@sp.constitution §Database Standards

Configure production Neon PostgreSQL database and connect
it to the deployed backend. Enable SSL, configure connection
pooling, create tables via migration, and test all operations
in the production environment.
```

---

## Task ID: T-066
**Title**: Record 90-Second Demo Video Showing All Features
**Category**: Documentation
**Priority**: Medium
**Estimated Time**: 1 hour
**Dependencies**: T-064, T-065

**Description**:
Record a 90-second demo video showcasing all the implemented features including authentication, task management, and responsive design.

**References**:
- sp.constitution: §Quality Assurance
- sp.specify: §Success Criteria (demonstration requirement)
- sp.plan: §Next Steps After sp.plan

**Acceptance Criteria**:
- [ ] Demo video recorded showing signup flow
- [ ] Demo shows login and dashboard access
- [ ] Demo shows task creation, update, delete
- [ ] Demo shows task completion toggle
- [ ] Demo shows responsive design on different devices
- [ ] Video is 90 seconds or less
- [ ] Video uploaded to appropriate location

**Implementation Notes**:
- Plan demo sequence to showcase all features efficiently
- Include both desktop and mobile views
- Show error handling and success states
- Narrate the key features being demonstrated
- Keep video under 90 seconds for brevity
- Upload to appropriate sharing platform
- Include video link in README

**Files to Create/Modify**:
- phase2/demo-video.mp4 (or link to hosted video)
- phase2/README.md (demo section)

**Testing**:
```bash
# Verify demo video covers all required features
# Will test after recording
```

**AI Agent Prompt Example**:
```
@sp.specify §Success Criteria
@sp.plan §Next Steps After sp.plan

Record a 90-second demo video showcasing all implemented features:
signup/login, dashboard access, task CRUD operations, completion
toggle, and responsive design. Ensure the video effectively
demonstrates the application's functionality and quality.
```

---

## Task ID: T-067
**Title**: Final Integration Testing and Bug Fixes
**Category**: Quality Assurance
**Priority**: High
**Estimated Time**: 2 hours
**Dependencies**: T-064, T-065

**Description**:
Perform final integration testing between all components and fix any remaining bugs or issues discovered during deployment.

**References**:
- sp.plan: §Testing Strategy
- sp.constitution: §Quality Assurance
- sp.specify: §Success Criteria

**Acceptance Criteria**:
- [ ] All frontend-backend communication tested
- [ ] Authentication flow tested in production
- [ ] All API endpoints tested in production
- [ ] Responsive design tested across devices
- [ ] Performance verified under load
- [ ] All identified bugs fixed
- [ ] Error handling verified in production

**Implementation Notes**:
- Test complete user flows in production environment
- Verify all API endpoints work with live data
- Check error handling and fallbacks
- Test performance and response times
- Verify data persistence and integrity
- Document any remaining issues
- Ensure all features meet requirements

**Files to Create/Modify**:
- phase2/testing/final-test-report.md
- Any files with bugs discovered during testing

**Testing**:
```bash
# Comprehensive testing of production deployment
# Will test after all components are deployed
```

**AI Agent Prompt Example**:
```
@phase2/sp.plan §Testing Strategy
@sp.constitution §Quality Assurance

Perform final integration testing of all components in the
production environment. Test complete user flows, verify API
endpoints, check responsive design, validate performance,
and fix any remaining bugs discovered during testing.
```

---

## Task ID: T-068
**Title**: Performance Optimization and Monitoring Setup
**Category**: Quality Assurance
**Priority**: Medium
**Estimated Time**: 1.5 hours
**Dependencies**: T-067

**Description**:
Optimize application performance and set up monitoring to track application health and usage.

**References**:
- sp.constitution: §Performance Standards
- sp.specify: §Success Criteria (performance requirements)
- sp.plan: §Operational Readiness

**Acceptance Criteria**:
- [ ] Frontend bundle size optimized
- [ ] Backend response times measured and optimized
- [ ] Database query performance reviewed
- [ ] Monitoring dashboard configured
- [ ] Performance metrics tracked
- [ ] Error tracking implemented
- [ ] Resource usage monitored

**Implementation Notes**:
- Analyze and reduce frontend bundle size
- Optimize database queries and indexing
- Implement caching where appropriate
- Set up application performance monitoring
- Configure error tracking and alerting
- Monitor resource usage and scaling
- Document performance benchmarks

**Files to Create/Modify**:
- phase2/performance-optimization.md
- phase2/monitoring-setup.md

**Testing**:
```bash
# Performance testing and monitoring setup
# Will implement monitoring tools
```

**AI Agent Prompt Example**:
```
@phase2/sp.plan §Operational Readiness
@sp.constitution §Performance Standards

Optimize application performance and set up monitoring.
Analyze frontend bundle size, optimize backend response
times, implement caching, set up performance monitoring,
configure error tracking, and establish resource usage
monitoring for operational readiness.
```

---

## Task ID: T-069
**Title**: Security Audit and Vulnerability Assessment
**Category**: Quality Assurance
**Priority**: High
**Estimated Time**: 2 hours
**Dependencies**: T-067

**Description**:
Conduct a security audit and vulnerability assessment to ensure the application meets security standards.

**References**:
- sp.constitution: §Security & Authentication
- sp.specify: §Requirements (security requirements)
- sp.plan: §Risk Mitigation

**Acceptance Criteria**:
- [ ] Authentication and authorization verified
- [ ] JWT token handling audited
- [ ] Input validation checked
- [ ] SQL injection prevention verified
- [ ] XSS protection implemented
- [ ] CSRF protection verified
- [ ] Security headers configured

**Implementation Notes**:
- Verify all authentication flows are secure
- Check JWT token storage and transmission
- Validate all user inputs are properly sanitized
- Ensure database queries use parameterized statements
- Verify proper escaping for XSS prevention
- Check for CSRF protection where needed
- Implement proper security headers

**Files to Create/Modify**:
- phase2/security-audit.md
- Any security-related configuration files

**Testing**:
```bash
# Security audit and vulnerability assessment
# Will perform security testing
```

**AI Agent Prompt Example**:
```
@phase2/sp.plan §Risk Mitigation
@sp.constitution §Security & Authentication

Conduct a comprehensive security audit of the application.
Verify authentication/authorization, JWT handling, input
validation, SQL injection prevention, XSS protection,
CSRF protection, and proper security headers for
production deployment.
```

---

## Task ID: T-070
**Title**: Documentation Cleanup and Final Review
**Category**: Documentation
**Priority**: Medium
**Estimated Time**: 1 hour
**Dependencies**: All previous tasks

**Description**:
Clean up all documentation, ensure consistency, and perform a final review of all project artifacts.

**References**:
- sp.constitution: §Documentation Standards
- sp.specify: §Success Criteria (documentation requirements)
- sp.plan: §Next Steps After sp.plan

**Acceptance Criteria**:
- [ ] All documentation reviewed for accuracy
- [ ] README files updated with final information
- [ ] Code comments standardized
- [ ] API documentation complete
- [ ] Environment variable documentation clear
- [ ] Deployment instructions verified
- [ ] All links and references valid

**Implementation Notes**:
- Review all documentation for accuracy and completeness
- Ensure consistent formatting and style
- Verify all code examples work correctly
- Update any outdated information
- Standardize terminology throughout
- Check all links and references
- Verify deployment instructions work end-to-end

**Files to Create/Modify**:
- All documentation files
- README.md files
- Code comments

**Testing**:
```bash
# Verify all documentation is accurate and complete
# Will review all docs for consistency
```

**AI Agent Prompt Example**:
```
@phase2/sp.plan §Next Steps After sp.plan
@sp.constitution §Documentation Standards

Perform final documentation cleanup and review.
Ensure all documentation is accurate, consistent,
complete, and follows established standards.
Verify all code examples, links, and instructions
work correctly before project completion.
```

---

## Task ID: T-071
**Title**: Final Deployment and Production Testing
**Category**: Deployment
**Priority**: High
**Estimated Time**: 1.5 hours
**Dependencies**: T-069, T-070

**Description**:
Perform final deployment to production and comprehensive testing to ensure everything works as expected in the live environment.

**References**:
- sp.constitution: §Quality Assurance
- sp.specify: §Success Criteria (production readiness)
- sp.plan: §Next Steps After sp.plan

**Acceptance Criteria**:
- [ ] Production deployment completed successfully
- [ ] All features working in production
- [ ] Performance benchmarks met in production
- [ ] Security measures verified in production
- [ ] Error handling working in production
- [ ] Monitoring showing healthy metrics
- [ ] Final user acceptance testing passed

**Implementation Notes**:
- Deploy final version to production
- Test all features end-to-end in production
- Verify performance under real-world conditions
- Confirm security measures are active
- Check monitoring and logging systems
- Perform final user acceptance testing
- Document production deployment

**Files to Create/Modify**:
- phase2/production-deployment-log.md
- phase2/final-testing-report.md

**Testing**:
```bash
# Final production testing
# Will test all features in live environment
```

**AI Agent Prompt Example**:
```
@phase2/sp.plan §Next Steps After sp.plan
@sp.constitution §Quality Assurance

Perform final production deployment and comprehensive
testing. Verify all features work in the live environment,
performance benchmarks are met, security measures are
active, and monitoring systems are properly configured.
Complete final user acceptance testing.
```

---

## Task ID: T-072
**Title**: Deploy Frontend to Vercel
**Category**: Deployment
**Priority**: High
**Estimated Time**: 2 hours
**Dependencies**: T-071

**Description**:
Deploy the Next.js frontend to Vercel with proper environment variables and production configuration.

**References**:
- sp.specify: §Deployment Requirements
- sp.plan: §Deployment Platform (Vercel)

**Acceptance Criteria**:
- [ ] Vercel account created/logged in
- [ ] phase2/frontend/ connected to Vercel project
- [ ] Environment variables configured (NEXT_PUBLIC_API_URL, BETTER_AUTH_SECRET)
- [ ] Production build successful
- [ ] Frontend accessible via Vercel URL
- [ ] No build errors or warnings
- [ ] HTTPS enabled by default

**Implementation Notes**:
- Install Vercel CLI: npm i -g vercel
- Run: vercel (in frontend/ directory)
- Set environment variables in Vercel dashboard
- NEXT_PUBLIC_API_URL should point to Railway backend URL
- Test production build locally: npm run build && npm start
- Verify deployment at https://your-app.vercel.app

**Files to Create/Modify**:
- phase2/frontend/vercel.json (optional config)
- phase2/README.md (add deployment URL)

**Testing**:
1. Visit Vercel URL
2. Test signup/login
3. Verify API calls to Railway backend
4. Check browser console for errors

**AI Agent Prompt Example**:
Manual deployment task with AI assistance for configuration.
Steps:

Install Vercel CLI: npm i -g vercel
cd phase2/frontend
Run: vercel
Follow prompts to create new project
Configure environment variables in Vercel dashboard:

NEXT_PUBLIC_API_URL=https://your-backend.up.railway.app
BETTER_AUTH_SECRET=<same-as-backend>


Deploy: vercel --prod
Test at deployment URL
Update README.md with URL

AI can generate vercel.json config if needed.

---

## Task ID: T-073
**Title**: Deploy Backend to Railway with Production Database
**Category**: Deployment
**Priority**: High
**Estimated Time**: 2 hours
**Dependencies**: T-072

**Description**:
Deploy the FastAPI backend to Railway with production database configuration and environment variables.

**References**:
- sp.specify: §Deployment Requirements
- sp.plan: §Deployment Platform (Railway)

**Acceptance Criteria**:
- [ ] Railway account created/logged in
- [ ] phase2/backend/ connected to Railway project
- [ ] Production database configured (Neon PostgreSQL)
- [ ] Environment variables configured (DATABASE_URL, BETTER_AUTH_SECRET)
- [ ] Production build successful
- [ ] Backend accessible via Railway URL
- [ ] All API endpoints functional
- [ ] Database connection verified

**Implementation Notes**:
- Connect backend repository to Railway
- Configure Neon PostgreSQL production database
- Set environment variables securely in Railway
- Verify all 6 API endpoints work in production
- Test database connection and CRUD operations
- Monitor application logs for errors
- Verify SSL/HTTPS configuration

**Files to Create/Modify**:
- phase2/backend/Dockerfile (if needed for Railway)
- phase2/README.md (add backend deployment URL)

**Testing**:
1. Verify Railway backend URL is accessible
2. Test all 6 API endpoints with proper authentication
3. Verify database CRUD operations work
4. Check application logs for errors

**AI Agent Prompt Example**:
Deploy FastAPI backend to Railway with production database:
1. Connect repository to Railway project
2. Configure Neon PostgreSQL with SSL
3. Set environment variables (DATABASE_URL, BETTER_AUTH_SECRET)
4. Deploy and verify all endpoints work
5. Test database operations
6. Update README with backend URL

---

## Task ID: T-074
**Title**: Complete End-to-End Integration Testing
**Category**: Testing
**Priority**: High
**Estimated Time**: 2 hours
**Dependencies**: T-072, T-073

**Description**:
Perform comprehensive end-to-end testing of the deployed application to ensure all components work together properly in the production environment.

**References**:
- sp.plan: §Testing Strategy
- sp.specify: §User Stories (all stories)
- sp.constitution: §Quality Assurance

**Acceptance Criteria**:
- [ ] Complete user registration flow works
- [ ] Complete user login flow works
- [ ] All 6 API endpoints accessible and functional
- [ ] Task creation, reading, updating, deletion works
- [ ] Task completion toggle works
- [ ] User data isolation verified
- [ ] Error handling works properly
- [ ] Responsive design verified on multiple devices

**Implementation Notes**:
- Test complete user journey from registration to task management
- Verify all API endpoints work with deployed backend
- Test data persistence and user isolation
- Validate error handling and edge cases
- Check responsive behavior on different screen sizes
- Verify JWT token handling end-to-end
- Document any issues found during testing

**Files to Create/Modify**:
- phase2/testing/end-to-end-test-report.md

**Testing**:
1. Register new user and verify account creation
2. Login with new account and access dashboard
3. Create, read, update, and delete tasks
4. Toggle task completion status
5. Test with multiple user accounts for isolation
6. Verify responsive behavior on mobile/tablet/desktop

**AI Agent Prompt Example**:
Perform complete end-to-end testing of deployed application:
- Test user registration and login flows
- Verify all API endpoints work with deployed backend
- Test full CRUD operations for tasks
- Verify user data isolation between accounts
- Check responsive design on different devices
- Document results and any issues found

---

## Task ID: T-075
**Title**: Final Demo Preparation and Project Wrap-up
**Category**: Documentation
**Priority**: High
**Estimated Time**: 1.5 hours
**Dependencies**: T-072, T-073, T-074

**Description**:
Prepare final demo materials, summarize the project, and complete all project wrap-up activities.

**References**:
- sp.specify: §Success Criteria
- sp.plan: §Next Steps After sp.plan
- sp.constitution: §Quality Assurance

**Acceptance Criteria**:
- [ ] Final demo video recorded showcasing all features
- [ ] Project summary document completed
- [ ] All features from user stories implemented
- [ ] Performance benchmarks met
- [ ] Security requirements satisfied
- [ ] Documentation complete and accurate
- [ ] Deployed application stable and functional

**Implementation Notes**:
- Record final demo highlighting key features
- Summarize what was accomplished vs. requirements
- Verify all user stories have been implemented
- Confirm performance and security requirements met
- Review and finalize all documentation
- Prepare project handoff materials
- Document lessons learned and next steps

**Files to Create/Modify**:
- phase2/final-demo-video.mp4
- phase2/project-summary.md
- phase2/lessons-learned.md
- Update all documentation as needed

**Testing**:
1. Verify deployed application works end-to-end
2. Confirm all user stories are implemented
3. Review documentation for completeness
4. Test demo materials work properly

**AI Agent Prompt Example**:
Prepare final demo and project wrap-up:
- Record demo video showcasing all implemented features
- Create project summary documenting accomplishments
- Verify all user stories have been implemented
- Confirm performance and security requirements met
- Complete final documentation review
- Document lessons learned and recommendations
- Prepare handoff materials for stakeholders