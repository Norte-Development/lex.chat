import { NextRequest, NextResponse } from 'next/server';
import { headers } from 'next/headers';
import { stripe } from '@/lib/stripe-config';
import { STRIPE_WEBHOOK_SECRET, STRIPE_PRICE_ID } from '@/lib/stripe-constants';
import {
  createSubscription,
  updateSubscription,
  createPayment,
  getSubscriptionByStripeId,
} from '@/lib/db/queries';
import Stripe from 'stripe';

export async function POST(request: NextRequest) {
  console.log('🪝 Webhook received');
  
  const body = await request.text();
  const headersList = await headers();
  const signature = headersList.get('stripe-signature');

  console.log('📝 Webhook details:', {
    bodyLength: body.length,
    hasSignature: !!signature,
    hasWebhookSecret: !!STRIPE_WEBHOOK_SECRET,
    webhookSecretLength: STRIPE_WEBHOOK_SECRET?.length || 0,
  });

  if (!signature) {
    console.error('❌ No Stripe signature header found');
    return NextResponse.json({ error: 'No signature' }, { status: 400 });
  }

  if (!STRIPE_WEBHOOK_SECRET) {
    console.error('❌ STRIPE_WEBHOOK_SECRET is not configured');
    return NextResponse.json({ error: 'Webhook secret not configured' }, { status: 500 });
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      STRIPE_WEBHOOK_SECRET
    );
    console.log('✅ Webhook signature verified successfully');
    console.log('📦 Event type:', event.type);
  } catch (error) {
    console.error('❌ Webhook signature verification failed:', error);
    console.error('🔍 Signature header:', signature?.substring(0, 50) + '...');
    console.error('🔍 Webhook secret (first 10 chars):', STRIPE_WEBHOOK_SECRET.substring(0, 10) + '...');
    return NextResponse.json(
      { error: 'Invalid signature' },
      { status: 400 }
    );
  }

  try {
    switch (event.type) {
      case 'customer.subscription.created':
      case 'customer.subscription.updated': {
        console.log('📊 Processing subscription event:', event.type);
        const subscription = event.data.object as Stripe.Subscription;
        await handleSubscriptionChange(subscription);
        break;
      }

      case 'customer.subscription.deleted': {
        console.log('🗑️ Processing subscription deletion');
        const subscription = event.data.object as Stripe.Subscription;
        await handleSubscriptionDeleted(subscription);
        break;
      }

      case 'payment_intent.succeeded': {
        console.log('💳 Processing successful payment');
        const paymentIntent = event.data.object as Stripe.PaymentIntent;
        await handlePaymentSucceeded(paymentIntent);
        break;
      }

      case 'payment_intent.payment_failed': {
        console.log('❌ Processing failed payment');
        const paymentIntent = event.data.object as Stripe.PaymentIntent;
        await handlePaymentFailed(paymentIntent);
        break;
      }

      default:
        console.log(`ℹ️ Unhandled event type: ${event.type}`);
    }

    console.log('✅ Webhook processed successfully');
    return NextResponse.json({ received: true });
  } catch (error) {
    console.error('❌ Error processing webhook:', error);
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

  // Validate price_id
  const priceId = subscription.items.data[0]?.price?.id;
  if (!priceId || priceId !== STRIPE_PRICE_ID) {
    console.warn(`⚠️ Invalid or unknown price_id: ${priceId}. Expected: ${STRIPE_PRICE_ID}. Skipping subscription processing.`);
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