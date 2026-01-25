# Research: Fix "Module not found: Can't resolve 'lucide-react'" Error + Complete Dark Mode Setup

## Package Manager Decision

### Decision: Use npm for dependency installation
- **Rationale**: The project already has a package-lock.json indicating npm is the package manager in use
- **Alternative considered**: Yarn or pnpm - but existing lock file indicates npm is the current choice

## Next-Themes Installation Status

### Decision: Verify next-themes is properly installed and configured
- **Rationale**: The error suggests missing or misconfigured next-themes dependency
- **Check needed**: Verify next-themes@latest is in package.json and properly configured

## Lucide-React Installation Status

### Decision: Install lucide-react@latest for Next.js 16+ compatibility
- **Rationale**: Required for the feature card icons (List, Shield, Database, Bot, Lock, Zap) to render properly
- **Alternative considered**: Other icon libraries like react-icons - but lucide-react is specifically mentioned in the error

## ThemeProvider Configuration

### Decision: Use attribute="class" for Tailwind CSS dark mode compatibility
- **Rationale**: Tailwind CSS uses the `dark:` prefix which requires themes to be applied as classes to HTML elements
- **Configuration**: `attribute="class"`, `defaultTheme="system"`, `enableSystem=true` to respect OS preference
- **Alternatives considered**:
  - `attribute="data-theme"` - would require additional Tailwind configuration
  - `attribute="style"` - not compatible with Tailwind's class-based dark mode

## Hydration Safety Implementation

### Decision: Implement mounted state check to prevent hydration mismatch
- **Rationale**: Next.js 16+ App Router can cause hydration errors when theme-dependent content differs between server and client
- **Implementation**: Use useState + useEffect with mounted flag to delay theme-dependent renders
- **Alternative considered**: suppressHydrationWarning on html tag - less elegant solution that hides rather than solves the issue

## Dark Mode Toggle Component

### Decision: Create reusable ThemeToggle component with Sun/Moon icons
- **Rationale**: Provides consistent dark mode toggle functionality that can be reused across components
- **Implementation**: Use lucide-react icons (Sun, Moon) with useTheme hook safely with mounted check
- **Alternative considered**: Inline toggle logic - would create duplication and maintenance issues

## Tailwind Configuration

### Decision: Ensure darkMode: 'class' is set in tailwind.config.ts
- **Rationale**: Required for next-themes compatibility with Tailwind CSS dark: variants
- **Default behavior**: Next.js + Tailwind projects typically default to this setting
- **Alternative considered**: darkMode: 'media' - would bypass next-themes and use system preference directly without user control

## JWT Authentication Integration

### Decision: Use pyjwt with FastAPI for secure token verification
- **Rationale**: Industry standard for JWT token handling in Python applications with proper verification using BETTER_AUTH_SECRET
- **Implementation**: Verify tokens from headers using HS256 algorithm
- **Alternative considered**: Other auth libraries - but pyjwt is the standard for JWT handling in Python

## SQLModel Database Integration

### Decision: Use SQLModel for ORM with Neon PostgreSQL
- **Rationale**: Combines SQLAlchemy and Pydantic features, ideal for FastAPI applications with proper typing
- **Implementation**: Create Task and User models with proper relationships and constraints
- **Alternative considered**: Pure SQLAlchemy or Tortoise ORM - but SQLModel provides better Pydantic integration for API responses

## FastAPI Endpoint Design

### Decision: Use standard REST patterns with proper status codes
- **Rationale**: Follows industry standards for API design with clear endpoints for CRUD operations
- **Implementation**: Standard endpoints like POST /api/{user_id}/tasks, GET /api/{user_id}/tasks, etc.
- **Alternative considered**: GraphQL - but REST is more familiar and sufficient for this use case

## Error Prevention Measures

### Decision: Use Context7 MCP for latest 2026 patterns on FastAPI + next-themes integration
- **Rationale**: Ensures we're using the most current and compatible patterns for best practices
- **Implementation**: Verify import patterns and check for any Next.js 16+ specific requirements
- **Alternative considered**: Using outdated documentation - would lead to compatibility issues

## Reusable Component Pattern

### Decision: Design toggle as reusable component for future intelligence
- **Rationale**: Aligns with the bonus requirement for reusable intelligence and subagent reuse
- **Implementation**: Create ThemeToggle component that can be imported anywhere in the application
- **Alternative considered**: Hardcoded toggle logic - would create tight coupling and maintenance issues