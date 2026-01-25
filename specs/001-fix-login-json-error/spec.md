# Feature Specification: Fix Login JSON Parse Error and Ensure Proper Auth Flow

**Feature Branch**: `001-fix-login-json-error`
**Created**: 2026-01-22
**Status**: Draft
**Input**: User description: "PhaseII:FixLoginJSONParseErrorAndEnsureProperAuthFlowforTodoEvolutionProject.CreateaseparatefolderforPhase2authfixspecsifneeded,e.g.,/phases/phase2/specs/andoutputthespecfilethere.Avoidvibecoding;followstrictAgenticDevStackworkflowwithSpec-KitPluscommands.Useexistingagents/skillsfrom.claude/agents/(e.g.,APIEndpointCreatorforauthroutes,AuthenticationValidatorforJWT,FrontendComponentBuilderforloginform)toaccelerateandimprovequality;ifnotavailable,generateasusual.Specifyfixesfor"JSON.parse:unexpectedcharacteratline1column1oftheJSONdata"erroronfrontendduringloginand404on/api/auth/login:ensurebackendloginendpoint(/api/auth/login)exists,acceptsPOSTwithemail/password,queries"user"tablebyemail,verifiespasswordwithpasslibbcrypt,generatesvalidJWTwithuser_id/sub/expusingsharedBETTER_AUTH_SECRET,returnsproperJSONresponse({token:string,user:{id,email,name}})with200status;fixfrontendloginform:sendcorrectPOSTrequestto/api/auth/loginwithJSONbody{email,password},parsevalidJSONresponsewithtry/catch,storetokeninlocalStorage,redirecttodashboardon success,showcleareerrormessageonfailure;ensuretokenattachedtoeveryAPIcallvia/lib/api.tswithAuthorization:Bearer{token},backendmiddlewareverifies/decodesJWTcorrectly,setsrequest.state.user_id;fixtablecreation:ensureSQLModelmetadata.create_all(engine)calledonstartup,NeonDBtables(user,tasks)existwithproperfields(UUIDuser_id,hashed_password,etc.).Implementationtargetonly/phases/phase2/backend/routes/auth.py,middleware/and/phases/phase2/frontend/app/login/page.tsx,lib/api.ts;nochangesinPhase1orotherfiles.Modular,clean,PEP8/TSLintcompliant.Generateupdatedcodeinrespectivefoldersreadytoexecutewithuvicornsrc.main:app--reloadandnpmrundev;testend-to-end:loginreturnscorrectJSON,parseswithouterror,redirectstodashboard,tasksfetchworksafterauth,NeonDBuserrecordexists."

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Successful Login Without JSON Parsing Errors (Priority: P1)

As a user, I want to log in to the application without encountering JSON parsing errors so that I can access my dashboard and tasks. This involves entering my email and password on the login form and being redirected to the dashboard upon successful authentication.

**Why this priority**: This is the most critical user journey as it's the entry point to the application. Without a working login flow, users cannot access any functionality.

**Independent Test**: Can be fully tested by accessing the login page, entering valid credentials, and verifying successful redirect to the dashboard with no JSON parsing errors.

**Acceptance Scenarios**:

1. **Given** I am on the login page with valid credentials, **When** I submit the login form, **Then** I am redirected to the dashboard without any JSON parsing errors
2. **Given** I am on the login page with invalid credentials, **When** I submit the login form, **Then** I see a clear error message without JSON parsing errors

---

### User Story 2 - Backend Login Endpoint Availability (Priority: P1)

As a frontend application, I need the backend login endpoint to be available and return proper JSON responses so that I can authenticate users successfully.

**Why this priority**: Critical for the login functionality to work. The backend endpoint must exist and respond with valid JSON.

**Independent Test**: Can be fully tested by sending POST requests to the /api/auth/login endpoint and verifying proper JSON responses.

**Acceptance Scenarios**:

1. **Given** valid email and password are sent to /api/auth/login, **When** the endpoint receives the request, **Then** it returns a 200 status with proper JSON response containing token and user data
2. **Given** invalid email or password are sent to /api/auth/login, **When** the endpoint receives the request, **Then** it returns a 401 status with proper JSON error response

---

### User Story 3 - Secure Authentication Flow with JWT (Priority: P2)

As a user, I want my authentication to be secure using JWT tokens so that my session is properly maintained throughout my usage of the application.

**Why this priority**: Important for security and maintaining user sessions. JWT tokens must be properly generated, stored, and used for subsequent API calls.

**Independent Test**: Can be tested by logging in, storing the JWT token, and using it for subsequent API calls to verify authentication works correctly.

**Acceptance Scenarios**:

1. **Given** I successfully log in, **When** the login response is received, **Then** a valid JWT token is stored in localStorage
2. **Given** I have a valid JWT token, **When** I make API calls, **Then** the Authorization header contains the Bearer token and requests are authenticated

---

### User Story 4 - Proper Database Table Creation (Priority: P2)

As a system, I need the user and task tables to be properly created in the database so that user data can be stored and retrieved correctly.

**Why this priority**: Critical for the persistence layer to function correctly. Without proper tables, authentication cannot work.

**Independent Test**: Can be tested by checking that the SQLModel metadata.create_all() is called on startup and tables exist with proper fields.

**Acceptance Scenarios**:

1. **Given** the application starts up, **When** the startup process completes, **Then** the user and task tables exist in the database with proper fields
2. **Given** a user registers, **When** the user record is saved, **Then** it is stored with proper UUID, hashed password, and other required fields

---

### Edge Cases

- What happens when the database is temporarily unavailable during login?
- How does the system handle malformed JSON responses from the backend?
- What occurs when the JWT token expires during a session?
- How does the system handle network timeouts during login?
- What happens when localStorage is disabled in the browser?

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: System MUST have a working backend login endpoint at /api/auth/login that accepts POST requests
- **FR-002**: System MUST accept email and password in the request body as JSON
- **FR-003**: System MUST query the "user" table by email to find the user record
- **FR-004**: System MUST verify the password using bcrypt hashing
- **FR-005**: System MUST generate a valid JWT token with user_id, sub, and exp claims using BETTER_AUTH_SECRET
- **FR-006**: System MUST return proper JSON response with format {token: string, user: {id: string, email: string, name: string}} on successful login
- **FR-007**: System MUST return 200 status on successful login with valid JSON response
- **FR-008**: System MUST return appropriate error responses with proper JSON format for failed login attempts
- **FR-009**: Frontend MUST send correct POST request to /api/auth/login with JSON body {email, password}
- **FR-010**: Frontend MUST parse JSON responses safely with try/catch to prevent JSON.parse errors
- **FR-011**: Frontend MUST store the JWT token in localStorage after successful login
- **FR-012**: Frontend MUST redirect to dashboard on successful login
- **FR-013**: Frontend MUST show clear error messages to users on login failure
- **FR-014**: System MUST attach JWT token to every API call via Authorization: Bearer {token} header
- **FR-015**: Backend middleware MUST verify and decode JWT tokens correctly
- **FR-016**: Backend middleware MUST set request.state.user_id for authenticated requests
- **FR-017**: System MUST ensure SQLModel metadata.create_all(engine) is called on application startup
- **FR-018**: System MUST create user and task tables in NeonDB with proper fields (UUID user_id, hashed_password, etc.)
- **FR-019**: System MUST handle JSON parsing errors gracefully without crashing the frontend
- **FR-020**: System MUST validate that all required database tables exist before allowing user operations

### Key Entities *(include if feature involves data)*

- **User**: Represents an authenticated user with fields: id (UUID), email (string), name (string), hashed_password (string), created_at (DateTime), updated_at (DateTime)
- **JWT Token**: Represents an authentication token with claims: sub (user_id), exp (expiration), and signed with BETTER_AUTH_SECRET

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: Users can log in successfully without encountering JSON.parse errors
- **SC-002**: The /api/auth/login endpoint returns valid JSON responses with 200 status for valid credentials
- **SC-003**: Login form correctly sends POST request with proper JSON body and headers
- **SC-004**: JWT tokens are properly generated, stored, and used for API authentication
- **SC-005**: Database tables (user, tasks) are created properly on application startup
- **SC-006**: All API calls include proper Authorization header with JWT token
- **SC-007**: Failed login attempts return appropriate error messages without JSON parsing errors
- **SC-008**: Users are redirected to dashboard after successful login
- **SC-009**: User data persists correctly in NeonDB with proper field types
- **SC-010**: End-to-end login flow works correctly: login returns JSON, parses without error, redirects to dashboard, and tasks fetch work after auth