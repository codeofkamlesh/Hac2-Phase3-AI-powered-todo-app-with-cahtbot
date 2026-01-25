# Data Model: Enhanced Dashboard Features with Neon DB Integration

## Overview

This document defines the enhanced data model for the dashboard features, extending the existing task model with additional fields for priorities, tags, due dates, and recurring functionality. The model also addresses proper Neon database table creation and user authentication requirements.

## Task Entity Enhancement

### Current Task Fields (from existing model)
- `id`: string (UUID) - Unique identifier for the task
- `title`: string - Task title
- `description`: string | null - Optional task description
- `completed`: boolean - Whether the task is completed
- `user_id`: string (UUID) - Foreign key linking to user
- `created_at`: DateTime - Timestamp of creation
- `updated_at`: DateTime - Timestamp of last update

### New Fields (for enhanced features)
- `priority`: string - Priority level ('high' | 'medium' | 'low')
- `tags`: string[] - Array of category tags (e.g., ['work', 'personal'])
- `due_date`: DateTime | null - Due date and time for the task
- `recurring`: boolean - Whether the task repeats
- `recurrence_pattern`: string | null - Pattern for recurrence ('daily' | 'weekly' | 'monthly')

### Field Definitions

#### Priority Field
- **Type**: String enum
- **Values**: 'high' | 'medium' | 'low'
- **Default**: 'medium'
- **Validation**: Must be one of the allowed values
- **UI Representation**: Color-coded badges (high=#ef4444, medium=#f59e0b, low=#3b82f6)

#### Tags Field
- **Type**: Array of strings
- **Example Values**: ['work', 'home', 'personal', 'shopping']
- **Validation**: Each tag must be 1-30 characters, alphanumeric with hyphens/underscores only
- **UI Representation**: Interactive chips that can be added/removed

#### Due Date Field
- **Type**: DateTime (ISO 8601 format)
- **Nullable**: Yes
- **Validation**: If provided, must be a valid future date
- **UI Representation**: Date/time picker component

#### Recurring Field
- **Type**: Boolean
- **Default**: false
- **UI Representation**: Checkbox in task form

#### Recurrence Pattern Field
- **Type**: String enum
- **Values**: 'daily' | 'weekly' | 'monthly' | null
- **Required**: Only when recurring is true
- **UI Representation**: Select dropdown when recurring is enabled

## User Entity (for authentication)

### Required Fields for Neon DB Integration
- `id`: string (UUID) - Unique identifier for the user
- `email`: string - User's email address (unique)
- `name`: string - User's display name
- `hashed_password`: string - Password hashed with bcrypt
- `created_at`: DateTime - Timestamp of creation
- `updated_at`: DateTime - Timestamp of last update

### Neon DB Table Specifications

#### User Table
- **Name**: `user`
- **Fields**:
  - `id` (UUID, primary key, default: gen_random_uuid())
  - `email` (VARCHAR, unique, not null)
  - `name` (VARCHAR, not null)
  - `hashed_password` (VARCHAR, not null)
  - `created_at` (TIMESTAMP, not null, default: now())
  - `updated_at` (TIMESTAMP, not null, default: now())
- **Indexes**:
  - Primary key on `id`
  - Unique index on `email`
  - Index on `created_at`

#### Task Table
- **Name**: `task`
- **Fields**:
  - `id` (UUID, primary key, default: gen_random_uuid())
  - `title` (VARCHAR, not null)
  - `description` (TEXT, nullable)
  - `completed` (BOOLEAN, not null, default: false)
  - `user_id` (UUID, not null, foreign key to user.id)
  - `priority` (VARCHAR, not null, default: 'medium')
  - `tags` (JSONB, nullable, default: '[]'::jsonb)
  - `due_date` (TIMESTAMPTZ, nullable)
  - `recurring` (BOOLEAN, not null, default: false)
  - `recurrence_pattern` (VARCHAR, nullable)
  - `created_at` (TIMESTAMPTZ, not null, default: now())
  - `updated_at` (TIMESTAMPTZ, not null, default: now())
- **Indexes**:
  - Primary key on `id`
  - Index on `user_id` (foreign key)
  - Index on `user_id, priority` (for priority filtering)
  - Index on `user_id, due_date` (for due date filtering)
  - Index on `user_id, completed` (for completion status filtering)

## API Contract Changes

### Task Creation (POST /api/{user_id}/tasks)
**Request Body:**
```typescript
{
  title: string,
  description?: string,
  priority?: 'high' | 'medium' | 'low',
  tags?: string[],
  due_date?: string, // ISO 8601 format
  recurring?: boolean,
  recurrence_pattern?: 'daily' | 'weekly' | 'monthly'
}
```

**Response:**
```typescript
{
  id: string,
  title: string,
  description: string | null,
  completed: boolean,
  user_id: string,
  priority: 'high' | 'medium' | 'low',
  tags: string[],
  due_date: string | null, // ISO 8601 format
  recurring: boolean,
  recurrence_pattern: 'daily' | 'weekly' | 'monthly' | null,
  created_at: string, // ISO 8601 format
  updated_at: string  // ISO 8601 format
}
```

### Task Update (PUT /api/{user_id}/tasks/{task_id})
**Request Body:** Same as creation, with partial updates allowed

### Task Retrieval (GET /api/{user_id}/tasks)
**Additional Query Parameters:**
- `priority`: Filter by priority level
- `tag`: Filter by specific tag
- `due_before`: Filter tasks with due date before specified date
- `due_after`: Filter tasks with due date after specified date
- `sort`: Sort by 'due_date', 'priority', 'created_at', 'title'
- `order`: 'asc' or 'desc' for sort direction

### User Registration (POST /api/auth/signup)
**Request Body:**
```typescript
{
  email: string,
  password: string,
  name: string
}
```

**Response:**
```typescript
{
  token: string,
  user: {
    id: string,
    email: string,
    name: string
  }
}
```

## Validation Rules

1. **Priority Validation**: Must be one of 'high', 'medium', 'low'
2. **Tags Validation**:
   - Maximum 5 tags per task
   - Each tag 1-30 characters
   - Alphanumeric with hyphens/underscores only
3. **Due Date Validation**:
   - If recurring is true, due_date must be provided
   - Date must be in the future (not past)
4. **Recurrence Validation**:
   - recurrence_pattern required when recurring is true
   - recurrence_pattern ignored when recurring is false
5. **User Registration Validation**:
   - Email must be properly formatted
   - Password must meet minimum strength requirements
   - Email must be unique across all users

## Neon DB Connection Configuration

### Engine Creation
- Driver: psycopg binary (asyncpg for async operations)
- SSL Mode: require (for Neon compatibility)
- Connection Timeout: 30 seconds
- Pool Settings: min 1, max 10 connections
- Retry Logic: Enabled with exponential backoff

### Table Creation Process
- Call `SQLModel.metadata.create_all(engine)` exactly once on application startup
- Verify table existence before allowing user operations
- Implement proper error handling if tables cannot be created