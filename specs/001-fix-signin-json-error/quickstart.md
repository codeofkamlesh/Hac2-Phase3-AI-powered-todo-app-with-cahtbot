# Quickstart Guide: Fix Signin JSON Parse Error and Neon DB Table Creation

## Prerequisites
- Python 3.13+
- Node.js 18+ (for frontend)
- Neon PostgreSQL account
- Environment variables configured (.env file)

## Setup

### 1. Clone and Navigate
```bash
cd /mnt/e/Q4 hackathones/Todo-app-with-ai
```

### 2. Backend Setup
```bash
cd phase2/backend
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
```

### 3. Frontend Setup
```bash
cd phase2/frontend
npm install
```

### 4. Environment Configuration
Create `.env` file in the backend directory:
```env
DATABASE_URL=postgresql://username:password@ep-xxx.us-east-1.aws.neon.tech/dbname?sslmode=require
BETTER_AUTH_SECRET=your-secret-key
FRONTEND_URL=http://localhost:3000
```

## Running the Application

### 1. Start Backend
```bash
cd phase2/backend
uvicorn main:app --reload --port 8000
```

### 2. Start Frontend
```bash
cd phase2/frontend
npm run dev
```

## Key Components

### Backend Architecture
- **main.py**: FastAPI application entry point with startup event for table creation
- **db.py**: Database connection with Neon PostgreSQL configuration
- **models.py**: SQLModel definitions for User and Task entities
- **routes/auth.py**: Authentication endpoints (login, signup)
- **routes/tasks.py**: Task management endpoints

### Frontend Architecture
- **app/login/page.tsx**: Login form component with JSON error handling
- **lib/api.ts**: API client with safe JSON parsing and JWT management

## Testing the Fixes

### 1. Verify Neon DB Table Creation
- Check that tables are created on application startup
- Look for "Database tables created successfully!" in backend logs

### 2. Test Login Flow
- Access the login page
- Enter valid credentials
- Verify JSON response is parsed without errors
- Check that JWT token is stored in localStorage

### 3. Verify Data Persistence
- Create tasks and refresh the page
- Confirm tasks persist after refresh (data is stored in Neon DB)

## Troubleshooting

### JSON Parse Errors
- Ensure backend login endpoint returns valid JSON format: `{token, user_id, email}`
- Check frontend has proper try/catch blocks around JSON parsing
- Verify no HTML or error messages are returned instead of JSON

### Database Connection Issues
- Confirm DATABASE_URL has correct format with `sslmode=require`
- Check Neon PostgreSQL connection settings
- Verify psycopg2-binary is installed

### Authentication Problems
- Ensure BETTER_AUTH_SECRET is identical in frontend and backend
- Check JWT token is properly stored and sent with requests
- Verify user_id filtering in task endpoints