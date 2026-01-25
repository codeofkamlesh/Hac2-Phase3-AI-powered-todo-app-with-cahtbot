# Data Model: Dashboard Tasks Page with Complete Feature Set

## Key Entities

### Task Entity
- **taskId**: Unique identifier for each task
  - id: string - UUID for the task
  - title: string - Task title (1-200 characters)
  - description: string - Task description (max 1000 characters)
  - completed: boolean - Whether the task is completed
  - priority: enum - "high" | "medium" | "low" (default: "medium")
  - tags: array - Array of tag strings (e.g., ["work", "personal", "urgent"])
  - dueDate: string - ISO date string for due date (optional)
  - recurrencePattern: enum - "none" | "daily" | "weekly" | "monthly" (default: "none")
  - createdAt: string - ISO timestamp of creation
  - updatedAt: string - ISO timestamp of last update
  - userId: string - ID of the user who owns the task

### Theme Configuration
- **themeState**: Represents the current theme state and preferences
  - currentTheme: enum - "light" | "dark" | "system" (default: "system")
  - systemPreference: enum - "light" | "dark" - User's OS preference
  - isDarkMode: boolean - Computed property for conditional styling
  - themeOverride: boolean - Whether user has overridden system preference

### Task Filter
- **filterCriteria**: Represents the current search, filter, and sort criteria
  - searchTerm: string - Text to search in titles/descriptions
  - statusFilter: enum - "all" | "completed" | "pending" (default: "all")
  - priorityFilter: enum - "all" | "high" | "medium" | "low" (default: "all")
  - tagFilter: string - Specific tag to filter by (optional)
  - sortBy: enum - "dueDate" | "priority" | "title" | "createdAt" (default: "createdAt")
  - sortOrder: enum - "asc" | "desc" (default: "desc")

### User Session
- **sessionData**: Represents the authenticated user state
  - userId: string - Unique identifier for the user
  - email: string - User's email address
  - name: string - User's display name
  - isAuthenticated: boolean - Whether the user is authenticated
  - token: string - JWT token for API authentication

## Validation Rules

### Task Entity Validation
- taskId.id must be a valid UUID format
- title must be between 1 and 200 characters
- description must be no more than 1000 characters
- priority must be one of "high", "medium", or "low"
- tags must be an array of strings with each tag being 1-30 characters
- dueDate must be a valid ISO date string if provided
- recurrencePattern must be one of "none", "daily", "weekly", or "monthly"

### Theme Configuration Validation
- currentTheme must be one of "light", "dark", or "system"
- systemPreference must be either "light" or "dark"
- themeOverride can only be true when currentTheme is not "system"

### Task Filter Validation
- searchTerm must be a string (empty string allowed)
- statusFilter must be one of "all", "completed", or "pending"
- priorityFilter must be one of "all", "high", "medium", or "low"
- sortBy must be one of "dueDate", "priority", "title", or "createdAt"
- sortOrder must be either "asc" or "desc"

### User Session Validation
- userId must be a valid identifier
- email must be a valid email format
- isAuthenticated must be a boolean
- token must be a valid JWT format

## State Transitions

### Task State Management
1. **Initial**: Task not yet created
2. **Created**: Task object initialized with basic properties
3. **Pending**: Task exists but not completed
4. **Completed**: Task marked as completed
5. **Updated**: Task properties modified
6. **Deleted**: Task removed from system

### Theme State Management
1. **Initial**: Theme preference not yet determined
2. **Light**: Light mode active
3. **Dark**: Dark mode active
4. **System**: Following OS preference

### Filter State Management
1. **Initial**: No filters applied
2. **Searching**: Search term applied
3. **Filtered**: Specific filters applied (status, priority, tag)
4. **Sorted**: Results sorted by specific criteria

## Component Relationships

### Dashboard Hierarchy
- **Root Layout** → **ThemeProvider** (wraps all dashboard components)
- **ThemeProvider** → **Task Dashboard Page** (accesses theme context)
- **Task Dashboard Page** → **TaskList Component** (displays filtered/sorted tasks)
- **TaskList Component** → **TaskItem Component** (individual task display)
- **Task Dashboard Page** → **TaskForm Component** (for adding/editing tasks)
- **Task Dashboard Page** → **Filter Component** (for search/sort/filter controls)

### Theme Context Flow
- **ThemeProvider** → **Navbar Component** (theme-aware navigation)
- **ThemeProvider** → **Task Components** (theme-aware styling)
- **Navbar Component** → **ThemeToggle Component** (allows user to switch theme)

## Frontend State Management

### Component State
- **tasks**: Array of Task entities fetched from API
- **filteredTasks**: Subset of tasks based on current filter criteria
- **loading**: Boolean indicating if data is being fetched
- **error**: String containing error message if API call fails
- **showForm**: Boolean indicating if task creation/edit form is visible
- **editingTask**: Task entity being edited (null if creating new task)

### Form State
- **formValues**: Current values in the task form
- **formErrors**: Validation errors for form fields
- **isSubmitting**: Boolean indicating if form is being submitted

### Theme State
- **theme**: Current theme from next-themes (light/dark/system)
- **mounted**: Boolean to prevent server/client mismatch during hydration

### Filter State
- **filters**: Current filter criteria object
- **searchTerm**: Current search query
- **sortBy**: Current sorting criteria
- **sortOrder**: Current sort direction

## Integration Points

### With Existing Components
- **Auth Components**: User session integration for task ownership
- **API Layer**: Integration with lib/api.ts for task operations
- **UI Components**: Reusable components for forms, lists, and navigation
- **Theme Context**: Integration with next-themes for dark mode support
- **Notification System**: Integration with browser Notification API for reminders