const postgres = require('postgres');
require('dotenv').config({ path: '.env.local' });

const sql = postgres(process.env.POSTGRES_URL);

async function checkDatabase() {
  try {
    console.log('🔍 Checking database tables...\n');
    
    // Check if tables exist
    const tables = await sql`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public' 
      AND table_name IN ('User', 'Subscription', 'Payment')
      ORDER BY table_name;
    `;
    
    console.log('📋 Tables found:');
    tables.forEach(table => console.log(`  ✅ ${table.table_name}`));
    
    // Count records in each table
    const userCount = await sql`SELECT COUNT(*) as count FROM "User"`;
    const subCount = await sql`SELECT COUNT(*) as count FROM "Subscription"`;
    const payCount = await sql`SELECT COUNT(*) as count FROM "Payment"`;
    
    console.log('\n📊 Record counts:');
    console.log(`  Users: ${userCount[0].count}`);
    console.log(`  Subscriptions: ${subCount[0].count}`);
    console.log(`  Payments: ${payCount[0].count}`);
    
    // Show recent subscriptions
    const recentSubs = await sql`
      SELECT 
        "stripeSubscriptionId",
        "status",
        "createdAt"
      FROM "Subscription" 
      ORDER BY "createdAt" DESC 
      LIMIT 5
    `;
    
    if (recentSubs.length > 0) {
      console.log('\n🆕 Recent Subscriptions:');
      recentSubs.forEach(sub => {
        console.log(`  ${sub.stripeSubscriptionId}: ${sub.status} (${sub.createdAt})`);
      });
    }
    
  } catch (error) {
    console.error('❌ Database check failed:', error.message);
  } finally {
    await sql.end();
  }
}

checkDatabase(); 