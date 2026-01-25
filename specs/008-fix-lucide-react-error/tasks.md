# Tasks: Fix "Module not found: Can't resolve 'lucide-react'" Error

**Input**: Feature specification from `/specs/008-fix-lucide-react-error/spec.md`
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

- [X] T001 Install lucide-react dependency in phase2/frontend/package.json
- [X] T002 Verify lucide-react installation with npm list lucide-react in phase2/frontend/
- [X] T003 Update package.json with next-themes dependency if not already present

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core infrastructure that MUST be complete before ANY user story can be implemented

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

- [X] T004 Verify ThemeProvider is properly configured in phase2/frontend/app/layout.tsx with attribute="class" and enableSystem
- [X] T005 Add suppressHydrationWarning to <html> tag in phase2/frontend/app/layout.tsx to prevent hydration mismatches
- [X] T006 Ensure Tailwind config has darkMode: 'class' in phase2/frontend/tailwind.config.ts

**Checkpoint**: Foundation ready - user story implementation can now begin in parallel

---

## Phase 3: User Story 1 - Fix Lucide-React Module Resolution Error (Priority: P1) 🎯 MVP

**Goal**: Resolve the critical build error "Module not found: Can't resolve 'lucide-react'" so the application can start without errors

**Independent Test**: After the fix, running `cd phase2/frontend && npm run dev` should start the app at http://localhost:3000 with NO build errors, and the application should load successfully in the browser with all icons displaying properly in feature cards.

### Implementation for User Story 1

- [X] T007 [US1] Import lucide-react icons (List, Shield, Database, Bot, Lock, Zap) in phase2/frontend/components/landing/FeatureCards.tsx
- [X] T008 [US1] Update FeatureCards component to use lucide-react icon components instead of current implementation
- [X] T009 [US1] Test that `npm run dev` starts successfully at phase2/frontend/
- [X] T010 [US1] Confirm landing page loads at http://localhost:3000 without module resolution errors
- [X] T011 [US1] Verify all feature card icons render correctly without broken image placeholders

**Checkpoint**: At this point, User Story 1 should be fully functional and testable independently

---

## Phase 4: User Story 2 - Enable Feature Card Icons with Dark Mode Compatibility (Priority: P1)

**Goal**: Implement feature card icons with proper dark mode support so users can see all feature icons (List, Shield, Database, Bot, Lock, Zap) displayed correctly with theme-adaptive styling

**Independent Test**: Feature cards show proper icons (e.g., List for basic CRUD, Shield for security, Database for Neon, Bot for AI teaser, etc.) with icons adapting properly between light and dark modes.

### Implementation for User Story 2

- [X] T012 [US2] Apply Tailwind dark: classes to feature card icons in phase2/frontend/components/landing/FeatureCards.tsx
- [X] T013 [US2] Test dark mode toggle functionality switches between light and dark modes with proper icon adaptation
- [X] T014 [US2] Verify icons maintain proper appearance in both light and dark themes
- [X] T015 [US2] Update feature card styling to use gradient backgrounds that work well in both themes
- [X] T016 [US2] Test responsive design works properly in both light and dark modes

**Checkpoint**: At this point, User Stories 1 AND 2 should both work independently

---

## Phase 5: User Story 3 - Maintain Existing Functionality (Priority: P1)

**Goal**: Ensure all existing landing page elements continue to function properly after the fix is applied

**Independent Test**: All existing features continue to work as before - dark mode toggle still works perfectly, responsive design is maintained, and no new errors appear in the console.

### Implementation for User Story 3

- [X] T017 [US3] Verify hero section remains visible and functional after theme changes
- [X] T018 [US3] Verify feature cards remain visible and functional after theme changes
- [X] T019 [US3] Verify navbar remains visible and functional after theme changes
- [X] T020 [US3] Verify auth buttons (signup/signin) remain visible and functional after theme changes
- [X] T021 [US3] Test that all existing landing page functionality is preserved after lucide-react integration

**Checkpoint**: All user stories should now be independently functional

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: Improvements that affect multiple user stories

- [X] T022 [P] Add reusable Icon component wrapper at phase2/frontend/components/ui/Icon.tsx for future subagent reuse
- [X] T023 [P] Verify no hydration mismatch errors occur during theme switching
- [X] T024 [P] Run quickstart.md validation checklist to ensure all quality criteria met
- [X] T025 [P] Verify Tailwind dark: classes work properly with lucide-react icons
- [X] T026 [P] Test application startup with zero build errors and verify all functionality

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
- **User Story 2 (P2)**: Can start after Foundational (Phase 2) - Depends on proper icon integration from US1
- **User Story 3 (P3)**: Can start after Foundational (Phase 2) - No dependencies on other stories

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

### Parallel Example: Icon Implementation

```bash
# Launch all icon implementation tasks together:
Task: "Import lucide-react icons in phase2/frontend/components/landing/FeatureCards.tsx"
Task: "Update feature card styling with dark mode compatibility in phase2/frontend/components/landing/FeatureCards.tsx"
Task: "Create reusable Icon component wrapper at phase2/frontend/components/ui/Icon.tsx"
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