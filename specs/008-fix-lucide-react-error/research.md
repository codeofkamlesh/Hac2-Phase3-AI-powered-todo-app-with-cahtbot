# Research: Fix "Module not found: Can't resolve 'lucide-react'" Error + Complete Dark Mode Setup

## Package Manager Decision

### Decision: Use npm for dependency installation
- **Rationale**: The project already has a package-lock.json indicating npm is the package manager in use
- **Alternative considered**: Yarn or pnpm - but existing lock file indicates npm is the current choice

## Lucide-React Installation Status

### Decision: lucide-react is already installed but may need verification
- **Rationale**: Checked package.json and lucide-react@^0.563.0 is already installed
- **Verification needed**: Confirm import paths and usage in FeatureCards component

## Next-Themes Installation Status

### Decision: next-themes is already installed but may need verification
- **Rationale**: Checked package.json and next-themes@^0.4.6 is already installed
- **Verification needed**: Confirm ThemeProvider is properly integrated in layout

## ThemeProvider Integration Check

### Decision: ThemeProvider already exists in root layout
- **Rationale**: Examined app/layout.tsx and found ThemeProvider is already integrated with proper configuration
- **Configuration verified**: `attribute="class"`, `defaultTheme="system"`, `enableSystem=true`

## Import Path Verification

### Decision: Use standard import pattern `import { List, Shield, Database, Bot, Lock, Zap } from 'lucide-react'`
- **Rationale**: This is the established pattern for lucide-react library
- **Verification needed**: Check current import patterns in FeatureCards component

## Dark Mode Toggle Component

### Decision: Need to implement dark mode toggle in Navbar
- **Rationale**: The existing ThemeProvider needs a toggle component for user interaction
- **Implementation**: Create/use ThemeToggle component that integrates with next-themes

## Tailwind Configuration

### Decision: Ensure darkMode: 'class' is set in tailwind.config.ts
- **Rationale**: Required for next-themes compatibility with Tailwind CSS dark: variants
- **Default behavior**: Next.js + Tailwind projects typically default to this setting

## Hydration Safety Implementation

### Decision: Implement mounted state check to prevent hydration mismatch
- **Rationale**: Next.js 16+ App Router can cause hydration errors when theme-dependent content differs between server and client
- **Implementation**: Use useState + useEffect with mounted flag to delay theme-dependent renders

## Error Prevention Measures

### Decision: Use Context7 MCP for latest Next.js 16+/next-themes integration patterns
- **Rationale**: Ensures we're using the most current and compatible patterns for 2026 best practices
- **Implementation**: Verify import patterns and check for any Next.js 16+ specific requirements

## Feature Cards Component Analysis

### Decision: Update FeatureCards.tsx to properly import and use lucide-react icons
- **Rationale**: This is where the "can't resolve" error is occurring according to the specification
- **Implementation**: Verify imports and icon usage patterns in the component

## Safe useTheme Hook Usage

### Decision: Implement useTheme hook with mounted state verification
- **Rationale**: Prevents errors during server-side rendering when theme information isn't available
- **Implementation**: Check if component is mounted before accessing theme state

## Component Reusability Pattern

### Decision: Design toggle as reusable component for future use
- **Rationale**: Aligns with the bonus requirement for reusable intelligence and subagent reuse
- **Implementation**: Create ThemeToggle.tsx as a standalone component that can be imported anywhere