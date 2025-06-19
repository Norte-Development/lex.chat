# Email Authentication Setup

This document explains how to configure email confirmation and password recovery for your Lex AI Chat application.

## Overview

The application now includes:
- ✅ Email verification for new user registrations
- ✅ Password reset functionality via email
- ✅ Professional email templates with legal branding
- ✅ Configurable SMTP settings
- ✅ Token-based security with expiration

## Environment Variables

Add the following environment variables to your `.env.local` file:

```bash
# Database (required for migrations)
POSTGRES_URL="your_postgres_connection_string"

# SMTP Configuration (required for email functionality)
SMTP_HOST="smtp.gmail.com"              # Your SMTP server
SMTP_PORT="587"                         # SMTP port (usually 587 for TLS)
SMTP_SECURE="false"                     # Set to "true" for port 465, "false" for 587
SMTP_USER="your-email@gmail.com"        # Your email address
SMTP_PASSWORD="your-app-password"       # Your email password or app password
SMTP_FROM="noreply@lex-ai.chat"         # From address for outgoing emails

# Application URL (required for email links)
NEXT_PUBLIC_BASE_URL="http://localhost:3000"  # Your app's base URL
```

## SMTP Provider Setup

### Gmail Setup
1. Enable 2-factor authentication on your Google account
2. Generate an App Password:
   - Go to Google Account settings
   - Security → 2-Step Verification → App passwords
   - Generate a password for "Mail"
   - Use this password in `SMTP_PASSWORD`

```bash
SMTP_HOST="smtp.gmail.com"
SMTP_PORT="587"
SMTP_SECURE="false"
SMTP_USER="your-email@gmail.com"
SMTP_PASSWORD="your-16-character-app-password"
```

### Outlook/Hotmail Setup
```bash
SMTP_HOST="smtp-mail.outlook.com"
SMTP_PORT="587"
SMTP_SECURE="false"
SMTP_USER="your-email@outlook.com"
SMTP_PASSWORD="your-password"
```

### Custom SMTP Server
```bash
SMTP_HOST="mail.yourdomain.com"
SMTP_PORT="587"
SMTP_SECURE="false"
SMTP_USER="noreply@yourdomain.com"
SMTP_PASSWORD="your-password"
```

## Database Migration

After setting up your environment variables, run the migration to create the new tables:

```bash
# Generate migration files (already done)
pnpm db:generate

# Run migrations
pnpm db:migrate
```

This creates two new tables:
- `EmailVerificationToken` - for email verification
- `PasswordResetToken` - for password reset

## New User Flow

1. **Registration**: User registers with email and password
2. **Email Sent**: Verification email sent automatically
3. **Verification**: User clicks link in email to verify account
4. **Login**: User can now log in with verified email

## Password Recovery Flow

1. **Forgot Password**: User requests password reset from login page
2. **Email Sent**: Reset link sent to user's email
3. **Reset**: User clicks link and sets new password
4. **Login**: User can log in with new password

## API Endpoints

The following new endpoints are available:

- `GET /api/verify-email?token=xxx` - Email verification
- `POST /api/reset-password` - Password reset confirmation

## Email Templates

Professional email templates are included with:
- ⚖️ Legal branding and symbolism
- 🇦🇷 Spanish language for Argentine users
- 🔒 Security information and best practices
- 📱 Mobile-responsive design
- 🎨 Modern gradient styling

## Security Features

- **Token Expiration**: 
  - Email verification: 24 hours
  - Password reset: 1 hour
- **Single Use**: Tokens are deleted after use
- **Unique Tokens**: UUID-based tokens
- **Email Verification Required**: Users must verify email before login
- **Secure Password Hashing**: bcrypt for password storage

## Testing Email Configuration

You can test your SMTP configuration with:

```typescript
import { testEmailConnection } from '@/lib/email/service';

const isWorking = await testEmailConnection();
console.log('SMTP working:', isWorking);
```

## Troubleshooting

### Common Issues

1. **"SMTP connection failed"**
   - Check SMTP credentials
   - Verify host and port
   - Check firewall settings

2. **"Email not sent"**
   - Verify `SMTP_FROM` is a valid email
   - Check your email provider's sending limits
   - Review spam/security policies

3. **"Invalid token" errors**
   - Tokens expire (24h for verification, 1h for reset)
   - Tokens are single-use only
   - Check database connection

4. **"User not found" errors**
   - User must exist in database
   - Check email spelling
   - Verify user wasn't deleted

### Production Considerations

1. **Email Deliverability**
   - Use a professional email service (SendGrid, Mailgun, etc.)
   - Set up SPF, DKIM, and DMARC records
   - Monitor bounce rates and spam reports

2. **Rate Limiting**
   - Implement rate limiting for password reset requests
   - Prevent abuse of verification email resending

3. **Monitoring**
   - Log email sending attempts
   - Monitor token usage patterns
   - Set up alerts for high failure rates

## File Structure

```
lib/
├── email/
│   └── service.ts          # Email service with SMTP configuration
├── db/
│   ├── schema.ts           # Updated with new tables
│   ├── queries.ts          # New email/password functions
│   └── migrations/         # Database migration files
app/(auth)/
├── actions.ts              # Updated auth actions
├── auth.ts                 # Updated auth configuration
├── api/
│   ├── verify-email/       # Email verification endpoint
│   └── reset-password/     # Password reset endpoint
├── verify-email/
│   └── page.tsx            # Email verification page
├── reset-password/
│   └── page.tsx            # Password reset page
└── forgot-password/
    └── page.tsx            # Forgot password page
```

## Next Steps

1. Set up your SMTP provider
2. Configure environment variables
3. Run database migrations
4. Test the email functionality
5. Customize email templates if needed
6. Deploy with proper environment variables

Your application now has professional-grade email authentication suitable for legal professionals in Argentina! 🇦🇷⚖️