# Quickstart Guide: Fix "Module not found: Can't resolve 'lucide-react'" Error + Complete Dark Mode Setup

## Prerequisites

- Node.js 18+ and npm
- Python 3.13+ with uv package manager
- Next.js 16+ with App Router
- TypeScript 5.0+
- Tailwind CSS 3.4+
- FastAPI 0.115+
- SQLModel 0.0.26+
- Neon PostgreSQL database

## Setup Environment

### 1. Install Missing Dependencies

```bash
cd phase2/frontend
npm install next-themes lucide-react
```

```bash
cd phase2/backend
uv pip install fastapi uvicorn sqlmodel python-jose[builtin] passlib[bcrypt] python-multipart python-dotenv
```

### 2. Verify Package Versions

Ensure your package.json includes:
```json
{
  "dependencies": {
    "next-themes": "^0.4.6",
    "lucide-react": "^0.563.0",
    "react": "18.3.1",
    "next": "14.2.35"
  }
}
```

And your backend requirements.txt includes:
```
fastapi>=0.115.0
sqlmodel>=0.0.26
python-jose>=3.3.0
passlib[bcrypt]>=1.7.0
python-multipart>=0.0.9
python-dotenv>=1.0.0
```

## Implementation Steps

### 1. Update Root Layout (phase2/frontend/app/layout.tsx)

Add ThemeProvider wrapper with hydration safety:

```tsx
import { ThemeProvider } from 'next-themes'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
```

### 2. Create Theme Toggle Component

Create `components/ui/ThemeToggle.tsx`:

```tsx
'use client'

import { Moon, Sun } from 'lucide-react'
import { useTheme } from 'next-themes'

import { Button } from '@/components/ui/button'

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()

  return (
    <button
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      className="rounded-full p-2 hover:bg-gray-200 dark:hover:bg-gray-700"
      aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      {theme === 'dark' ? (
        <Sun className="h-5 w-5" />
      ) : (
        <Moon className="h-5 w-5" />
      )}
    </button>
  )
}
```

### 3. Update Navbar Component

Integrate theme toggle in `components/ui/Navbar.tsx`:

```tsx
import { ThemeToggle } from './ThemeToggle'

// In the Navbar component JSX:
<div className="flex items-center space-x-4">
  {/* other navbar elements */}
  <ThemeToggle />
</div>
```

### 4. Create Protected Tasks Page

Create `app/tasks/page.tsx` with authentication check:

```tsx
'use client'

import { useSession } from 'better-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export default function TasksPage() {
  const { data: session, status } = useSession()
  const router = useRouter()

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/signin')
    }
  }, [status, router])

  if (status === 'loading') {
    return <div>Loading...</div>
  }

  if (status === 'unauthenticated') {
    return null // Redirect handled by useEffect
  }

  return (
    <div className="container mx-auto">
      <h1>Tasks Dashboard</h1>
      {/* Task management UI components */}
    </div>
  )
}
```

### 5. Configure Tailwind CSS

Ensure `tailwind.config.ts` has darkMode set to 'class':

```ts
/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class', // Required for next-themes compatibility
  // ... other config
}
```

### 6. Create Backend API Structure

Create the backend API with FastAPI, SQLModel, and JWT authentication:

**main.py**:
```python
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routes import tasks
import os
from dotenv import load_dotenv

load_dotenv()

app = FastAPI(title="Todo API - Phase II")

# CORS Configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow all origins for development
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(tasks.router, prefix="/api")

@app.get("/")
def read_root():
    return {"status": "healthy", "phase": "II", "version": "2.0.0"}
```

**models/task.py**:
```python
from sqlmodel import SQLModel, Field, Relationship
from datetime import datetime
from typing import Optional
import uuid

class Task(SQLModel, table=True):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()), primary_key=True)
    user_id: str = Field(index=True)  # From Better Auth
    title: str = Field(min_length=1, max_length=200)
    description: Optional[str] = Field(default=None, max_length=1000)
    completed: bool = Field(default=False)
    priority: str = Field(default="medium", regex="^(high|medium|low)$")
    tags: Optional[str] = Field(default=None)  # JSON string for array
    due_date: Optional[datetime] = Field(default=None)
    recurring_interval: Optional[str] = Field(default="none", regex="^(none|daily|weekly|monthly)$")
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)
```

**middleware/auth.py**:
```python
from fastapi import HTTPException, status
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from jose import JWTError, jwt
from typing import Optional
import os

SECRET_KEY = os.getenv("BETTER_AUTH_SECRET")
if not SECRET_KEY:
    raise ValueError("BETTER_AUTH_SECRET not set in environment")

ALGORITHM = "HS256"

security = HTTPBearer()

def verify_token(token: str) -> Optional[dict]:
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        user_id: str = payload.get("user_id")
        if user_id is None:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Could not validate credentials"
            )
        return payload
    except JWTError:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Could not validate credentials"
        )

async def get_current_user(credentials: HTTPAuthorizationCredentials = security):
    token = credentials.credentials
    return verify_token(token)
```

## Testing Steps

### 1. Test Build Process

```bash
cd phase2/frontend
npm run dev
```

Expected: No "Module not found: Can't resolve 'lucide-react'" errors

### 2. Test Dark Mode Functionality

1. Open in browser: `http://localhost:3000`
2. Click the dark mode toggle button
3. Expected: Theme switches between light and dark modes smoothly
4. Check console: No hydration mismatch errors

### 3. Test Authentication Protection

1. Open in browser: `http://localhost:3000/tasks`
2. Expected: Redirect to `/signin` if not authenticated
3. After signing in: Should see tasks dashboard with only user's tasks

### 4. Test Task Management Features

1. Add a new task with title and description
2. Expected: Task appears in list with proper validation
3. Toggle task completion: Should update visually with strike-through or completion badge
4. Test priority selection and tag functionality

### 5. Test Backend API

1. Start backend server: `cd phase2/backend && uvicorn main:app --reload --port 8000`
2. Test API endpoints with authenticated requests
3. Expected: Proper JWT validation and user-specific task filtering

### 6. Test Responsive Design

1. Resize browser window
2. Expected: Layout adapts to different screen sizes
3. Theme toggle remains accessible

### 7. Test Existing Features

1. Verify all existing landing page elements are still visible
2. Check hero section, feature cards, and auth buttons
3. Expected: All existing functionality preserved

## Troubleshooting Common Issues

### Module Resolution Error

Problem: "Module not found: Can't resolve 'lucide-react'"
Solution: Verify lucide-react is installed and in package.json dependencies

### Hydration Mismatch Error

Problem: "Text content does not match server-rendered HTML"
Solution: Ensure ThemeProvider is properly configured in root layout with suppressHydrationWarning

### Authentication Failure

Problem: 401/403 errors on protected endpoints
Solution: Verify BETTER_AUTH_SECRET matches between frontend and backend, and JWT is properly attached to requests

### Dark Mode Not Applying

Problem: Tailwind dark: classes not working
Solution: Verify darkMode: 'class' in tailwind.config.ts and attribute="class" in ThemeProvider

### Icons Not Rendering

Problem: Icons don't appear on the page
Solution: Check that icons are properly imported and used as components in JSX

## Quality Assurance

### Visual Validation Checklist
- [ ] Theme toggle button appears in navbar and works correctly
- [ ] Light/dark mode switch works smoothly without flickering
- [ ] Feature card icons (List, Shield, Database, Bot, Lock, Zap) render correctly
- [ ] Icons adapt properly between light and dark themes
- [ ] Protected routes redirect unauthenticated users to signin
- [ ] Task management UI displays properly in both themes
- [ ] Responsive design works in both light and dark modes

### Technical Validation Checklist
- [ ] ThemeProvider wraps entire app with proper configuration
- [ ] suppressHydrationWarning applied to html tag
- [ ] JWT authentication middleware validates tokens correctly
- [ ] API endpoints return appropriate status codes
- [ ] Database models properly defined with SQLModel
- [ ] TypeScript typing is correct throughout
- [ ] No inline styles used (only Tailwind classes)
- [ ] Proper error handling implemented
- [ ] Accessibility attributes present (aria-labels, semantic HTML)
- [ ] No console errors in browser
- [ ] All existing functionality preserved