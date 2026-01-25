---
id: "001"
title: "Create spec for fixing next-themes error"
stage: "spec"
date: "2026-01-24"
surface: "agent"
model: "claude-sonnet-4-5-20250929"
feature: "007-fix-next-themes-error"
branch: "007-fix-next-themes-error"
user: "claude"
command: "sp.specify"
labels: ["spec", "frontend", "next-themes", "bug-fix"]
links:
  spec: "specs/007-fix-next-themes-error/spec.md"
  ticket: null
  adr: null
  pr: null
files_yaml:
  - "specs/007-fix-next-themes-error/spec.md"
  - "specs/007-fix-next-themes-error/checklists/requirements.md"
tests_yaml:
  - "Specification created with user stories"
  - "Requirements defined with acceptance criteria"
  - "Success criteria established"
prompt_text: |

  Fix "Module not found: Can't resolve 'next-themes'" Error in Phase 2 Frontend Landing Page
  Target audience: Hackathon Phase II developer (me) building attractive Todo app landing page with dark mode
  Focus: Resolve the build error caused by missing 'next-themes' package so that npm run dev works without any compilation failure; ensure dark mode toggle works perfectly after fix; maintain all existing landing page features (hero, feature cards, navbar, signup/signin buttons) intact
  Success criteria:
  - After fix, running `cd phase2/frontend && npm run dev` should start the app at http://localhost:3000 with NO build errors
  - Dark mode toggle (sun/moon icon) should work perfectly: light mode colourful & bright, dark mode deep & elegant
  - Import `useTheme` from 'next-themes' in app/page.tsx and other components should resolve correctly
  - No new errors appear (e.g., no missing dependencies, no TypeScript issues)
  - App should still show the beautiful hero section, feature cards, navbar, and auth buttons
  - Use latest 2026 best practices via Context7 MCP for Next.js 16+ + next-themes integration
  Constraints:
  - Do NOT manually edit any file; Claude Code should generate the fix automatically
  - Add 'next-themes' as dependency in package.json
  - Install it via npm (or pnpm/yarn as per project setup)
  - Wrap the root layout (app/layout.tsx) with <ThemeProvider> from next-themes
  - Ensure enableSystem={true} and attribute="class" for proper system dark mode detection
  - Add a simple dark mode toggle button in Navbar component using useTheme hook
  - Keep all code inside /phase2/frontend folder only
  - After fix, automatically run `npm run dev` and verify no errors in console
  Not building:
  - New features (e.g., dashboard or tasks page)
  - Backend changes (this is frontend-only fix)
  - Any violation of constitution (no manual coding, use Agentic Dev Stack)

response_text: |

  Successfully created a comprehensive specification for fixing the "Module not found: Can't resolve 'next-themes'" error in the Phase 2 frontend landing page. The specification includes:

  1. Three prioritized user stories covering:
     - Fixing the next-themes module resolution error (P1)
     - Enabling dark mode functionality (P1)
     - Maintaining existing landing page features (P1)

  2. Seven functional requirements (FR-001 to FR-007) covering:
     - Module resolution fixes
     - Dependency management
     - Theme provider implementation
     - Dark mode functionality
     - Feature preservation

  3. Four measurable success criteria (SC-001 to SC-005) focusing on:
     - Successful application startup without errors
     - Working dark mode toggle functionality
     - Correct module imports
     - Preservation of existing features

  4. Two key entities (Theme Configuration and Application Layout)

  5. A complete validation checklist confirming all requirements are met

  The specification is ready for the next phase of development planning.

outcome: "Successfully completed specification for next-themes error fix"
evaluation: "Specification meets all requirements with clear user stories, functional requirements, and success criteria"
---