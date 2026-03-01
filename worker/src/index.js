import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { drizzle } from 'drizzle-orm/neon-http';
import { neon } from '@neondatabase/serverless';
import { eq, desc, sql } from 'drizzle-orm';
import { donors, orders, payments, subscriptions } from './db/schema.js';
import Razorpay from 'razorpay';
import crypto from 'crypto';

const app = new Hono();

// --- Webhook (before CORS so Razorpay can reach it) ---
app.post('/api/webhook/razorpay', async (c) => {
  const sqlNeon = neon(c.env.DATABASE_URL);
  const db = drizzle(sqlNeon);
  const WEBHOOK_SECRET = c.env.RAZORPAY_WEBHOOK_SECRET || '';


  try {
    const signature = c.req.header('x-razorpay-signature');
    const body = await c.req.text();

    if (WEBHOOK_SECRET) {
      const expected = crypto.createHmac('sha256', WEBHOOK_SECRET).update(body).digest('hex');
      if (signature !== expected) {
        console.error('Webhook signature validation failed.');
        return c.json({ error: 'Invalid signature' }, 400);
      }
    }

    const event = JSON.parse(body);
    if (!event.event || !event.payload) {
      return c.json({ error: 'Invalid event structure' }, 400);
    }

    console.log(`[Webhook] ${event.event}`);
    const ist = new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' });

    switch (event.event) {
      case 'payment.captured': {
        const p = event.payload.payment.entity;
        const donorId = p.notes?.donorId ? Number(p.notes.donorId) : null;

        if (p.order_id) {
          await db.update(orders).set({
            status: 'paid',
            paymentId: p.id,
            updatedAt: new Date(),
            updatedAtIst: ist,
          }).where(eq(orders.razorpayOrderId, p.order_id));
        }

        const existing = await db.select({ id: payments.id })
          .from(payments).where(eq(payments.razorpayPaymentId, p.id));

        if (existing.length === 0) {
          await db.insert(payments).values({
            razorpayPaymentId: p.id,
            razorpayOrderId: p.order_id || null,
            donorId,
            amount: String(p.amount / 100),
            currency: p.currency,
            method: p.method,
            status: 'captured',
            type: 'onetime',
            verifiedVia: 'webhook',
            createdAtIst: ist,
            updatedAtIst: ist,
          });
        } else {
          await db.update(payments).set({
            status: 'captured', method: p.method, verifiedVia: 'webhook',
            updatedAt: new Date(), updatedAtIst: ist,
          }).where(eq(payments.razorpayPaymentId, p.id));
        }
        break;
      }

      case 'payment.failed': {
        const p = event.payload.payment.entity;
        if (p.order_id) {
          await db.update(orders).set({
            status: 'failed', updatedAt: new Date(), updatedAtIst: ist,
          }).where(eq(orders.razorpayOrderId, p.order_id));
        }

        const existing = await db.select({ id: payments.id })
          .from(payments).where(eq(payments.razorpayPaymentId, p.id));

        if (existing.length === 0) {
          await db.insert(payments).values({
            razorpayPaymentId: p.id,
            razorpayOrderId: p.order_id || null,
            donorId: p.notes?.donorId ? Number(p.notes.donorId) : null,
            status: 'failed',
            errorReason: p.error_description || 'Unknown',
            verifiedVia: 'webhook',
            createdAtIst: ist,
            updatedAtIst: ist,
          });
        } else {
          await db.update(payments).set({
            status: 'failed', errorReason: p.error_description || 'Unknown',
            verifiedVia: 'webhook', updatedAt: new Date(), updatedAtIst: ist,
          }).where(eq(payments.razorpayPaymentId, p.id));
        }
        break;
      }

      case 'subscription.activated': {
        const s = event.payload.subscription.entity;
        await db.update(subscriptions).set({
          status: 'active', activatedAt: new Date(), verifiedVia: 'webhook',
          updatedAt: new Date(), updatedAtIst: ist,
        }).where(eq(subscriptions.razorpaySubscriptionId, s.id));
        break;
      }

      case 'subscription.charged': {
        const s = event.payload.subscription.entity;
        const p = event.payload.payment?.entity;
        await db.update(subscriptions).set({
          status: 'active', paidCount: s.paid_count, lastChargedAt: new Date(),
          updatedAt: new Date(), updatedAtIst: ist,
        }).where(eq(subscriptions.razorpaySubscriptionId, s.id));

        if (p) {
          const donorId = s.notes?.donorId ? Number(s.notes.donorId) : null;
          await db.insert(payments).values({
            razorpayPaymentId: p.id,
            subscriptionId: s.id,
            donorId,
            amount: String(p.amount / 100),
            status: 'captured',
            type: 'subscription_charge',
            verifiedVia: 'webhook',
            createdAtIst: ist,
            updatedAtIst: ist,
          });
        }
        break;
      }

      case 'subscription.completed': {
        const s = event.payload.subscription.entity;
        await db.update(subscriptions).set({
          status: 'completed', completedAt: new Date(),
          updatedAt: new Date(), updatedAtIst: ist,
        }).where(eq(subscriptions.razorpaySubscriptionId, s.id));
        break;
      }

      case 'subscription.halted': {
        const s = event.payload.subscription.entity;
        await db.update(subscriptions).set({
          status: 'halted', updatedAt: new Date(), updatedAtIst: ist,
        }).where(eq(subscriptions.razorpaySubscriptionId, s.id));
        break;
      }

      case 'subscription.cancelled': {
        const s = event.payload.subscription.entity;
        await db.update(subscriptions).set({
          status: 'cancelled', cancelledAt: new Date(),
          updatedAt: new Date(), updatedAtIst: ist,
        }).where(eq(subscriptions.razorpaySubscriptionId, s.id));
        break;
      }

      default:
        console.log(`[Webhook] Unhandled: ${event.event}`);
    }

    return c.json({ status: 'ok' });
  } catch (error) {
    console.error('Error processing Razorpay webhook:', error);
    return c.json({ error: 'Webhook processing failed', message: error.message }, 500);
  }
});

// --- CORS ---
app.use('*', cors({
  origin: ['http://localhost:5173', 'https://projects.iskconmangalore.org'],
  allowMethods: ['GET', 'POST', 'OPTIONS'],
  allowHeaders: ['Content-Type'],
}));

// --- Middleware: DB + Razorpay on every request ---
app.use('*', async (c, next) => {
  try {
    const sqlNeon = neon(c.env.DATABASE_URL);
    c.set('db', drizzle(sqlNeon));
    c.set('razor', new Razorpay({
      key_id: c.env.RAZORPAY_KEY_ID,
      key_secret: c.env.RAZORPAY_KEY_SECRET,
    }));
    await next();
  } catch (err) {
    console.error('Middleware error:', err);
    return c.json({ error: 'Service initialization failed' }, 500);
  }
});

const planCache = new Map();

function istNow() {
  return new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' });
}

// --- Health ---
app.get('/api/health', (c) => c.json({ status: 'ok' }));

// --- Init DB (call once to create tables via Drizzle raw SQL) ---
app.get('/api/init-db', async (c) => {
  try {
    const db = c.get('db');
    await db.execute(sql`CREATE TABLE IF NOT EXISTS donors (id SERIAL PRIMARY KEY, name VARCHAR(255) NOT NULL, email VARCHAR(255), phone VARCHAR(20) NOT NULL UNIQUE, house_no VARCHAR(100), street VARCHAR(255), city VARCHAR(100), state VARCHAR(100), pincode VARCHAR(10), pan VARCHAR(20), created_at TIMESTAMPTZ DEFAULT NOW())`);
    await db.execute(sql`CREATE TABLE IF NOT EXISTS orders (id SERIAL PRIMARY KEY, razorpay_order_id VARCHAR(255) UNIQUE NOT NULL, donor_id INTEGER REFERENCES donors(id), amount NUMERIC(12,2) NOT NULL, currency VARCHAR(10) DEFAULT 'INR', seva_type VARCHAR(255), status VARCHAR(50) DEFAULT 'created', receipt VARCHAR(255), payment_id VARCHAR(255), created_at_ist VARCHAR(50), updated_at_ist VARCHAR(50), created_at TIMESTAMPTZ DEFAULT NOW(), updated_at TIMESTAMPTZ DEFAULT NOW())`);
    await db.execute(sql`CREATE TABLE IF NOT EXISTS payments (id SERIAL PRIMARY KEY, razorpay_payment_id VARCHAR(255) UNIQUE NOT NULL, razorpay_order_id VARCHAR(255), subscription_id VARCHAR(255), donor_id INTEGER REFERENCES donors(id), amount NUMERIC(12,2), currency VARCHAR(10) DEFAULT 'INR', method VARCHAR(50), status VARCHAR(50), type VARCHAR(50) DEFAULT 'onetime', verified_via VARCHAR(50), error_reason TEXT, created_at_ist VARCHAR(50), updated_at_ist VARCHAR(50), created_at TIMESTAMPTZ DEFAULT NOW(), updated_at TIMESTAMPTZ DEFAULT NOW())`);
    await db.execute(sql`CREATE TABLE IF NOT EXISTS subscriptions (id SERIAL PRIMARY KEY, razorpay_subscription_id VARCHAR(255) UNIQUE NOT NULL, plan_id VARCHAR(255), donor_id INTEGER REFERENCES donors(id), amount NUMERIC(12,2), seva_type VARCHAR(255), total_months INTEGER DEFAULT 12, paid_count INTEGER DEFAULT 0, status VARCHAR(50) DEFAULT 'created', verified_via VARCHAR(50), created_at_ist VARCHAR(50), updated_at_ist VARCHAR(50), created_at TIMESTAMPTZ DEFAULT NOW(), updated_at TIMESTAMPTZ DEFAULT NOW(), activated_at TIMESTAMPTZ, cancelled_at TIMESTAMPTZ, completed_at TIMESTAMPTZ, last_charged_at TIMESTAMPTZ)`);
    // Migrate existing donors table: make phone NOT NULL + UNIQUE
    await db.execute(sql`ALTER TABLE donors ALTER COLUMN phone SET NOT NULL`).catch(() => {});
    await db.execute(sql`CREATE UNIQUE INDEX IF NOT EXISTS donors_phone_unique ON donors(phone)`).catch(() => {});
    return c.json({ status: 'ok', message: 'Tables created' });
  } catch (err) {
    console.error('DB init error:', err);
    return c.json({ error: err.message }, 500);
  }
});

// --- Register Donor (upsert by phone) ---
app.post('/api/register-donor', async (c) => {
  try {
    const db = c.get('db');
    const { name, email, phone, houseNo, street, city, state, pincode, pan } = await c.req.json();
    if (!name?.trim()) return c.json({ error: 'Name is mandatory' }, 400);
    if (!phone?.trim()) return c.json({ error: 'Phone number is mandatory' }, 400);

    const cleanPhone = phone.replace(/\s+/g, '').trim();

    const existing = await db.select({ id: donors.id })
      .from(donors)
      .where(eq(donors.phone, cleanPhone))
      .limit(1);

    if (existing.length > 0) {
      await db.update(donors).set({
        name: String(name),
        email: email || null,
        houseNo: houseNo || null,
        street: street || null,
        city: city || null,
        state: state || null,
        pincode: pincode || null,
        pan: pan || null,
      }).where(eq(donors.id, existing[0].id));

      return c.json({ donorId: existing[0].id });
    }

    const result = await db.insert(donors).values({
      name: String(name),
      email: email || null,
      phone: cleanPhone,
      houseNo: houseNo || null,
      street: street || null,
      city: city || null,
      state: state || null,
      pincode: pincode || null,
      pan: pan || null,
    }).returning({ id: donors.id });

    return c.json({ donorId: result[0].id });
  } catch (err) {
    console.error('Register donor error:', err);
    return c.json({ error: 'Failed to register donor: ' + err.message }, 500);
  }
});

// --- Create Order (One-time) ---
app.post('/api/create-order', async (c) => {
  try {
    const db = c.get('db');
    const razor = c.get('razor');
    const { amount, sevaType, donorId } = await c.req.json();

    if (!amount || amount < 1) return c.json({ error: 'Amount must be at least ₹1' }, 400);

    const order = await razor.orders.create({
      amount: Math.round(amount * 100),
      currency: 'INR',
      receipt: `seva_${Date.now()}`,
      notes: { sevaType: sevaType || 'General Donation', donorId: String(donorId || '') },
    });

    const ist = istNow();
    await db.insert(orders).values({
      razorpayOrderId: String(order.id),
      donorId: donorId || null,
      amount: String(amount),
      sevaType: sevaType || 'General Donation',
      status: 'created',
      receipt: order.receipt,
      createdAtIst: ist,
      updatedAtIst: ist,
    });

    return c.json({ orderId: order.id, amount: order.amount, currency: order.currency, keyId: c.env.RAZORPAY_KEY_ID });
  } catch (err) {
    console.error('Create order error:', err);
    return c.json({ error: 'Failed to create order: ' + err.message }, 500);
  }
});

// --- Verify One-time Payment ---
app.post('/api/verify-payment', async (c) => {
  try {
    const db = c.get('db');
    const razor = c.get('razor');
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, donorId } = await c.req.json();

    const expectedSig = crypto
      .createHmac('sha256', c.env.RAZORPAY_KEY_SECRET)
      .update(razorpay_order_id + '|' + razorpay_payment_id)
      .digest('hex');

    if (razorpay_signature !== expectedSig) {
      return c.json({ success: false, message: 'Verification failed' }, 400);
    }

    const ist = istNow();

    const rzpPayment = await razor.payments.fetch(razorpay_payment_id);

    await db.update(orders).set({
      status: 'paid',
      paymentId: razorpay_payment_id,
      updatedAt: new Date(),
      updatedAtIst: ist,
    }).where(eq(orders.razorpayOrderId, razorpay_order_id));

    await db.insert(payments).values({
      razorpayPaymentId: razorpay_payment_id,
      razorpayOrderId: razorpay_order_id,
      donorId: donorId || null,
      amount: String(rzpPayment.amount / 100),
      currency: rzpPayment.currency || 'INR',
      method: rzpPayment.method || null,
      status: rzpPayment.status || 'captured',
      type: 'onetime',
      verifiedVia: 'client-callback',
      errorReason: rzpPayment.error_description || null,
      createdAtIst: ist,
      updatedAtIst: ist,
    });

    return c.json({ success: true, message: 'Payment verified', paymentId: razorpay_payment_id, orderId: razorpay_order_id });
  } catch (err) {
    console.error('Verify payment error:', err);
    return c.json({ success: false, message: 'Server error: ' + err.message }, 500);
  }
});

// --- Create Subscription (Monthly) ---
app.post('/api/create-subscription', async (c) => {
  try {
    const db = c.get('db');
    const razor = c.get('razor');
    const { amount, sevaType, donorId, totalMonths } = await c.req.json();

    if (!amount || amount < 1) return c.json({ error: 'Amount must be at least ₹1' }, 400);

    const cacheKey = `${amount}_monthly`;
    let planId = planCache.get(cacheKey);

    if (!planId) {
      const plan = await razor.plans.create({
        period: 'monthly',
        interval: 1,
        item: {
          name: `${sevaType || 'Donation'} — Monthly`,
          amount: Math.round(amount * 100),
          currency: 'INR',
        },
      });
      planId = plan.id;
      planCache.set(cacheKey, planId);
    }

    const sub = await razor.subscriptions.create({
      plan_id: planId,
      total_count: totalMonths || 12,
      quantity: 1,
      customer_notify: 1,
      notes: { sevaType: sevaType || 'Monthly Donation', donorId: String(donorId || '') },
    });

    const ist = istNow();
    await db.insert(subscriptions).values({
      razorpaySubscriptionId: sub.id,
      planId,
      donorId: donorId || null,
      amount: String(amount),
      sevaType: sevaType || 'Monthly Donation',
      totalMonths: totalMonths || 12,
      status: sub.status,
      createdAtIst: ist,
      updatedAtIst: ist,
    });

    return c.json({ subscriptionId: sub.id, amount, currency: 'INR', keyId: c.env.RAZORPAY_KEY_ID });
  } catch (err) {
    console.error('Create subscription error:', err);
    return c.json({ error: 'Failed to create subscription: ' + err.message }, 500);
  }
});

// --- Verify Subscription ---
app.post('/api/verify-subscription', async (c) => {
  try {
    const db = c.get('db');
    const razor = c.get('razor');
    const { razorpay_subscription_id, razorpay_payment_id, razorpay_signature, donorId } = await c.req.json();

    const expectedSig = crypto
      .createHmac('sha256', c.env.RAZORPAY_KEY_SECRET)
      .update(razorpay_payment_id + '|' + razorpay_subscription_id)
      .digest('hex');

    if (razorpay_signature !== expectedSig) {
      return c.json({ success: false, message: 'Verification failed' }, 400);
    }

    const ist = istNow();

    const rzpPayment = await razor.payments.fetch(razorpay_payment_id);

    await db.update(subscriptions).set({
      status: 'active',
      activatedAt: new Date(),
      updatedAt: new Date(),
      updatedAtIst: ist,
    }).where(eq(subscriptions.razorpaySubscriptionId, razorpay_subscription_id));

    await db.insert(payments).values({
      razorpayPaymentId: razorpay_payment_id,
      subscriptionId: razorpay_subscription_id,
      donorId: donorId || null,
      amount: String(rzpPayment.amount / 100),
      currency: rzpPayment.currency || 'INR',
      method: rzpPayment.method || null,
      status: rzpPayment.status || 'captured',
      type: 'subscription',
      verifiedVia: 'client-callback',
      errorReason: rzpPayment.error_description || null,
      createdAtIst: ist,
      updatedAtIst: ist,
    });

    return c.json({ success: true, message: 'Subscription activated', subscriptionId: razorpay_subscription_id, paymentId: razorpay_payment_id });
  } catch (err) {
    console.error('Verify subscription error:', err);
    return c.json({ success: false, message: 'Server error: ' + err.message }, 500);
  }
});

// --- Cancel Subscription ---
app.post('/api/cancel-subscription', async (c) => {
  try {
    const db = c.get('db');
    const razor = c.get('razor');
    const { subscriptionId } = await c.req.json();

    await razor.subscriptions.cancel(subscriptionId);

    const ist = istNow();
    await db.update(subscriptions).set({
      status: 'cancelled',
      cancelledAt: new Date(),
      updatedAt: new Date(),
      updatedAtIst: ist,
    }).where(eq(subscriptions.razorpaySubscriptionId, subscriptionId));

    return c.json({ success: true, message: 'Subscription cancelled' });
  } catch (err) {
    console.error('Cancel subscription error:', err);
    return c.json({ error: 'Failed to cancel subscription: ' + err.message }, 500);
  }
});

// --- Check Payment (verify from Razorpay API directly) ---
app.post('/api/check-payment', async (c) => {
  try {
    const db = c.get('db');
    const razor = c.get('razor');
    const { paymentId, orderId } = await c.req.json();

    const payment = await razor.payments.fetch(paymentId);
    const ist = istNow();

    if (payment.status === 'captured') {
      await db.update(orders).set({
        status: 'paid', paymentId, updatedAt: new Date(), updatedAtIst: ist,
      }).where(eq(orders.razorpayOrderId, orderId));

      const existing = await db.select({ id: payments.id })
        .from(payments).where(eq(payments.razorpayPaymentId, paymentId));

      if (existing.length === 0) {
        await db.insert(payments).values({
          razorpayPaymentId: paymentId,
          razorpayOrderId: orderId,
          amount: String(payment.amount / 100),
          method: payment.method,
          status: 'captured',
          verifiedVia: 'check-payment',
          createdAtIst: ist,
          updatedAtIst: ist,
        });
      } else {
        await db.update(payments).set({
          status: 'captured', method: payment.method, verifiedVia: 'check-payment',
          updatedAt: new Date(), updatedAtIst: ist,
        }).where(eq(payments.razorpayPaymentId, paymentId));
      }
    }

    return c.json({ success: true, payment });
  } catch (err) {
    console.error('Check payment error:', err);
    return c.json({ success: false, message: err.message }, 500);
  }
});

// --- Admin: All Donations ---
app.get('/api/donations', async (c) => {
  try {
    const db = c.get('db');
    const result = await db.select({
      paymentId: payments.razorpayPaymentId,
      amount: payments.amount,
      paymentStatus: payments.status,
      type: payments.type,
      method: payments.method,
      createdAtIst: payments.createdAtIst,
      orderId: orders.razorpayOrderId,
      sevaType: orders.sevaType,
      donorName: donors.name,
      donorEmail: donors.email,
      donorPhone: donors.phone,
      donorCity: donors.city,
    })
    .from(payments)
    .leftJoin(orders, eq(payments.razorpayOrderId, orders.razorpayOrderId))
    .leftJoin(donors, eq(payments.donorId, donors.id))
    .orderBy(desc(payments.createdAt));

    return c.json(result);
  } catch (err) {
    console.error('Fetch donations error:', err);
    return c.json({ error: 'Failed to fetch donations: ' + err.message }, 500);
  }
});

// --- Admin: All Subscriptions ---
app.get('/api/subscriptions', async (c) => {
  try {
    const db = c.get('db');
    const result = await db.select({
      subscriptionId: subscriptions.razorpaySubscriptionId,
      planId: subscriptions.planId,
      amount: subscriptions.amount,
      sevaType: subscriptions.sevaType,
      totalMonths: subscriptions.totalMonths,
      paidCount: subscriptions.paidCount,
      status: subscriptions.status,
      createdAtIst: subscriptions.createdAtIst,
      donorName: donors.name,
      donorEmail: donors.email,
      donorPhone: donors.phone,
    })
    .from(subscriptions)
    .leftJoin(donors, eq(subscriptions.donorId, donors.id))
    .orderBy(desc(subscriptions.createdAt));

    return c.json(result);
  } catch (err) {
    console.error('Fetch subscriptions error:', err);
    return c.json({ error: 'Failed to fetch subscriptions: ' + err.message }, 500);
  }
});

app.get('/', (c) => c.text('ISKCON Mangalore — Govardhan Hills API'));

export default app;
