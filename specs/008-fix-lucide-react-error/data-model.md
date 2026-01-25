# Data Model: Fix "Module not found: Can't resolve 'lucide-react'" Error + Complete Dark Mode Setup

## Key Entities

### Theme Configuration
- **themeState**: Represents the current theme state and preferences
  - currentTheme: enum - "light" | "dark" | "system" (default: "system")
  - systemPreference: enum - "light" | "dark" - User's OS preference
  - isDarkMode: boolean - Computed property for conditional styling
  - mounted: boolean - Whether component has mounted (for hydration safety)
- **themePreferences**: Settings stored in browser's local storage
  - theme: string - Current theme preference ("light", "dark", or "system")
  - themeOverride: boolean - Whether user has overridden system preference

### Application Layout
- **layoutStructure**: Root layout configuration with theme provider
  - children: ReactNode - Child components wrapped with ThemeProvider
  - suppressHydrationWarning: boolean - Flag to prevent hydration errors
  - themeProviderProps: object - Configuration for ThemeProvider component
    - attribute: string - "class" (for Tailwind compatibility)
    - defaultTheme: string - "system" (to respect OS preference)
    - enableSystem: boolean - true (to allow system preference detection)

## Validation Rules

### Theme Configuration Validation
- currentTheme must be one of "light", "dark", or "system"
- systemPreference must be either "light" or "dark"
- themeOverride can only be true when currentTheme is not "system"
- mounted must be a boolean to prevent server/client mismatch

### Application Layout Validation
- suppressHydrationWarning must be applied to prevent hydration mismatch errors
- ThemeProvider must be configured with attribute="class" for Tailwind compatibility
- enableSystem must be true to respect user's OS preference

## State Transitions

### Theme States
1. **Initial**: Theme preference not yet determined (server-side)
2. **Mounting**: Component has mounted, determining theme from system preference
3. **Light**: Light mode active
4. **Dark**: Dark mode active
5. **System**: Following OS preference

### Transition Rules
- From Initial → Mounting (client-side mount detection)
- From Mounting → System (default behavior if no user override)
- System → Light/Dark (user overrides system preference)
- Light/Dark → System (user resets to system preference)

## Component Relationships

### Layout Hierarchy
- **Root Layout** → **ThemeProvider** (wraps all children)
- **ThemeProvider** → **ThemeToggle Component** (accesses theme context)
- **ThemeToggle Component** → **UI Elements** (applies theme-appropriate styles)
- **Feature Cards Component** → **Lucide Icons** (uses lucide-react icons)

### Feature Cards Integration
- **Feature Cards Component** → **Import lucide-react icons** (List, Shield, Database, Bot, Lock, Zap)
- **Icons** → **Tailwind CSS classes** (apply dark: variants for theme compatibility)
- **Theme Context** → **Feature Cards styling** (updates appearance based on theme)

## Frontend State Management

### Component State
- **mounted**: Boolean to prevent server/client mismatch
- **resolvedTheme**: Current theme after system/user preferences resolved
- **theme**: Current theme setting (may differ from resolvedTheme if system preference applies)

## Integration Points

### With Existing Components
- **Layout Component**: Will wrap children with ThemeProvider for global theme context
- **Navbar Component**: Will contain the theme toggle button for user control
- **Feature Cards Component**: Will use lucide-react icons with proper dark mode styling
- **Tailwind CSS**: Will render icons with proper dark: variants based on theme
- **Next-Themes**: Will provide theme context and toggle functionality