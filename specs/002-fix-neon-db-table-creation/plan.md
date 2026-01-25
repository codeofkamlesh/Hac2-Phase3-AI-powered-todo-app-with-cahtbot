# Implementation Plan: Fix Neon DB Table Creation, User Signup, and Task Fetch Errors

**Branch**: `002-fix-neon-db-table-creation` | **Date**: 2026-01-22 | **Spec**: [link]
**Input**: Feature specification from `/specs/002-fix-neon-db-table-creation/spec.md`

**Note**: This template is filled in by the `/sp.plan` command. See `.specify/templates/commands/plan.md` for the execution workflow.

## Summary

This plan outlines the implementation approach for fixing Neon database table creation, user signup functionality, and task fetch errors in the Todo Evolution Project Phase II. The primary requirements include:

1. **Reliable Database Setup**: Ensure SQLModel metadata.create_all() is called exactly once on application startup to create user and task tables in Neon PostgreSQL with proper fields and indexes.

2. **Secure User Registration**: Implement a signup endpoint that accepts email/password, hashes passwords with bcrypt, stores user data with UUID generation, and returns valid JWT tokens with proper claims.

3. **Secure Task Operations**: Implement JWT-based authentication middleware that verifies tokens, extracts user_id, and filters tasks so users only access their own data.

4. **Robust Frontend**: Fix JSON parsing errors in the frontend API client with proper try/catch handling and implement appropriate error handling for 401 Unauthorized responses.

The technical approach involves extending the existing FastAPI/SQLModel/Next.js stack with proper database connection handling using psycopg binary driver with sslmode=require, implementing JWT authentication with shared BETTER_AUTH_SECRET, and ensuring proper error handling throughout the stack.

## Technical Context

**Language/Version**: Python 3.13+ with FastAPI, SQLModel; TypeScript with Next.js 16, Tailwind CSS
**Primary Dependencies**: FastAPI, SQLModel, psycopg binary driver, bcrypt, python-jose, Next.js, React
**Storage**: Neon Serverless PostgreSQL via SQLModel ORM
**Testing**: pytest for backend unit/integration tests, Jest for frontend
**Target Platform**: Web application (frontend on Vercel, backend on Hugging Face/other cloud provider)
**Project Type**: Full-stack web application (frontend + backend monorepo)
**Performance Goals**: <500ms for database operations, <1000ms for API responses, <3000ms for page loads
**Constraints**: Must maintain user isolation, use JWT tokens for authentication, connect to Neon PostgreSQL with SSL
**Scale/Scope**: Individual user accounts, up to 1000 tasks per user, concurrent user support

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

**SDD Compliance**: ✅ - Following spec-driven development workflow as per constitution
**Architecture**: ✅ - Building on existing Next.js 16 + FastAPI + SQLModel stack per Phase II standards
**Security**: ✅ - Using JWT authentication with BETTER_AUTH_SECRET as per constitution
**AI Agent Collaboration**: ✅ - Using Claude Code for implementation
**Code Quality**: ✅ - Using TypeScript and Python type hints as per standards
**No Manual Coding**: ✅ - All code will be AI-generated via /sp.implement
**Spec Completeness**: ✅ - Validated against complete spec in research phase

## Project Structure

### Documentation (this feature)

```text
specs/002-fix-neon-db-table-creation/
├── plan.md              # This file (/sp.plan command output)
├── research.md          # Phase 0 output (/sp.plan command)
├── data-model.md        # Phase 1 output (/sp.plan command)
├── quickstart.md        # Phase 1 output (/sp.plan command)
├── contracts/           # Phase 1 output (/sp.plan command)
└── tasks.md             # Phase 2 output (/sp.tasks command - NOT created by /sp.plan)
```

### Source Code (web application structure)

```text
phase2/
├── backend/
│   ├── main.py                    # Application startup with database initialization
│   ├── db.py                      # Database connection and engine setup
│   ├── models/
│   │   ├── __init__.py
│   │   ├── user.py                # User model with proper fields
│   │   └── task.py                # Task model with proper fields
│   ├── routes/
│   │   ├── __init__.py
│   │   ├── auth.py                # Signup/login endpoints with JWT generation
│   │   └── tasks.py               # Task endpoints with user_id filtering
│   ├── middleware/
│   │   ├── __init__.py
│   │   └── auth_middleware.py     # JWT verification and user_id extraction
│   ├── services/
│   │   ├── __init__.py
│   │   ├── user_service.py        # User registration and authentication logic
│   │   └── task_service.py        # Task management with user isolation
│   ├── utils/
│   │   ├── __init__.py
│   │   ├── security.py            # Password hashing utilities
│   │   └── jwt_utils.py           # JWT token generation and verification
│   └── tests/
│       ├── conftest.py
│       ├── test_auth.py
│       └── test_tasks.py
├── frontend/
│   ├── app/
│   │   ├── login/
│   │   │   ├── page.tsx           # Login page with proper error handling
│   │   │   └── components/
│   │   │       └── LoginForm.tsx  # Login form with JSON parsing safety
│   │   ├── signup/
│   │   │   ├── page.tsx           # Signup page
│   │   │   └── components/
│   │   │       └── SignupForm.tsx # Signup form with error handling
│   │   └── dashboard/
│   │       ├── page.tsx           # Dashboard page
│   │       └── components/
│   │           └── TaskList.tsx   # Task list with proper API error handling
│   ├── lib/
│   │   ├── api.ts                 # Updated API client with JWT and JSON safety
│   │   └── types.ts               # Updated type definitions
│   ├── components/
│   │   └── AuthGuard.tsx          # Component to protect authenticated routes
│   └── hooks/
│       └── useAuth.ts              # Authentication state management
└── shared/
    └── constants.ts                # Shared constants like API endpoints
```

**Structure Decision**: Web application with full-stack implementation following Next.js 16 App Router conventions and FastAPI best practices. The structure separates concerns with dedicated models, services, routes, and middleware layers for maintainability and testability. Database initialization happens in main.py with proper error handling and connection management for Neon PostgreSQL.

## Complexity Tracking

> **Fill ONLY if Constitution Check has violations that must be justified**

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|
| [e.g., 4th project] | [current need] | [why 3 projects insufficient] |
| [e.g., Repository pattern] | [specific problem] | [why direct DB access insufficient] |
