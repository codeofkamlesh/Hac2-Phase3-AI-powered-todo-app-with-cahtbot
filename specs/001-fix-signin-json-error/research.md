# Research: Fix Signin JSON Parse Error and Neon DB Table Creation

## Decision: JSON Response Format for Login Endpoint
**Rationale**: The spec requires the login endpoint to return a valid JSON response with format {token: validJWT, user_id: string, email: string} after successful authentication. This ensures frontend can properly parse the response without JSON parsing errors.
**Alternatives considered**: Alternative formats like {"data": {...}} wrapper or omitting email were considered but the spec specifically requires this format.

## Decision: Safe JSON Parsing in Frontend
**Rationale**: The frontend must parse JSON responses safely with try/catch blocks to prevent JSON parsing errors. This is critical for handling edge cases where the backend might return unexpected content.
**Alternatives considered**: Using JSON.parse directly without error handling (unsafe), or using third-party libraries like json-parse-safe were considered but try/catch is the standard approach.

## Decision: Neon Database Connection Configuration
**Rationale**: The database connection must use psycopg2 driver with sslmode=require for Neon compatibility. This ensures secure connections to Neon PostgreSQL.
**Alternatives considered**: Using standard psycopg2 vs psycopg2-binary, different SSL modes were considered but sslmode=require is required for Neon.

## Decision: SQLModel Metadata Creation
**Rationale**: Using SQLModel.metadata.create_all(engine) on startup ensures tables are created automatically. This is essential for proper Neon DB table creation.
**Alternatives considered**: Manual table creation vs Alembic migrations vs SQLModel autogenerate. For simplicity and alignment with the spec, direct metadata creation is chosen.

## Decision: Session Commit Strategy
**Rationale**: Each database operation must include session.commit() to ensure data persistence. This addresses the core issue of data not persisting after refresh.
**Alternatives considered**: Transaction scopes vs individual commits. Individual commits are chosen for simplicity and immediate persistence.

## Decision: JWT Token Management
**Rationale**: JWT tokens must be stored in localStorage and include user_id with 7-day expiration. This ensures proper user session management.
**Alternatives considered**: Using cookies vs localStorage vs sessionStorage. localStorage is already implemented and works for this use case.

## Decision: Error Handling Strategy
**Rationale**: Frontend must display appropriate error messages when login fails, without showing technical JSON parsing errors to users.
**Alternatives considered**: Showing raw error messages vs user-friendly messages. User-friendly messages are chosen for better UX.