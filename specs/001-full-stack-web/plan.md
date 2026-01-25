# sp.plan - Phase II: Full-Stack Web Application

[References]: sp.constitution, phase2/sp.specify
[Phase]: Phase II of V
[Created]: 2026-01-21
[AI Agents]: Claude Code, Qwen Code, CCR with Context7 MCP

---

## Architecture Overview

### System Architecture Diagram

```
┌─────────────────┐    HTTP/S    ┌──────────────────┐    HTTP/S    ┌─────────────────────┐    PostgreSQL    ┌─────────────────┐
│   Browser       │ ────────────▶│   Frontend       │ ────────────▶│   Backend           │ ────────────────▶│   Database      │
│   (Next.js)     │              │   (Next.js 16)   │              │   (FastAPI)         │                  │   (Neon)        │
│                 │ ◀────────────│                  │ ◀────────────│                     │ ◀────────────────│                 │
│                 │   JWT Token  │                  │   JWT Token  │                     │    SQL Queries   │                 │
└─────────────────┘              └──────────────────┘              └─────────────────────┘                  └─────────────────┘
```

### Data Flow

1. **User Registration/Login**:
   - User enters credentials on frontend
   - Credentials sent to Better Auth endpoint
   - Better Auth creates user in database and returns JWT token
   - JWT token stored in browser (localStorage/cookie)

2. **Task Operations**:
   - User performs action (create/update/delete/complete)
   - Frontend adds JWT token to Authorization header
   - Request sent to backend API endpoint with user_id in URL
   - Backend extracts JWT token and verifies validity
   - Backend extracts user_id from token and compares with URL user_id
   - If match, performs operation on user's data only
   - Response sent back to frontend

3. **Data Persistence**:
   - All task data stored in Neon PostgreSQL database
   - Tasks linked to users via foreign key relationship
   - Created/updated timestamps maintained automatically

### JWT Token Flow for Authentication

1. User submits credentials to login/signup endpoint
2. Better Auth verifies credentials and generates JWT token
3. Token contains user_id, email, and expiration time
4. Token sent to frontend and stored securely
5. For all API requests, token attached to Authorization header
6. Backend middleware verifies token authenticity and expiration
7. Backend ensures token user_id matches URL user_id for security
8. Operation proceeds only if all validations pass

---

## Component Breakdown

### FRONTEND COMPONENTS (Next.js 16)

#### File Structure for /app directory (App Router)

```
frontend/
├── app/
│   ├── layout.tsx                    # Root layout with global styles
│   ├── page.tsx                      # Landing page
│   ├── login/page.tsx               # Login page component
│   ├── signup/page.tsx              # Signup page component
│   ├── dashboard/
│   │   ├── page.tsx                 # Dashboard home page
│   │   ├── tasks/
│   │   │   ├── page.tsx             # Task list page
│   │   │   ├── [id]/page.tsx        # Individual task page
│   │   │   └── add/page.tsx         # Add task page
│   │   └── profile/page.tsx         # User profile page
├── components/
│   ├── auth/
│   │   ├── LoginForm.tsx            # Login form component
│   │   ├── SignupForm.tsx           # Signup form component
│   │   └── ProtectedRoute.tsx       # Route protection component
│   ├── tasks/
│   │   ├── TaskList.tsx             # Task list display component
│   │   ├── TaskItem.tsx             # Individual task component
│   │   ├── AddTaskForm.tsx          # Add task form component
│   │   ├── EditTaskModal.tsx        # Edit task modal component
│   │   └── DeleteConfirmModal.tsx   # Delete confirmation modal
│   ├── ui/
│   │   ├── Button.tsx               # Reusable button component
│   │   ├── Input.tsx                # Reusable input component
│   │   ├── Modal.tsx                # Reusable modal component
│   │   ├── Checkbox.tsx             # Reusable checkbox component
│   │   ├── Spinner.tsx              # Loading spinner component
│   │   └── Navbar.tsx               # Navigation bar component
│   └── providers/
│       └── AuthProvider.tsx         # Authentication context provider
├── lib/
│   ├── api.ts                       # API client with all 6 endpoints
│   └── auth.ts                      # Authentication utilities
├── hooks/
│   ├── useAuth.ts                   # Authentication hook
│   └── useTasks.ts                  # Task management hook
├── styles/
│   └── globals.css                  # Global styles (Tailwind)
├── .env.example                     # Environment variables example
└── package.json                     # Dependencies and scripts
```

#### Authentication Components

**Login Page Component** (`frontend/app/login/page.tsx`):
```typescript
// [Task]: T-001
// [From]: sp.specify §User Story 1, sp.plan §Authentication Components
'use client';

import LoginForm from '@/components/auth/LoginForm';
import { useAuth } from '@/hooks/useAuth';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function LoginPage() {
  const { isAuthenticated, isLoading } = useAuth();
  const router = useRouter();

  // Redirect if already authenticated
  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      router.push('/dashboard');
    }
  }, [isAuthenticated, isLoading, router]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (isAuthenticated) {
    return null; // Redirect handled by useEffect
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Sign in to your account
          </h2>
        </div>
        <LoginForm />
      </div>
    </div>
  );
}
```

**Signup Page Component** (`frontend/app/signup/page.tsx`):
```typescript
// [Task]: T-002
// [From]: sp.specify §User Story 1, sp.plan §Authentication Components
'use client';

import SignupForm from '@/components/auth/SignupForm';
import { useAuth } from '@/hooks/useAuth';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function SignupPage() {
  const { isAuthenticated, isLoading } = useAuth();
  const router = useRouter();

  // Redirect if already authenticated
  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      router.push('/dashboard');
    }
  }, [isAuthenticated, isLoading, router]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (isAuthenticated) {
    return null; // Redirect handled by useEffect
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Create a new account
          </h2>
        </div>
        <SignupForm />
      </div>
    </div>
  );
}
```

#### Dashboard Components

**Task List Component** (`frontend/components/tasks/TaskList.tsx`):
```typescript
// [Task]: T-003
// [From]: sp.specify §User Story 2, sp.plan §Dashboard Components
'use client';

import { useState, useEffect } from 'react';
import TaskItem from './TaskItem';
import { Task } from '@/types/task';
import { getAllTasks } from '@/lib/api';
import Spinner from '../ui/Spinner';

export default function TaskList({ userId }: { userId: string }) {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const data = await getAllTasks(userId);
        setTasks(data);
      } catch (err) {
        setError('Failed to load tasks');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    if (userId) {
      fetchTasks();
    }
  }, [userId]);

  if (loading) {
    return (
      <div className="flex justify-center py-10">
        <Spinner />
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
        <span className="block sm:inline">{error}</span>
      </div>
    );
  }

  return (
    <div className="bg-white shadow overflow-hidden sm:rounded-md">
      <ul className="divide-y divide-gray-200">
        {tasks.length === 0 ? (
          <li className="px-6 py-12 text-center">
            <p className="text-gray-500">No tasks yet. Add your first task!</p>
          </li>
        ) : (
          tasks.map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              userId={userId}
              onUpdate={(updatedTask) => {
                setTasks(tasks.map(t => t.id === updatedTask.id ? updatedTask : t));
              }}
              onDelete={(deletedTaskId) => {
                setTasks(tasks.filter(t => t.id !== deletedTaskId));
              }}
            />
          ))
        )}
      </ul>
    </div>
  );
}
```

**Task Item Component** (`frontend/components/tasks/TaskItem.tsx`):
```typescript
// [Task]: T-004
// [From]: sp.specify §User Story 2, sp.plan §Dashboard Components
'use client';

import { useState } from 'react';
import { Task } from '@/types/task';
import { updateTask, deleteTask, toggleComplete } from '@/lib/api';
import EditTaskModal from './EditTaskModal';
import DeleteConfirmModal from './DeleteConfirmModal';

interface TaskItemProps {
  task: Task;
  userId: string;
  onUpdate: (updatedTask: Task) => void;
  onDelete: (taskId: string) => void;
}

export default function TaskItem({ task, userId, onUpdate, onDelete }: TaskItemProps) {
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);

  const handleToggleComplete = async () => {
    if (isUpdating) return;

    setIsUpdating(true);
    try {
      const updatedTask = await toggleComplete(userId, task.id);
      onUpdate(updatedTask);
    } catch (error) {
      console.error('Failed to toggle task completion:', error);
    } finally {
      setIsUpdating(false);
    }
  };

  const handleDelete = async () => {
    try {
      await deleteTask(userId, task.id);
      onDelete(task.id);
      setShowDeleteModal(false);
    } catch (error) {
      console.error('Failed to delete task:', error);
    }
  };

  const handleUpdate = async (updatedData: Partial<Task>) => {
    try {
      const updatedTask = await updateTask(userId, task.id, updatedData);
      onUpdate(updatedTask);
      setShowEditModal(false);
    } catch (error) {
      console.error('Failed to update task:', error);
    }
  };

  return (
    <li className="px-6 py-4 hover:bg-gray-50">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <input
            type="checkbox"
            checked={task.completed}
            onChange={handleToggleComplete}
            disabled={isUpdating}
            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
          />
          <div className="ml-3 min-w-0">
            <p className={`text-sm font-medium ${task.completed ? 'line-through text-gray-500' : 'text-gray-900'}`}>
              {task.title}
            </p>
            {task.description && (
              <p className={`text-sm ${task.completed ? 'line-through text-gray-400' : 'text-gray-500'}`}>
                {task.description}
              </p>
            )}
            <p className="text-xs text-gray-400 mt-1">
              Created: {new Date(task.created_at).toLocaleDateString()} |
              Updated: {new Date(task.updated_at).toLocaleDateString()}
            </p>
          </div>
        </div>
        <div className="flex space-x-2">
          <button
            onClick={() => setShowEditModal(true)}
            className="inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Edit
          </button>
          <button
            onClick={() => setShowDeleteModal(true)}
            className="inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded text-red-700 bg-red-100 hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
          >
            Delete
          </button>
        </div>
      </div>

      {showEditModal && (
        <EditTaskModal
          task={task}
          onClose={() => setShowEditModal(false)}
          onSave={handleUpdate}
        />
      )}

      {showDeleteModal && (
        <DeleteConfirmModal
          taskTitle={task.title}
          onClose={() => setShowDeleteModal(false)}
          onConfirm={handleDelete}
        />
      )}
    </li>
  );
}
```

#### Shared Components

**API Client Module** (`frontend/lib/api.ts`):
```typescript
// [Task]: T-005
// [From]: sp.constitution §API & Integration Standards, sp.specify §Requirements
import { Task } from '@/types/task';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8000';

// Helper to get auth token from localStorage
const getAuthToken = (): string | null => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('jwt_token');
  }
  return null;
};

// Helper to add auth headers to requests
const getAuthHeaders = () => {
  const token = getAuthToken();
  return {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json',
  };
};

// GET /api/{user_id}/tasks - Get all tasks for a user
export const getAllTasks = async (userId: string): Promise<Task[]> => {
  const response = await fetch(`${API_BASE_URL}/api/${userId}/tasks`, {
    headers: getAuthHeaders(),
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch tasks: ${response.status}`);
  }

  return response.json();
};

// POST /api/{user_id}/tasks - Create a new task
export const createTask = async (userId: string, taskData: { title: string; description?: string }): Promise<Task> => {
  const response = await fetch(`${API_BASE_URL}/api/${userId}/tasks`, {
    method: 'POST',
    headers: getAuthHeaders(),
    body: JSON.stringify(taskData),
  });

  if (!response.ok) {
    throw new Error(`Failed to create task: ${response.status}`);
  }

  return response.json();
};

// GET /api/{user_id}/tasks/{id} - Get a specific task
export const getTaskById = async (userId: string, taskId: string): Promise<Task> => {
  const response = await fetch(`${API_BASE_URL}/api/${userId}/tasks/${taskId}`, {
    headers: getAuthHeaders(),
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch task: ${response.status}`);
  }

  return response.json();
};

// PUT /api/{user_id}/tasks/{id} - Update a task
export const updateTask = async (userId: string, taskId: string, taskData: Partial<Task>): Promise<Task> => {
  const response = await fetch(`${API_BASE_URL}/api/${userId}/tasks/${taskId}`, {
    method: 'PUT',
    headers: getAuthHeaders(),
    body: JSON.stringify(taskData),
  });

  if (!response.ok) {
    throw new Error(`Failed to update task: ${response.status}`);
  }

  return response.json();
};

// DELETE /api/{user_id}/tasks/{id} - Delete a task
export const deleteTask = async (userId: string, taskId: string): Promise<void> => {
  const response = await fetch(`${API_BASE_URL}/api/${userId}/tasks/${taskId}`, {
    method: 'DELETE',
    headers: getAuthHeaders(),
  });

  if (!response.ok) {
    throw new Error(`Failed to delete task: ${response.status}`);
  }
};

// PATCH /api/{user_id}/tasks/{id}/complete - Toggle task completion
export const toggleComplete = async (userId: string, taskId: string): Promise<Task> => {
  const response = await fetch(`${API_BASE_URL}/api/${userId}/tasks/${taskId}/complete`, {
    method: 'PATCH',
    headers: getAuthHeaders(),
  });

  if (!response.ok) {
    throw new Error(`Failed to toggle task completion: ${response.status}`);
  }

  return response.json();
};
```

**Better Auth Configuration** (`frontend/lib/auth.ts`):
```typescript
// [Task]: T-006
// [From]: sp.constitution §Security & Authentication, sp.specify §Requirements
import { BetterAuthClient } from '@better-auth/react';

// Initialize Better Auth client
const authClient = new BetterAuthClient({
  baseURL: process.env.NEXT_PUBLIC_BETTER_AUTH_URL || 'http://localhost:3000',
});

// Export auth utilities
export const authUtils = {
  // Get current user session
  getSession: async () => {
    try {
      const session = await authClient.getSession();
      return session;
    } catch (error) {
      console.error('Failed to get session:', error);
      return null;
    }
  },

  // Sign in user
  signIn: async (email: string, password: string) => {
    try {
      const response = await authClient.signIn.email({
        email,
        password,
        callbackURL: '/dashboard',
      });
      return response;
    } catch (error) {
      console.error('Sign in failed:', error);
      throw error;
    }
  },

  // Sign up user
  signUp: async (email: string, password: string, name?: string) => {
    try {
      const response = await authClient.signUp.email({
        email,
        password,
        name: name || email.split('@')[0],
        callbackURL: '/dashboard',
      });
      return response;
    } catch (error) {
      console.error('Sign up failed:', error);
      throw error;
    }
  },

  // Sign out user
  signOut: async () => {
    try {
      await authClient.signOut();
    } catch (error) {
      console.error('Sign out failed:', error);
      throw error;
    }
  },

  // Get JWT token for API calls
  getJwtToken: async (): Promise<string | null> => {
    try {
      const session = await authClient.getSession();
      return session?.accessToken || null;
    } catch (error) {
      console.error('Failed to get JWT token:', error);
      return null;
    }
  },
};

export default authUtils;
```

#### Environment Variables Needed
- `NEXT_PUBLIC_API_BASE_URL`: Backend API URL
- `NEXT_PUBLIC_BETTER_AUTH_URL`: Better Auth base URL
- `NEXT_PUBLIC_JWT_EXPIRATION`: Token expiration time (7 days)

### BACKEND COMPONENTS (FastAPI)

#### Project Structure

```
backend/
├── main.py                        # Main FastAPI application
├── models.py                      # SQLModel database models
├── db.py                          # Database connection and session
├── schemas.py                     # Pydantic schemas for validation
├── middleware/
│   └── auth_middleware.py         # JWT authentication middleware
├── routes/
│   ├── __init__.py
│   └── tasks.py                   # Task-related API routes
├── dependencies.py                # Shared dependencies
├── config.py                      # Configuration settings
├── requirements.txt               # Python dependencies
├── .env.example                   # Environment variables example
└── README.md                      # Backend documentation
```

#### Database Models (`backend/models.py`)

```python
# [Task]: T-007
# [From]: sp.constitution §Database Standards, sp.specify §Key Entities
from sqlmodel import SQLModel, Field, Column, DateTime, Text
from datetime import datetime
import uuid

class Task(SQLModel, table=True):
    """
    Task model representing a todo item with title, description, completion status,
    and timestamps for creation and updates.
    """
    id: str = Field(default_factory=lambda: str(uuid.uuid4()), primary_key=True)
    user_id: str = Field(index=True)  # Foreign key to user (managed by Better Auth)
    title: str = Field(min_length=1, max_length=200)
    description: str | None = Field(max_length=1000, sa_column=Column(Text))
    completed: bool = Field(default=False)
    created_at: datetime = Field(sa_column=Column(DateTime(timezone=True)), default=datetime.utcnow)
    updated_at: datetime = Field(sa_column=Column(DateTime(timezone=True)), default=datetime.utcnow)

    def __setattr__(self, name, value):
        """Override to update updated_at timestamp when any field is changed."""
        if name != 'updated_at':
            self.updated_at = datetime.utcnow()
        super().__setattr__(name, value)
```

#### Database Connection (`backend/db.py`)

```python
# [Task]: T-008
# [From]: sp.constitution §Database Standards, sp.specify §Requirements
from sqlalchemy import create_engine
from sqlalchemy.pool import QueuePool
from sqlmodel import Session
from typing import Generator
import os
from contextlib import contextmanager

# Get database URL from environment variable
DATABASE_URL = os.getenv("DATABASE_URL", "postgresql://user:password@localhost/todo_db")

# Create engine with connection pooling
engine = create_engine(
    DATABASE_URL,
    poolclass=QueuePool,
    pool_size=5,
    max_overflow=10,
    pool_pre_ping=True,
    pool_recycle=300,
)

def get_session() -> Generator[Session, None, None]:
    """
    Get database session for dependency injection.
    """
    with Session(engine) as session:
        yield session

@contextmanager
def get_db_session():
    """
    Context manager for database sessions to ensure proper cleanup.
    """
    session = Session(engine)
    try:
        yield session
        session.commit()
    except Exception:
        session.rollback()
        raise
    finally:
        session.close()
```

#### JWT Authentication Middleware (`backend/middleware/auth_middleware.py`)

```python
# [Task]: T-009
# [From]: sp.constitution §Security & Authentication, sp.specify §Requirements
from fastapi import HTTPException, Depends, Request
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
import jwt
from typing import Dict, Optional
import os
from datetime import datetime
from functools import wraps

# Get secret key from environment
SECRET_KEY = os.getenv("BETTER_AUTH_SECRET", "your-secret-key-here")
ALGORITHM = "HS256"

security = HTTPBearer()

def verify_jwt_token(token: str) -> Dict[str, str]:
    """
    Verify JWT token and return payload if valid.
    """
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])

        # Check if token is expired
        exp = payload.get("exp")
        if exp and datetime.fromtimestamp(exp) < datetime.utcnow():
            raise HTTPException(status_code=401, detail="Token has expired")

        return payload
    except jwt.ExpiredSignatureError:
        raise HTTPException(status_code=401, detail="Token has expired")
    except jwt.InvalidTokenError:
        raise HTTPException(status_code=401, detail="Invalid token")

def verify_user_ownership(token_payload: Dict[str, str], url_user_id: str) -> bool:
    """
    Verify that the token user_id matches the URL user_id for security.
    """
    token_user_id = token_payload.get("user_id") or token_payload.get("sub")
    if not token_user_id or token_user_id != url_user_id:
        return False
    return True

async def get_current_user(request: Request, credentials: HTTPAuthorizationCredentials = Depends(security)):
    """
    Get current user from JWT token in request.
    """
    token = credentials.credentials

    # Verify token
    payload = verify_jwt_token(token)

    # Extract user_id from path parameters
    url_user_id = request.path_params.get("user_id")
    if not url_user_id:
        raise HTTPException(status_code=400, detail="User ID not provided in URL")

    # Verify user ownership
    if not verify_user_ownership(payload, url_user_id):
        raise HTTPException(status_code=403, detail="Access forbidden: user ID mismatch")

    return payload

# Decorator for protecting routes
def require_auth(f):
    @wraps(f)
    async def decorated(*args, **kwargs):
        request = kwargs.get('request') or (args[0] if args else None)
        if not request:
            raise HTTPException(status_code=400, detail="Request object not found")

        credentials = HTTPAuthorizationCredentials(credentials=request.headers.get("authorization", "").split(" ")[1])
        payload = verify_jwt_token(credentials.credentials)

        url_user_id = request.path_params.get("user_id")
        if not url_user_id or not verify_user_ownership(payload, url_user_id):
            raise HTTPException(status_code=403, detail="Access forbidden: user ID mismatch")

        return await f(*args, **kwargs)
    return decorated
```

#### API Routes (`backend/routes/tasks.py`)

```python
# [Task]: T-010
# [From]: sp.constitution §API & Integration Standards, sp.specify §Requirements
from fastapi import APIRouter, Depends, HTTPException, status
from sqlmodel import Session, select
from typing import List
import uuid
from datetime import datetime

from ..models import Task
from ..schemas import TaskCreate, TaskUpdate, TaskResponse
from ..middleware.auth_middleware import get_current_user
from ..db import get_session
from ..dependencies import get_user_id_from_path

router = APIRouter(prefix="/api/{user_id}", tags=["tasks"])

@router.get("/tasks", response_model=List[TaskResponse])
async def get_all_tasks(
    user_id: str,
    current_user: dict = Depends(get_current_user),
    session: Session = Depends(get_session)
):
    """
    Get all tasks for a specific user.
    """
    statement = select(Task).where(Task.user_id == user_id)
    tasks = session.exec(statement).all()
    return tasks


@router.post("/tasks", response_model=TaskResponse, status_code=status.HTTP_201_CREATED)
async def create_task(
    user_id: str,
    task_data: TaskCreate,
    current_user: dict = Depends(get_current_user),
    session: Session = Depends(get_session)
):
    """
    Create a new task for a specific user.
    """
    # Validate that user_id in URL matches authenticated user
    if user_id != current_user.get("user_id") and user_id != current_user.get("sub"):
        raise HTTPException(status_code=403, detail="Access forbidden: user ID mismatch")

    # Create new task
    task = Task(
        user_id=user_id,
        title=task_data.title,
        description=task_data.description,
        completed=False,
        created_at=datetime.utcnow(),
        updated_at=datetime.utcnow()
    )

    session.add(task)
    session.commit()
    session.refresh(task)

    return task


@router.get("/tasks/{task_id}", response_model=TaskResponse)
async def get_task_by_id(
    user_id: str,
    task_id: str,
    current_user: dict = Depends(get_current_user),
    session: Session = Depends(get_session)
):
    """
    Get a specific task by ID for a specific user.
    """
    statement = select(Task).where(Task.id == task_id, Task.user_id == user_id)
    task = session.exec(statement).first()

    if not task:
        raise HTTPException(status_code=404, detail="Task not found")

    return task


@router.put("/tasks/{task_id}", response_model=TaskResponse)
async def update_task(
    user_id: str,
    task_id: str,
    task_data: TaskUpdate,
    current_user: dict = Depends(get_current_user),
    session: Session = Depends(get_session)
):
    """
    Update a specific task for a specific user.
    """
    statement = select(Task).where(Task.id == task_id, Task.user_id == user_id)
    task = session.exec(statement).first()

    if not task:
        raise HTTPException(status_code=404, detail="Task not found")

    # Update task fields if provided
    if task_data.title is not None:
        task.title = task_data.title
    if task_data.description is not None:
        task.description = task_data.description
    if task_data.completed is not None:
        task.completed = task_data.completed

    task.updated_at = datetime.utcnow()

    session.add(task)
    session.commit()
    session.refresh(task)

    return task


@router.delete("/tasks/{task_id}", status_code=status.HTTP_200_OK)
async def delete_task(
    user_id: str,
    task_id: str,
    current_user: dict = Depends(get_current_user),
    session: Session = Depends(get_session)
):
    """
    Delete a specific task for a specific user.
    """
    statement = select(Task).where(Task.id == task_id, Task.user_id == user_id)
    task = session.exec(statement).first()

    if not task:
        raise HTTPException(status_code=404, detail="Task not found")

    session.delete(task)
    session.commit()

    return {"detail": "Task deleted successfully"}


@router.patch("/tasks/{task_id}/complete", response_model=TaskResponse)
async def toggle_task_completion(
    user_id: str,
    task_id: str,
    current_user: dict = Depends(get_current_user),
    session: Session = Depends(get_session)
):
    """
    Toggle the completion status of a specific task for a specific user.
    """
    statement = select(Task).where(Task.id == task_id, Task.user_id == user_id)
    task = session.exec(statement).first()

    if not task:
        raise HTTPException(status_code=404, detail="Task not found")

    # Toggle completion status
    task.completed = not task.completed
    task.updated_at = datetime.utcnow()

    session.add(task)
    session.commit()
    session.refresh(task)

    return task
```

#### Pydantic Schemas (`backend/schemas.py`)

```python
# [Task]: T-011
# [From]: sp.constitution §Code Quality & Standards, sp.specify §Requirements
from pydantic import BaseModel, Field
from datetime import datetime
from typing import Optional


class TaskBase(BaseModel):
    """
    Base schema for task data.
    """
    title: str = Field(..., min_length=1, max_length=200)
    description: Optional[str] = Field(None, max_length=1000)


class TaskCreate(TaskBase):
    """
    Schema for creating a new task.
    """
    pass


class TaskUpdate(BaseModel):
    """
    Schema for updating an existing task (all fields optional).
    """
    title: Optional[str] = Field(None, min_length=1, max_length=200)
    description: Optional[str] = Field(None, max_length=1000)
    completed: Optional[bool] = None


class TaskResponse(TaskBase):
    """
    Schema for task response with additional fields.
    """
    id: str
    user_id: str
    completed: bool
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True
```

#### Main Application Setup (`backend/main.py`)

```python
# [Task]: T-012
# [From]: sp.constitution §Code Quality & Standards, sp.specify §Requirements
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .routes import tasks
import os

# Create FastAPI app
app = FastAPI(
    title="Todo API",
    description="REST API for Todo application with JWT authentication",
    version="1.0.0"
)

# Configure CORS
frontend_url = os.getenv("FRONTEND_URL", "http://localhost:3000")
app.add_middleware(
    CORSMiddleware,
    allow_origins=[frontend_url],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
    # Expose the authorization header to frontend
    expose_headers=["Access-Control-Allow-Origin", "Authorization"],
)

# Include routers
app.include_router(tasks.router)

@app.get("/")
def read_root():
    """
    Health check endpoint.
    """
    return {"message": "Todo API is running"}

@app.get("/health")
def health_check():
    """
    Health check endpoint for monitoring.
    """
    return {"status": "healthy", "timestamp": "datetime.utcnow()"}
```

#### Dependencies (`backend/dependencies.py`)

```python
# [Task]: T-013
# [From]: sp.constitution §Code Quality & Standards, sp.specify §Requirements
from fastapi import HTTPException, Path
from typing import Annotated

# Dependency to get user_id from path with validation
def get_user_id_from_path(user_id: Annotated[str, Path(title="The ID of the user", min_length=1)]) -> str:
    """
    Validate and return user_id from path parameters.
    """
    if not user_id or len(user_id.strip()) == 0:
        raise HTTPException(status_code=400, detail="User ID cannot be empty")
    return user_id
```

#### Configuration (`backend/config.py`)

```python
# [Task]: T-014
# [From]: sp.constitution §Security Constraints, sp.specify §Requirements
import os
from typing import Optional

class Settings:
    """
    Application settings loaded from environment variables.
    """
    # Database settings
    DATABASE_URL: str = os.getenv("DATABASE_URL", "postgresql://user:password@localhost/todo_db")

    # Authentication settings
    BETTER_AUTH_SECRET: str = os.getenv("BETTER_AUTH_SECRET", "your-default-secret-key-change-in-production")
    JWT_ALGORITHM: str = os.getenv("JWT_ALGORITHM", "HS256")
    JWT_EXPIRATION_HOURS: int = int(os.getenv("JWT_EXPIRATION_HOURS", "168"))  # 7 days

    # CORS settings
    FRONTEND_URL: str = os.getenv("FRONTEND_URL", "http://localhost:3000")

    # Server settings
    HOST: str = os.getenv("HOST", "0.0.0.0")
    PORT: int = int(os.getenv("PORT", "8000"))

    # Logging
    LOG_LEVEL: str = os.getenv("LOG_LEVEL", "INFO")

settings = Settings()
```

#### Dependencies (`backend/requirements.txt`)

```
# [Task]: T-015
# [From]: sp.constitution §Development Environment, sp.specify §Requirements
fastapi==0.104.1
uvicorn[standard]==0.24.0
sqlmodel==0.0.16
pydantic==2.5.0
pydantic-settings==2.1.0
passlib[bcrypt]==1.7.4
python-jose[cryptography]==3.3.0
python-multipart==0.0.6
python-dotenv==1.0.0
alembic==1.12.1
asyncpg==0.29.0
gunicorn==21.2.0
pytest==7.4.3
httpx==0.25.2
```

#### Environment Variables Needed
- `DATABASE_URL`: PostgreSQL connection string
- `BETTER_AUTH_SECRET`: Secret key for JWT signing (shared with frontend)
- `FRONTEND_URL`: Origin for CORS configuration
- `JWT_EXPIRATION_HOURS`: Token expiration time (default 168 hours = 7 days)
- `HOST`: Server host (default 0.0.0.0)
- `PORT`: Server port (default 8000)
- `LOG_LEVEL`: Logging level (default INFO)
- `NEXT_PUBLIC_API_BASE_URL`: Backend API URL for frontend
- `NEXT_PUBLIC_BETTER_AUTH_URL`: Better Auth base URL

---

## Decisions Needing Documentation

### Decision 1: Monorepo vs Separate Repositories
- **Options considered**:
  - Separate repositories for frontend and backend
  - Single monorepo for both frontend and backend
- **Chosen option with ✅**: Single monorepo ✅
- **Tradeoffs**:
  - Pros ✅:
    - Simplified AI agent navigation across both frontend and backend
    - Enables cross-cutting changes in single context
    - Easier coordination between frontend and backend changes
    - Centralized specifications and documentation
  - Cons ❌:
    - Larger repository size
    - Potential for more complex CI/CD setup
- **Rationale**: Per sp.constitution §Development Environment, monorepo is required for AI agent navigation and cross-cutting changes.

### Decision 2: JWT Storage (HTTP-only cookies vs localStorage)
- **Options considered**:
  - HTTP-only cookies (more secure)
  - localStorage (easier to access from JavaScript)
- **Chosen option with ✅**: localStorage with proper security measures ✅
- **Tradeoffs**:
  - Pros ✅:
    - Easy access from JavaScript for API calls
    - Better integration with Better Auth
    - Simpler frontend implementation
  - Cons ❌:
    - Vulnerable to XSS attacks if not properly secured
- **Rationale**: Better Auth works best with localStorage approach, and we implement proper security measures to mitigate XSS risks.

### Decision 3: Database ORM (SQLModel chosen per constitution)
- **Options considered**:
  - SQLModel (as required by sp.constitution)
  - SQLAlchemy directly
  - Django ORM
- **Chosen option with ✅**: SQLModel ✅
- **Tradeoffs**:
  - Pros ✅:
    - Compliant with sp.constitution requirements
    - Combines SQLAlchemy with Pydantic benefits
    - Type safety and validation built-in
  - Cons ❌:
    - Less mature than SQLAlchemy alone
    - Learning curve for team members
- **Rationale**: Required by sp.constitution §Technology Stack Constraints for Phase II.

### Decision 4: Task Deletion Strategy (Hard delete vs Soft delete)
- **Options considered**:
  - Hard delete (permanently remove from database)
  - Soft delete (mark as deleted but keep in database)
- **Chosen option with ✅**: Hard delete ✅
- **Tradeoffs**:
  - Pros ✅:
    - Simpler implementation
    - Reduced database storage requirements
    - Cleaner data model
  - Cons ❌:
    - Cannot recover deleted tasks
    - May not meet enterprise requirements for data retention
- **Rationale**: For a todo application, hard deletes are sufficient and simpler to implement per basic requirements.

### Decision 5: Frontend Rendering (Server Components + Client Components)
- **Options considered**:
  - Server Components only
  - Client Components only
  - Hybrid approach (Server Components + Client Components)
- **Chosen option with ✅**: Hybrid approach ✅
- **Tradeoffs**:
  - Pros ✅:
    - Better performance with Server Components for static content
    - Interactivity with Client Components for dynamic features
    - SEO benefits from Server Components
  - Cons ❌:
    - More complex architecture
    - Requires careful consideration of which components are server vs client
- **Rationale**: Next.js 16 App Router best practice combines both for optimal performance and functionality.

### Decision 6: API Error Format (FastAPI default format)
- **Options considered**:
  - FastAPI default format ({detail: "message"})
  - Custom error format
- **Chosen option with ✅**: FastAPI default format ✅
- **Tradeoffs**:
  - Pros ✅:
    - Consistent with FastAPI conventions
    - Well-documented and understood
    - Automatic handling by FastAPI
  - Cons ❌:
    - Less flexibility for custom error structures
- **Rationale**: Per sp.constitution §API & Integration Standards, FastAPI default format is used: {"detail": "Error message"}.

### Decision 7: Deployment Platform (Vercel + Railway)
- **Options considered**:
  - Vercel for frontend, Railway for backend
  - Vercel for frontend, Render for backend
  - Netlify for frontend, Fly.io for backend
- **Chosen option with ✅**: Vercel + Railway ✅
- **Tradeoffs**:
  - Pros ✅:
    - Excellent Next.js support on Vercel
    - Good Python/FastAPI support on Railway
    - Free tiers available for development
    - Easy integration with GitHub
  - Cons ❌:
    - Vendor lock-in
    - Potential cost increases with scale
- **Rationale**: Based on industry standards and free tier availability for hackathon project.

### Decision 8: User ID Format (UUID from Better Auth)
- **Options considered**:
  - UUID (from Better Auth)
  - Auto-incrementing integers
  - Custom format
- **Chosen option with ✅**: UUID from Better Auth ✅
- **Tradeoffs**:
  - Pros ✅:
    - Globally unique identifiers
    - Secure (unguessable)
    - Standard format used by Better Auth
  - Cons ❌:
    - Longer strings than integers
    - Potentially harder to remember/debug
- **Rationale**: Better Auth provides UUIDs by default, which are secure and globally unique.

---

## Testing Strategy

### Manual Testing Approach

#### Test Environment Setup
- Local development environment with WSL2 Ubuntu
- Staging environment mirroring production setup
- Separate databases for development and staging

#### Test Data
- **User 1 (Alice)**: alice@example.com, password: SecurePass123
  - Tasks: "Buy groceries", "Call dentist", "Submit report"
- **User 2 (Bob)**: bob@example.com, password: SecurePass456
  - Tasks: "Walk the dog", "Buy birthday gift"

#### Testing Checklist

##### Authentication Tests (TC-01 to TC-10)
- [ ] TC-01: User can successfully register with valid email and password
- [ ] TC-02: User receives JWT token upon successful registration
- [ ] TC-03: User can log in with registered credentials
- [ ] TC-04: JWT token is stored securely in browser
- [ ] TC-05: User is redirected to dashboard after successful login
- [ ] TC-06: Invalid credentials return 401 Unauthorized
- [ ] TC-07: Expired JWT token returns 401 Unauthorized
- [ ] TC-08: Missing JWT token returns 401 Unauthorized
- [ ] TC-09: Malformed JWT token returns 401 Unauthorized
- [ ] TC-10: User can log out and clear JWT token

##### Task CRUD Tests (TC-11 to TC-21)
- [ ] TC-11: Authenticated user can create task with title
- [ ] TC-12: Authenticated user can create task with title and description
- [ ] TC-13: Task creation fails with empty title
- [ ] TC-14: Authenticated user can retrieve all their tasks
- [ ] TC-15: Authenticated user can retrieve a specific task by ID
- [ ] TC-16: Authenticated user can update task title
- [ ] TC-17: Authenticated user can update task description
- [ ] TC-18: Authenticated user can update task completion status
- [ ] TC-19: Authenticated user can delete a task
- [ ] TC-20: Deleted task is no longer accessible
- [ ] TC-21: All task operations include proper timestamps

##### User Isolation Tests (TC-22 to TC-26)
- [ ] TC-22: User A cannot see User B's tasks
- [ ] TC-23: User A cannot modify User B's tasks
- [ ] TC-24: User A cannot delete User B's tasks
- [ ] TC-25: API returns 403 Forbidden when accessing other user's data
- [ ] TC-26: URL user_id must match JWT token user_id for all operations

##### API Endpoint Tests (TC-27 to TC-35)
- [ ] TC-27: GET /api/{user_id}/tasks returns array of tasks
- [ ] TC-28: POST /api/{user_id}/tasks creates new task and returns it
- [ ] TC-29: GET /api/{user_id}/tasks/{id} returns single task details
- [ ] TC-30: PUT /api/{user_id}/tasks/{id} updates task and returns updated version
- [ ] TC-31: DELETE /api/{user_id}/tasks/{id} removes task and returns success message
- [ ] TC-32: PATCH /api/{user_id}/tasks/{id}/complete toggles completion status
- [ ] TC-33: All endpoints require valid JWT token in Authorization header
- [ ] TC-34: All endpoints return JSON responses
- [ ] TC-35: Error responses follow consistent format: {"detail": "Error message"}

##### Frontend UI Tests (TC-36 to TC-45)
- [ ] TC-36: Login page renders with email/password form
- [ ] TC-37: Signup page renders with email/password/confirm fields
- [ ] TC-38: Dashboard shows user's tasks in list format
- [ ] TC-39: Add task form allows entry of title and description
- [ ] TC-40: Task list shows title, status, and timestamps
- [ ] TC-41: Edit task works inline or via modal
- [ ] TC-42: Delete task shows confirmation before removal
- [ ] TC-43: Mark complete/incomplete shows visual indicator
- [ ] TC-44: Loading states appear during API calls
- [ ] TC-45: Error messages display for failed operations

##### Database Persistence Tests (TC-46 to TC-50)
- [ ] TC-46: Tasks persist across application restarts
- [ ] TC-47: User data persists across application restarts
- [ ] TC-48: Created/updated timestamps are accurate
- [ ] TC-49: Foreign key relationships are enforced
- [ ] TC-50: Database indexes improve query performance

### Validation Checks Mapping Test Cases to sp.specify Acceptance Criteria

- TC-01-05: Validate sp.specify §Authentication Flow (GIVEN new/existing user, WHEN submit credentials, THEN account created/token issued)
- TC-11-21: Validate sp.specify §Task Creation and Management (GIVEN authenticated user, WHEN submit task, THEN saved to database)
- TC-22-26: Validate sp.specify §Data Isolation (GIVEN User A/B with tasks, WHEN User A loads dashboard, THEN sees only own tasks)
- TC-27-35: Validate sp.specify §API Functionality (GIVEN API endpoints, WHEN requests made, THEN proper responses returned)

### Bug Reporting Template

```
Bug Title: [Brief description of the issue]

Environment:
- OS: [WSL2 Ubuntu version]
- Browser: [Browser and version]
- Node.js: [Version]
- Python: [Version]

Steps to Reproduce:
1. [Step 1]
2. [Step 2]
3. [Step 3]

Expected Result: [What should happen]

Actual Result: [What actually happened]

Severity: [Critical/High/Medium/Low]

Additional Notes: [Any other relevant information]
```

---

## Technical Implementation Details

### Implementation Phases (Day 1-14)

#### Phase 1: Project Setup & Scaffolding (Day 1-2)
- **Timeline**: Days 1-2
- **Tasks list**:
  - Set up monorepo structure with frontend/ and backend/ directories
  - Initialize Next.js 16 project with TypeScript and Tailwind CSS
  - Initialize FastAPI project with SQLModel
  - Set up shared specifications directory
  - Configure environment variables
- **Deliverables**:
  - [ ] Complete project structure with frontend and backend scaffolding
  - [ ] Next.js app running on http://localhost:3000
  - [ ] FastAPI app running on http://localhost:8000
  - [ ] Shared specifications directory created
  - [ ] Environment variables configured with .env.example files

#### Phase 2: Authentication Implementation (Day 3-4)
- **Timeline**: Days 3-4
- **Tasks list**:
  - Integrate Better Auth into frontend
  - Implement JWT authentication middleware in backend
  - Create login and signup pages
  - Implement protected routes
  - Test authentication flow
- **Deliverables**:
  - [ ] Better Auth integrated into frontend
  - [ ] JWT middleware validating tokens and checking user ownership
  - [ ] Working login and signup pages
  - [ ] Protected routes enforcing authentication
  - [ ] Successful authentication flow tested

#### Phase 3: Backend API Development (Day 5-7)
- **Timeline**: Days 5-7
- **Tasks list**:
  - Implement all 6 API endpoints (GET, POST, PUT, DELETE, PATCH)
  - Create SQLModel database models
  - Set up database connections and migrations
  - Implement JWT verification middleware
  - Test all endpoints manually
- **Deliverables**:
  - [ ] All 6 API endpoints implemented and functional
  - [ ] SQLModel Task model with proper fields and relationships
  - [ ] Database connection established with Neon PostgreSQL
  - [ ] JWT verification middleware enforcing user ownership
  - [ ] All endpoints tested and working correctly

#### Phase 4: Frontend UI Development (Day 8-11)
- **Timeline**: Days 8-11
- **Tasks list**:
  - Create dashboard layout and navigation
  - Implement task list component
  - Create task management forms (add/edit/delete)
  - Implement task completion toggle
  - Add loading and error states
  - Style components with Tailwind CSS
- **Deliverables**:
  - [ ] Dashboard layout with navigation
  - [ ] Task list displaying all user tasks
  - [ ] Forms for adding, editing, and deleting tasks
  - [ ] Task completion toggle with visual indicators
  - [ ] Loading and error states implemented
  - [ ] All components styled with Tailwind CSS

#### Phase 5: Integration & Testing (Day 12-13)
- **Timeline**: Days 12-13
- **Tasks list**:
  - Connect frontend to backend API
  - Test complete user flows
  - Fix any integration issues
  - Perform comprehensive testing
  - Document any remaining issues
- **Deliverables**:
  - [ ] Frontend successfully connected to backend API
  - [ ] Complete user flows tested and working
  - [ ] Integration issues resolved
  - [ ] Comprehensive testing completed
  - [ ] Remaining issues documented

#### Phase 6: Deployment (Day 14)
- **Timeline**: Day 14
- **Tasks list**:
  - Deploy backend to Railway
  - Deploy frontend to Vercel
  - Configure environment variables in production
  - Test deployed application
  - Prepare demo materials
- **Deliverables**:
  - [ ] Backend deployed to Railway with public URL
  - [ ] Frontend deployed to Vercel with public URL
  - [ ] Environment variables configured in production
  - [ ] Deployed application tested and working
  - [ ] Demo materials prepared

### Development Workflow (AI Agent Driven)

#### How to Use Claude Code/Qwen Code with Spec References
1. Always reference the specific sections of sp.specify and sp.plan
2. Include task numbers in code comments (e.g., `# [Task]: T-XXX`)
3. Reference the source specification in comments (e.g., `[From]: sp.specify §X.X`)
4. Ask for specific implementation details based on the architecture defined in this plan

#### Example Prompts for Generating Code
- "Generate the Next.js login page component based on sp.plan §Authentication Components"
- "Create the FastAPI task routes following sp.plan §API Routes with all 6 endpoints"
- "Implement the JWT authentication middleware per sp.plan §JWT Authentication Middleware"

#### Code Validation Steps
1. Verify all code references the correct task numbers
2. Check that code implements the architecture defined in this plan
3. Ensure compliance with sp.constitution standards
4. Test that all functionality matches sp.specify requirements

#### Iteration Process if Code Incorrect
1. Identify which requirement from sp.specify is not met
2. Provide specific feedback to the AI agent about what needs to be corrected
3. Request regeneration with clearer context about the requirements
4. Validate the corrected code against the specification

#### Using Context7 MCP for Latest Documentation
- Query Context7 for Next.js 16 App Router best practices
- Get FastAPI latest documentation for middleware implementation
- Check SQLModel documentation for proper model definitions

### Quality Validation Checkpoints

#### Specification Completeness Checklist
- [ ] All sp.specify requirements addressed in implementation plan
- [ ] Architecture covers all required functionality
- [ ] Component breakdown complete and detailed
- [ ] API endpoints fully specified with examples

#### Code Quality Checklist
- [ ] All code follows sp.constitution standards
- [ ] Type safety implemented (TypeScript/Python type hints)
- [ ] Error handling comprehensive with meaningful messages
- [ ] No hardcoded secrets in code
- [ ] Consistent naming conventions applied

#### Functionality Checklist
- [ ] All 5 basic features implemented (Add, Delete, Update, View, Mark Complete)
- [ ] User authentication working end-to-end
- [ ] Data isolation between users enforced
- [ ] All 6 API endpoints functional
- [ ] Responsive UI working on mobile and desktop

#### Documentation Checklist
- [ ] README.md files created for frontend and backend
- [ ] CLAUDE.md files updated for AI agents
- [ ] API documentation included
- [ ] Deployment instructions complete
- [ ] Environment variable documentation clear

#### Deployment Checklist
- [ ] Backend deployed and accessible
- [ ] Frontend deployed and accessible
- [ ] Database connected and working
- [ ] Authentication configured correctly
- [ ] All environment variables set properly

#### Demo Checklist
- [ ] User registration flow works
- [ ] User login flow works
- [ ] Task creation works
- [ ] Task updating works
- [ ] Task deletion works
- [ ] Task completion toggle works
- [ ] User isolation verified (different users can't see each other's tasks)

---

## Risk Mitigation

### Issue 1: CORS Errors
- **Symptom**: Frontend cannot communicate with backend API, browser shows CORS errors
- **Cause**: Origin mismatch between frontend and backend, or improper CORS configuration
- **Solution**:
  ```python
  # In backend/main.py
  from fastapi.middleware.cors import CORSMiddleware

  app.add_middleware(
      CORSMiddleware,
      allow_origins=[os.getenv("FRONTEND_URL", "http://localhost:3000")],
      allow_credentials=True,
      allow_methods=["*"],
      allow_headers=["*"],
      # Important: expose authorization header for JWT
      expose_headers=["Access-Control-Allow-Origin", "Authorization"],
  )
  ```
  Also ensure the FRONTEND_URL environment variable matches your actual frontend URL.

### Issue 2: JWT Token Not Sent
- **Symptom**: API requests fail with 401 Unauthorized despite being logged in
- **Cause**: JWT token not properly attached to API request headers
- **Solution**:
  ```typescript
  // In frontend/lib/api.ts
  const getAuthHeaders = () => {
    const token = localStorage.getItem('jwt_token'); // or however token is stored
    return {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    };
  };

  // Use this for all API calls
  const response = await fetch(`${API_BASE_URL}/api/${userId}/tasks`, {
    headers: getAuthHeaders(),
  });
  ```

### Issue 3: Database Connection Fails
- **Symptom**: Application crashes or API endpoints return 500 errors
- **Cause**: Incorrect database URL, network issues, or database not running
- **Solution**:
  ```python
  # In backend/db.py
  import os
  from sqlalchemy import create_engine
  from sqlalchemy.pool import QueuePool

  DATABASE_URL = os.getenv("DATABASE_URL", "postgresql://user:password@localhost/todo_db")

  engine = create_engine(
      DATABASE_URL,
      poolclass=QueuePool,
      pool_size=5,
      max_overflow=10,
      pool_pre_ping=True,  # Validates connections before use
      pool_recycle=300,    # Recreates connections every 5 minutes
  )
  ```
  Ensure the DATABASE_URL environment variable is correctly set with proper credentials.

### Issue 4: Better Auth Setup Complex
- **Symptom**: Authentication not working, users can't register/login
- **Cause**: Misconfigured Better Auth integration
- **Solution**:
  ```typescript
  // Ensure BETTER_AUTH_URL is set in frontend/.env
  // NEXT_PUBLIC_BETTER_AUTH_URL=http://localhost:3000 (or your actual domain)

  // In frontend/lib/auth.ts
  import { BetterAuthClient } from '@better-auth/react';

  const authClient = new BetterAuthClient({
    baseURL: process.env.NEXT_PUBLIC_BETTER_AUTH_URL || 'http://localhost:3000',
  });

  // Make sure BETTER_AUTH_SECRET is the same in both frontend and backend
  ```

### Issue 5: AI Agent Generates Incorrect Code
- **Symptom**: Generated code doesn't match specifications or has logical errors
- **Cause**: Insufficient context provided to AI agent
- **Solution**:
  1. Provide more specific references to sp.specify and sp.plan sections
  2. Include exact requirements in the prompt
  3. Ask for validation against the specifications
  4. Request code with proper task references: `# [Task]: T-XXX` and `[From]: sp.specify §X.X`

---

## Next Steps After sp.plan

1. **Review and Approval**: Team reviews the architecture plan for completeness and feasibility before proceeding to task breakdown
2. **Create sp.tasks**: Generate atomic implementation tasks based on this plan using `/sp.tasks` command
3. **Set up Development Environment**: Ensure WSL2 Ubuntu with required tools (Node.js, Python, uv, etc.) are properly installed
4. **Initialize Git Repository**: Create repository structure with proper branching strategy
5. **Begin Implementation**: Start with Phase 1 (Project Setup & Scaffolding) using AI agents to generate code from sp.tasks
6. **Continuous Validation**: Regularly validate implementation against sp.specify requirements throughout development

---

**Status**: ✅ Architecture Plan Complete
**Next File**: phase2/sp.tasks - Atomic implementation breakdown
**Approval Required**: Yes (review architecture before task breakdown)

---
End of Plan
