# Feature Specification: Fix Neon DB Table Creation, User Signup, and Task Fetch Errors

**Feature Branch**: `002-fix-neon-db-table-creation`
**Created**: 2026-01-22
**Status**: Draft
**Input**: User description: "PhaseII:FixNeonDBTableCreationUserSignupAndTaskFetchErrorsforTodoEvolutionProject.CreateaseparatefolderforPhase2connectionfixplanifneeded,e.g.,/phases/phase2/plan/andoutputtheplanfilethere.Avoidvibecoding;followstrictAgenticDevStackworkflowwithSpec-KitPluscommands.Generatehigh-levelplanfromtheupdatedfixespec(@phases/phase2/specs/spec.md),includingarchitecturesketch(backendstartupflow:loadDATABASE_URLfrom.env,createenginewithpsycopg[binary]driver+sslmode=require+connecttimeout+pool,reconnectlogiconfailure,callSQLModel.metadata.create_all(engine)exactlyonceonappstartup;authflow:frontend→BetterAuthsignup/registerendpoint→createuserin\"user\"tablewithcommit→generateJWTwithuser_id/exp→returnJSON{token};taskfetch:/api/tasks→middlewareverifyJWT→extractuser_id→filtertasksbyuser_id→returnJSONarrayevenempty),sectionstructure(fixesfirst:NeonDBtableautocreationonstartupwithcommit,userregistrationwithstableJWTreturn,401Unauthorizedon/api/tasks,JSON.parseerrorsonfrontend;thenensurefullend-to-end:signupcreatesuserintable,loginsucceeds,tasksfetch/add/update/deletework),decisionsneedingdocumentation(choiceslikeSQLModelautocreatevsalembicmigrations,tradeoffs:simplicityvscontrol;psycopgbinaryvspsycopg2,tradeoffs:compatibilityvsbinarysize;JWTtokenreturnformat,tradeoffs:plainstringvs{token};errorhandlinginfrontendapi.ts,tradeoffs:try/catchvsglobalinterceptor;401redirecttologinvsalert,tradeoffs:userexperiencevsflow),testingstrategy(validationchecksperacceptancecriteria:backendstartuptestforenginecreationandtableexistenceinNeonDB;signuptest:createsuserrecordwithUUID,hashed_password,returnsvalidJWT;logintest:verifiesJWT,returnsuserdata;taskfetchtest:returns200with[]whenempty,filteredbyuser_id;frontendJSONparsetest:handlesvalid/invalidresponses,showsloading/errorstates;end-to-endmanualtest:signup→login→addtask→view/update/delete→tablesvisibleinNeonDB),technicaldetails(useFastAPIwithSQLModelNeonPostgreSQL(psycopgbinarydriver,connect_argssslmode=require,timeout,reconnectlogic),callmetadata.create_allonstartupinmain.py;BetterAuthJWTpluginsharedsecret,registerendpointcreatesuserandreturns{token};backendmiddlewareverifies/decodesJWT,setsrequest.state.user_id;APIendpointsfilterbyuser_id;frontend/lib/api.tsattachesAuthorization:Bearer{token}fromlocalStorage,try/catchJSONparse,handles401withredirect).High-levelsequencing(1.fixbackendDBconnectionandautocreatetables,2.fixsignupendpointtoreturnvalidJSONtoken,3.fixJWTverificationmiddlewareanduser_idfiltering,4.fixfrontendapi.tsforpropertokenattachanderrorhandling,5.testend-to-endsignup/login/taskCRUDwithNeonDBverification,6.resolveanyremaining401/JSONerrors).IncludeASCIIarchitecturediagram(authflow,DBstartupflow,APIrequestflow).Modular,extensible,professionalcodewithfocusonstableNeonDBtablecreation,successfulsignup,anderror-freefrontend-backendconnection."

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Successful User Registration and Database Persistence (Priority: P1)

As a new user, I want to register for the application and have my account properly stored in the Neon database so that I can access my tasks and data across sessions. This involves providing my email and password, creating an account, and having my user record persisted in the database with proper UUID and hashed password.

**Why this priority**: This is the most critical user journey as it establishes the foundation for the entire authentication system. Without proper user registration and database persistence, the application cannot function.

**Independent Test**: Can be fully tested by registering a new user and verifying that the user record exists in the Neon database with proper fields.

**Acceptance Scenarios**:

1. **Given** I am a new user on the signup page, **When** I enter valid email and password and submit the form, **Then** a user record is created in the database with UUID, hashed password, and returns a valid JWT token
2. **Given** I have registered previously, **When** I attempt to register with the same email, **Then** I receive an appropriate error message indicating the email already exists

---

### User Story 2 - Reliable Neon Database Table Creation on Startup (Priority: P1)

As a system administrator, I want the application to automatically create required database tables on startup so that the application functions properly without manual database setup.

**Why this priority**: Critical for the application to function correctly. Without proper table creation, no data can be stored or retrieved.

**Independent Test**: Can be tested by starting the application and verifying that the required tables (users, tasks) exist in the Neon database.

**Acceptance Scenarios**:

1. **Given** the application starts up, **When** the startup process completes, **Then** the required tables (user, task) exist in the Neon database with proper fields and indexes
2. **Given** tables already exist in the database, **When** the application starts up, **Then** no errors occur and existing tables remain intact

---

### User Story 3 - Secure Task Fetch with Proper Authentication (Priority: P2)

As a logged-in user, I want to fetch my tasks securely with proper JWT authentication so that I can only access my own tasks and not other users' data.

**Why this priority**: Important for data security and user privacy. Users must only see their own tasks.

**Independent Test**: Can be tested by logging in, fetching tasks, and verifying that only tasks belonging to the authenticated user are returned.

**Acceptance Scenarios**:

1. **Given** I am logged in with a valid JWT token, **When** I fetch tasks from /api/tasks, **Then** only tasks belonging to my user_id are returned
2. **Given** I have an invalid or expired JWT token, **When** I attempt to fetch tasks from /api/tasks, **Then** I receive a 401 Unauthorized response

---

### User Story 4 - Error-Free JSON Parsing in Frontend (Priority: P2)

As a user, I want the frontend to handle JSON parsing errors gracefully so that the application doesn't crash when receiving malformed responses from the backend.

**Why this priority**: Critical for user experience. JSON parsing errors can cause the entire application to crash, preventing users from using the application.

**Independent Test**: Can be tested by simulating various JSON responses (valid, invalid, empty) and verifying proper error handling.

**Acceptance Scenarios**:

1. **Given** the backend returns valid JSON, **When** the frontend receives the response, **Then** the JSON is parsed successfully without errors
2. **Given** the backend returns invalid or malformed JSON, **When** the frontend receives the response, **Then** appropriate error handling occurs without application crashes

---

### Edge Cases

- What happens when the Neon database connection fails during startup?
- How does the system handle concurrent user registrations?
- What occurs when the JWT token expires mid-session during task operations?
- How does the system handle network timeouts during database operations?
- What happens when the database returns unexpected data formats?

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: System MUST load DATABASE_URL from environment variables on startup
- **FR-002**: System MUST create database engine with psycopg binary driver and sslmode=require
- **FR-003**: System MUST call SQLModel.metadata.create_all(engine) exactly once on application startup
- **FR-004**: System MUST create user table with proper fields (UUID id, email, name, hashed_password, created_at, updated_at)
- **FR-005**: System MUST create task table with proper fields (UUID id, title, description, completed, user_id, created_at, updated_at)
- **FR-006**: Signup endpoint MUST accept email/password and return valid JWT token with user_id and expiration
- **FR-007**: Signup endpoint MUST hash passwords using bcrypt before storing in database
- **FR-008**: Signup endpoint MUST store user data with UUID generation and proper commit
- **FR-009**: JWT middleware MUST verify and decode tokens correctly using shared BETTER_AUTH_SECRET
- **FR-010**: API endpoints MUST filter tasks by user_id extracted from JWT token
- **FR-011**: Frontend API client MUST attach Authorization: Bearer {token} header to authenticated requests
- **FR-012**: Frontend MUST handle JSON parsing with try/catch to prevent crashes
- **FR-013**: Frontend MUST redirect to login page on 401 Unauthorized responses
- **FR-014**: System MUST handle database connection failures with proper reconnection logic
- **FR-015**: System MUST validate that required database tables exist before allowing user operations
- **FR-016**: Signup endpoint MUST return proper JSON responses with consistent format
- **FR-017**: Task endpoints MUST return empty arrays when no tasks exist for user
- **FR-018**: System MUST enforce user isolation - users can only access their own data
- **FR-019**: Database connections MUST have proper timeout and pool settings for Neon
- **FR-020**: System MUST handle concurrent database operations safely

### Key Entities *(include if feature involves data)*

- **User**: Represents an authenticated user with fields: id (UUID), email (string), name (string), hashed_password (string), created_at (DateTime), updated_at (DateTime)
- **Task**: Represents a user's task with fields: id (UUID), title (string), description (string), completed (boolean), user_id (UUID), created_at (DateTime), updated_at (DateTime)
- **JWT Token**: Represents an authentication token with claims: sub (user_id), exp (expiration), and signed with BETTER_AUTH_SECRET

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: Database tables (user, task) are created automatically on application startup
- **SC-002**: User registration returns valid JWT token with proper user data
- **SC-003**: User records are persisted in Neon database with UUID and hashed passwords
- **SC-004**: Task fetch operations return only tasks belonging to authenticated user
- **SC-005**: Frontend handles JSON parsing without crashes or errors
- **SC-006**: 401 Unauthorized responses redirect to login page
- **SC-007**: Database connections handle timeouts and reconnection properly
- **SC-008**: End-to-end flow works: signup → login → create task → fetch tasks
- **SC-009**: User isolation is enforced - users only see their own data
- **SC-010**: Application handles edge cases gracefully without crashes