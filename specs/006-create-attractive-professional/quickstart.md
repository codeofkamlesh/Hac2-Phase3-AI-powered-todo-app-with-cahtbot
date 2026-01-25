# Quickstart Guide: Landing Page Implementation

## Prerequisites

- Node.js 18+ and npm/yarn/pnpm
- Python 3.13+
- uv (Python package manager)
- Next.js 16+ with App Router
- Better Auth
- Tailwind CSS
- PostgreSQL (Neon DB connection)

## Setup Environment

### 1. Clone and Install Dependencies

```bash
# Install backend dependencies
cd phase2/backend
uv pip install fastapi uvicorn sqlmodel python-jose[builtin] passlib[bcrypt] python-multipart python-dotenv

# Install frontend dependencies
cd ../frontend
npm install
```

### 2. Configure Environment Variables

**Backend** (`phase2/backend/.env`):
```env
DATABASE_URL=postgresql://neondb_owner:npg_E5vOzoNWpS2A@ep-holy-credit-a79uzqo7-pooler.ap-southeast-2.aws.neon.tech/neondb?sslmode=require
BETTER_AUTH_SECRET=your_secret_key_here
FRONTEND_URL=http://localhost:3000
```

**Frontend** (`phase2/frontend/.env.local`):
```env
NEXT_PUBLIC_API_URL=http://localhost:8000
NEXT_PUBLIC_AUTH_URL=http://localhost:3000
BETTER_AUTH_URL=http://localhost:3000
BETTER_AUTH_SECRET=your_secret_key_here
```

**Important**: The `BETTER_AUTH_SECRET` must be identical in both files!

## Running the Application

### 1. Start Backend Server

```bash
cd phase2/backend
uvicorn main:app --reload --port 8000
```

### 2. Start Frontend Server

```bash
cd phase2/frontend
npm run dev
```

## Testing the Landing Page

### 1. Verify Landing Page Loads

Open in browser: `http://localhost:3000`

Expected:
- Large headline "The Evolution of Todo – Mastering Spec-Driven Development & Cloud Native AI"
- Colorful gradient background
- Clear "Sign Up" and "Sign In" buttons

### 2. Test Theme Switching

Click the dark mode toggle in the navigation bar.
Expected: Page theme switches between light and dark modes consistently.

### 3. Test Responsive Design

Resize browser window or use device emulator.
Expected: Layout adapts to different screen sizes with proper mobile-first approach.

### 4. Test Authentication Flows

Click "Sign Up" or "Sign In" buttons.
Expected: Navigate to proper authentication pages without errors.

## API Endpoints

### Authentication Endpoints
- `POST /api/auth/login` - Authenticate user with email/password
- `POST /api/auth/signup` - Create new user account
- `GET /api/auth/verify` - Verify authentication token
- `GET /api/auth/session` - Get current session (Better Auth)

### Landing Page Specific
- `GET /` - Main landing page with hero section and features
- `GET /login` - Login form page
- `GET /signup` - Signup form page
- `GET /dashboard` - Protected dashboard page (requires auth)

## Component Structure

### UI Components
- `/components/ui/Navbar.tsx` - Navigation bar with logo and auth links
- `/components/ui/ThemeToggle.tsx` - Dark mode toggle component
- `/components/landing/Hero.tsx` - Hero section with headline and CTAs
- `/components/landing/FeatureCards.tsx` - Feature highlight cards
- `/components/landing/Footer.tsx` - Page footer
- `/components/auth/AuthButtons.tsx` - Sign up/in buttons with Better Auth integration

### Page Components
- `/app/page.tsx` - Main landing page (combines Hero, Features, and Navigation)
- `/app/login/page.tsx` - Login form page
- `/app/signup/page.tsx` - Signup form page
- `/app/dashboard/page.tsx` - Protected dashboard page

## Debugging Common Issues

### JSON Parse Error

Check:
- Backend endpoints return valid JSON responses
- Frontend properly handles JSON parsing with try/catch
- Raw response content in browser dev tools

### 404 Error on Authentication Endpoints

Check:
- Backend server is running on correct port (8000)
- Frontend API URL is properly configured
- Route definitions match expected paths

### Theme Switching Issues

Check:
- ThemeProvider wraps the entire application
- useTheme hook is properly imported and used
- Tailwind CSS is configured with dark mode support

### Frontend Console Logs

Look for these debug messages:
- "Dark mode toggled to: [theme]"
- "Authentication request sent"
- "Response received: [status code]"

## Quality Assurance

### Visual Validation Checklist
- [ ] Hero section has colorful gradient background
- [ ] Feature cards display properly with icons and descriptions
- [ ] Dark/light mode toggle works throughout the application
- [ ] Responsive design works on mobile and desktop
- [ ] Authentication buttons navigate to correct pages
- [ ] Hover effects work on interactive elements
- [ ] Typography is readable and consistent
- [ ] Spacing and layout follow design system

### Technical Validation Checklist
- [ ] ThemeProvider wraps entire app
- [ ] TypeScript typing is correct throughout
- [ ] No inline styles used (only Tailwind classes)
- [ ] Proper error handling implemented
- [ ] Accessibility attributes present (aria-labels, semantic HTML)
- [ ] Performance metrics met (< 3s load time)
- [ ] No console errors in browser
- [ ] Proper meta tags for SEO