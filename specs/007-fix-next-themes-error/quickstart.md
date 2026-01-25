# Quickstart Guide: Next-Themes Error Fix & Dark Mode Setup

## Prerequisites

- Node.js 18+ and npm
- Next.js 16+ with App Router
- TypeScript 5.0+
- Tailwind CSS 3.4+

## Setup Environment

### 1. Install Missing Dependencies

```bash
cd phase2/frontend
npm install next-themes
```

### 2. Verify Package Versions

Ensure your package.json includes:
```json
{
  "dependencies": {
    "next-themes": "latest",
    "next": "16.x.x",
    "react": "18.x.x",
    "react-dom": "18.x.x"
  }
}
```

## Implementation Steps

### 1. Update Root Layout (phase2/frontend/app/layout.tsx)

Add ThemeProvider wrapper and hydration safety:

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
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
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

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()

  return (
    <button
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-offset-gray-800"
      aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      {theme === 'dark' ? (
        // Sun icon for light mode (when currently in dark mode)
        <svg
          className="h-5 w-5 text-yellow-400"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden="true"
        >
          <path
            fillRule="evenodd"
            d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 111 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM4 11a1 1 0 100-2H3a1 1 0 100 2h1zm-1 7a1 1 0 01-1-1v-1a1 1 0 112 0v1a1 1 0 01-1 1zm10-7a1 1 0 100-2h1a1 1 0 100 2h-1zm-1 7a1 1 0 01-1-1v-1a1 1 0 112 0v1a1 1 0 01-1 1zm-6-7a1 1 0 100-2H7a1 1 0 100 2h1zm-1 7a1 1 0 01-1-1v-1a1 1 0 112 0v1a1 1 0 01-1 1zm8-7a1 1 0 100-2h1a1 1 0 100 2h-1zm-1 7a1 1 0 01-1-1v-1a1 1 0 112 0v1a1 1 0 01-1 1z"
            clipRule="evenodd"
          />
        </svg>
      ) : (
        // Moon icon for dark mode (when currently in light mode)
        <svg
          className="h-5 w-5 text-gray-700 dark:text-gray-300"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden="true"
        >
          <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
        </svg>
      )}
    </button>
  )
}
```

### 3. Update Existing DarkModeToggle Component

Replace the existing implementation in `phase2/frontend/app/dashboard/components/DarkModeToggle.tsx` with next-themes:

```tsx
'use client';

import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';

export default function DarkModeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <button
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-offset-gray-800"
      aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      {theme === 'dark' ? (
        // Sun icon for light mode
        <svg
          className="h-5 w-5 text-yellow-400"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden="true"
        >
          <path
            fillRule="evenodd"
            d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 111 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM4 11a1 1 0 100-2H3a1 1 0 100 2h1zm-1 7a1 1 0 01-1-1v-1a1 1 0 112 0v1a1 1 0 01-1 1zm10-7a1 1 0 100-2h1a1 1 0 100 2h-1zm-1 7a1 1 0 01-1-1v-1a1 1 0 112 0v1a1 1 0 01-1 1zm-6-7a1 1 0 100-2H7a1 1 0 100 2h1zm-1 7a1 1 0 01-1-1v-1a1 1 0 112 0v1a1 1 0 01-1 1zm8-7a1 1 0 100-2h1a1 1 0 100 2h-1zm-1 7a1 1 0 01-1-1v-1a1 1 0 112 0v1a1 1 0 01-1 1z"
            clipRule="evenodd"
          />
        </svg>
      ) : (
        // Moon icon for dark mode
        <svg
          className="h-5 w-5 text-gray-700 dark:text-gray-300"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden="true"
        >
          <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
        </svg>
      )}
    </button>
  );
}
```

### 4. Configure Tailwind CSS

Ensure `tailwind.config.ts` has darkMode set to 'class':

```ts
/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class', // Required for next-themes compatibility
  // ... other config
}
```

## Verification Steps

### 1. Test Build Process

```bash
cd phase2/frontend
npm run dev
```

Expected: No "Module not found: Can't resolve 'next-themes'" errors

### 2. Test Dark Mode Functionality

1. Open in browser: `http://localhost:3000`
2. Click the dark mode toggle button
3. Expected: Theme switches between light and dark modes smoothly
4. Check console: No hydration mismatch errors

### 3. Test Responsive Design

1. Resize browser window
2. Expected: Layout adapts to different screen sizes
3. Theme toggle remains accessible

### 4. Test Existing Features

1. Verify all existing landing page elements are still visible
2. Check hero section, feature cards, and auth buttons
3. Expected: All existing functionality preserved

## Troubleshooting Common Issues

### Hydration Mismatch Error

Problem: "Text content does not match server-rendered HTML"
Solution: Ensure ThemeProvider is properly configured in root layout

### Module Resolution Error

Problem: "Module not found: Can't resolve 'next-themes'"
Solution: Verify next-themes is installed and in package.json dependencies

### Dark Mode Not Applying

Problem: Tailwind dark: classes not working
Solution: Verify darkMode: 'class' in tailwind.config.ts and attribute="class" in ThemeProvider

### Toggle Not Working

Problem: Clicking toggle has no effect
Solution: Check that useTheme hook is being used correctly and component is client-side

## Quality Assurance

### Visual Validation Checklist
- [ ] Theme toggle button appears in navbar and dashboard
- [ ] Light/dark mode switch works smoothly
- [ ] No flickering during theme transitions
- [ ] Existing landing page elements unchanged
- [ ] Responsive design maintained
- [ ] Icons display correctly in both themes

### Technical Validation Checklist
- [ ] ThemeProvider wraps entire app
- [ ] suppressHydrationWarning applied to html tag
- [ ] TypeScript typing is correct throughout
- [ ] No inline styles used (only Tailwind classes)
- [ ] Proper error handling implemented
- [ ] Accessibility attributes present (aria-labels, semantic HTML)
- [ ] No console errors in browser