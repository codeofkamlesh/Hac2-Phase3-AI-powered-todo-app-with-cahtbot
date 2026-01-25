# Data Model: Fix Signin JSON Parse Error and Neon DB Table Creation

## Entities

### User
**Description**: Represents a registered user with credentials
- **Fields**:
  - id (string): Unique identifier for the user (UUID)
  - email (string): User's email address (unique, indexed)
  - name (string): User's full name
  - password (string): Hashed password (stored securely)
  - created_at (datetime): Timestamp of account creation

**Validation Rules**:
- Email must be valid email format
- Password must be properly hashed before storage
- Email must be unique across all users

**Relationships**:
- One-to-many with Task entity (via user_id foreign key)

### JWT Token
**Description**: Authentication token for session management
- **Fields**:
  - token (string): Encoded JWT token
  - user_id (string): Reference to the authenticated user
  - exp (datetime): Expiration timestamp (7 days from creation)
  - email (string): User's email included in token payload

**Validation Rules**:
- Must contain valid user_id
- Must not be expired
- Must be signed with correct secret

### Task
**Description**: Represents a task item owned by a user
- **Fields**:
  - id (int): Unique identifier for the task (primary key)
  - user_id (string): Foreign key linking to User
  - title (string): Task title (required, max 200 chars)
  - description (string, optional): Task description (max 1000 chars)
  - completed (boolean): Whether task is completed (default: false)
  - created_at (datetime): Timestamp of task creation
  - updated_at (datetime): Timestamp of last update

**Validation Rules**:
- Title is required and must be between 1-200 characters
- User_id must reference an existing user
- Only the owner can modify/delete the task

## State Transitions

### User Authentication Flow
1. **Unauthenticated** → **Login Attempt**: User enters credentials
2. **Login Attempt** → **Verification**: System verifies credentials against stored hash
3. **Verification** → **Authenticated**: Valid credentials generate JWT token
4. **Verification** → **Failed**: Invalid credentials return error message

### Task Lifecycle
1. **Created** → **Active**: New task added to user's list
2. **Active** → **Completed**: User marks task as completed (toggle)
3. **Active** → **Deleted**: User removes task from list

## Relationships

### User → Task
- One-to-many relationship
- Tasks are filtered by user_id to ensure user isolation
- When user is deleted, related tasks should also be removed (ON DELETE CASCADE)

### JWT Token → User
- One-to-one relationship (per active session)
- Token contains user_id for authentication verification
- Token validation confirms user identity without database lookup