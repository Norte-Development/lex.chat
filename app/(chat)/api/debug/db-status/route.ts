import { NextResponse } from 'next/server';
import { subscription, payment, user } from '@/lib/db/schema';
import { count, desc } from 'drizzle-orm';
import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';

// biome-ignore lint: Forbidden non-null assertion.
const client = postgres(process.env.POSTGRES_URL!);
const db = drizzle(client);

export async function GET() {
  try {
    // Check if tables exist by counting records
    const [userCount] = await db.select({ count: count() }).from(user);
    const [subscriptionCount] = await db.select({ count: count() }).from(subscription);
    const [paymentCount] = await db.select({ count: count() }).from(payment);

    // Get recent subscriptions (last 10)
    const recentSubscriptions = await db
      .select({
        id: subscription.id,
        userId: subscription.userId,
        status: subscription.status,
        createdAt: subscription.createdAt,
        stripeCustomerId: subscription.stripeCustomerId,
        stripeSubscriptionId: subscription.stripeSubscriptionId,
      })
      .from(subscription)
      .orderBy(desc(subscription.createdAt))
      .limit(10);

    // Get recent payments (last 10)
    const recentPayments = await db
      .select({
        id: payment.id,
        userId: payment.userId,
        amount: payment.amount,
        currency: payment.currency,
        status: payment.status,
        createdAt: payment.createdAt,
      })
      .from(payment)
      .orderBy(desc(payment.createdAt))
      .limit(10);

    return NextResponse.json({
      tablesStatus: {
        users: userCount.count,
        subscriptions: subscriptionCount.count,
        payments: paymentCount.count,
      },
      recentSubscriptions,
      recentPayments,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Database status check failed:', error);
    return NextResponse.json(
      { 
        error: 'Database check failed',
        details: error instanceof Error ? error.message : 'Unknown error',
        timestamp: new Date().toISOString(),
      },
      { status: 500 }
    );
  }
} 