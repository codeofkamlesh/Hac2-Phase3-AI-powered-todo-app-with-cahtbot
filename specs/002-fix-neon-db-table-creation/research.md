# Research: Fix Neon DB Table Creation, User Signup, and Task Fetch Errors

## Executive Summary

This research addresses the implementation approach for fixing Neon database table creation, user signup functionality, and task fetch errors in the Todo Evolution Project Phase II. The primary issues include:

1. **Neon DB Table Creation**: The application is not automatically creating required tables (user, task) on startup, causing errors when trying to access data.
2. **User Signup Process**: The signup endpoint may not be properly handling user registration, password hashing, and JWT token generation.
3. **Task Fetch Issues**: API endpoints for fetching tasks may be returning 401 Unauthorized or JSON parsing errors.
4. **Frontend JSON Parsing**: The frontend is experiencing JSON.parse errors when processing API responses.

## Technical Approach

### Backend Database Initialization
The solution involves ensuring `SQLModel.metadata.create_all(engine)` is called exactly once during application startup. This will create the necessary tables in Neon PostgreSQL with proper fields and indexes. The database connection will use the psycopg binary driver with SSL mode set to 'require' to ensure secure connections to Neon.

### Authentication System Enhancement
We'll implement a proper signup endpoint that accepts email/password, hashes passwords with bcrypt, stores user data with UUID generation, and returns valid JWT tokens with proper claims (user_id, expiration). The JWT tokens will be signed using the shared BETTER_AUTH_SECRET.

### Task Filtering and Security
All task-related endpoints will implement JWT-based authentication middleware that verifies tokens, extracts user_id, and ensures users only access their own data. This maintains proper user isolation as required by the constitution.

### Frontend Error Handling
We'll update the frontend API client to properly handle JSON parsing with try/catch blocks to prevent crashes when receiving malformed responses. Additionally, we'll implement proper error handling for 401 Unauthorized responses with appropriate redirects to the login page.

## Component Architecture Decision

### Rationale:
Using a component-based architecture with reusable UI elements to maintain consistency and follow the existing codebase patterns. This approach allows for easier maintenance and testing of individual features.

### Components Identified:
1. **TaskGrid**: Grid layout container for task cards
2. **TaskCard**: Individual card displaying all required fields (ID, Title, Description, Status, Priority badge, Tags chips, Due Date, Recurring label, reminder badges)
3. **TaskModal**: Add/edit modal with all required fields (priority select, tags input, due date picker, recurring checkbox)
4. **PriorityBadge**: Color-coded priority indicator (high=#ef4444, medium=#f59e0b, low=#3b82f6)
5. **TagChips**: Category tags displayed as interactive chips
6. **SearchBar**: Keyword search functionality positioned above the task grid
7. **FilterSidebar**: Left sidebar with filter and sort controls
8. **DatePicker**: Due date selection component with date/time picker
9. **RecurringToggle**: Checkbox for recurring tasks with pattern selector
10. **DarkModeToggle**: Theme switching functionality with localStorage persistence

## State Management Decision

### Rationale:
Using React Query (TanStack Query) for server state management and React's built-in hooks for local UI state. This approach provides caching, background updates, and optimistic updates while keeping the implementation clean and maintainable.

## UI/UX Approach Decision

### Rationale:
Implementing a responsive grid layout for task cards with proper filtering, sorting, and search capabilities. The UI will follow the specified color palette and include all required fields as specified in the feature requirements.

## API Integration Decision

### Rationale:
Extending the existing API client to handle new fields while maintaining compatibility with existing functionality. Proper error handling will be implemented to address the JSON parsing issues.