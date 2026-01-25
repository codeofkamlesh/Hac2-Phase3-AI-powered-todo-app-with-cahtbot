# Implementation Plan: Fix "Module not found: Can't resolve 'lucide-react'" Error + Complete Dark Mode Setup

**Branch**: `009-backend-fastapi-todo-api` | **Date**: 2026-01-24 | **Spec**: [link](spec.md)
**Input**: Feature specification from `/specs/009-backend-fastapi-todo-api/spec.md`

**Note**: This template is filled in by the `/sp.plan` command. See `.specify/templates/commands/plan.md` for the execution workflow.

## Summary

This plan addresses the critical build error "Module not found: Can't resolve 'lucide-react'" in the Phase 2 frontend dashboard and implements the complete backend for Phase II using FastAPI, SQLModel, and Neon Serverless PostgreSQL. The solution involves installing the missing next-themes and lucide-react dependencies, integrating the ThemeProvider in the root layout, implementing safe usage of the useTheme hook, creating a toggle button, ensuring Tailwind dark mode compatibility, and providing the complete todo management API with all Basic (CRUD + complete), Intermediate (priorities/tags, search/filter/sort), and Advanced (recurring tasks, due dates/reminders) features. The implementation will maintain all existing dashboard functionality while enabling proper dark mode support with reusable component patterns for future intelligence.

## Technical Context

**Language/Version**: TypeScript 5.0+ (frontend), Python 3.13+ (backend), Next.js 16+ with App Router, FastAPI 0.115+, SQLModel 0.0.26+
**Primary Dependencies**: next-themes@latest, lucide-react@latest, react@18.x, next@16.x, fastapi@latest, sqlmodel@latest, pyjwt@latest, python-jose@latest, better-auth@latest
**Storage**: Neon Serverless PostgreSQL database
**Testing**: Manual verification of build process, UI functionality, dark mode behavior, and API endpoints
**Target Platform**: Web application (browser + server)
**Project Type**: web (full-stack with frontend and backend components)
**Performance Goals**: Zero build errors, sub-500ms API response times, smooth theme transitions (<300ms), hydration mismatch prevention
**Constraints**: Must maintain existing landing page functionality, use Context7 MCP for best practices, all changes isolated to /phase2/frontend and /phase2/backend, JWT-based authentication with Better Auth integration
**Scale/Scope**: Multi-user todo application with complete CRUD functionality, priorities/tags, search/filter/sort, recurring tasks, and due date features

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

- **Spec-Driven Development**: ✅ - Following specification-first approach per constitution
- **No Manual Coding**: ✅ - Using Claude Code to generate all changes per constitution
- **Phase Isolation**: ✅ - Changes isolated to /phase2/frontend and /phase2/backend per constitution
- **Technology Stack Compliance**: ✅ - Using Next.js 16+ with App Router, FastAPI, SQLModel per constitution
- **Security**: ✅ - Implementing JWT-based authentication with user isolation per constitution
- **Reusability**: ✅ - Creating reusable components and middleware for future subagent intelligence per constitution
- **Documentation**: ✅ - All changes documented in specs per constitution

## Project Structure

### Documentation (this feature)

```text
specs/009-backend-fastapi-todo-api/
├── plan.md              # This file (/sp.plan command output)
├── research.md          # Phase 0 output (/sp.plan command)
├── data-model.md        # Phase 1 output (/sp.plan command)
├── quickstart.md        # Phase 1 output (/sp.plan command)
├── contracts/           # Phase 1 output (/sp.plan command)
└── tasks.md             # Phase 2 output (/sp.tasks command - NOT created by /sp.plan)
```

### Source Code (repository root)

phase2/frontend/
├── app/
│   ├── layout.tsx
│   └── tasks/
│       └── page.tsx
├── components/
│   ├── ui/
│   │   └── Navbar.tsx
│   └── dashboard/
│       ├── TaskList.tsx
│       ├── TaskForm.tsx
│       └── Filters.tsx
├── lib/
│   └── api.ts
├── package.json
├── tailwind.config.ts
└── tsconfig.json

phase2/backend/
├── main.py
├── models/
│   └── task.py
├── routes/
│   └── tasks.py
├── db.py
├── middleware/
│   └── auth.py
├── requirements.txt
└── .env

**Structure Decision**: Web application structure selected, with all changes isolated to /phase2/frontend and /phase2/backend directories to fix the lucide-react module resolution error in frontend and implement the complete backend API with FastAPI, SQLModel, and Neon DB integration.

## Complexity Tracking

> **Fill ONLY if Constitution Check has violations that must be justified**

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|
| [e.g., 4th project] | [current need] | [why 3 projects insufficient] |
| [e.g., Repository pattern] | [specific problem] | [why direct DB access insufficient] |
