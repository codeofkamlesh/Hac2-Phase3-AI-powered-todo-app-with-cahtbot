# Tasks: Fix Neon DB Table Creation, User Signup, and Task Fetch Errors

## Phase 1: Setup and Environment

### Task 1.1: Project Structure and Dependencies
- [ ] T001 Set up project structure in phase2/frontend according to implementation plan
- [ ] T002 [P] Install required dependencies (react-datepicker, @radix-ui/react components, lucide-react)
- [ ] T003 [P] Configure TypeScript with proper types for enhanced task fields
- [ ] T004 [P] Set up Tailwind CSS configuration with required color palette
- [ ] T005 Verify existing API client integration in lib/api.ts

### Task 1.2: Type Definitions and API Extensions
- [ ] T006 Create TypeScript types for enhanced task model in lib/types.ts
- [ ] T007 [P] Extend existing API client in lib/api.ts to handle new task fields
- [ ] T008 [P] Update task interfaces with priority, tags, due_date, recurring, recurrence_pattern fields

## Phase 2: Foundational Components

### Task 2.1: Enhanced Task Data Model
- [ ] T009 Update task model in frontend to include priority field ('high' | 'medium' | 'low')
- [ ] T010 [P] Add tags array field to task model
- [ ] T011 [P] Add due_date field to task model
- [ ] T012 [P] Add recurring and recurrence_pattern fields to task model
- [ ] T013 [P] Create validation functions for new task fields

### Task 2.2: Reusable UI Components Foundation
- [ ] T014 Create PriorityBadge component with color coding (high=#ef4444, medium=#f59e0b, low=#3b82f6)
- [ ] T015 [P] Create TagChips component for displaying and editing tags
- [ ] T016 [P] Create basic DatePicker component with Tailwind styling
- [ ] T017 [P] Create DarkModeToggle component using localStorage persistence

## Phase 3: [US1] Assign Task Priorities and Categories (Priority: P1)

### Task 3.1: Priority and Category UI Components
- [ ] T018 [US1] Implement PriorityBadge component with visual indicators
- [ ] T019 [US1] [P] Implement TagChips component with add/remove functionality
- [ ] T020 [US1] [P] Update TaskCard component to display priority badges
- [ ] T021 [US1] [P] Update TaskCard component to display tag chips
- [ ] T022 [US1] [P] Update TaskModal component with priority select dropdown

### Task 3.2: Priority and Category Functionality
- [ ] T023 [US1] Add priority selection to task creation form
- [ ] T024 [US1] [P] Add tag input to task creation form with autocomplete
- [ ] T025 [US1] [P] Implement priority filtering functionality
- [ ] T026 [US1] [P] Implement tag filtering functionality
- [ ] T027 [US1] [P] Test priority and category assignment with visual feedback

### Task 3.3: Independent Test for Priority/Category Feature
- [ ] T028 [US1] Verify users can assign priorities (high/medium/low) with color-coded badges
- [ ] T029 [US1] [P] Verify users can assign categories (work/home) with tag chips
- [ ] T030 [US1] [P] Test that priority and category data persists correctly
- [ ] T031 [US1] [P] Validate that feature works independently of other features

## Phase 4: [US2] Search and Filter Tasks (Priority: P1)

### Task 4.1: Search Functionality
- [ ] T032 [US2] Create SearchBar component positioned above task grid
- [ ] T033 [US2] [P] Implement debounced search across title and description fields
- [ ] T034 [US2] [P] Add search result highlighting
- [ ] T035 [US2] [P] Implement clear search functionality

### Task 4.2: Filter Controls
- [ ] T036 [US2] Create FilterSidebar component for left sidebar placement
- [ ] T037 [US2] [P] Implement status filter dropdown
- [ ] T038 [US2] [P] Implement priority filter dropdown
- [ ] T039 [US2] [P] Implement date range filter
- [ ] T040 [US2] [P] Add "Clear Filters" functionality

### Task 4.3: Independent Test for Search/Filter Feature
- [ ] T041 [US2] Test search functionality with keyword input
- [ ] T042 [US2] [P] Verify filters work independently and in combination
- [ ] T043 [US2] [P] Test that search and filter work with existing task data
- [ ] T044 [US2] [P] Validate performance requirements (<1 sec for search, <500ms for filters)

## Phase 5: [US3] Sort Tasks by Various Criteria (Priority: P2)

### Task 5.1: Sort Functionality Implementation
- [ ] T045 [US3] Add sort controls to FilterSidebar component
- [ ] T046 [US3] [P] Implement sort by due date functionality
- [ ] T047 [US3] [P] Implement sort by priority functionality
- [ ] T048 [US3] [P] Implement alphabetical sort by title
- [ ] T049 [US3] [P] Add sort direction toggle (ascending/descending)

### Task 5.2: Sort UI and Feedback
- [ ] T050 [US3] Display current sort indicator in UI
- [ ] T051 [US3] [P] Implement visual feedback for active sort
- [ ] T052 [US3] [P] Test sort performance with large datasets
- [ ] T053 [US3] [P] Ensure sort persists across operations

### Task 5.3: Independent Test for Sort Feature
- [ ] T054 [US3] Verify sort by due date works correctly
- [ ] T055 [US3] [P] Test sort by priority functionality
- [ ] T056 [US3] [P] Validate alphabetical sort by title
- [ ] T057 [US3] [P] Confirm sort feature works independently

## Phase 6: [US4] Manage Recurring Tasks (Priority: P2)

### Task 6.1: Recurring Task UI Components
- [ ] T058 [US4] Add recurring checkbox to TaskModal component
- [ ] T059 [US4] [P] Add recurrence pattern selector (daily/weekly/monthly) to modal
- [ ] T060 [US4] [P] Create RecurringToggle component for task cards
- [ ] T061 [US4] [P] Update TaskCard to show recurring indicator

### Task 6.2: Recurring Task Logic
- [ ] T062 [US4] Implement auto-reschedule logic for recurring tasks
- [ ] T063 [US4] [P] Define recurrence patterns (daily, weekly, monthly)
- [ ] T064 [US4] [P] Handle edge cases (month-end dates, weekends)
- [ ] T065 [US4] [P] Implement recurrence chain tracking for modifications

### Task 6.3: Independent Test for Recurring Tasks
- [ ] T066 [US4] Test recurring task creation with pattern selection
- [ ] T067 [US4] [P] Verify auto-reschedule functionality works
- [ ] T068 [US4] [P] Validate recurrence patterns behave correctly
- [ ] T069 [US4] [P] Confirm feature works independently of others

## Phase 7: [US5] Set Due Dates and Receive Notifications (Priority: P3)

### Task 7.1: Due Date Functionality
- [ ] T070 [US5] Enhance DatePicker component with time selection capability
- [ ] T071 [US5] [P] Add due date field to TaskModal with validation
- [ ] T072 [US5] [P] Update TaskCard to display due dates
- [ ] T073 [US5] [P] Implement due date validation (future dates only)

### Task 7.2: Browser Notification Implementation
- [ ] T074 [US5] Create notification service using Web Notification API
- [ ] T075 [US5] [P] Implement permission request handling
- [ ] T076 [US5] [P] Schedule notifications for upcoming tasks (1 day and 1 hour before)
- [ ] T077 [US5] [P] Add reminder badges for tasks with upcoming due dates

### Task 7.3: Independent Test for Due Dates and Notifications
- [ ] T078 [US5] Test due date selection and validation
- [ ] T079 [US5] [P] Verify notification permissions work correctly
- [ ] T080 [US5] [P] Test reminder badges appear for upcoming tasks
- [ ] T081 [US5] [P] Validate notification scheduling functionality

## Phase 8: [US6] Task Grid and Card Display with All Fields

### Task 8.1: Task Grid Layout
- [ ] T082 [US6] Create TaskGrid component with responsive layout
- [ ] T083 [US6] [P] Implement responsive grid that works on all screen sizes
- [ ] T084 [US6] [P] Add proper spacing and alignment to grid
- [ ] T085 [US6] [P] Implement skeleton loaders for loading states

### Task 8.2: Enhanced Task Card Display
- [ ] T086 [US6] Create TaskCard component displaying all required fields
- [ ] T087 [US6] [P] Include ID, Title, Description, Status in card display
- [ ] T088 [US6] [P] Add Priority badge and Tags chips to card
- [ ] T089 [US6] [P] Include Due Date, Recurring label, and reminder badges

### Task 8.3: Task Card Actions
- [ ] T090 [US6] Implement complete/incomplete toggle on task cards
- [ ] T091 [US6] [P] Add edit functionality to task cards
- [ ] T092 [US6] [P] Implement delete functionality with confirmation
- [ ] T093 [US6] [P] Test all card display elements work together

## Phase 9: [US7] Add/Edit Modals with Complete Functionality

### Task 9.1: Enhanced Task Modal
- [ ] T094 [US7] Create TaskModal component with all required fields
- [ ] T095 [US7] [P] Add priority select dropdown to modal
- [ ] T096 [US7] [P] Add tags input with multi-select capability
- [ ] T097 [US7] [P] Add due date picker to modal
- [ ] T098 [US7] [P] Add recurring checkbox and pattern selector

### Task 9.2: Modal Form Validation
- [ ] T099 [US7] Implement form validation for all new fields
- [ ] T100 [US7] [P] Add error messaging for invalid inputs
- [ ] T101 [US7] [P] Test form submission with all fields populated
- [ ] T102 [US7] [P] Validate form behavior for both create and edit operations

## Phase 10: [US8] UI Improvements and Navigation

### Task 10.1: Add New Task Button and Layout
- [ ] T103 [US8] Add prominent "Add New Task" button to left sidebar
- [ ] T104 [US8] [P] Position button above filter controls as specified
- [ ] T105 [US8] [P] Implement button that opens task modal
- [ ] T106 [US8] [P] Style button according to design system

### Task 10.2: Filter Sidebar Organization
- [ ] T107 [US8] Organize filter controls in collapsible sections
- [ ] T108 [US8] [P] Add filter counter indicators showing active filters
- [ ] T109 [US8] [P] Implement persistent sidebar state
- [ ] T110 [US8] [P] Ensure sidebar works responsively on all devices

## Phase 11: Backend Database and Authentication Fixes

### Task 11.1: Neon DB Table Creation on Startup
- [ ] T111 Ensure SQLModel.metadata.create_all(engine) is called exactly once on app startup
- [ ] T112 [P] Configure database engine with psycopg binary driver and sslmode=require
- [ ] T113 [P] Add proper connection timeout and pool settings for Neon
- [ ] T114 [P] Implement reconnection logic for database failures
- [ ] T115 [P] Test that user and task tables are created automatically on startup

### Task 11.2: User Registration and JWT Implementation
- [ ] T116 Create signup endpoint that accepts email/password and returns JWT token
- [ ] T117 [P] Implement password hashing with bcrypt in signup process
- [ ] T118 [P] Generate valid JWT tokens with user_id, sub, and exp claims using BETTER_AUTH_SECRET
- [ ] T119 [P] Store user data with proper UUID generation and commit to database
- [ ] T120 [P] Return proper JSON response with format {token: string, user: {id, email, name}}

### Task 11.3: JWT Verification and User Isolation
- [ ] T121 Implement JWT verification middleware for authenticated endpoints
- [ ] T122 [P] Extract user_id from JWT token in request state
- [ ] T123 [P] Filter all task operations by user_id to ensure user isolation
- [ ] T124 [P] Handle 401 Unauthorized responses correctly for invalid/expired tokens
- [ ] T125 [P] Test that users only see their own tasks and not others'

## Phase 12: Frontend API Client and Error Handling

### Task 12.1: Frontend API Client Updates
- [ ] T126 Update API client to handle new task fields (priority, tags, due_date, recurring, etc.)
- [ ] T127 [P] Ensure JWT tokens are properly attached to all authenticated requests
- [ ] T128 [P] Implement proper error handling for 401 responses with redirect to login
- [ ] T129 [P] Add try/catch blocks around all JSON parsing operations to prevent crashes
- [ ] T130 [P] Test that API client handles both valid and invalid JSON responses safely

### Task 12.2: JSON Parsing Error Resolution
- [ ] T131 Fix JSON.parse errors occurring on frontend during API responses
- [ ] T132 [P] Implement safe JSON parsing with proper error handling in API client
- [ ] T133 [P] Add appropriate error messages for malformed JSON responses
- [ ] T134 [P] Test error handling with simulated malformed responses
- [ ] T135 [P] Verify that JSON parsing errors no longer crash the frontend application

## Phase 13: Integration and End-to-End Testing

### Task 13.1: Full Workflow Integration
- [ ] T136 Test complete signup → login → create task → view tasks workflow
- [ ] T137 [P] Verify all features work together without conflicts
- [ ] T138 [P] Test user isolation is maintained across all operations
- [ ] T139 [P] Validate that database tables are properly created and maintained
- [ ] T140 [P] Confirm all JSON parsing errors are resolved

### Task 13.2: Performance and Error Validation
- [ ] T141 Validate search returns results within 1 second
- [ ] T142 [P] Confirm filter/sort operations complete within 500ms
- [ ] T143 [P] Test dashboard loads completely within 3 seconds
- [ ] T144 [P] Verify error handling works for all error scenarios
- [ ] T145 [P] Test that all features work correctly after login

## Dependencies

- Task 1.1 (Setup) must be completed before all other tasks
- Task 2.1 (Enhanced Task Model) must be completed before Task 3.1 (Priority/Categories UI)
- Task 2.2 (Reusable Components) must be completed before all UI tasks
- Task 11.1 (DB Setup) must be completed before Task 11.2 (User Registration)
- Task 11.2 (Registration) must be completed before frontend authentication tasks
- Task 3.1 (Priority/Categories) should be completed before Task 8.2 (Task Card Display)
- Task 4.1 (Search) should be completed before Task 8.2 (Task Card Display)
- Task 5.1 (Sort) should be completed before Task 8.2 (Task Card Display)
- Task 6.1 (Recurring Tasks) should be completed before Task 8.2 (Task Card Display)
- Task 7.1 (Due Dates) should be completed before Task 8.2 (Task Card Display)

## Parallel Execution Opportunities

- Tasks within each phase can be executed in parallel if they operate on different files/components
- UI components (PriorityBadge, TagChips, DatePicker, DarkModeToggle) can be developed in parallel after foundational setup
- Search, filter, and sort functionality can be developed in parallel after Task 2.2
- Individual user story phases can be developed in parallel after foundational components are complete
- Backend database fixes (Phase 11) can be developed in parallel with frontend components (Phases 3-10)
- Testing tasks can be executed in parallel after their respective implementation tasks

## Implementation Strategy

1. **MVP First**: Implement basic task grid with priority and category support (Tasks 1-35)
2. **Core Features**: Add search, filter, and sort functionality (Tasks 36-57)
3. **Enhanced Features**: Add recurring tasks and due dates (Tasks 58-81)
4. **Complete UI**: Implement full task cards and modals (Tasks 82-102)
5. **Backend Integration**: Fix database creation and authentication (Tasks 103-125)
6. **Frontend Fixes**: Resolve JSON parsing and API client issues (Tasks 126-135)
7. **Integration**: Test end-to-end workflow and performance (Tasks 136-145)