# Feature Specification: Fix "Module not found: Can't resolve 'next-themes'" Error in Phase 2 Frontend

**Feature Branch**: `009-dashboard-tasks-page`
**Created**: 2026-01-24
**Status**: Draft
**Input**: User description: "Phase 2 Frontend Dashboard: Protected /tasks Page Implementation with All Features
Create: Detailed system architecture for dashboard UI (component hierarchy, data flow from API, state management), wireframes/descriptions for layout (e.g., sidebar for filters, main list, modals for add/edit), API integration plan (lib/api.ts calls with JWT), dark mode compatibility (Tailwind dark: classes on all elements), reusable component blueprints (for bonus intelligence), validation checklists for each feature level (basic/intermediate/advanced), and quality validation steps
Decisions needing documentation:
- Form library: react-hook-form for validation vs native (choose react-hook-form for efficiency with zod resolver)
- Date picker: react-datepicker vs native input (react-datepicker for better UX with time)
- State management: React Query/TanStack Query for API caching vs useState/useEffect (TanStack for async fetches, mutations)
- Notification API: Browser Notification vs toast (combine react-hot-toast for UI feedback + Notification for due reminders)
- Layout: Sidebar left for filters/search/sort + main content for list/form (responsive collapse to tabs on mobile)
- Animations: framer-motion for list fade-in/hover (keep subtle, no heavy)
- Error handling: Custom hooks for API errors (401/403 redirect to signin, toasts for others)
- Use Context7 MCP for latest 2026 patterns on Next.js App Router protected routes, react-hook-form + zod, TanStack Query with Better Auth JWT, react-datepicker dark mode integration
Testing strategy:
- After each feature group (basic/intermediate/advanced), run partial tests: mock API responses, check UI renders (e.g., add task form validates title, list filters correctly)
- Full end-to-end: npm run dev → login via /signin → redirect to /tasks → test all features (add with priority/tag/due/recurring, search/filter/sort, update/delete/complete, reminders notify); multi-user simulation (logout/login different user, no data crossover)
- Add debug logs: console.log("Fetching tasks for user_id:", userId); console.log("Task added:", newTask); console.error("API error:", error); in components (e.g., TaskList: console.log("Filtered tasks length:", filtered.length))
- Verify theme: Toggle dark mode – ensure gradients/badges/icons adapt (dark:text-white etc.); no visual glitches
- If errors (e.g., auth fail, form validation miss, reminder not firing, sort wrong), solve via spec refinement; re-run dev and test repeatedly until zero errors, all criteria met, UI attractive/professional"

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Secure Access to Tasks Dashboard (Priority: P1)

Authenticated user needs to access their personal task dashboard securely with proper authentication to view and manage their tasks without seeing other users' data.

**Why this priority**: This is a critical security requirement that prevents unauthorized access to user data. Without proper authentication, the entire multi-user system would be compromised.

**Independent Test**: After the fix, running `cd phase2/frontend && npm run dev` should start the app at http://localhost:3000 with NO build errors, and the application should load successfully in the browser.

**Acceptance Scenarios**:

1. **Given** the application is running with authentication protection, **When** visiting /tasks without being logged in, **Then** the user should be redirected to /signin
2. **Given** user is authenticated, **When** visiting /tasks, **Then** they should see their personalized dashboard with only their tasks displayed

---

### User Story 2 - View and Manage Personal Tasks (Priority: P1)

Authenticated user needs to view, create, update, and delete their personal tasks in a responsive, visually appealing interface that matches the landing page design with proper dark mode support.

**Why this priority**: This represents the core functionality of the todo application - users need to be able to manage their tasks effectively with a pleasant user experience.

**Independent Test**: User can perform basic CRUD operations on their tasks with proper visual feedback, responsive design, and consistent theming that matches the landing page aesthetic.

**Acceptance Scenarios**:

1. **Given** user is on tasks dashboard, **When** viewing the task list, **Then** they see all their tasks in responsive cards/tables with proper styling
2. **Given** user wants to add a new task, **When** filling out the task form and submitting, **Then** the task appears in the list with proper validation
3. **Given** user has tasks in the list, **When** toggling the complete checkbox, **Then** the task status updates visually with strike-through or completion badge

---

### User Story 3 - Advanced Task Management Features (Priority: P2)

Authenticated user needs to utilize advanced features like priorities, tags, search, filtering, sorting, recurring tasks, and due date reminders to enhance their productivity and task organization.

**Why this priority**: These features provide significant value beyond basic functionality, allowing users to better organize and manage their tasks according to their personal workflow preferences.

**Independent Test**: User can set priorities and tags for tasks, search and filter the task list, sort by various criteria, create recurring tasks, and receive timely reminders for due dates.

**Acceptance Scenarios**:

1. **Given** user is creating/editing a task, **When** selecting priority and tags, **Then** these are properly saved and displayed in the task list
2. **Given** user has multiple tasks, **When** using search/filter/sort functionality, **Then** the task list updates in real-time to reflect the criteria
3. **Given** user sets a recurring task or due date, **When** the condition is met, **Then** appropriate notifications are received and the task behaves as specified

---

### Edge Cases

- What happens when a user loses internet connectivity while managing tasks?
- How does the system handle users with hundreds of tasks in terms of performance?
- What occurs when browser notifications are blocked by the user?
- How does the system handle tasks with overlapping due dates or recurrence patterns?

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: System MUST verify user authentication using Better Auth sessions before granting access to /tasks route
- **FR-002**: System MUST display only tasks belonging to the authenticated user (filtered by user_id from session)
- **FR-003**: System MUST provide responsive task list view with ID, title, description, completion status, and timestamps
- **FR-004**: System MUST allow users to create new tasks with required title (1-200 chars) and optional description (max 1000 chars)
- **FR-005**: System MUST enable users to update existing tasks with proper form validation
- **FR-006**: System MUST provide secure deletion of tasks with confirmation dialog
- **FR-007**: System MUST allow users to mark tasks as complete/incomplete with visual feedback
- **FR-008**: System MUST support priority levels (high/medium/low) with color-coded indicators
- **FR-009**: System MUST support task tagging with multiple tags per task using pill-style display
- **FR-010**: System MUST provide real-time search functionality across task titles and descriptions
- **FR-011**: System MUST offer filtering options for task status, priority, and tags
- **FR-012**: System MUST allow sorting tasks by due date, priority, title, and creation date
- **FR-013**: System MUST support recurring tasks with daily/weekly/monthly patterns
- **FR-014**: System MUST provide date/time picker for task due dates
- **FR-015**: System MUST request and send browser notifications for approaching due dates
- **FR-016**: System MUST maintain consistent UI theme matching the landing page (colors, gradients, animations)
- **FR-017**: System MUST support dark/light mode with seamless transitions via next-themes
- **FR-018**: System MUST handle loading states, error messages, and success notifications gracefully
- **FR-019**: System MUST make proper API calls to backend with JWT authentication attached
- **FR-020**: System MUST be responsive and work across mobile, tablet, and desktop devices

### Key Entities *(include if feature involves data)*

- **Task**: Represents a user's task with properties including ID, title, description, completion status, priority, tags, due date, recurrence pattern, timestamps, and user association
- **User Session**: Represents the authenticated user state with JWT token and user identification for proper task isolation
- **Task Filter**: Represents the current search, filter, and sort criteria applied to the task list view

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: Unauthenticated users are redirected from /tasks to /signin with 100% success rate
- **SC-002**: Authenticated users see only their own tasks on the dashboard with 100% data isolation
- **SC-003**: Users can create tasks with titles between 1-200 characters and descriptions up to 1000 characters with 100% validation accuracy
- **SC-004**: Task CRUD operations (create, read, update, delete) complete successfully within 3 seconds each (95% of operations)
- **SC-005**: Priority and tagging features work correctly with visual indicators (red/orange/green for priorities, colored pills for tags)
- **SC-006**: Search functionality returns relevant results within 1 second for datasets up to 1000 tasks
- **SC-007**: Filtering and sorting options update the task list in real-time with no noticeable delay (under 500ms)
- **SC-008**: Recurring tasks automatically reschedule according to their pattern (daily/weekly/monthly) with 100% accuracy
- **SC-009**: Due date reminders trigger browser notifications appropriately with 95% success rate when permissions are granted
- **SC-010**: UI maintains consistent styling with the landing page including gradients, animations, and dark mode support
- **SC-011**: Page loads completely within 3 seconds and remains responsive during all user interactions
- **SC-012**: All functionality works across major browsers (Chrome, Firefox, Safari, Edge) with 95% compatibility