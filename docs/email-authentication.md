# Email Authentication Setup

This document explains how to configure email confirmation and password recovery for your Lex AI Chat application using SendGrid.

## Overview

The application now includes:
- ✅ Email verification for new user registrations
- ✅ Password reset functionality via email
- ✅ Professional email templates with legal branding
- ✅ SendGrid API for reliable email delivery
- ✅ Token-based security with expiration

## Environment Variables

Add the following environment variables to your `.env.local` file:

```bash
# Database (required for migrations)
POSTGRES_URL="your_postgres_connection_string"

# SendGrid Configuration (required for email functionality)
SENDGRID_API_KEY="your_sendgrid_api_key"
EMAIL_FROM="noreply@yourverifieddomain.com" # A verified sender in SendGrid

# Application URL (required for email links)
NEXT_PUBLIC_BASE_URL="http://localhost:3000"  # Your app's base URL
```

## SendGrid Setup

1.  **Create a SendGrid Account**: If you don't have one, sign up at [sendgrid.com](https://sendgrid.com).
2.  **Create an API Key**:
    -   In your SendGrid dashboard, go to **Settings > API Keys**.
    -   Click **Create API Key**.
    -   Give it "Full Access" or restrict it to just "Mail Send".
    -   Copy the generated API key and store it securely. This is your `SENDGRID_API_KEY`.
3.  **Verify a Sender Identity**:
    -   Go to **Settings > Sender Authentication**.
    -   You must verify either a **Single Sender** or an entire **Domain**. Verifying a domain is recommended for production as it improves deliverability.
    -   Follow the instructions to verify your `EMAIL_FROM` address.

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
2. **Email Sent**: Verification email sent automatically via SendGrid
3. **Verification**: User clicks link in email to verify account
4. **Login**: User can now log in with verified email

## Password Recovery Flow

1. **Forgot Password**: User requests password reset from login page
2. **Email Sent**: Reset link sent to user's email via SendGrid
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

## Troubleshooting

### Common Issues

1. **Emails not sending**
   - Check that your `SENDGRID_API_KEY` is correct.
   - Ensure `EMAIL_FROM` is a verified sender in your SendGrid account.
   - Check the SendGrid Activity Feed for any errors.

2. **"Invalid token" errors**
   - Tokens expire (24h for verification, 1h for reset)
   - Tokens are single-use only
   - Check database connection

3. **"User not found" errors**
   - User must exist in database
   - Check email spelling
   - Verify user wasn't deleted

### Production Considerations

1. **Email Deliverability**
   - Use a dedicated email service like SendGrid (which you are now doing).
   - Set up SPF, DKIM, and DMARC records for your domain in SendGrid for best results.
   - Monitor bounce rates and spam reports in the SendGrid dashboard.

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
│   └── service.ts          # Email service with SendGrid configuration
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

1. Set up your SendGrid account and verify a sender
2. Configure environment variables (`SENDGRID_API_KEY`, `EMAIL_FROM`)
3. Run database migrations
4. Test the email functionality
5. Customize email templates if needed
6. Deploy with proper environment variables

Your application now has professional-grade email authentication suitable for legal professionals in Argentina! 🇦🇷⚖️