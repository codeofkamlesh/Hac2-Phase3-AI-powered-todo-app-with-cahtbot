# Data Model: Authentication Fixes Implementation

## Key Entities

### User
- **id**: string (UUID) - Unique identifier for the user
- **email**: string (unique) - User's email address for authentication
- **password**: string (hashed) - Securely hashed password using bcrypt
- **name**: string - User's display name
- **created_at**: datetime - Timestamp when user account was created
- **updated_at**: datetime - Timestamp when user account was last updated

### JWT Token
- **user_id**: string - Reference to the user's unique identifier
- **email**: string - User's email address for verification
- **exp**: integer - Unix timestamp for token expiration (7 days)
- **sub**: string - Subject identifier (typically user_id)
- **iat**: integer - Issued at timestamp

### Authentication Response
- **token**: string - JWT token for authentication
- **user**: object - User object containing {id, email, name}
- **message**: string - Optional success/error message

### Authentication Request (Login)
- **email**: string - User's email address
- **password**: string - User's password (plaintext, will be hashed server-side)

### Authentication Request (Signup)
- **email**: string - User's email address
- **password**: string - User's password (plaintext, will be hashed server-side)
- **name**: string - User's display name

## Validation Rules

### User Entity
- Email must be valid email format
- Email must be unique across all users
- Password must meet strength requirements (min 8 chars)
- Name must not be empty
- Created and updated timestamps are automatically set

### Authentication Requests
- Email must be provided and valid
- Password must be provided (validation happens server-side)
- For signup, name must be provided
- All fields are required unless specified as optional

## State Transitions

### User Account States
1. **Pending**: User initiated signup but hasn't completed
2. **Active**: User completed signup and verified (implicit in this system)
3. **Inactive**: Account suspended (not implemented in current scope)

### Token States
1. **Valid**: Token exists and hasn't expired
2. **Expired**: Token reached expiration time
3. **Invalid**: Token was tampered with or secret doesn't match

## Relationships

### User to Sessions
- One user can have multiple active JWT tokens
- Tokens are stateless (no DB storage required)
- Token validity depends on shared secret integrity

## Security Considerations

### Password Storage
- Stored as bcrypt hash with salt
- Never stored in plaintext
- Verified using secure comparison

### Token Security
- Signed with shared secret (BETTER_AUTH_SECRET)
- Expires after 7 days
- Contains limited user information
- Verified using JWT standard libraries

## API Response Formats

### Successful Authentication Response
- **On Login**: {token: string, user: {id, email, name}, message: "Login successful"}
- **On Signup**: {token: string, user: {id, email, name}, message: "Account created successfully"}

### Error Response
- **On Failure**: {error: string, message: "Error description"}