# Stripe Integration Guide

This guide explains how the Stripe subscription system is integrated into lex-ai.chat.

## Overview

The application uses Stripe for subscription management with the following features:
- Monthly subscription plan at $8/month (50% off from $15)
- 7-day free trial
- Subscription-based chat access
- Automatic webhook handling for subscription updates

## Components

### Database Schema

Two new tables were added to support subscriptions:

1. **Subscription table**: Stores user subscription data
   - `stripeCustomerId`: Links to Stripe customer
   - `stripeSubscriptionId`: Links to Stripe subscription
   - `stripePriceId`: The price tier being used
   - `status`: Subscription status (active, canceled, etc.)
   - `currentPeriodStart/End`: Billing period dates

2. **Payment table**: Tracks individual payments
   - `stripePaymentIntentId`: Links to Stripe payment
   - `amount`, `currency`: Payment details
   - `status`: Payment status (succeeded, failed, etc.)

### API Routes

#### `/api/stripe/create-checkout-session`
- Creates Stripe checkout sessions for new subscriptions
- Handles customer creation/retrieval
- Redirects to success/cancel URLs

#### `/api/stripe/webhook`
- Processes Stripe webhook events
- Handles subscription creation, updates, and cancellation
- Processes payment success/failure events

#### `/api/subscription/status`
- Checks if current user has active subscription
- Used by chat page to determine access

### Components

#### `SubscriptionModal`
- Modal popup shown to non-subscribed users
- Displays subscription plan details and pricing
- Handles Stripe checkout redirection

#### Updated Chat Page
- Now checks subscription status before allowing access
- Shows subscription modal for non-subscribed users
- Uses client-side session management

#### Updated Pricing Page
- Integrated with Stripe checkout
- Buttons now create actual checkout sessions

## Environment Variables

Required environment variables:

```env
# Stripe Configuration
STRIPE_SECRET_KEY=sk_test_...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_PRICE_ID=price_...
STRIPE_WEBHOOK_SECRET=whsec_...
```

## Setup Instructions

1. **Create Stripe Account and Products**
   ```bash
   # Create a product and price in Stripe dashboard or via CLI
   stripe products create --name "lex-ai.chat Professional Plan"
   stripe prices create --product prod_... --currency usd --unit-amount 800 --recurring interval=month
   ```

2. **Configure Webhooks**
   Set up webhook endpoint at: `https://yourdomain.com/api/stripe/webhook`
   
   Required events:
   - `customer.subscription.created`
   - `customer.subscription.updated`
   - `customer.subscription.deleted`
   - `payment_intent.succeeded`
   - `payment_intent.payment_failed`

3. **Database Migration**
   ```bash
   pnpm db:generate
   pnpm db:migrate
   ```

4. **Environment Setup**
   Copy `.env.example` to `.env.local` and fill in your Stripe keys

## User Flow

1. **New User Registration**: Users can register normally
2. **Chat Access Attempt**: When accessing `/chat`, subscription status is checked
3. **Subscription Required**: Non-subscribed users see subscription modal
4. **Stripe Checkout**: Users are redirected to Stripe's secure checkout
5. **Webhook Processing**: Subscription data is stored when payment succeeds
6. **Chat Access Granted**: Users with active subscriptions can access chat

## Testing

Use Stripe's test mode and test card numbers:
- Success: `4242424242424242`
- Failure: `4000000000000002`

## Security Considerations

- All sensitive operations use server-side API routes
- Webhook signatures are verified for authenticity
- User sessions are verified before subscription operations
- Database queries use prepared statements via Drizzle ORM

## Subscription Status Logic

A subscription is considered active if:
- Status is 'active' or 'trialing'
- Current period end date is in the future
- User has a valid subscription record

## Error Handling

- Stripe API errors are logged and handled gracefully
- Failed payments trigger webhook events for proper status updates
- Users receive appropriate error messages for failed operations