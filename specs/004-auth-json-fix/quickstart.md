# Quickstart Guide: Authentication Fixes Implementation

## Prerequisites

- Node.js 18+ and npm/yarn/pnpm
- Python 3.13+
- uv (Python package manager)
- Next.js 16+
- FastAPI
- PostgreSQL (Neon DB connection)

## Setup Environment

### 1. Clone and Install Dependencies

```bash
# Install backend dependencies
cd phase2/backend
uv pip install fastapi uvicorn sqlmodel python-jose[builtin] passlib[bcrypt] python-multipart python-dotenv

# Install frontend dependencies
cd ../frontend
npm install
```

### 2. Configure Environment Variables

**Backend** (`phase2/backend/.env`):
```env
DATABASE_URL=postgresql://neondb_owner:npg_E5vOzoNWpS2A@ep-holy-credit-a79uzqo7-pooler.ap-southeast-2.aws.neon.tech/neondb?sslmode=require
BETTER_AUTH_SECRET=your_secret_key_here
FRONTEND_URL=http://localhost:3000
```

**Frontend** (`phase2/frontend/.env.local`):
```env
NEXT_PUBLIC_API_URL=http://localhost:8000
NEXT_PUBLIC_AUTH_URL=http://localhost:3000
BETTER_AUTH_URL=http://localhost:3000
BETTER_AUTH_SECRET=your_secret_key_here
```

**Important**: The `BETTER_AUTH_SECRET` must be identical in both files!

## Running the Application

### 1. Start Backend Server

```bash
cd phase2/backend
uvicorn main:app --reload --port 8000
```

### 2. Start Frontend Server

```bash
cd phase2/frontend
npm run dev
```

## Testing the Authentication Flow

### 1. Verify API Route

Open in browser: `http://localhost:3000/api/auth/session`

Expected: Returns a JSON object (even if null)

### 2. Test Signup

1. Navigate to `http://localhost:3000/signup`
2. Enter valid credentials
3. Verify account creation and redirect

### 3. Test Login

1. Navigate to `http://localhost:3000/login`
2. Enter valid credentials
3. Verify successful login and redirect to dashboard

### 4. Test Dashboard Access

1. After login, verify dashboard loads without "Access Denied"
2. Verify tasks can be loaded and manipulated

## Debugging Common Issues

### JSON Parse Error

Check:
- Backend endpoints return valid JSON responses
- Frontend properly handles JSON parsing with try/catch
- Raw response content in browser dev tools

### 404 Error on Login Endpoint

Check:
- `frontend/app/api/auth/[...all]/route.ts` exists and is properly configured
- Better Auth is correctly initialized

### "Access Denied" on Dashboard

Check:
- BETTER_AUTH_SECRET matches in both env files
- Token is properly stored in localStorage
- Auth middleware logs show specific error reasons

### Backend Console Logs

Look for these debug messages:
- "Sending login response" with token data
- "Signup successful" with user data
- Specific error messages for token validation

### Frontend Console Logs

Look for these debug messages:
- "Login successful, redirecting to dashboard..."
- "Signup successful, redirecting to dashboard..."
- "Token verification successful" or "Token verification failed"

## API Endpoints

### Authentication Endpoints
- `POST /api/auth/signup` - Create new user account
- `POST /api/auth/login` - Authenticate user
- `GET /api/auth/verify` - Verify authentication token
- `GET /api/auth/session` - Get current session (via Better Auth)

### Task Endpoints
- `GET /api/{user_id}/tasks` - Get user's tasks
- `POST /api/{user_id}/tasks` - Create new task
- `PUT /api/{user_id}/tasks/{task_id}` - Update task
- `DELETE /api/{user_id}/tasks/{task_id}` - Delete task
- `PATCH /api/{user_id}/tasks/{task_id}/complete` - Toggle task completion

## Troubleshooting Commands

### Check Environment Variables
```bash
# Backend
cd phase2/backend
python -c "import os; print('SECRET SET' if os.getenv('BETTER_AUTH_SECRET') else 'MISSING')"
```

### Verify Database Connection
```bash
cd phase2/backend
python -c "from db import test_connection; print('Connected!' if test_connection() else 'Failed')"
```

### Check Frontend Build
```bash
cd phase2/frontend
npm run build
```

## JSON Response Format

### Successful Authentication
```json
{
  "token": "jwt_token_here",
  "user": {
    "id": "user_id",
    "email": "user@example.com",
    "name": "User Name"
  },
  "message": "Login successful"
}
```

### Error Response
```json
{
  "error": "Invalid credentials",
  "message": "Error description"
}
```

## Safe JSON Parsing

The frontend implements safe JSON parsing to prevent "JSON.parse: unexpected character" errors:
- All API responses are wrapped in try/catch blocks
- Raw response text is logged for debugging if parsing fails
- Proper error handling for malformed JSON responses