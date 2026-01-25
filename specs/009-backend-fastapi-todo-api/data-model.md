# Data Model: Theme Configuration and Task Management for Backend FastAPI Todo API

## Key Entities

### Theme Configuration
- **themeState**: Represents the current theme state and preferences
  - currentTheme: enum - "light" | "dark" | "system" (default: "system")
  - systemPreference: enum - "light" | "dark" - User's OS preference
  - isDarkMode: boolean - Computed property for conditional styling
  - mounted: boolean - Whether component has mounted (for hydration safety)
- **themePreferences**: Settings stored in browser's local storage
  - theme: string - Current theme preference ("light", "dark", or "system")
  - themeOverride: boolean - Whether user has overridden system preference

### Task Entity
- **task**: Represents a user's todo item with properties for all required features
  - id: integer - Auto-incrementing primary key
  - user_id: string - Foreign key linking to user (from Better Auth)
  - title: string - Task title (1-200 characters, required)
  - description: string - Task description (max 1000 characters, optional)
  - completed: boolean - Task completion status (default: false)
  - priority: enum - "high" | "medium" | "low" (default: "medium")
  - tags: array - Array of tag strings (e.g., ["work", "personal", "urgent"])
  - due_date: datetime - Due date for the task (optional)
  - recurring_interval: enum - "none" | "daily" | "weekly" | "monthly" (default: "none")
  - created_at: datetime - Timestamp of creation (auto-generated)
  - updated_at: datetime - Timestamp of last update (auto-generated)

### User Entity
- **user**: Represents an authenticated user from Better Auth integration
  - id: string - Unique identifier from Better Auth system
  - email: string - User's email address (unique constraint)
  - name: string - User's display name (optional)
  - created_at: datetime - Timestamp of user creation (auto-generated)

### Authentication Token
- **token**: Represents the JWT used for securing API access
  - token_value: string - The actual JWT token string
  - user_id: string - Associated user ID from the token payload
  - expiry_time: datetime - When the token expires
  - is_valid: boolean - Whether the token is currently valid

## Validation Rules

### Theme Configuration Validation
- currentTheme must be one of "light", "dark", or "system"
- systemPreference must be either "light" or "dark"
- themeOverride can only be true when currentTheme is not "system"
- mounted must be a boolean to prevent server/client mismatch

### Task Entity Validation
- title must be between 1 and 200 characters
- description must be no more than 1000 characters if provided
- completed must be a boolean value
- priority must be one of "high", "medium", or "low"
- tags must be an array of strings with each tag being 1-30 characters
- due_date must be a valid datetime if provided
- recurring_interval must be one of "none", "daily", "weekly", or "monthly"

### User Entity Validation
- id must be a valid UUID format from Better Auth
- email must be a valid email format and unique
- name can be null but if present must be 1-100 characters

### Authentication Token Validation
- token_value must be a properly formatted JWT
- user_id must match a valid user in the system
- expiry_time must be in the future for valid tokens

## State Transitions

### Theme States
1. **Initial**: Theme preference not yet determined (server-side)
2. **Mounting**: Component has mounted, determining theme from system preference
3. **Light**: Light mode active
4. **Dark**: Dark mode active
5. **System**: Following OS preference

### Task States
1. **Created**: Task object initialized with basic properties
2. **Pending**: Task exists but not completed
3. **Completed**: Task marked as completed (may trigger recurrence)
4. **Updated**: Task properties modified
5. **Deleted**: Task removed from system

### Authentication States
1. **Unauthenticated**: No token present
2. **Valid Token**: Token verified and valid
3. **Expired Token**: Token present but expired
4. **Invalid Token**: Token present but invalid (malformed, wrong signature)

## Component Relationships

### Frontend Theme Hierarchy
- **Root Layout** → **ThemeProvider** (wraps all dashboard components)
- **ThemeProvider** → **ThemeToggle Component** (accesses theme context)
- **ThemeToggle Component** → **UI Elements** (applies theme-appropriate styles)
- **Task Components** → **Lucide Icons** (uses lucide-react icons with theme-aware styling)

### Backend Task Management
- **API Routes** → **Task Service Layer** (handles business logic)
- **Task Service** → **Database Models** (performs CRUD operations)
- **Database Models** → **SQLModel Tables** (interacts with Neon PostgreSQL)
- **Authentication Middleware** → **Token Verification** (validates user access)

## Frontend State Management

### Component State
- **mounted**: Boolean to prevent server/client mismatch during hydration
- **resolvedTheme**: Current theme after system/user preferences resolved
- **theme**: Current theme setting (may differ from resolvedTheme if system preference applies)
- **tasks**: Array of Task entities fetched from API
- **filteredTasks**: Subset of tasks based on current filter criteria
- **loading**: Boolean indicating if data is being fetched
- **error**: String containing error message if API call fails
- **showModal**: Boolean indicating if task creation/edit form is visible
- **editingTask**: Task entity being edited (null if creating new task)

## Backend API Integration

### With Existing Components
- **Auth Middleware**: Verifies JWT tokens using BETTER_AUTH_SECRET and extracts user_id
- **Database Layer**: Uses SQLModel for ORM operations with Neon PostgreSQL
- **API Endpoints**: RESTful endpoints for task management with proper HTTP status codes
- **Pydantic Models**: Request/response validation for all API endpoints
- **Better Auth Integration**: Leverages existing Better Auth user system for user identification

## Integration Points

### Frontend Integration
- **Layout Component**: Will wrap children with ThemeProvider for global theme context
- **Task Components**: Will use theme-aware styling with dark: Tailwind classes
- **Icons**: Will adapt appearance based on current theme using lucide-react

### Backend Integration
- **FastAPI Application**: Will handle all API requests with proper validation
- **SQLModel Models**: Will define database schema with proper relationships
- **JWT Middleware**: Will secure all endpoints with token verification
- **Neon PostgreSQL**: Will store all task and user data with proper indexing