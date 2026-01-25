# Feature Specification: Fix "Module not found: Can't resolve 'lucide-react'" Error

**Feature Branch**: `009-backend-fastapi-todo-api`
**Created**: 2026-01-24
**Status**: Draft
**Input**: User description: "Fix "Module not found: Can't resolve 'next-themes'" in Phase 2 Frontend + Complete Dark Mode Setup
Create: Step-by-step fix plan including dependency installation, correct import verification, icon component usage, Tailwind dark mode styling for icons, error prevention checklist, and full post-fix verification; include reusable icon wrapper pattern for bonus reusable intelligence if applicable later
Decisions needing documentation:
- Package manager: Match project's existing (npm / pnpm / yarn); install next-themes@latest (or stable version like 0.263.1 if version-specific errors occur in Next.js 14/15/16 App Router)
- Import syntax: Use named imports e.g., import { List, Shield, Database, Bot, Lock, Zap } from 'lucide-react'; confirm exact path 'lucide-react' (case-sensitive, no /dist or variants)
- Icon props: Support size, color, strokeWidth; add className for Tailwind (e.g., dark:stroke-white dark:fill-none)
- Dark mode integration: Ensure icons adapt (e.g., stroke color via currentColor or Tailwind classes) using next-themes context; no flash/hydration issues
- Error prevention: Verify node_modules install succeeds; check for Next.js 15+ turbopack/compatibility quirks (if any); use Context7 MCP for latest lucide-react + Next.js App Router patterns (2026 best practices, including any hydration-safe dynamic imports if needed)
Testing strategy:
- After each step, simulate: npm install → npm run dev
- Full test: Open http://localhost:3000 → verify FeatureCards icons render visibly (no broken images/placeholders) with correct sizes/colors → toggle dark mode (icons should adapt smoothly without errors) → console should log no module/import errors
- Add debug logs: In FeatureCards.tsx → console.log("Lucide icons imported successfully:", { List, Shield, ... }); console.log("Rendering features with theme:", themeFromNextThemes); in page.tsx → console.log("Landing page loaded, icons status: OK")
- Responsiveness: Test on mobile/desktop views; hover effects on cards should work
- If any error persists (still can't resolve, hydration mismatch, icons not visible, Tailwind dark: not applying), solve immediately by refining (e.g., version pin, dynamic import fallback); re-run npm run dev and test repeatedly until zero errors, all icons perfect, dark/light modes beautiful, and landing page fully attractive/joyful
Technical details:
- Install: Add "lucide-react" to dependencies in /phase2/frontend/package.json
- Component update: Ensure FeatureCards.tsx uses icons correctly in JSX (e.g., <List className="w-10 h-10 text-indigo-600 dark:text-indigo-400" />)
- Reference previous specs: @specs/features/landing-page.md for feature card design; @specs/fixes/next-themes-module-error.md for dark mode context; ensure no conflicts
- Use Context7 MCP server to pull latest docs on lucide-react (v0.4xx+) with Next.js 16+ App Router (import patterns, common "can't resolve" fixes like node_modules cleanup or version pinning)
- Keep all changes strictly in /phase2/frontend (no backend touch, no other phases)
- Bonus alignment: Design a reusable <Icon name="List" className="..." /> component wrapper for future subagent reuse"

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Secure Todo Management API (Priority: P1)

Authenticated user needs to manage their personal todo tasks through a secure API that prevents access to other users' data, ensuring privacy and security while providing full CRUD functionality for their own tasks.

**Why this priority**: This is the foundational requirement for a multi-user todo application. Without proper authentication and user isolation, the entire system would be compromised and unusable in a production environment.

**Independent Test**: User can perform basic CRUD operations (create, read, update, delete) on their own tasks while being prevented from accessing other users' tasks, with all operations protected by JWT authentication and returning appropriate HTTP status codes.

**Acceptance Scenarios**:

1. **Given** user is authenticated with valid JWT token, **When** making API calls to /api/{user_id}/tasks endpoints, **Then** the system should allow access only to tasks belonging to the authenticated user_id
2. **Given** user attempts to access tasks of another user, **When** providing mismatched user_id in URL vs token, **Then** the system should return 403 Forbidden error
3. **Given** user makes request without valid JWT token, **When** calling any protected endpoint, **Then** the system should return 401 Unauthorized error

---

### User Story 2 - Complete Todo Feature Set (Priority: P1)

Authenticated user needs to utilize all todo management capabilities including basic CRUD operations, task completion toggling, priorities, tags, search/filter/sort functionality, due dates, and recurring task scheduling to organize their productivity effectively.

**Why this priority**: This encompasses the complete feature set that users expect from a modern todo application, providing comprehensive task management capabilities.

**Independent Test**: User can create tasks with titles, descriptions, priorities, tags, due dates, and recurring intervals; view, update, and delete their tasks; toggle completion status; search, filter, and sort their task list based on various criteria.

**Acceptance Scenarios**:

1. **Given** user wants to create a task, **When** sending POST request to /api/{user_id}/tasks with title/description/priority/tags/due_date/recurring_interval, **Then** the task should be created with auto-assigned user_id and timestamps
2. **Given** user has multiple tasks, **When** making GET request to /api/{user_id}/tasks with search/filter/sort parameters, **Then** the system should return filtered/sorted results based on criteria
3. **Given** user wants to toggle task completion, **When** making PATCH request to /api/{user_id}/tasks/{id}/complete, **Then** the task's completed status should toggle and recurring tasks should be rescheduled if completed

---

### User Story 3 - Reliable Data Persistence & Retrieval (Priority: P2)

Authenticated user needs their todo tasks to be reliably stored in a database and retrieved consistently with proper indexing and performance characteristics to ensure smooth application operation.

**Why this priority**: Data persistence is critical for a todo application - users need to trust that their tasks are safely stored and accessible when needed.

**Independent Test**: Tasks are properly stored in Neon PostgreSQL database with appropriate indexing, relationships, and constraints; API endpoints efficiently retrieve tasks with acceptable response times even with large task volumes.

**Acceptance Scenarios**:

1. **Given** user creates a task, **When** API processes the request, **Then** the task should be stored in Neon DB with proper foreign key relationship to user
2. **Given** user has many tasks, **When** retrieving task lists, **Then** API should return results efficiently with proper indexing on user_id, completed, priority, and due_date fields
3. **Given** database connection is established, **When** performing CRUD operations, **Then** all operations should complete with proper transaction handling and error recovery

---

### Edge Cases

- What happens when a user attempts to access the API with an expired JWT token?
- How does the system handle database connection failures during API operations?
- What occurs when a recurring task's interval calculation results in invalid dates?
- How does the system handle extremely large tag arrays or very long task descriptions?

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: System MUST authenticate all API requests using JWT tokens verified with BETTER_AUTH_SECRET
- **FR-002**: System MUST ensure user isolation by matching authenticated user_id with URL user_id and filtering all queries to user-owned tasks only
- **FR-003**: System MUST provide CRUD endpoints for tasks: POST /api/{user_id}/tasks, GET /api/{user_id}/tasks, GET /api/{user_id}/tasks/{id}, PUT /api/{user_id}/tasks/{id}, DELETE /api/{user_id}/tasks/{id}
- **FR-004**: System MUST support task completion toggling via PATCH /api/{user_id}/tasks/{id}/complete endpoint
- **FR-005**: System MUST support task priorities with high/medium/low enumeration values
- **FR-006**: System MUST support task tags as arrays of strings with proper validation
- **FR-007**: System MUST provide search functionality to find tasks by keyword in title/description
- **FR-008**: System MUST provide filtering functionality for status/priority/tags/date ranges
- **FR-009**: System MUST provide sorting functionality for due_date/priority/title in ascending/descending order
- **FR-010**: System MUST support recurring tasks with configurable intervals (daily/weekly/monthly) that auto-reschedule when completed
- **FR-011**: System MUST support due dates for tasks with proper datetime handling
- **FR-012**: System MUST return appropriate HTTP status codes (200/201/204 for success, 401/403 for auth issues, 404 for not found, 500 for server errors)
- **FR-013**: System MUST return JSON responses using standardized data models
- **FR-014**: System MUST store all data in Neon PostgreSQL database using SQLModel
- **FR-015**: System MUST create proper database indexes on user_id, completed, priority, and due_date fields for performance

### Key Entities *(include if feature involves data)*

- **Task**: Represents a user's todo item with properties including ID, title, description, completion status, priority level, tags array, due date, recurring interval, timestamps, and user association
- **User**: Represents an authenticated user with properties including ID, email, name, and creation timestamp that connects to Better Auth system
- **Authentication Token**: Represents the JWT used for securing API access with user_id extraction and validity verification

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: All API endpoints return appropriate responses with 99% success rate under normal load conditions
- **SC-002**: User isolation is maintained with 100% accuracy - users cannot access other users' tasks
- **SC-003**: Task CRUD operations complete within 500ms average response time for standard payloads
- **SC-004**: Authentication and authorization checks return 401/403 errors appropriately with 100% accuracy
- **SC-005**: Search, filter, and sort functionality returns results within 1 second for up to 10,000 tasks
- **SC-006**: Database queries utilize proper indexing resulting in sub-500ms response times for common operations
- **SC-007**: Recurring task scheduling works correctly with 99% accuracy for all interval types (daily/weekly/monthly)
- **SC-008**: API integrates seamlessly with frontend components achieving 95% task operation success rate
- **SC-009**: System handles 1000+ concurrent users without data crossover or authentication failures
- **SC-010**: All error scenarios return appropriate error messages with helpful guidance to users