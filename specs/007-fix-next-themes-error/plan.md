# Implementation Plan: Fix "Module not found: Can't resolve 'next-themes'" Error

**Branch**: `007-fix-next-themes-error` | **Date**: 2026-01-24 | **Spec**: [link](spec.md)
**Input**: Feature specification from `/specs/007-fix-next-themes-error/spec.md`

**Note**: This template is filled in by the `/sp.plan` command. See `.specify/templates/commands/plan.md` for the execution workflow.

## Summary

This plan addresses the critical build error "Module not found: Can't resolve 'next-themes'" in the Phase 2 frontend landing page. The solution involves installing the missing dependency, integrating the ThemeProvider in the root layout, implementing safe usage of the useTheme hook, creating a toggle button, ensuring Tailwind dark mode compatibility, and providing a full verification checklist. The implementation will maintain all existing landing page functionality while enabling proper dark mode support.

## Technical Context

**Language/Version**: TypeScript 5.0+ (frontend), Next.js 16+ with App Router, Tailwind CSS 3.4+
**Primary Dependencies**: next-themes@latest, lucide-react@latest, framer-motion@latest, better-auth@latest
**Storage**: N/A (frontend only)
**Testing**: Manual verification of build process and UI functionality
**Target Platform**: Web application (browser)
**Project Type**: Web application (frontend only fix)
**Performance Goals**: Zero build errors, smooth theme transitions (<300ms), hydration mismatch prevention
**Constraints**: Must maintain existing landing page functionality, use Context7 MCP for best practices, no backend changes
**Scale/Scope**: Single page application (landing page) with dark mode support

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

- **Spec-Driven Development**: ✅ - Following specification-first approach per constitution
- **No Manual Coding**: ✅ - Using Claude Code to generate all changes per constitution
- **Phase Isolation**: ✅ - Changes isolated to /phase2/frontend per constitution
- **Technology Stack Compliance**: ✅ - Using Next.js 16+ with App Router per constitution
- **Security**: ✅ - No security implications for this UI-only fix
- **Reusability**: ✅ - Creating reusable ThemeToggle component for future phases
- **Documentation**: ✅ - All changes documented in specs per constitution

## Project Structure

### Documentation (this feature)

```text
specs/007-fix-next-themes-error/
├── plan.md              # This file (/sp.plan command output)
├── research.md          # Phase 0 output (/sp.plan command)
├── data-model.md        # Phase 1 output (/sp.plan command)
├── quickstart.md        # Phase 1 output (/sp.plan command)
├── contracts/           # Phase 1 output (/sp.plan command)
└── tasks.md             # Phase 2 output (/sp.tasks command - NOT created by /sp.plan)
```

### Source Code (repository root)

frontend/
├── app/
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   ├── ui/
│   │   └── Navbar.tsx
│   └── landing/
│       ├── Hero.tsx
│       └── FeatureCards.tsx
├── package.json
├── tailwind.config.ts
├── tsconfig.json
└── .env.local

**Structure Decision**: Web application structure selected, focusing on frontend files in /phase2/frontend directory to fix the next-themes module resolution error and implement dark mode functionality.

## Complexity Tracking

> **Fill ONLY if Constitution Check has violations that must be justified**

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|
| [None] | [N/A] | [N/A] |
