# Quickstart Guide: Fix "Module not found: Can't resolve 'next-themes'" Error + Complete Dark Mode Setup

## Prerequisites

- Node.js 18+ and npm
- Next.js 16+ with App Router
- TypeScript 5.0+
- Tailwind CSS 3.4+
- Better Auth for authentication

## Setup Environment

### 1. Install Missing Dependencies

```bash
cd phase2/frontend
npm install next-themes lucide-react react-hook-form @hookform/resolvers zod @tanstack/react-query react-hot-toast react-datepicker
```

### 2. Verify Package Versions

Ensure your package.json includes:
```json
{
  "dependencies": {
    "next-themes": "latest",
    "lucide-react": "latest",
    "react-hook-form": "latest",
    "@hookform/resolvers": "latest",
    "zod": "latest",
    "@tanstack/react-query": "latest",
    "react-hot-toast": "latest",
    "react-datepicker": "latest",
    "next": "16.x.x",
    "react": "18.x.x",
    "react-dom": "18.x.x"
  }
}
```

## Implementation Steps

### 1. Update Root Layout (app/layout.tsx)

Add ThemeProvider wrapper with hydration safety:

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

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()

  return (
    <button onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>
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

Add theme toggle to `components/ui/Navbar.tsx`:

```tsx
import { ThemeToggle } from './ThemeToggle'

// In the Navbar component JSX:
<div className="flex items-center space-x-4">
  {/* other navbar elements */}
  <ThemeToggle />
</div>
```

### 4. Create Protected Tasks Page

Create `app/tasks/page.tsx` with authentication check:

```tsx
'use client'

import { useSession } from 'better-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export default function TasksPage() {
  const { data: session, status } = useSession()
  const router = useRouter()

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/signin')
    }
  }, [status, router])

  if (status === 'loading') {
    return <div>Loading...</div>
  }

  if (status === 'unauthenticated') {
    return null // Redirect handled by useEffect
  }

  return (
    <div className="container mx-auto">
      <h1>Tasks Dashboard</h1>
      {/* Task management UI components */}
    </div>
  )
}
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

Expected: No "Module not found: Can't resolve 'next-themes'" errors

### 2. Test Authentication Protection

1. Open in browser: `http://localhost:3000/tasks`
2. Expected: Redirect to `/signin` if not authenticated
3. After signing in: Should see tasks dashboard with user's tasks only

### 3. Test Dark Mode Functionality

1. Click the dark mode toggle button
2. Expected: Theme switches between light and dark modes smoothly
3. Check console: No hydration mismatch errors

### 4. Test Task Management Features

1. Add a new task with title and description
2. Expected: Task appears in list with proper validation
3. Toggle task completion: Should show visual feedback
4. Update task: Should save changes properly
5. Delete task: Should confirm and remove from list

### 5. Test Advanced Features

1. Set task priority (high/medium/low) - should show color coding
2. Add tags to tasks - should display as pill components
3. Use search/filter/sort functionality - should update list in real-time
4. Set due dates - should show in date picker
5. Create recurring tasks - should follow specified pattern

### 6. Test Responsive Design

1. Resize browser window
2. Expected: Layout adapts to different screen sizes
3. Theme toggle remains accessible

### 7. Test Existing Features

1. Verify all existing landing page elements are still visible
2. Check hero section, feature cards, and auth buttons
3. Expected: All existing functionality preserved

## Troubleshooting Common Issues

### Module Resolution Error

Problem: "Module not found: Can't resolve 'next-themes'"
Solution: Verify next-themes is installed and in package.json dependencies

### Hydration Mismatch Error

Problem: "Text content does not match server-rendered HTML"
Solution: Ensure ThemeProvider is properly configured in root layout with suppressHydrationWarning

### Authentication Redirect Loop

Problem: Users get stuck in redirect loop between tasks and signin
Solution: Check that Better Auth session is properly configured and user is authenticated

### Theme Toggle Not Working

Problem: Clicking toggle has no effect
Solution: Check that useTheme hook is being used correctly and component is client-side

### Form Validation Errors

Problem: Task forms not validating properly
Solution: Verify react-hook-form and Zod integration is working correctly

## Quality Assurance

### Visual Validation Checklist
- [ ] Theme toggle button appears in navbar
- [ ] Light/dark mode switch works smoothly
- [ ] No flickering during theme transitions
- [ ] Protected route redirects unauthenticated users
- [ ] Task forms validate inputs properly
- [ ] Feature cards maintain consistent styling
- [ ] Icons display correctly in both themes

### Technical Validation Checklist
- [ ] ThemeProvider wraps entire app
- [ ] suppressHydrationWarning applied to html tag
- [ ] Authentication check implemented on protected page
- [ ] TypeScript typing is correct throughout
- [ ] No inline styles used (only Tailwind classes)
- [ ] Proper error handling implemented
- [ ] Accessibility attributes present (aria-labels, semantic HTML)
- [ ] No console errors in browser
- [ ] All API calls properly authenticated
- [ ] Task filtering/sorting works correctly