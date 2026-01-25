# Hackathon II - The Evolution of Todo: Mastering Spec-Driven Development & Cloud Native AI Constitution

## Core Principles

### 1. Spec-Driven Development Only
- **No manual coding allowed** - All code must be generated via AI agents (Claude Code, Qwen Code, CCR)
- **Specification-first approach** - Write complete specs before any implementation using Spec-Kit Plus
- **Iterative refinement** - Refine specs until AI generates correct output without errors
- **Traceable implementation** - Every code change must reference a spec section and task ID
- **Refine specs until Claude Code generates correct output** - Use /sp.specify, /sp.plan, /sp.tasks, /sp.implement commands with full details in prompts

### 2. Reusable Intelligence & AI Collaboration
- **MCP protocol** - AI agents communicate via Model Context Protocol
- **Agent skills** - Reusable intelligence via subagents and Claude Code Subagents
- **Natural language interface** - Chatbot understands conversational commands
- **Tool-based actions** - AI invokes MCP tools for task operations
- **Subagents & Agent Skills** - Incorporate reusable AI components via Claude Code Subagents, Agent Skills, and Official MCP SDK where applicable, especially for bonuses like reusable intelligence and cloud-native blueprints
- **Official MCP SDK** - Use for reusable intelligence and cloud-native blueprints bonuses

### 3. Iterative Evolution & Architecture
- **Progressive complexity** - Start simple (console), evolve to cloud-native
- **Clean separation** - Frontend, Backend, Database, AI services clearly separated
- **Stateless design** - Server holds no state (database-backed sessions)
- **Event-driven architecture** - Async communication via message queues (Kafka/Dapr)
- **Cloud-native principles** - Containerized, orchestrated, scalable
- **Phase isolation** - Build progressively from Phase I (in-memory console app) to Phase II (full-stack web app) and beyond, ensuring backward compatibility and no disruption to previous phases
- **Phase organization** - Each phase in its own folder (e.g., /phase2) to isolate work

### 4. Security & Multi-User Isolation
- **JWT-based authentication** - Stateless token verification using Better Auth
- **User isolation** - Each user accesses only their own data
- **Shared secrets** - Same BETTER_AUTH_SECRET across frontend and backend
- **Environment-based config** - All secrets in .env files, never hardcoded
- **Token expiration** - JWTs expire after 7 days
- **Task ownership enforcement** - Filter data strictly by authenticated user_id
- **Proper access control** - Return 401 Unauthorized for missing/invalid tokens and 403 Forbidden for user_id mismatches

### 5. Cloud-Native and AI-Native Focus
- **Prepare for later phases** - Incorporate event-driven architecture (Kafka, Dapr), AIOps (kubectl-ai, kagent), and cloud-native blueprints
- **Agentic Dev Stack workflow** - Write spec → generate plan → break into tasks → implement via Claude Code
- **Use Context7 MCP server** - For latest and updated documentation everywhere

### 6. Code Quality & Standards
- **Type safety** - TypeScript for frontend, Python type hints for backend
- **Async patterns** - async/await for all I/O operations
- **Error handling** - Comprehensive try-catch with meaningful messages
- **Consistent naming** - snake_case (Python), camelCase (TypeScript)
- **Documentation** - Every function/component documented
- **Clean Architecture** - Maintain separation of concerns (frontend for UI/auth, backend for API/DB)
- **Best Practices** - Follow clean code principles, proper project structure, and tech-specific patterns (e.g., no inline styles in frontend, Pydantic for backend req/res)

## Key Standards

### Development Environment
- **OS**: WSL2 with Ubuntu 24.04 LTS
- **AI Agents**: Claude Code, Qwen Code, CCR (Code Composer Runner)
- **Spec Management**: Spec-Kit Plus (https://github.com/panaversity/spec-kit-plus/)
- **Context Provider**: Context7 MCP for latest documentation
- **Version Control**: Git with meaningful commit messages

### Technology Stack Constraints

#### Phase I: Console App
- **Language**: Python 3.13+
- **Package Manager**: UV
- **Storage**: In-memory (no database)
- **Structure**: Clean modular code

#### Phase II: Full-Stack Web
- **Frontend**: Next.js 16 (App Router), TypeScript, Tailwind CSS
- **Backend**: FastAPI (async), SQLModel ORM
- **Database**: Neon Serverless PostgreSQL
- **Authentication**: Better Auth with JWT tokens
- **Monorepo**: Single repository for frontend + backend
- **Environment and Setup**: Use Neon DB DATABASE_URL env var; shared BETTER_AUTH_SECRET for JWT; commands like cd frontend && npm run dev, cd backend && uvicorn main:app --reload --port 8000, docker-compose up

#### Phase III: AI Chatbot
- **UI**: OpenAI ChatKit
- **AI Framework**: OpenAI Agents SDK
- **Protocol**: Official MCP SDK for tool integration
- **Database**: Add Conversation and Message tables
- **Stateless**: All state in database, not server memory

#### Phase IV: Local Kubernetes
- **Containerization**: Docker (with Gordon AI assistant)
- **Orchestration**: Minikube (local Kubernetes)
- **Package Manager**: Helm Charts
- **AIOps**: kubectl-ai, kagent for cluster management
- **Deployment**: Local testing before cloud

#### Phase V: Cloud-Native Production
- **Cloud Provider**: Azure AKS / Google GKE / Oracle OKE / DigitalOcean DOKS
- **Event Streaming**: Kafka (Redpanda Cloud recommended) or managed Kafka
- **Runtime**: Dapr for distributed app runtime
- **Features**: Advanced (recurring tasks, reminders, priorities, tags, search)
- **CI/CD**: GitHub Actions for automated deployment

### API & Integration Standards

#### REST API Conventions
- **Base path**: `/api/{user_id}/...`
- **Methods**: GET, POST, PUT, DELETE, PATCH (semantic usage)
- **Response format**: Always JSON
- **Status codes**: 200 (success), 201 (created), 401 (unauthorized), 403 (forbidden), 404 (not found), 500 (server error)
- **Error format**: `{"detail": "Error message"}`
- **Implementation**: All implementations must reference specs using @specs/ paths (e.g., @specs/features/task-crud.md, @specs/api/rest-endpoints.md)

#### MCP Tools Standards
- **Tool naming**: Lowercase with underscores (e.g., `add_task`, `list_tasks`)
- **Parameters**: Always include `user_id` for user isolation
- **Return format**: Consistent JSON structure
- **Error handling**: Return error objects, not exceptions

#### Database Standards
- **Naming**: snake_case for tables and columns
- **Timestamps**: Always include `created_at` and `updated_at`
- **Foreign keys**: Explicitly defined with ON DELETE CASCADE
- **Indexes**: On frequently queried columns (user_id, status, etc.)
- **Migrations**: Tracked and versioned

### Spec-Kit Plus Workflow

#### File Structure
```
project-root/
├── sp.constitution          # This file (project principles)
├── sp.specify               # Requirements & user journeys
├── sp.plan                  # Architecture & technical design
├── sp.tasks                 # Atomic implementation tasks
├── specs/                   # Additional detailed specs
│   ├── features/
│   ├── api/
│   ├── database/
│   └── ui/
├── CLAUDE.md                # Root AI agent instructions
├── frontend/
│   └── CLAUDE.md
├── backend/
│   └── CLAUDE.md
└── .env.example
```

#### Workflow Phases
1. **Specify** - Define WHAT to build (user stories, acceptance criteria)
2. **Plan** - Define HOW to build (architecture, components, APIs)
3. **Tasks** - Break plan into atomic, testable work units
4. **Implement** - AI agents generate code from tasks

#### Task Referencing
- Every code file must include comment: `# [Task]: T-XXX`
- Every task must link back to spec: `[From]: sp.specify §X.X, sp.plan §Y.Y`

## Constraints

### Development Constraints
- **No Manual Coding**: Constraint - You cannot write the code manually; must refine the Spec until Claude Code generates the correct output; use /sp.specify, /sp.plan, /sp.tasks, /sp.implement commands with full details in prompts
- **Phase Isolation**: All work for each phase in dedicated folders (e.g., /phase2/specs, /phase2/frontend, /phase2/backend) without disturbing other phases or files
- **Spec completeness**: Implementation blocked until specs are approved
- **Single source of truth**: sp.constitution → sp.specify → sp.plan → sp.tasks hierarchy
- **Context7 MCP**: Always use for latest documentation queries (Next.js 16, FastAPI, etc.)

### Feature Constraints (By Phase)

#### Basic Level (Phase I & II)
- Add Task (title required, description optional)
- Delete Task (owner only)
- Update Task (title/description)
- View Tasks (filtered by user)
- Mark Complete (toggle status)

#### Intermediate Level (Phase V)
- Priorities: High, Medium, Low
- Tags/Categories: Work, Personal, etc.
- Search: By keyword
- Filter: By status, priority, date
- Sort: By due date, priority, alphabetically

#### Advanced Level (Phase V)
- Recurring Tasks: Weekly, monthly patterns
- Due Dates: Date/time pickers
- Reminders: Browser notifications

### Performance Constraints
- **API response time**: < 500ms for auth operations, consistent JSON responses without parsing errors
- **Database queries**: Indexed fields only for filters
- **Frontend**: Code splitting, lazy loading
- **Backend**: Connection pooling, async I/O

### Security Constraints
- **Password storage**: Hashed (handled by Better Auth)
- **API authentication**: JWT on every request
- **CORS**: Restricted to frontend domain
- **SQL injection**: Prevented via ORM (SQLModel)
- **XSS prevention**: Input sanitization

### Deployment Constraints
- **Environment isolation**: Dev, Staging, Production
- **Secrets management**: Environment variables or Kubernetes secrets
- **Health checks**: /health endpoint for liveness/readiness
- **Logging**: Structured logs (JSON format)
- **Monitoring**: Basic metrics (requests/sec, error rate)

## Deliverables
- GitHub monorepo named hackathon-todo with .specify/config.yaml
- specs/ (organized by overview, architecture, features, api, database, ui)
- CLAUDE.md files (root, frontend, backend) with detailed instructions
- README.md with setup, run commands, and demo steps
- src folders (frontend/backend)
- docker-compose.yml
- track prompts, iterations, and process for judging
- Working demo showing basic (Add/Delete/Update/View Tasks, Mark Complete), intermediate (Priorities & Tags; Categories – Assign levels (high/medium/low) or labels (work/home)/Search & Filter – Search by keyword; filter by status, priority, or date/Sort Tasks – Reorder by due date, priority, or alphabetically), advance (Recurring Tasks – Auto-reschedule repeating tasks (e.g., "weekly meeting")/ Due Dates & Time Reminders – Set deadlines with date/time pickers; browser notifications) features with auth and user isolation

## Not Allowed Activities
- Creating child abuse material
- Violent crimes representation
- Hacking activities
- Producing illegal substances/weapons
- Any disallowed activities per safety instructions

## Success Criteria

### Phase I Success
- ✅ Console app runs without errors
- ✅ All 5 basic features working
- ✅ Code generated via spec-driven workflow
- ✅ GitHub repo with specs/ folder and constitution

### Phase II Success
- ✅ Web app deployed (frontend on Vercel, backend on Hugging Face)
- ✅ Multi-user authentication working
- ✅ JWT tokens issued and verified
- ✅ Database persistence (Neon PostgreSQL)
- ✅ All REST API endpoints functional
- ✅ User isolation enforced
- ✅ Fully Functional: Phase II delivers multi-user web app with basic (Add/Delete/Update/View Tasks, Mark Complete), intermediate (Priorities & Tags; Categories – Assign levels (high/medium/low) or labels (work/home)/Search & Filter – Search by keyword; filter by status, priority, or date/Sort Tasks – Reorder by due date, priority, or alphabetically), advance (Recurring Tasks – Auto-reschedule repeating tasks (e.g., "weekly meeting")/ Due Dates & Time Reminders – Set deadlines with date/time pickers; browser notifications) features, RESTful API, responsive UI, persistent Neon DB storage, and secure JWT auth

### Phase III Success
- ✅ Chatbot UI deployed (OpenAI ChatKit)
- ✅ Natural language commands working
- ✅ MCP server with 5 tools operational
- ✅ Stateless chat endpoint (state in database)
- ✅ Conversation history persisted

### Phase IV Success
- ✅ Docker containers built and tested
- ✅ Minikube cluster running locally
- ✅ Helm charts deployed successfully
- ✅ kubectl-ai and kagent commands working
- ✅ Application accessible via localhost

### Phase V Success
- ✅ Cloud deployment (AKS/GKE/DOKS) functional
- ✅ Kafka/Dapr event streaming working
- ✅ Advanced features (recurring tasks, reminders) operational
- ✅ CI/CD pipeline automated
- ✅ Monitoring and logging configured

### Overall Hackathon Success
- ✅ All 5 phases completed and documented
- ✅ Every phase follows spec-driven development
- ✅ No manual coding (AI-generated only)
- ✅ Demo video (max 90 seconds) showcasing features
- ✅ GitHub repository well-organized with specs
- ✅ Deployment links working
- ✅ Total points: 1000 + bonuses

### Error-Free Implementation
- ✅ Zero errors in runtime
- ✅ All acceptance criteria met (e.g., title 1-200 chars required, description optional max 1000, auto timestamps, user-specific filtering)
- ✅ Verified Process: All code generated via Claude Code; iterations show spec refinements; passes manual testing with multiple users, no data crossover

### Bonus Achievement
- ✅ Successfully integrate reusable intelligence and blueprints for extra points
- ✅ App evolves seamlessly from Phase I without breaking prior functionality
- ✅ Reusable intelligence (subagents/agent skills): +200
- ✅ Cloud-native blueprints: +200
- ✅ Multi-language support (Urdu): +100
- ✅ Voice commands: +200

## Quality Gates

### Specification Review
- [ ] sp.specify reviewed and approved
- [ ] sp.plan technically sound
- [ ] sp.tasks are atomic and testable
- [ ] All specs reference back to constitution

### Code Review (AI-Generated)
- [ ] Code maps to task IDs
- [ ] Type hints/annotations present
- [ ] Error handling implemented
- [ ] No hardcoded secrets

### Testing Review
- [ ] Manual testing completed
- [ ] API endpoints tested (Postman/Insomnia)
- [ ] Authentication flow verified
- [ ] Edge cases handled

### Documentation Review
- [ ] README.md complete
- [ ] CLAUDE.md files present
- [ ] API documentation current
- [ ] Deployment instructions clear

## Governance

- This constitution serves as the foundational document for the Hackathon II - The Evolution of Todo: Mastering Spec-Driven Development & Cloud Native AI project
- All development activities must align with the principles outlined herein
- Any deviations from these principles require explicit approval and documentation
- Updates to this constitution require review and approval from the project stakeholders
- This document takes precedence over any conflicting practices or guidelines

**Version**: 1.0.0 | **Ratified**: 2026-01-23 | **Last Amended**: 2026-01-23