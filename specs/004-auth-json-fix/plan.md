# Implementation Plan: Phase II - Fix Login JSON Parse Error And Signup Redirect Issues for Todo Evolution Project

**Branch**: `004-auth-json-fix` | **Date**: 2026-01-23 | **Spec**: [link to spec.md](spec.md)
**Input**: Feature specification from `/specs/004-auth-json-fix/spec.md`

**Note**: This template is filled in by the `/sp.plan` command. See `.specify/templates/commands/plan.md` for the execution workflow.

## Summary

Address critical authentication issues in Phase II of the Todo Evolution Project: JSON parse errors during login and signup redirect problems. Implementation will focus on stable login/signup redirects and proper JSON handling between frontend and backend, following the backend login flow (POST /api/auth/login → query user by email → verify hashed password → generate JWT → return JSON {token, user}) and frontend handling (send JSON {email, password} → parse valid JSON response → store token → redirect to dashboard).

## Technical Context

**Language/Version**: Python 3.13 (backend), TypeScript 5.0+ (frontend)
**Primary Dependencies**: FastAPI (backend), Next.js 16 with App Router (frontend), Better Auth, SQLModel ORM, Neon PostgreSQL
**Storage**: Neon Serverless PostgreSQL database with JWT token storage in localStorage
**Testing**: Manual testing with API validation and end-to-end flow verification
**Target Platform**: Web application (Next.js frontend on Vercel, FastAPI backend on Hugging Face)
**Project Type**: Web application (monorepo with frontend/backend separation)
**Performance Goals**: < 500ms for auth operations, consistent JSON responses without parsing errors
**Constraints**: JWT-based authentication, environment-based secrets, CORS-restricted API
**Scale/Scope**: Multi-user application with proper user isolation and authentication

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

- [X] Follows spec-driven development principles (no manual coding)
- [X] Maintains clean separation between frontend and backend
- [X] Uses JWT-based authentication as per constitution
- [X] Stores secrets in environment variables, not hardcoded
- [X] Follows async patterns for all I/O operations
- [X] Implements comprehensive error handling
- [X] Uses consistent naming conventions (camelCase for TS, snake_case for Python)

## Project Structure

### Documentation (this feature)

```text
specs/004-auth-json-fix/
├── plan.md              # This file (/sp.plan command output)
├── research.md          # Phase 0 output (/sp.plan command)
├── data-model.md        # Phase 1 output (/sp.plan command)
├── quickstart.md        # Phase 1 output (/sp.plan command)
├── contracts/           # Phase 1 output (/sp.plan command)
└── tasks.md             # Phase 2 output (/sp.tasks command - NOT created by /sp.plan)
```

### Source Code (repository root)

```text
backend/
├── routes/
│   └── auth.py          # Authentication endpoints (POST /api/auth/login, POST /api/auth/signup)
├── middleware/
│   └── auth_middleware.py # JWT validation middleware
├── models/
│   └── user.py          # User model with email, password hashing
├── utils/
│   ├── jwt_utils.py     # JWT token utilities
│   └── security.py      # Password verification utilities
├── db.py                # Database connection
└── main.py              # FastAPI application entry point

frontend/
├── app/
│   ├── api/
│   │   └── auth/
│   │       └── [...all]/
│   │           └── route.ts  # Better Auth handler
│   ├── login/
│   │   └── page.tsx     # Login form page
│   ├── signup/
│   │   └── page.tsx     # Signup form page
│   └── dashboard/
│       └── page.tsx     # Protected dashboard page
├── lib/
│   ├── api.ts           # API client with auth handling and safe JSON parsing
│   └── types.ts         # TypeScript type definitions
└── hooks/
    └── useAuth.ts       # Authentication hook for dashboard protection
```

**Structure Decision**: Web application structure with clear separation between frontend and backend components, following the monorepo approach specified in the constitution.

## Phase 0: Research

### Backend Login Flow Research
- Decision: Current backend login flow follows FastAPI pattern with Pydantic models
- Rationale: Uses established FastAPI conventions with proper request/response validation
- Alternatives considered: Different auth libraries, direct DB queries

### Frontend Form Handling Research
- Decision: Next.js forms use proper POST requests with try/catch for JSON parsing
- Rationale: Follows Next.js best practices with error handling
- Alternatives considered: Different form libraries, direct fetch APIs

### Redirect Mechanism Research
- Decision: Use Next.js router.push for programmatic redirects
- Rationale: Provides better control than href-based navigation
- Alternatives considered: Link component, window.location

## Phase 1: Data Model & Contracts

### Key Entities
- **User**: email (unique), password (hashed), name, created_at, updated_at
- **JWT Token**: user_id, email, exp (expiration), sub (subject), iat (issued at)
- **Auth Response**: {token: string, user: {id, email, name}}

### API Contracts
- **POST /api/auth/login**: Expects {email, password}, returns {token, user} or {error: message}
- **POST /api/auth/signup**: Expects {email, password, name}, returns {token, user} or {error: message}
- **GET /api/auth/verify**: Expects Authorization header, returns user info or 401

## Phase 2: High-Level Architecture

### Backend Login Flow
```
POST /api/auth/login
  ↓
Query user by email
  ↓
Verify hashed password (using passlib)
  ↓
Generate JWT with user_id/sub/exp
  ↓
Return JSON {token, user: {id, email, name}}
```

### Frontend Login Flow
```
Login form sends JSON {email, password}
  ↓
Try/catch JSON parsing of response
  ↓
Store token in localStorage
  ↓
Redirect to dashboard using router.push
```

### Signup Flow
```
POST /api/auth/signup
  ↓
Check for duplicate email
  ↓
Create user and commit to DB
  ↓
Generate JWT
  ↓
Return JSON {token, user}
  ↓
Store token and redirect to dashboard
```

## Fixes Implementation Strategy

### Backend Fixes
1. **Login/Signup endpoints return valid JSON 200/400**:
   - Ensure consistent response format {token, user} or {error: message}
   - Proper status codes (200 for success, 400 for validation errors, 401 for auth errors)

2. **Proper error handling**:
   - Handle duplicate emails in signup
   - Validate input with Pydantic models
   - Return meaningful error messages

### Frontend Fixes
1. **Forms: proper POST requests with try/catch JSON parsing**:
   - Send proper JSON content-type headers
   - Wrap JSON parsing in try/catch blocks
   - Handle "already registered" errors appropriately

2. **Redirect on success**:
   - Use Next.js router.push for programmatic redirects
   - Ensure redirects happen after successful auth

### Protected Routes
1. **Dashboard auth check with token**:
   - Verify token exists and is valid
   - If invalid, show "Access Denied" and redirect to login

## Key Decisions Requiring Documentation

### JWT Payload Structure Decision
- **Choice**: Include full user object {id, email, name} in JWT payload
- **Trade-offs**:
  - Minimal (user_id only): Smaller tokens, requires DB lookup
  - Full user data: Larger tokens, no DB lookup needed
- **Decision**: Full user data for better performance at slight size cost

### JSON Response Format Decision
- **Choice**: Use {token, user} format instead of {access_token, refresh_token}
- **Trade-offs**:
  - Compatibility: Matches existing frontend expectations
  - Standards: Less standard but simpler for this use case
- **Decision**: {token, user} for compatibility with current codebase

### Redirect Method Decision
- **Choice**: Use router.push (programmatic) vs Link (declarative)
- **Trade-offs**:
  - Programmatic: More control, conditional redirects
  - Declarative: Simpler, SEO-friendly
- **Decision**: router.push for better control over redirect logic

### 404 Handling Decision
- **Choice**: Custom error page vs redirect to login
- **Trade-offs**:
  - User-friendly: Show helpful error message
  - Strict: Redirect to force re-authentication
- **Decision**: Show Access Denied page with login link

## Testing Strategy

### Backend Validation
- Login/signup endpoints return valid JSON
- 200 status on success, 400 on duplicate/invalid input
- Proper error messages returned

### Frontend Validation
- JSON parse tests: handle valid/invalid responses
- Error display: show appropriate messages to users
- Redirect tests: verify proper navigation after auth

### End-to-End Testing
- Signup creates user without duplicate error
- Login without JSON parse error
- Redirects to dashboard without 404
- Tasks load properly on dashboard
- Neon DB user creation verified

## Technical Implementation Details

### Backend Technologies
- FastAPI for login/signup endpoints
- Pydantic models for request/response validation
- Passlib for password verification (bcrypt)
- JWT with shared secret for token generation
- SQLModel for database operations

### Frontend Technologies
- Next.js login/signup pages with form handling
- Proper POST requests with JSON content
- Try/catch blocks for JSON parsing
- localStorage for token storage
- router.push for redirects to dashboard
- Protected dashboard with useEffect auth check

## High-Level Sequencing

1. **Fix backend login/signup endpoints** - Ensure they return valid JSON with proper status codes
2. **Fix frontend forms** - Implement proper POST requests and JSON parsing with error handling
3. **Fix signup duplicate check and error handling** - Prevent duplicate registrations with proper messages
4. **Fix redirect logic and dashboard auth check** - Eliminate 404 errors and ensure stable access
5. **Test end-to-end flow** - Verify signup → login → dashboard access without errors

## Non-Functional Requirements

### Performance
- API response time < 500ms for auth operations
- Token verification should not add significant latency
- Database queries properly indexed

### Reliability
- Maintain 99% uptime for auth services
- Graceful error handling for network issues
- Consistent JSON response format

### Security
- JWT tokens must be properly validated
- Passwords stored securely with bcrypt
- Secret keys must match between frontend and backend
- Prevent unauthorized access to protected routes

## Risk Analysis and Mitigation

### Risk 1: Authentication Flow Breakage
- **Impact**: Users unable to login/signup
- **Mitigation**: Thorough testing of auth flow before deployment
- **Blast Radius**: All authentication operations

### Risk 2: JSON Parsing Issues
- **Impact**: Client-side errors during auth
- **Mitigation**: Proper try/catch blocks and response validation
- **Blast Radius**: Frontend authentication experience

## Evaluation and Validation

### Definition of Done
- [ ] Backend login/signup return valid JSON 200/400 responses
- [ ] Frontend properly handles JSON parsing with error handling
- [ ] Signup prevents duplicate registrations with proper error messages
- [ ] Redirects work without 404 errors
- [ ] Dashboard authenticates properly without access denied issues
- [ ] End-to-end flow works: signup → login → dashboard access

### Output Validation
- Test auth flow: signup → login → dashboard access
- Verify JSON response formats are consistent
- Confirm error handling works for invalid inputs
- Validate tokens are stored and used properly