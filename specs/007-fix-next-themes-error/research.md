# Research: Fix "Module not found: Can't resolve 'next-themes'" Error

## Package Manager Decision

### Decision: Use npm for dependency installation
- **Rationale**: The project already has a package-lock.json indicating npm is the package manager in use
- **Alternative considered**: Yarn or pnpm - but existing lock file indicates npm is the current choice

## ThemeProvider Configuration

### Decision: Use attribute="class" for Tailwind CSS dark mode compatibility
- **Rationale**: Tailwind CSS uses the `dark:` prefix which requires themes to be applied as classes to HTML elements
- **Configuration**: `attribute="class"`, `enableSystem=true`, `defaultTheme="system"` to respect OS preference
- **Alternatives considered**:
  - `attribute="data-theme"` - would require additional Tailwind configuration
  - `attribute="style"` - not compatible with Tailwind's class-based dark mode

## Hydration Safety Implementation

### Decision: Implement mounted state check to prevent hydration mismatch
- **Rationale**: Next.js 16+ App Router can cause hydration errors when theme-related content differs between server and client
- **Implementation**: Use useState + useEffect with mounted flag to delay theme-dependent renders
- **Alternative considered**:
  - suppressHydrationWarning on html tag - less elegant solution that hides rather than solves the issue

## Toggle Component Placement

### Decision: Place dark mode toggle in Navbar component with lucide-react icons
- **Rationale**: Navbar is a common location for theme toggle, and lucide-react provides consistent iconography
- **Implementation**: Create reusable ThemeToggle component that uses useTheme() hook safely with mounted check
- **Alternative considered**:
  - Placing in footer or separate modal - less discoverable for users

## Tailwind Configuration

### Decision: Ensure darkMode: 'class' is set in tailwind.config.ts
- **Rationale**: This is the standard configuration for next-themes compatibility with Tailwind CSS
- **Default behavior**: Next.js + Tailwind projects typically default to this setting
- **Alternative considered**:
  - darkMode: 'media' - would bypass next-themes and use system preference directly without user control

## Error Prevention Measures

### Decision: Use Context7 MCP for latest Next.js 16+/next-themes integration patterns
- **Rationale**: Ensures we're using the most current and compatible patterns for 2026 best practices
- **Implementation**: Verify import paths and check for any version-specific requirements
- **Alternative considered**:
  - Using outdated documentation - would lead to compatibility issues

## Import Path Verification

### Decision: Use standard import pattern `import { ThemeProvider } from 'next-themes'`
- **Rationale**: This is the established pattern for next-themes integration with Next.js 16+ App Router
- **Verification needed**: Confirm exact import syntax matches installed version
- **Alternative considered**:
  - Named exports vs default exports - depends on specific version installed

## Hydration Fix Implementation

### Decision: Add suppressHydrationWarning to <html> tag in root layout
- **Rationale**: Provides an additional safety layer for theme-related hydration issues
- **Implementation**: Apply to the html tag in app/layout.tsx
- **Alternative considered**:
  - Only relying on mounted state checks - less robust approach

## Safe useTheme Hook Usage

### Decision: Implement useTheme hook with mounted state verification
- **Rationale**: Prevents errors during server-side rendering when theme information isn't available
- **Implementation**: Check if component is mounted before accessing theme state
- **Alternative considered**:
  - Direct useTheme usage - would cause hydration mismatches

## Component Reusability Pattern

### Decision: Design toggle as reusable component for future use
- **Rationale**: Aligns with the bonus requirement for subagent reuse in future phases
- **Implementation**: Create ThemeToggle.tsx as a standalone component that can be imported anywhere
- **Alternative considered**:
  - Inline toggle logic - would create duplication and maintenance issues