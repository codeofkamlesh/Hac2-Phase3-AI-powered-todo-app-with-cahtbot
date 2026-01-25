---
description: "Task list for Phase II - Landing Page Implementation for Todo Evolution Project"
---

# Tasks: Phase II - Landing Page Implementation for Todo Evolution Project

**Input**: Design documents from `/specs/006-create-attractive-professional/`
**Prerequisites**: plan.md (required), spec.md (required for user stories), research.md, data-model.md, contracts/

**Tests**: The examples below include test tasks. Tests are OPTIONAL - only include them if explicitly requested in the feature specification.

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

## Path Conventions

- **Web app**: `backend/src/`, `frontend/src/`
- Adjust paths based on actual project structure

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization and basic structure

- [X] T001 Verify BETTER_AUTH_SECRET values match exactly between phase2/backend/.env and phase2/frontend/.env.local
- [X] T002 Verify BETTER_AUTH_URL is set to http://localhost:3000 in frontend env file

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core infrastructure that MUST be complete before ANY user story can be implemented

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

- [X] T003 Create Next.js API route handler directory at frontend/app/api/auth/
- [X] T004 Create Better Auth configuration file at phase2/frontend/lib/auth.ts

**Checkpoint**: Foundation ready - user story implementation can now begin in parallel

---

## Phase 3: Backend Authentication Fixes (Priority: P1) 🎯 MVP

**Goal**: Fix backend login/signup endpoints to return valid JSON responses without parse errors

**Independent Test**: Backend endpoints return valid JSON with correct status codes (200/400) for both success and failure cases

### Implementation for Backend Fixes

- [X] T005 [US1] Fix backend login endpoint at phase2/backend/routes/auth.py to accept POST with email/password and return valid JSON ({token, user}) on success with 200 status
- [X] T006 [US1] Fix backend login endpoint to return valid JSON ({error: message}) on failure with 400/401 status
- [X] T007 [US1] Fix backend signup endpoint to check for duplicates, create user with commit, generate JWT and return valid JSON without parse errors
- [X] T008 [US1] Add proper error handling for duplicate email check in signup endpoint
- [X] T009 [US1] Verify NeonDB user record creation and persistence after successful signup

**Checkpoint**: At this point, backend authentication endpoints should return valid JSON consistently

---

## Phase 4: Frontend Authentication Forms (Priority: P1)

**Goal**: Fix frontend login/signup forms to properly handle JSON responses and redirects

**Independent Test**: Frontend forms correctly send JSON, parse responses with try/catch, handle errors, and redirect appropriately

### Implementation for Frontend Forms

- [X] T010 [US2] Fix frontend login form at phase2/frontend/app/login/page.tsx to send correct JSON body and parse with try/catch
- [X] T011 [US2] Update login form to store token on success and redirect to dashboard without 404
- [X] T012 [US2] Add error handling to show "Invalid credentials" messages in login form
- [X] T013 [US2] Fix frontend signup form at phase2/frontend/app/signup/page.tsx to handle duplicate email error
- [X] T014 [US2] Update signup form to redirect to dashboard on success
- [X] T015 [US2] Add proper error boundary and loading states to login/signup pages

**Checkpoint**: At this point, frontend forms should handle authentication flows without JSON parse errors

---

## Phase 5: Dashboard Protection & Token Verification (Priority: P1)

**Goal**: Ensure dashboard route is properly protected with authentication check and token verification

**Independent Test**: Dashboard verifies token from localStorage and shows appropriate access control (Access Denied or valid content)

### Implementation for Dashboard Protection

- [X] T016 [US3] Verify dashboard route exists at phase2/frontend/app/dashboard/page.tsx and is protected with auth check
- [X] T017 [US3] Implement token verification from localStorage in dashboard component
- [X] T018 [US3] Add logic to show "Access Denied" and redirect to login if token is invalid
- [X] T019 [US3] Enhance FastAPI middleware with detailed diagnostic logs showing why tokens are rejected
- [X] T020 [US3] Update dashboard component to handle API errors gracefully with clear messaging

**Checkpoint**: At this point, dashboard access should be properly secured with token validation

---

## Phase 6: End-to-End Testing & Validation (Priority: P2)

**Goal**: Test complete authentication flow and verify all components work together

**Independent Test**: Complete signup → login → dashboard flow works without errors

### Implementation for Testing & Validation

- [X] T021 [US4] Test end-to-end: signup creates new user without duplicate error
- [X] T022 [US4] Test end-to-end: signin without JSON parse error
- [X] T023 [US4] Test end-to-end: redirect to dashboard without 404
- [X] T024 [US4] Verify tasks load properly on dashboard after authentication
- [X] T025 [US4] Run comprehensive testing to ensure 95% of user login attempts result in successful dashboard access
- [X] T026 [US4] Verify NeonDB user record creation and persistence for new accounts

**Checkpoint**: Complete authentication flow works reliably end-to-end

---

## Phase 7: Landing Page Implementation (Priority: P1)

**Goal**: Create attractive, professional, colorful landing page as entry point to Todo app with vibrant hero section and proper auth integration

**Independent Test**: Landing page loads with proper headline, gradient background, auth buttons, and responsive design working independently

### Implementation for Landing Page

- [X] T027 [US5] Create root layout with ThemeProvider wrapper at phase2/frontend/app/layout.tsx
- [X] T028 [US5] Create landing page with hero section at phase2/frontend/app/page.tsx
- [X] T029 [US5] Implement hero section component with large headline "The Evolution of Todo – Mastering Spec-Driven Development & Cloud Native AI" at phase2/frontend/components/landing/Hero.tsx
- [X] T030 [US5] Implement feature cards component with 3-4 cards highlighting Todo CRUD, JWT auth, Neon DB, AI features at phase2/frontend/components/landing/FeatureCards.tsx
- [X] T031 [US5] Create navigation bar component with logo and auth links at phase2/frontend/components/ui/Navbar.tsx
- [X] T032 [US5] Create dark mode toggle component using next-themes at phase2/frontend/components/ui/ThemeToggle.tsx
- [X] T033 [US5] Add proper styling with Tailwind CSS gradients and animations to landing page components
- [X] T034 [US5] Implement responsive design with mobile-first approach for all landing page components

**Checkpoint**: At this point, landing page should be visually engaging with proper auth integration

---

## Phase 8: Polish & Cross-Cutting Concerns

**Purpose**: Improvements that affect multiple user stories

- [X] T035 [P] Update documentation regarding authentication setup and environment variables
- [X] T036 [P] Add comprehensive error handling and logging throughout auth flow
- [X] T037 [P] Optimize API response times for auth operations (< 500ms)
- [X] T038 [P] Verify all environment variables are properly configured for production

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies - can start immediately
- **Foundational (Phase 2)**: Depends on Setup completion - BLOCKS all user stories
- **Backend Fixes (Phase 3)**: Depends on Foundational phase completion
- **Frontend Forms (Phase 4)**: Depends on Backend Fixes completion
- **Dashboard Protection (Phase 5)**: Depends on Frontend Forms completion
- **Landing Page (Phase 7)**: Depends on Foundational phase completion, can run in parallel with other user stories after foundational
- **Testing & Validation (Phase 6)**: Depends on all previous phases
- **Polish (Final Phase)**: Depends on all desired user stories being complete

### User Story Dependencies

- **Backend Fixes (US1)**: Can start after Foundational (Phase 2) - No dependencies on other stories
- **Frontend Forms (US2)**: Can start after Backend Fixes (Phase 3) - Depends on working backend endpoints
- **Dashboard Protection (US3)**: Can start after Frontend Forms (Phase 4) - Depends on working auth flow
- **Landing Page (US5)**: Can start after Foundational (Phase 2) - No dependencies on other stories
- **End-to-End Testing (US4)**: Can start after all implementation phases (Phase 5) - Depends on complete auth flow

### Within Each User Story

- Core implementation before integration
- Story complete before moving to next priority

### Parallel Opportunities

- All Setup tasks marked [P] can run in parallel
- All Foundational tasks marked [P] can run in parallel (within Phase 2)
- Within each phase, tasks that modify different files can run in parallel [P]
- Different user stories can be worked on in parallel by different team members after dependencies are met

---

## Parallel Example: Landing Page Components

```bash
# Launch all landing page component tasks together:
Task: "Create hero section component with large headline at phase2/frontend/components/landing/Hero.tsx"
Task: "Create feature cards component with 3-4 cards at phase2/frontend/components/landing/FeatureCards.tsx"
Task: "Create navigation bar component with logo and auth links at phase2/frontend/components/ui/Navbar.tsx"
Task: "Create dark mode toggle component using next-themes at phase2/frontend/components/ui/ThemeToggle.tsx"
```

---

## Implementation Strategy

### MVP First (Backend Authentication Fixes Only)

1. Complete Phase 1: Setup
2. Complete Phase 2: Foundational (CRITICAL - blocks all stories)
3. Complete Phase 3: Backend Authentication Fixes
4. **STOP and VALIDATE**: Test backend endpoints independently
5. Deploy/demo if ready

### Incremental Delivery

1. Complete Setup + Foundational → Foundation ready
2. Add Backend Authentication Fixes → Test independently → Deploy/Demo (MVP!)
3. Add Frontend Forms → Test independently → Deploy/Demo
4. Add Dashboard Protection → Test independently → Deploy/Demo
5. Add Landing Page → Test independently → Deploy/Demo
6. Add End-to-End Testing → Test independently → Deploy/Demo
7. Each story adds value without breaking previous stories

### Parallel Team Strategy

With multiple developers:

1. Team completes Setup + Foundational together
2. Once Foundational is done:
   - Developer A: Backend Authentication Fixes
   - Developer B: Frontend Forms
   - Developer C: Dashboard Protection
   - Developer D: Landing Page Implementation
3. Stories complete and integrate independently

---

## Notes

- [P] tasks = different files, no dependencies
- [Story] label maps task to specific user story for traceability
- Each user story should be independently completable and testable
- Commit after each task or logical group
- Stop at any checkpoint to validate story independently
- Many tasks depend on others - pay attention to the execution order