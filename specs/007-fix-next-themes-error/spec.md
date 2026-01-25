# Feature Specification: Fix "Module not found: Can't resolve 'next-themes'" Error

**Feature Branch**: `007-fix-next-themes-error`
**Created**: 2026-01-24
**Status**: Draft
**Input**: User description: "Fix "Module not found: Can't resolve 'next-themes'" Error in Phase 2 Frontend Landing Page
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
- Any violation of constitution (no manual coding, use Agentic Dev Stack)"

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Fix Next Themes Module Resolution Error (Priority: P1)

Developer needs to run the frontend application without build errors so they can develop and test the landing page with dark mode functionality. Currently encountering "Module not found: Can't resolve 'next-themes'" error when trying to run the application.

**Why this priority**: This is a critical blocking issue preventing the application from starting. Without fixing this, no further development or testing can occur on the landing page.

**Independent Test**: After the fix, running `cd phase2/frontend && npm run dev` should start the app at http://localhost:3000 with NO build errors, and the application should load successfully in the browser.

**Acceptance Scenarios**:

1. **Given** the missing next-themes dependency, **When** running `npm run dev`, **Then** the application should start without module resolution errors
2. **Given** the application is running, **When** visiting http://localhost:3000, **Then** the landing page should load successfully with all components functioning

---

### User Story 2 - Enable Dark Mode Functionality (Priority: P1)

End users need to toggle between light and dark modes on the landing page to accommodate their viewing preferences and accessibility needs.

**Why this priority**: Dark mode is a core feature of the landing page as specified, and it's important for user experience and accessibility.

**Independent Test**: The dark mode toggle (sun/moon icon) should work perfectly allowing users to switch between light mode (colourful & bright) and dark mode (deep & elegant).

**Acceptance Scenarios**:

1. **Given** the application is running with dark mode support, **When** clicking the dark mode toggle button, **Then** the theme should switch between light and dark modes
2. **Given** user's system has a preferred theme, **When** visiting the site, **Then** the application should respect the system dark mode preference

---

### User Story 3 - Maintain Existing Landing Page Features (Priority: P1)

End users need to see all existing landing page elements (hero section, feature cards, navbar, signup/signin buttons) continue to function properly after the fix is applied.

**Why this priority**: Preserving existing functionality is critical to ensure no regressions are introduced while fixing the error.

**Independent Test**: The application should still show the beautiful hero section, feature cards, navbar, and auth buttons without any disruption.

**Acceptance Scenarios**:

1. **Given** the application is running after the fix, **When** visiting the landing page, **Then** the hero section, feature cards, navbar, and auth buttons should all be visible and functional
2. **Given** the landing page is displayed, **When** interacting with any element, **Then** all existing functionality should work as before

---

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: System MUST resolve the 'next-themes' module import without errors
- **FR-002**: System MUST include 'next-themes' as a dependency in package.json
- **FR-003**: System MUST wrap the root layout with ThemeProvider from next-themes
- **FR-004**: System MUST support dark mode toggling with sun/moon icon
- **FR-005**: System MUST respect user's system dark mode preference
- **FR-006**: System MUST maintain all existing landing page features after the fix
- **FR-007**: System MUST allow the application to start successfully with `npm run dev`

### Key Entities *(include if feature involves data)*

- **Theme Configuration**: Represents the theme state (light/dark/system) and preferences that persist across user sessions
- **Application Layout**: The root layout that contains the ThemeProvider wrapper for consistent theming across all pages

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: After fix, running `cd phase2/frontend && npm run dev` starts the app at http://localhost:3000 with NO build errors (100% success rate)
- **SC-002**: Dark mode toggle (sun/moon icon) works perfectly allowing seamless switching between light and dark modes (100% functionality)
- **SC-003**: Import `useTheme` from 'next-themes' in app/page.tsx and other components resolves correctly (100% success rate)
- **SC-004**: No new errors appear (e.g., no missing dependencies, no TypeScript issues) after the fix (0% error rate)
- **SC-005**: All existing landing page features (hero section, feature cards, navbar, auth buttons) remain functional after the fix (100% preservation rate)