# Research: Fix "Module not found: Can't resolve 'next-themes'" Error + Dark Mode Implementation

## Package Manager Decision

### Decision: Use npm for dependency installation
- **Rationale**: The project already has a package-lock.json indicating npm is the package manager in use
- **Alternative considered**: Yarn or pnpm - but existing lock file indicates npm is the current choice

## Next-Themes Installation

### Decision: Install next-themes@latest for Next.js 16+ compatibility
- **Rationale**: Latest version provides best compatibility with Next.js 16+ App Router and includes all required dark mode features
- **Alternative considered**: Pinning to specific version like 0.2.x if compatibility issues arise

## ThemeProvider Configuration

### Decision: Use attribute="class" for Tailwind CSS dark mode compatibility
- **Rationale**: Tailwind CSS uses the `dark:` prefix which requires themes to be applied as classes to HTML elements
- **Configuration**: `attribute="class"`, `enableSystem=true`, `defaultTheme="system"` to respect OS preference
- **Alternatives considered**:
  - `attribute="data-theme"` - would require additional Tailwind configuration
  - `attribute="style"` - not compatible with Tailwind's class-based dark mode

## Hydration Safety Implementation

### Decision: Implement mounted state check to prevent hydration mismatch
- **Rationale**: Next.js 16+ App Router can cause hydration errors when theme-dependent content differs between server and client
- **Implementation**: Use useState + useEffect with mounted flag to delay theme-dependent renders
- **Alternative considered**:
  - suppressHydrationWarning on html tag - less elegant solution that hides rather than solves the issue

## Theme Toggle Component Placement

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
- **Implementation**: Verify import patterns and check for any version-specific requirements
- **Alternative considered**: Using outdated documentation - would lead to compatibility issues

## Import Path Verification

### Decision: Use standard import pattern `import { ThemeProvider, useTheme } from 'next-themes'`
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

## Reusable Component Pattern

### Decision: Design toggle as reusable component for future intelligence
- **Rationale**: Aligns with the bonus requirement for reusable intelligence and subagent reuse
- **Implementation**: Create ThemeToggle.tsx as a standalone component that can be imported anywhere
- **Alternative considered**:
  - Inline toggle logic - would create duplication and maintenance issues

## TanStack Query Integration

### Decision: Use TanStack Query (React Query) for API caching and state management
- **Rationale**: Provides excellent caching, background updates, and optimistic UI patterns for API calls
- **Implementation**: Configure QueryClientProvider in layout and useQuery/useMutation hooks for API operations
- **Alternative considered**:
  - useState/useEffect approach - would require more manual state management

## Form Library Selection

### Decision: Use react-hook-form with Zod resolver for form validation
- **Rationale**: Provides excellent TypeScript support, performance, and flexible validation patterns
- **Implementation**: Integrate with Zod schemas for type-safe validation
- **Alternative considered**:
  - Native form handling - would require more boilerplate code

## Date Picker Implementation

### Decision: Use react-datepicker for due date selection
- **Rationale**: Offers rich date/time selection features with good accessibility and customization options
- **Implementation**: Integrate with react-hook-form for proper form handling
- **Alternative considered**:
  - Native date input - lacks customization and theming capabilities

## Notification Strategy

### Decision: Combine react-hot-toast for UI feedback with Notification API for reminders
- **Rationale**: Provides both immediate UI feedback and background notifications for due dates
- **Implementation**: Use react-hot-toast for app interactions, Notification API for scheduled reminders
- **Alternative considered**:
  - Only one notification method - wouldn't cover both immediate feedback and background alerts