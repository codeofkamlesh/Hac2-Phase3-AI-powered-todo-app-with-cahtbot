# Data Model: Landing Page for Phase II Todo App

## Key Entities

### Landing Page Content
- **heroSection**: Contains headline, subheadline, call-to-action buttons
  - headline: string - Main title of the page
  - subheadline: string - Supporting text with hackathon benefits
  - ctaButtons: array - Collection of call-to-action buttons [{text, link, style}]
- **featureCards**: Array of feature highlight cards [{icon, title, description, hoverEffect}]
  - icon: string - Lucide icon identifier
  - title: string - Feature title
  - description: string - Feature description
  - hoverEffect: string - CSS class for hover animation
- **navigation**: Top navigation bar configuration
  - logo: string - Logo text ("Todo Evolution")
  - links: array - Navigation links [{text, href, authRequired}]
  - themeToggle: boolean - Whether theme toggle is visible

### Theme Configuration
- **themeSettings**: Color scheme and preference settings
  - currentTheme: enum - "light" | "dark" | "system"
  - systemPreference: enum - "light" | "dark" - User's OS preference
  - lightColors: object - Color palette for light mode
  - darkColors: object - Color palette for dark mode
  - gradientConfig: object - Gradient settings for hero section

### Navigation State
- **authState**: Authentication status and user information
  - isAuthenticated: boolean - Whether user is logged in
  - user: object - User information when authenticated {id, email, name}
  - showAvatar: boolean - Whether to show user avatar instead of auth links

## Validation Rules

### Landing Page Content Validation
- Headline must not exceed 100 characters
- Subheadline must not exceed 250 characters
- At least 3 feature cards required
- Maximum 5 feature cards recommended
- All CTA buttons must have valid href or onClick handlers

### Theme Configuration Validation
- Both light and dark color palettes must be defined
- Gradient settings must include at least 2 colors
- System preference detection must be supported
- Theme toggle functionality must be accessible

### Navigation State Validation
- User object is only present when authenticated
- Avatar only shows when user is authenticated
- Auth links only show when user is not authenticated

## State Transitions

### Theme States
1. **Loading**: Theme preference not yet determined
2. **Light**: Light mode active
3. **Dark**: Dark mode active
4. **System**: Following OS preference

### Authentication States
1. **Unauthenticated**: No user logged in, show auth links
2. **Authenticating**: Processing login/signup request
3. **Authenticated**: User logged in, show avatar/profile

## Relationships

### Component Relationships
- **Hero Section** → **Navigation Bar** (shares theme context)
- **Feature Cards** → **Theme Configuration** (uses theme colors)
- **Navigation State** → **Authentication Flow** (controls auth UI)

## Frontend State Management

### Local Storage Keys
- **theme**: Current theme preference (light/dark/system)
- **token**: JWT token for authentication
- **userId**: User's unique identifier
- **userName**: User's display name
- **userEmail**: User's email address

### Component State
- **loading**: Boolean for form submission states
- **error**: String for error messages
- **formData**: Object for form data {email, password, name}
- **hoveredCard**: Index of currently hovered feature card

## API Response Structures

### Authentication Responses
- **Login Success**: {token: string, user: {id, email, name}, message: string}
- **Login Error**: {error: string, message: string}
- **Signup Success**: {token: string, user: {id, email, name}, message: string}
- **Signup Error**: {error: string, message: string}
- **Token Verification**: {valid: boolean, user_id: string}

### Feature Card Data Structure
- **Basic Todo CRUD**: {icon: "list", title: "Todo Management", description: "Add, update, delete, and mark tasks complete", hoverEffect: "scale-105"}
- **Secure Authentication**: {icon: "shield", title: "Secure Multi-User", description: "JWT-based authentication with user isolation", hoverEffect: "scale-105"}
- **Persistent Storage**: {icon: "database", title: "Neon DB Storage", description: "Reliable PostgreSQL database with ACID compliance", hoverEffect: "scale-105"}
- **AI Features**: {icon: "bot", title: "AI Integration", description: "Advanced features with AI chatbot and cloud deployment", hoverEffect: "scale-105"}