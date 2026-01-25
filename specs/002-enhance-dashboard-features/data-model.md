# Data Model: Enhanced Dashboard Features

## Overview

This document defines the data model for the enhanced dashboard features, extending the existing task model with additional fields for priorities, tags, due dates, and recurring functionality.

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

## Indexes for Performance

- Index on `(user_id, priority)` for priority filtering
- Index on `(user_id, due_date)` for due date filtering and sorting
- Index on `(user_id, completed)` for completion status filtering
- Composite index on `(user_id, priority, completed)` for combined filtering