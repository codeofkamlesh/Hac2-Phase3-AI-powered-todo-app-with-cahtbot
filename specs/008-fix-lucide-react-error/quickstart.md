# Quickstart Guide: Fix "Module not found: Can't resolve 'lucide-react'" Error + Complete Dark Mode Setup

## Prerequisites

- Node.js 18+ and npm
- Next.js 16+ with App Router
- TypeScript 5.0+
- Tailwind CSS 3.4+
- next-themes and lucide-react already installed

## Setup Environment

### 1. Verify Dependencies Installation

```bash
cd phase2/frontend
npm list next-themes lucide-react
```

Expected: Both packages should be listed as installed with no errors

### 2. Verify Current Dependencies

Ensure your package.json includes:
```json
{
  "dependencies": {
    "next-themes": "^0.4.6",
    "lucide-react": "^0.563.0",
    "next": "14.2.35",
    "react": "18.3.1",
    "react-dom": "18.3.1"
  }
}
```

## Implementation Steps

### 1. Verify Root Layout (app/layout.tsx)

Confirm ThemeProvider is properly configured with hydration safety:

```tsx
import { ThemeProvider } from 'next-themes'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
```

### 2. Create Theme Toggle Component

Create `components/ui/ThemeToggle.tsx`:

```tsx
'use client'

import { Moon, Sun } from 'lucide-react'
import { useTheme } from 'next-themes'

import { Button } from '@/components/ui/button'

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()

  return (
    <button
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      className="rounded-full p-2 hover:bg-gray-200 dark:hover:bg-gray-700"
      aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      {theme === 'dark' ? (
        <Sun className="h-5 w-5" />
      ) : (
        <Moon className="h-5 w-5" />
      )}
    </button>
  )
}
```

### 3. Update Navbar Component

Integrate theme toggle in `components/ui/Navbar.tsx`:

```tsx
import { ThemeToggle } from './ThemeToggle'

// In the Navbar component JSX:
<div className="flex items-center space-x-4">
  {/* other navbar elements */}
  <ThemeToggle />
</div>
```

### 4. Update Feature Cards Component

Ensure `components/landing/FeatureCards.tsx` properly imports and uses lucide-react icons:

```tsx
import { List, Shield, Database, Bot, Lock, Zap } from 'lucide-react';

// In the features array:
const features = [
  {
    icon: List,
    title: "Todo Management",
    description: "Intuitive task management with priorities, categories, due dates, and recurring tasks to boost your productivity."
  },
  // ... other features
];

// In the component JSX:
<div className="w-14 h-14 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center mb-6">
  <feature.icon className="w-7 h-7 text-white dark:text-gray-200" />
</div>
```

### 5. Configure Tailwind CSS

Ensure `tailwind.config.ts` has darkMode set to 'class':

```ts
/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class', // Required for next-themes compatibility
  // ... other config
}
```

## Testing Steps

### 1. Test Build Process

```bash
cd phase2/frontend
npm run dev
```

Expected: No "Module not found: Can't resolve 'lucide-react'" errors

### 2. Test Dark Mode Functionality

1. Open in browser: `http://localhost:3000`
2. Click the dark mode toggle button
3. Expected: Theme switches between light and dark modes smoothly
4. Check console: No hydration mismatch errors

### 3. Test Feature Cards Icons

1. Visit the landing page
2. Expected: All feature cards show proper icons (List, Shield, Database, Bot, Lock, Zap)
3. Check console: No module/import errors

### 4. Test Responsive Design

1. Resize browser window
2. Expected: Layout adapts to different screen sizes
3. Theme toggle remains accessible

### 5. Test Existing Features

1. Verify all existing landing page elements are still visible
2. Check hero section, feature cards, and auth buttons
3. Expected: All existing functionality preserved

## Troubleshooting Common Issues

### Module Resolution Error

Problem: "Module not found: Can't resolve 'lucide-react'"
Solution: Verify lucide-react is installed and in package.json dependencies

### Hydration Mismatch Error

Problem: "Text content does not match server-rendered HTML"
Solution: Ensure ThemeProvider is properly configured in root layout with suppressHydrationWarning

### Dark Mode Not Applying

Problem: Tailwind dark: classes not working
Solution: Verify darkMode: 'class' in tailwind.config.ts and attribute="class" in ThemeProvider

### Icons Not Rendering

Problem: Icons don't appear on the page
Solution: Check that icons are properly imported and used as components in JSX

## Quality Assurance

### Visual Validation Checklist
- [ ] Theme toggle button appears in navbar and works correctly
- [ ] Light/dark mode switch works smoothly without flickering
- [ ] Feature card icons (List, Shield, Database, Bot, Lock, Zap) render correctly
- [ ] Icons adapt properly between light and dark themes
- [ ] Existing landing page elements remain intact
- [ ] Responsive design works in both light and dark modes

### Technical Validation Checklist
- [ ] ThemeProvider wraps entire app with proper configuration
- [ ] suppressHydrationWarning applied to html tag
- [ ] TypeScript typing is correct throughout
- [ ] No inline styles used (only Tailwind classes)
- [ ] Proper error handling implemented
- [ ] Accessibility attributes present (aria-labels, semantic HTML)
- [ ] No console errors in browser
- [ ] All existing functionality preserved