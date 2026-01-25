---
id: 1
title: auth-route-fix-spec
stage: spec
date: 2026-01-23
surface: agent
model: claude-sonnet-4-5-20250929
feature: auth-route-fix
branch: 003-auth-route-fix
user: claude
command: sp.specify
labels: [authentication, bug-fix, security]
links:
  spec: specs/003-auth-route-fix/spec.md
  ticket: null
  adr: null
  pr: null
files:
 - specs/003-auth-route-fix/spec.md
 - specs/003-auth-route-fix/checklists/requirements.md
tests:
 - specs/003-auth-route-fix/spec.md validation
---
## Prompt

Fix Authentication Routes and Dashboard Token Verification

**Current Bugs:**
1.  **Login 404 Error:** The endpoint `POST /api/auth/login` returns 404 Not Found. This causes a `JSON.parse` error on the client. This suggests the Next.js API route for Better Auth is missing or misconfigured.
2.  **Dashboard Access Denied:** After signup, the user sees the dashboard for 1 second and is then redirected to "Access Denied". This implies that while the session exists on the frontend, the backend API calls are failing verification, likely due to a Secret Key mismatch or improper token passing.

**Requirements to Fix:**
- Ensure the file `frontend/app/api/auth/[...all]/route.ts` exists and correctly initializes Better Auth handler.
- Verify that `BETTER_AUTH_URL` is set to `http://localhost:3000` in environment variables.
- Ensure `BETTER_AUTH_SECRET` matches exactly between Frontend (`.env.local`) and Backend (`.env`).
- Add console logs in the Dashboard component to inspect the session token before making API calls.
- Add print logs in FastAPI Middleware to show *why* a token is rejected (e.g., "Signature verification failed" or "Token missing").

**Success Criteria:**
- Login returns 200 OK.
- Dashboard loads tasks without redirecting to Access Denied.

## Response snapshot

Created a comprehensive specification for fixing authentication routes and dashboard token verification issues. The specification includes:

- Three prioritized user stories covering successful login, secure dashboard access, and proper token verification
- Eight functional requirements addressing the specific authentication issues
- Two key entities (Authentication Token and User Session)
- Four measurable success criteria

The spec addresses both current bugs: the 404 error on login endpoint and the dashboard access denied issue after signup.

## Outcome

- ✅ Impact: Created complete specification for authentication route and token verification fixes
- 🧪 Tests: Specification validation passed all quality criteria
- 📁 Files: Created spec.md and requirements checklist
- 🔁 Next prompts: Ready for planning phase (/sp.plan)
- 🧠 Reflection: Specification clearly defines the authentication problems and their solutions with measurable success criteria

## Evaluation notes (flywheel)

- Failure modes observed: None
- Graders run and results (PASS/FAIL): PASS
- Prompt variant (if applicable): N/A
- Next experiment (smallest change to try): Proceed to planning phase