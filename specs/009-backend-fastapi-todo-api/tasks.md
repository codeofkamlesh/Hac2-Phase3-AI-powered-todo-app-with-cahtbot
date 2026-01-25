---
description: "Task list for fixing 'Module not found: Can't resolve 'lucide-react'' error and implementing dark mode setup"
---

# Tasks: Fix "Module not found: Can't resolve 'lucide-react'" Error + Complete Dark Mode Setup

**Input**: Feature specification from `/specs/009-backend-fastapi-todo-api/spec.md`
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

- [x] T001 Install lucide-react dependency in phase2/frontend/package.json
- [x] T002 Verify lucide-react installation with npm list lucide-react in phase2/frontend/
- [x] T003 Update package.json with next-themes dependency if not already present
- [x] T004 Install required dependencies (react-hook-form, zod, @tanstack/react-query, react-hot-toast, react-datepicker) in phase2/frontend/package.json
- [x] T005 Verify all dependencies are properly installed and listed in package-lock.json

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core infrastructure that MUST be complete before ANY user story can be implemented

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

- [x] T006 Update root layout with ThemeProvider wrapper at phase2/frontend/app/layout.tsx
- [x] T007 Configure Tailwind CSS for dark mode compatibility in phase2/frontend/tailwind.config.ts
- [x] T008 Add suppressHydrationWarning to <html> tag in phase2/frontend/app/layout.tsx to prevent hydration mismatches
- [x] T009 Create reusable ThemeToggle component at phase2/frontend/components/ui/ThemeToggle.tsx
- [x] T010 Update Navbar component to include ThemeToggle at phase2/frontend/components/ui/Navbar.tsx

**Checkpoint**: Foundation ready - user story implementation can now begin in parallel

---

## Phase 3: User Story 1 - Fix Lucide-React Module Resolution Error (Priority: P1) 🎯 MVP

**Goal**: Resolve the critical build error "Module not found: Can't resolve 'lucide-react'" so the application can start without errors

**Independent Test**: After the fix, running `cd phase2/frontend && npm run dev` should start the app at http://localhost:3000 with NO build errors, and the application should load successfully in the browser with all icons displaying properly in feature cards.

### Implementation for User Story 1

- [x] T011 [US1] Import lucide-react icons (List, Shield, Database, Bot, Lock, Zap) in phase2/frontend/components/landing/FeatureCards.tsx
- [x] T012 [US1] Update FeatureCards component to use lucide-react icon components instead of current implementation
- [x] T013 [US1] Test that `npm run dev` starts successfully at phase2/frontend/
- [x] T014 [US1] Confirm landing page loads at http://localhost:3000 without module resolution errors
- [x] T015 [US1] Verify all feature card icons render correctly without broken image placeholders

**Checkpoint**: At this point, User Story 1 should be fully functional and testable independently

---

## Phase 4: User Story 2 - Enable Feature Card Icons with Dark Mode Compatibility (Priority: P1)

**Goal**: Implement feature card icons with proper dark mode support so users can see all feature icons (List, Shield, Database, Bot, Lock, Zap) displayed correctly with theme-adaptive styling

**Independent Test**: Feature cards show proper icons (e.g., List for basic CRUD, Shield for security, Database for Neon, Bot for AI teaser, etc.) with icons adapting properly between light and dark modes.

### Implementation for User Story 2

- [x] T016 [US2] Apply Tailwind dark: classes to feature card icons in phase2/frontend/components/landing/FeatureCards.tsx
- [x] T017 [US2] Test dark mode toggle functionality switches between light and dark modes with proper icon adaptation
- [x] T018 [US2] Verify icons maintain proper appearance in both light and dark themes
- [x] T019 [US2] Update feature card styling to use gradient backgrounds that work well in both themes
- [x] T020 [US2] Test responsive design works properly in both light and dark modes

**Checkpoint**: At this point, User Stories 1 AND 2 should both work independently

---

## Phase 5: User Story 3 - Maintain Existing Functionality (Priority: P1)

**Goal**: Ensure all existing landing page elements continue to function properly after the fix is applied

**Independent Test**: All existing features continue to work as before - dark mode toggle still works perfectly, responsive design is maintained, and no new errors appear in the console.

### Implementation for User Story 3

- [x] T021 [US3] Verify hero section remains visible and functional after theme changes
- [x] T022 [US3] Verify feature cards remain visible and functional after theme changes
- [x] T023 [US3] Verify navbar remains visible and functional after theme changes
- [x] T024 [US3] Verify auth buttons (signup/signin) remain visible and functional after theme changes
- [x] T025 [US3] Test that all existing landing page functionality is preserved after lucide-react integration

**Checkpoint**: All user stories should now be independently functional

---

## Phase 6: User Story 4 - Create Protected Tasks Dashboard (Priority: P1)

**Goal**: Implement the protected tasks dashboard page at /tasks that requires authentication and displays user-specific tasks

**Independent Test**: Authenticated users can access the tasks dashboard at /tasks and see only their own tasks, while unauthenticated users are redirected to /signin.

### Implementation for User Story 4

- [x] T026 [US4] Create protected tasks page at phase2/frontend/app/tasks/page.tsx with authentication check
- [x] T027 [US4] Implement authentication redirect logic in tasks page (unauth → /signin)
- [x] T028 [US4] Add proper session checking using Better Auth hooks in tasks page
- [x] T029 [US4] Create TaskList component at phase2/frontend/components/dashboard/TaskList.tsx
- [x] T030 [US4] Create TaskForm component at phase2/frontend/components/dashboard/TaskForm.tsx

**Checkpoint**: At this point, the protected tasks dashboard should work independently

---

## Phase 7: User Story 5 - Complete Task Management Features (Priority: P2)

**Goal**: Implement all basic, intermediate, and advanced task management features with proper dark mode support

**Independent Test**: Users can create, read, update, delete, and mark tasks as complete with all features (priorities, tags, search, filter, sort, recurring tasks, due dates) working properly.

### Implementation for User Story 5

- [x] T031 [US5] Implement basic CRUD operations in TaskList and TaskForm components
- [x] T032 [US5] Add priority selection (high/medium/low) with color coding in TaskForm
- [x] T033 [US5] Implement tag functionality with multi-select in TaskForm
- [x] T034 [US5] Add search functionality for task titles/descriptions in TaskList
- [x] T035 [US5] Implement filtering options (status, priority, tags) in TaskList
- [x] T036 [US5] Add sorting functionality (by due date, priority, title) in TaskList
- [x] T037 [US5] Implement recurring task patterns (daily/weekly/monthly) in TaskForm
- [x] T038 [US5] Add date/time picker for due dates using react-datepicker in TaskForm

**Checkpoint**: At this point, all task management features should work independently

---

## Phase 8: Polish & Cross-Cutting Concerns

**Purpose**: Improvements that affect multiple user stories

- [x] T039 [P] Update package.json with all new dependencies and proper versions
- [x] T040 [P] Verify no hydration mismatch errors occur during theme switching
- [x] T041 [P] Test responsive design works in both light and dark modes
- [x] T042 [P] Run quickstart.md validation checklist
- [x] T043 [P] Verify Tailwind dark: classes work properly with all components
- [x] T044 [P] Ensure all existing functionality (landing, auth pages) remains intact
- [x] T045 [P] Add proper error handling and user feedback throughout the application
- [x] T046 [P] Verify the application starts successfully with zero build errors

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
- **User Story 2 (P2)**: Can start after Foundational (Phase 2) - Depends on icon implementation from US1
- **User Story 3 (P3)**: Can start after Foundational (Phase 2) - No dependencies on other stories
- **User Story 4 (P4)**: Can start after Foundational (Phase 2) - Depends on authentication setup
- **User Story 5 (P5)**: Can start after US4 (Phase 6) - Depends on basic task components from US4

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

### Parallel Example: Task Components

```bash
# Launch all task component tasks together:
Task: "Create TaskList component at phase2/frontend/components/dashboard/TaskList.tsx"
Task: "Create TaskForm component at phase2/frontend/components/dashboard/TaskForm.tsx"
Task: "Create Filter component at phase2/frontend/components/dashboard/Filters.tsx"
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
5. Add User Story 4 → Test independently → Deploy/Demo
6. Add User Story 5 → Test independently → Deploy/Demo
7. Each story adds value without breaking previous stories

### Parallel Team Strategy

With multiple developers:

1. Team completes Setup + Foundational together
2. Once Foundational is done:
   - Developer A: User Story 1
   - Developer B: User Story 2
   - Developer C: User Story 3
   - Developer D: User Story 4
   - Developer E: User Story 5
3. Stories complete and integrate independently

---

## Notes

- [P] tasks = different files, no dependencies
- [Story] label maps task to specific user story for traceability
- Each user story should be independently completable and testable
- Commit after each task or logical group
- Stop at any checkpoint to validate story independently
- Many tasks depend on others - pay attention to the execution order
- Verify all icons render properly in both light and dark modes
- Ensure authentication protection works correctly for all task endpoints