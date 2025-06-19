import { NextRequest, NextResponse } from 'next/server';
import { headers } from 'next/headers';
import { stripe } from '@/lib/stripe';
import { STRIPE_WEBHOOK_SECRET } from '@/lib/stripe-constants';
import {
  createSubscription,
  updateSubscription,
  createPayment,
  getSubscriptionByStripeId,
} from '@/lib/db/queries';
import Stripe from 'stripe';

export async function POST(request: NextRequest) {
  const body = await request.text();
  const headersList = await headers();
  const signature = headersList.get('stripe-signature');

  if (!signature) {
    return NextResponse.json({ error: 'No signature' }, { status: 400 });
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      STRIPE_WEBHOOK_SECRET
    );
  } catch (error) {
    console.error('Webhook signature verification failed:', error);
    return NextResponse.json(
      { error: 'Invalid signature' },
      { status: 400 }
    );
  }

  try {
    switch (event.type) {
      case 'customer.subscription.created':
      case 'customer.subscription.updated': {
        const subscription = event.data.object as Stripe.Subscription;
        await handleSubscriptionChange(subscription);
        break;
      }

      case 'customer.subscription.deleted': {
        const subscription = event.data.object as Stripe.Subscription;
        await handleSubscriptionDeleted(subscription);
        break;
      }

      case 'payment_intent.succeeded': {
        const paymentIntent = event.data.object as Stripe.PaymentIntent;
        await handlePaymentSucceeded(paymentIntent);
        break;
      }

      case 'payment_intent.payment_failed': {
        const paymentIntent = event.data.object as Stripe.PaymentIntent;
        await handlePaymentFailed(paymentIntent);
        break;
      }

      default:
        console.log(`Unhandled event type: ${event.type}`);
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error('Error processing webhook:', error);
    return NextResponse.json(
      { error: 'Webhook processing failed' },
      { status: 500 }
    );
  }
}

async function handleSubscriptionChange(subscription: Stripe.Subscription) {
  const userId = subscription.metadata.userId;
  if (!userId) {
    console.error('No userId in subscription metadata');
    return;
  }

  const existingSubscriptions = await getSubscriptionByStripeId(subscription.id);

  // Use bracket notation to access period properties
  const periodStart = (subscription as any).current_period_start;
  const periodEnd = (subscription as any).current_period_end;

  if (existingSubscriptions.length > 0) {
    // Update existing subscription
    await updateSubscription({
      stripeSubscriptionId: subscription.id,
      status: subscription.status as any,
      currentPeriodStart: new Date(periodStart * 1000),
      currentPeriodEnd: new Date(periodEnd * 1000),
    });
  } else {
    // Create new subscription
    await createSubscription({
      userId,
      stripeCustomerId: subscription.customer as string,
      stripeSubscriptionId: subscription.id,
      stripePriceId: subscription.items.data[0].price.id,
      status: subscription.status as any,
      currentPeriodStart: new Date(periodStart * 1000),
      currentPeriodEnd: new Date(periodEnd * 1000),
    });
  }
}

async function handleSubscriptionDeleted(subscription: Stripe.Subscription) {
  await updateSubscription({
    stripeSubscriptionId: subscription.id,
    status: 'canceled',
  });
}

async function handlePaymentSucceeded(paymentIntent: Stripe.PaymentIntent) {
  const userId = paymentIntent.metadata.userId;
  if (!userId) {
    console.error('No userId in payment intent metadata');
    return;
  }

  await createPayment({
    userId,
    stripePaymentIntentId: paymentIntent.id,
    amount: paymentIntent.amount.toString(),
    currency: paymentIntent.currency,
    status: 'succeeded',
  });
}

async function handlePaymentFailed(paymentIntent: Stripe.PaymentIntent) {
  const userId = paymentIntent.metadata.userId;
  if (!userId) {
    console.error('No userId in payment intent metadata');
    return;
  }

  await createPayment({
    userId,
    stripePaymentIntentId: paymentIntent.id,
    amount: paymentIntent.amount.toString(),
    currency: paymentIntent.currency,
    status: 'failed',
  });
}