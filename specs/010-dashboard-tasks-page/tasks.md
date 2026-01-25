---
description: "Task list for fixing 'Module not found: Can't resolve 'next-themes'' error and completing dark mode setup in Phase 2 Frontend"
---

# Tasks: Fix "Module not found: Can't resolve 'next-themes'" Error + Complete Dark Mode Setup

**Input**: Feature specification from `/specs/009-dashboard-tasks-page/spec.md`
**Prerequisites**: plan.md (required), spec.md (required for user stories), research.md, data-model.md, quickstart.md
**Dependencies**: None

**Tests**: No explicit test requirements in feature specification, so tests are not included.

**Organization**: Tasks are organized by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description with file path`

- **[P]**: Can run in parallel (different files, no dependencies on incomplete tasks)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

## Path Conventions

- **Web app**: `frontend/src/`, `backend/src/`
- Adjust paths based on actual project structure

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization and dependency installation

- [ ] T001 Install next-themes dependency in phase2/frontend/package.json
- [ ] T002 Install lucide-react dependency in phase2/frontend/package.json
- [ ] T003 Install react-hook-form and related dependencies in phase2/frontend/package.json
- [ ] T004 Install @tanstack/react-query dependency in phase2/frontend/package.json
- [ ] T005 Install react-datepicker dependency in phase2/frontend/package.json

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core infrastructure that MUST be complete before ANY user story can be implemented

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

- [ ] T006 Update root layout with ThemeProvider wrapper at phase2/frontend/app/layout.tsx
- [ ] T007 Configure Tailwind CSS for dark mode compatibility in phase2/frontend/tailwind.config.ts
- [ ] T008 Verify suppressHydrationWarning is applied to html tag in phase2/frontend/app/layout.tsx
- [ ] T009 Create reusable ThemeToggle component at phase2/frontend/components/ui/ThemeToggle.tsx

**Checkpoint**: Foundation ready - user story implementation can now begin in parallel

---

## Phase 3: User Story 1 - Secure Access to Tasks Dashboard (Priority: P1) 🎯 MVP

**Goal**: Implement authentication protection for the /tasks route so only authenticated users can access their personal task dashboard

**Independent Test**: After the fix, running `cd phase2/frontend && npm run dev` should start the app at http://localhost:3000 with NO build errors, and the application should load successfully in the browser.

### Implementation for User Story 1

- [ ] T010 [US1] Create protected tasks page at phase2/frontend/app/tasks/page.tsx with authentication check
- [ ] T011 [US1] Implement authentication redirect logic in tasks page (unauth → /signin)
- [ ] T012 [US1] Test that `npm run dev` starts successfully at phase2/frontend/
- [ ] T013 [US1] Confirm tasks page loads at http://localhost:3000 with proper auth protection
- [ ] T014 [US1] Verify unauthenticated users are redirected to signin page

**Checkpoint**: At this point, User Story 1 should be fully functional and testable independently

---

## Phase 4: User Story 2 - View and Manage Personal Tasks (Priority: P1)

**Goal**: Implement core task management functionality allowing users to view, create, update, and delete their personal tasks with proper dark mode support

**Independent Test**: User can perform basic CRUD operations on their tasks with proper visual feedback, responsive design, and consistent theming that matches the landing page aesthetic.

### Implementation for User Story 2

- [ ] T015 [US2] Create TaskList component at phase2/frontend/components/dashboard/TaskList.tsx
- [ ] T016 [US2] Create TaskForm component at phase2/frontend/components/dashboard/TaskForm.tsx with react-hook-form
- [ ] T017 [US2] Integrate TaskList and TaskForm in tasks page at phase2/frontend/app/tasks/page.tsx
- [ ] T018 [US2] Implement basic CRUD operations (create, read, update, delete) with API calls
- [ ] T019 [US2] Add proper validation for task title (1-200 chars) and description (max 1000 chars)
- [ ] T020 [US2] Ensure all components have proper dark mode support with Tailwind dark: classes

**Checkpoint**: At this point, User Stories 1 AND 2 should both work independently

---

## Phase 5: User Story 3 - Advanced Task Management Features (Priority: P2)

**Goal**: Implement advanced features like priorities, tags, search, filtering, sorting, recurring tasks, and due date reminders

**Independent Test**: User can set priorities and tags for tasks, search and filter the task list, sort by various criteria, create recurring tasks, and receive timely reminders for due dates.

### Implementation for User Story 3

- [ ] T021 [US3] Implement priority selection in TaskForm (high/medium/low with color indicators)
- [ ] T022 [US3] Add tag functionality to TaskForm with multi-select capability
- [ ] T023 [US3] Create Filters component at phase2/frontend/components/dashboard/Filters.tsx
- [ ] T024 [US3] Implement search functionality across task titles and descriptions
- [ ] T025 [US3] Add sorting options (by due date, priority, title, creation date)
- [ ] T026 [US3] Implement recurring task patterns (daily/weekly/monthly)
- [ ] T027 [US3] Add date/time picker for due dates using react-datepicker
- [ ] T028 [US3] Implement browser notifications for approaching due dates

**Checkpoint**: All user stories should now be independently functional

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: Improvements that affect multiple user stories

- [ ] T029 [P] Update package.json with all new dependencies and versions
- [ ] T030 [P] Verify no hydration mismatch errors occur during theme switching
- [ ] T031 [P] Test responsive design works in both light and dark modes
- [ ] T032 [P] Run quickstart.md validation checklist
- [ ] T033 [P] Verify Tailwind dark: classes work properly with all components
- [ ] T034 [P] Ensure all existing landing page functionality remains intact

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies - can start immediately
- **Foundational (Phase 2)**: Depends on Setup completion - BLOCKS all user stories
- **User Stories (Phase 3+)**: All depend on Foundational phase completion
  - User stories can then proceed in parallel (if staffed)
  - Or sequentially in priority order (P1 → P2 → P3)
- **Polish (Final Phase)**: Depends on all desired user stories being complete

### User Story Dependencies

- **User Story 1 (P1)**: Can start after Foundational (Phase 2) - No dependencies on other stories
- **User Story 2 (P2)**: Can start after Foundational (Phase 2) - Depends on basic auth protection from US1
- **User Story 3 (P3)**: Can start after Foundational (Phase 2) - Depends on basic task CRUD from US2

### Within Each User Story

- Core implementation before integration
- Story complete before moving to next priority
- Each story complete before moving to next phase

### Parallel Opportunities

- All Setup tasks marked [P] can run in parallel
- All Foundational tasks marked [P] can run in parallel (within Phase 2)
- Once Foundational phase completes, all user stories can start in parallel (if team capacity allows)
- Different user stories can be worked on in parallel by different team members
- Within each user story, tasks that modify different files can run in parallel [P]

### Parallel Example: Component Creation

```bash
# Launch all component creation tasks together:
Task: "Create TaskList component at phase2/frontend/components/dashboard/TaskList.tsx"
Task: "Create TaskForm component at phase2/frontend/components/dashboard/TaskForm.tsx with react-hook-form"
Task: "Create Filters component at phase2/frontend/components/dashboard/Filters.tsx"
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1: Setup
2. Complete Phase 2: Foundational (CRITICAL - blocks all stories)
3. Complete Phase 3: User Story 1
4. **STOP and VALIDATE**: Test User Story 1 independently
5. Deploy/demo if ready

### Incremental Delivery

1. Complete Setup + Foundational → Foundation ready
2. Add User Story 1 → Test independently → Deploy/Demo (MVP!)
3. Add User Story 2 → Test independently → Deploy/Demo
4. Add User Story 3 → Test independently → Deploy/Demo
5. Each story adds value without breaking previous stories

### Parallel Team Strategy

With multiple developers:

1. Team completes Setup + Foundational together
2. Once Foundational is done:
   - Developer A: User Story 1
   - Developer B: User Story 2
   - Developer C: User Story 3
3. Stories complete and integrate independently

---

## Notes

- [P] tasks = different files, no dependencies
- [Story] label maps task to specific user story for traceability
- Each user story should be independently completable and testable
- Commit after each task or logical group
- Stop at any checkpoint to validate story independently
- Many tasks depend on others - pay attention to the execution order
- Verify application starts successfully with zero build errors before proceeding
- Test both light and dark modes work properly after each major change