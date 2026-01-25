---
description: "Task list for fixing 'Module not found: Can't resolve 'next-themes'' error in Phase 2 Frontend"
---

# Tasks: Fix "Module not found: Can't resolve 'next-themes'" Error

**Input**: Design documents from `/specs/007-fix-next-themes-error/`
**Prerequisites**: plan.md (required), spec.md (required for user stories), research.md, data-model.md, quickstart.md

**Tests**: No explicit test requirements in feature specification, so tests are not included.

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

## Path Conventions

- **Web app**: `frontend/src/`, `backend/src/`
- Adjust paths based on actual project structure

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization and dependency installation

- [X] T001 Install next-themes dependency in phase2/frontend/package.json
- [X] T002 Verify next-themes installation with npm list next-themes in phase2/frontend/

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core infrastructure that MUST be complete before ANY user story can be implemented

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

- [X] T003 Update root layout with ThemeProvider wrapper at phase2/frontend/app/layout.tsx
- [X] T004 Configure Tailwind CSS for dark mode compatibility in tailwind.config.ts

**Checkpoint**: Foundation ready - user story implementation can now begin in parallel

---

## Phase 3: User Story 1 - Fix Next Themes Module Resolution Error (Priority: P1) 🎯 MVP

**Goal**: Resolve the critical build error "Module not found: Can't resolve 'next-themes'" so the application can start without errors

**Independent Test**: After the fix, running `cd phase2/frontend && npm run dev` should start the app at http://localhost:3000 with NO build errors, and the application should load successfully in the browser.

### Implementation for User Story 1

- [X] T005 [US1] Verify application builds without next-themes error after dependency installation
- [X] T006 [US1] Test that `npm run dev` starts successfully at phase2/frontend/
- [X] T007 [US1] Confirm landing page loads at http://localhost:3000 without module resolution errors

**Checkpoint**: At this point, User Story 1 should be fully functional and testable independently

---

## Phase 4: User Story 2 - Enable Dark Mode Functionality (Priority: P1)

**Goal**: Implement dark mode toggle functionality allowing users to switch between light and dark modes with sun/moon icons

**Independent Test**: The dark mode toggle (sun/moon icon) should work perfectly allowing users to switch between light mode (colourful & bright) and dark mode (deep & elegant).

### Implementation for User Story 2

- [X] T008 [US2] Create reusable ThemeToggle component at phase2/frontend/components/ui/ThemeToggle.tsx
- [X] T009 [US2] Integrate ThemeToggle into Navbar component at phase2/frontend/components/ui/Navbar.tsx
- [X] T010 [US2] Update existing DarkModeToggle component at phase2/frontend/app/dashboard/components/DarkModeToggle.tsx to use next-themes
- [X] T011 [US2] Test dark mode toggle functionality switches between light and dark modes
- [X] T012 [US2] Verify theme respects system preference when defaultTheme="system"

**Checkpoint**: At this point, User Stories 1 AND 2 should both work independently

---

## Phase 5: User Story 3 - Maintain Existing Landing Page Features (Priority: P1)

**Goal**: Ensure all existing landing page elements continue to function properly after the fix is applied

**Independent Test**: The application should still show the beautiful hero section, feature cards, navbar, and auth buttons without any disruption.

### Implementation for User Story 3

- [X] T013 [US3] Verify hero section remains visible and functional after theme changes
- [X] T014 [US3] Verify feature cards remain visible and functional after theme changes
- [X] T015 [US3] Verify navbar remains visible and functional after theme changes
- [X] T016 [US3] Verify auth buttons (signup/signin) remain visible and functional after theme changes
- [X] T017 [US3] Test that all existing landing page functionality is preserved

**Checkpoint**: All user stories should now be independently functional

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: Improvements that affect multiple user stories

- [X] T018 [P] Update package.json with next-themes dependency version
- [X] T019 [P] Verify no hydration mismatch errors occur during theme switching
- [X] T020 [P] Test responsive design works in both light and dark modes
- [X] T021 [P] Run quickstart.md validation checklist
- [X] T022 [P] Verify Tailwind dark: classes work properly with next-themes

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
- **User Story 2 (P2)**: Can start after Foundational (Phase 2) - Depends on proper ThemeProvider setup from US1
- **User Story 3 (P3)**: Can start after Foundational (Phase 2) - No dependencies on other stories

### Within Each User Story

- Core implementation before integration
- Story complete before moving to next priority

### Parallel Opportunities

- All Setup tasks marked [P] can run in parallel
- All Foundational tasks marked [P] can run in parallel (within Phase 2)
- Once Foundational phase completes, all user stories can start in parallel (if team capacity allows)
- Different user stories can be worked on in parallel by different team members

---

## Parallel Example: Dark Mode Components

```bash
# Launch all dark mode component tasks together:
Task: "Create reusable ThemeToggle component at phase2/frontend/components/ui/ThemeToggle.tsx"
Task: "Update existing DarkModeToggle component at phase2/frontend/app/dashboard/components/DarkModeToggle.tsx to use next-themes"
Task: "Integrate ThemeToggle into Navbar component at phase2/frontend/components/ui/Navbar.tsx"
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