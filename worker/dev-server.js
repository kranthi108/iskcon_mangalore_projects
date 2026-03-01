import { createServer } from 'http';
import { drizzle } from 'drizzle-orm/neon-http';
import { neon } from '@neondatabase/serverless';
import { eq, desc, sql as rawSql } from 'drizzle-orm';
import { donors, orders, payments, subscriptions } from './src/db/schema.js';
import Razorpay from 'razorpay';
import crypto from 'crypto';

const PORT = 8787;

const sqlNeon = neon(process.env.DATABASE_URL);
const db = drizzle(sqlNeon);
const razor = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

const planCache = new Map();

function istNow() {
  return new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' });
}

function json(res, data, status = 200) {
  res.writeHead(status, {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  });
  res.end(JSON.stringify(data));
}

function parseBody(req) {
  return new Promise((resolve) => {
    let body = '';
    req.on('data', (chunk) => (body += chunk));
    req.on('end', () => {
      try { resolve(JSON.parse(body)); } catch { resolve({}); }
    });
  });
}

function rawText(req) {
  return new Promise((resolve) => {
    let body = '';
    req.on('data', (chunk) => (body += chunk));
    req.on('end', () => resolve(body));
  });
}

const routes = {
  'GET /api/health': async (_req, res) => json(res, { status: 'ok' }),

  'GET /api/init-db': async (_req, res) => {
    await db.execute(rawSql`CREATE TABLE IF NOT EXISTS donors (id SERIAL PRIMARY KEY, name VARCHAR(255) NOT NULL, email VARCHAR(255), phone VARCHAR(20) NOT NULL UNIQUE, house_no VARCHAR(100), street VARCHAR(255), city VARCHAR(100), state VARCHAR(100), pincode VARCHAR(10), pan VARCHAR(20), created_at TIMESTAMPTZ DEFAULT NOW())`);
    await db.execute(rawSql`CREATE TABLE IF NOT EXISTS orders (id SERIAL PRIMARY KEY, razorpay_order_id VARCHAR(255) UNIQUE NOT NULL, donor_id INTEGER REFERENCES donors(id), amount NUMERIC(12,2) NOT NULL, currency VARCHAR(10) DEFAULT 'INR', seva_type VARCHAR(255), status VARCHAR(50) DEFAULT 'created', receipt VARCHAR(255), payment_id VARCHAR(255), created_at_ist VARCHAR(50), updated_at_ist VARCHAR(50), created_at TIMESTAMPTZ DEFAULT NOW(), updated_at TIMESTAMPTZ DEFAULT NOW())`);
    await db.execute(rawSql`CREATE TABLE IF NOT EXISTS payments (id SERIAL PRIMARY KEY, razorpay_payment_id VARCHAR(255) UNIQUE NOT NULL, razorpay_order_id VARCHAR(255), subscription_id VARCHAR(255), donor_id INTEGER REFERENCES donors(id), amount NUMERIC(12,2), currency VARCHAR(10) DEFAULT 'INR', method VARCHAR(50), status VARCHAR(50), type VARCHAR(50) DEFAULT 'onetime', verified_via VARCHAR(50), error_reason TEXT, created_at_ist VARCHAR(50), updated_at_ist VARCHAR(50), created_at TIMESTAMPTZ DEFAULT NOW(), updated_at TIMESTAMPTZ DEFAULT NOW())`);
    await db.execute(rawSql`CREATE TABLE IF NOT EXISTS subscriptions (id SERIAL PRIMARY KEY, razorpay_subscription_id VARCHAR(255) UNIQUE NOT NULL, plan_id VARCHAR(255), donor_id INTEGER REFERENCES donors(id), amount NUMERIC(12,2), seva_type VARCHAR(255), total_months INTEGER DEFAULT 12, paid_count INTEGER DEFAULT 0, status VARCHAR(50) DEFAULT 'created', verified_via VARCHAR(50), created_at_ist VARCHAR(50), updated_at_ist VARCHAR(50), created_at TIMESTAMPTZ DEFAULT NOW(), updated_at TIMESTAMPTZ DEFAULT NOW(), activated_at TIMESTAMPTZ, cancelled_at TIMESTAMPTZ, completed_at TIMESTAMPTZ, last_charged_at TIMESTAMPTZ)`);
    await db.execute(rawSql`ALTER TABLE donors ALTER COLUMN phone SET NOT NULL`).catch(() => {});
    await db.execute(rawSql`CREATE UNIQUE INDEX IF NOT EXISTS donors_phone_unique ON donors(phone)`).catch(() => {});
    json(res, { status: 'ok', message: 'Tables created' });
  },

  'POST /api/register-donor': async (req, res) => {
    const { name, email, phone, houseNo, street, city, state, pincode, pan } = await parseBody(req);
    if (!name?.trim()) return json(res, { error: 'Name is mandatory' }, 400);
    if (!phone?.trim()) return json(res, { error: 'Phone number is mandatory' }, 400);

    const cleanPhone = phone.replace(/\s+/g, '').trim();

    const existing = await db.select({ id: donors.id })
      .from(donors).where(eq(donors.phone, cleanPhone)).limit(1);

    if (existing.length > 0) {
      await db.update(donors).set({
        name: String(name), email: email || null,
        houseNo: houseNo || null, street: street || null, city: city || null,
        state: state || null, pincode: pincode || null, pan: pan || null,
      }).where(eq(donors.id, existing[0].id));
      return json(res, { donorId: existing[0].id });
    }

    const result = await db.insert(donors).values({
      name: String(name), email: email || null, phone: cleanPhone,
      houseNo: houseNo || null, street: street || null, city: city || null,
      state: state || null, pincode: pincode || null, pan: pan || null,
    }).returning({ id: donors.id });
    json(res, { donorId: result[0].id });
  },

  'POST /api/create-order': async (req, res) => {
    const { amount, sevaType, donorId } = await parseBody(req);
    if (!amount || amount < 1) return json(res, { error: 'Amount must be at least ₹1' }, 400);
    const order = await razor.orders.create({
      amount: Math.round(amount * 100), currency: 'INR',
      receipt: `seva_${Date.now()}`,
      notes: { sevaType: sevaType || 'General Donation', donorId: String(donorId || '') },
    });
    const ist = istNow();
    await db.insert(orders).values({
      razorpayOrderId: String(order.id), donorId: donorId || null,
      amount: String(amount), sevaType: sevaType || 'General Donation',
      status: 'created', receipt: order.receipt, createdAtIst: ist, updatedAtIst: ist,
    });
    json(res, { orderId: order.id, amount: order.amount, currency: order.currency, keyId: process.env.RAZORPAY_KEY_ID });
  },

  'POST /api/verify-payment': async (req, res) => {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, donorId } = await parseBody(req);
    const expected = crypto.createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
      .update(razorpay_order_id + '|' + razorpay_payment_id).digest('hex');
    if (razorpay_signature !== expected) return json(res, { success: false, message: 'Verification failed' }, 400);
    const ist = istNow();
    const rzpPayment = await razor.payments.fetch(razorpay_payment_id);
    await db.update(orders).set({ status: 'paid', paymentId: razorpay_payment_id, updatedAt: new Date(), updatedAtIst: ist })
      .where(eq(orders.razorpayOrderId, razorpay_order_id));
    await db.insert(payments).values({
      razorpayPaymentId: razorpay_payment_id, razorpayOrderId: razorpay_order_id,
      donorId: donorId || null, amount: String(rzpPayment.amount / 100),
      currency: rzpPayment.currency || 'INR', method: rzpPayment.method || null,
      status: rzpPayment.status || 'captured', type: 'onetime',
      verifiedVia: 'client-callback', errorReason: rzpPayment.error_description || null,
      createdAtIst: ist, updatedAtIst: ist,
    });
    json(res, { success: true, message: 'Payment verified', paymentId: razorpay_payment_id, orderId: razorpay_order_id });
  },

  'POST /api/create-subscription': async (req, res) => {
    const { amount, sevaType, donorId, totalMonths } = await parseBody(req);
    if (!amount || amount < 1) return json(res, { error: 'Amount must be at least ₹1' }, 400);
    const cacheKey = `${amount}_monthly`;
    let planId = planCache.get(cacheKey);
    if (!planId) {
      const plan = await razor.plans.create({
        period: 'monthly', interval: 1,
        item: { name: `${sevaType || 'Donation'} — Monthly`, amount: Math.round(amount * 100), currency: 'INR' },
      });
      planId = plan.id;
      planCache.set(cacheKey, planId);
    }
    const sub = await razor.subscriptions.create({
      plan_id: planId, total_count: totalMonths || 12, quantity: 1, customer_notify: 1,
      notes: { sevaType: sevaType || 'Monthly Donation', donorId: String(donorId || '') },
    });
    const ist = istNow();
    await db.insert(subscriptions).values({
      razorpaySubscriptionId: sub.id, planId, donorId: donorId || null,
      amount: String(amount), sevaType: sevaType || 'Monthly Donation',
      totalMonths: totalMonths || 12, status: sub.status, createdAtIst: ist, updatedAtIst: ist,
    });
    json(res, { subscriptionId: sub.id, amount, currency: 'INR', keyId: process.env.RAZORPAY_KEY_ID });
  },

  'POST /api/verify-subscription': async (req, res) => {
    const { razorpay_subscription_id, razorpay_payment_id, razorpay_signature, donorId } = await parseBody(req);
    const expected = crypto.createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
      .update(razorpay_payment_id + '|' + razorpay_subscription_id).digest('hex');
    if (razorpay_signature !== expected) return json(res, { success: false, message: 'Verification failed' }, 400);
    const ist = istNow();
    const rzpPayment = await razor.payments.fetch(razorpay_payment_id);
    await db.update(subscriptions).set({ status: 'active', activatedAt: new Date(), updatedAt: new Date(), updatedAtIst: ist })
      .where(eq(subscriptions.razorpaySubscriptionId, razorpay_subscription_id));
    await db.insert(payments).values({
      razorpayPaymentId: razorpay_payment_id, subscriptionId: razorpay_subscription_id,
      donorId: donorId || null, amount: String(rzpPayment.amount / 100),
      currency: rzpPayment.currency || 'INR', method: rzpPayment.method || null,
      status: rzpPayment.status || 'captured', type: 'subscription',
      verifiedVia: 'client-callback', errorReason: rzpPayment.error_description || null,
      createdAtIst: ist, updatedAtIst: ist,
    });
    json(res, { success: true, message: 'Subscription activated', subscriptionId: razorpay_subscription_id, paymentId: razorpay_payment_id });
  },

  'POST /api/cancel-subscription': async (req, res) => {
    const { subscriptionId } = await parseBody(req);
    await razor.subscriptions.cancel(subscriptionId);
    const ist = istNow();
    await db.update(subscriptions).set({ status: 'cancelled', cancelledAt: new Date(), updatedAt: new Date(), updatedAtIst: ist })
      .where(eq(subscriptions.razorpaySubscriptionId, subscriptionId));
    json(res, { success: true, message: 'Subscription cancelled' });
  },

  'POST /api/webhook/razorpay': async (req, res) => {
    const body = await rawText(req);
    const WEBHOOK_SECRET = process.env.RAZORPAY_WEBHOOK_SECRET;
    if (WEBHOOK_SECRET) {
      const sig = req.headers['x-razorpay-signature'];
      const expected = crypto.createHmac('sha256', WEBHOOK_SECRET).update(body).digest('hex');
      if (sig !== expected) return json(res, { error: 'Invalid signature' }, 400);
    }
    const event = JSON.parse(body);
    console.log(`[Webhook] ${event.event}`);
    const ist = istNow();

    switch (event.event) {
      case 'payment.captured': {
        const p = event.payload.payment.entity;
        const donorId = p.notes?.donorId ? Number(p.notes.donorId) : null;
        if (p.order_id) {
          await db.update(orders).set({ status: 'paid', paymentId: p.id, updatedAt: new Date(), updatedAtIst: ist })
            .where(eq(orders.razorpayOrderId, p.order_id));
        }
        const existing = await db.select({ id: payments.id }).from(payments).where(eq(payments.razorpayPaymentId, p.id));
        if (existing.length === 0) {
          await db.insert(payments).values({
            razorpayPaymentId: p.id, razorpayOrderId: p.order_id || null, donorId,
            amount: String(p.amount / 100), currency: p.currency, method: p.method,
            status: 'captured', type: 'onetime', verifiedVia: 'webhook', createdAtIst: ist, updatedAtIst: ist,
          });
        } else {
          await db.update(payments).set({ status: 'captured', method: p.method, verifiedVia: 'webhook', updatedAt: new Date(), updatedAtIst: ist })
            .where(eq(payments.razorpayPaymentId, p.id));
        }
        break;
      }
      case 'payment.failed': {
        const p = event.payload.payment.entity;
        if (p.order_id) {
          await db.update(orders).set({ status: 'failed', updatedAt: new Date(), updatedAtIst: ist })
            .where(eq(orders.razorpayOrderId, p.order_id));
        }
        break;
      }
      case 'subscription.activated': {
        const s = event.payload.subscription.entity;
        await db.update(subscriptions).set({ status: 'active', activatedAt: new Date(), verifiedVia: 'webhook', updatedAt: new Date(), updatedAtIst: ist })
          .where(eq(subscriptions.razorpaySubscriptionId, s.id));
        break;
      }
      case 'subscription.charged': {
        const s = event.payload.subscription.entity;
        const p = event.payload.payment?.entity;
        await db.update(subscriptions).set({ status: 'active', paidCount: s.paid_count, lastChargedAt: new Date(), updatedAt: new Date(), updatedAtIst: ist })
          .where(eq(subscriptions.razorpaySubscriptionId, s.id));
        if (p) {
          const donorId = s.notes?.donorId ? Number(s.notes.donorId) : null;
          await db.insert(payments).values({
            razorpayPaymentId: p.id, subscriptionId: s.id, donorId,
            amount: String(p.amount / 100), status: 'captured', type: 'subscription_charge',
            verifiedVia: 'webhook', createdAtIst: ist, updatedAtIst: ist,
          });
        }
        break;
      }
      case 'subscription.completed': {
        const s = event.payload.subscription.entity;
        await db.update(subscriptions).set({ status: 'completed', completedAt: new Date(), updatedAt: new Date(), updatedAtIst: ist })
          .where(eq(subscriptions.razorpaySubscriptionId, s.id));
        break;
      }
      case 'subscription.cancelled': {
        const s = event.payload.subscription.entity;
        await db.update(subscriptions).set({ status: 'cancelled', cancelledAt: new Date(), updatedAt: new Date(), updatedAtIst: ist })
          .where(eq(subscriptions.razorpaySubscriptionId, s.id));
        break;
      }
      default:
        console.log(`[Webhook] Unhandled: ${event.event}`);
    }
    json(res, { status: 'ok' });
  },

  'GET /api/donor-count': async (_req, res) => {
    try {
      const result = await db.select({ count: rawSql`count(*)` }).from(payments);
      json(res, { count: Number(result[0]?.count || 0) });
    } catch {
      json(res, { count: 0 });
    }
  },

  'GET /api/donations': async (_req, res) => {
    const result = await db.select({
      paymentId: payments.razorpayPaymentId, amount: payments.amount,
      paymentStatus: payments.status, type: payments.type, method: payments.method,
      createdAtIst: payments.createdAtIst, orderId: orders.razorpayOrderId,
      sevaType: orders.sevaType, donorName: donors.name, donorEmail: donors.email,
      donorPhone: donors.phone, donorCity: donors.city,
    }).from(payments)
      .leftJoin(orders, eq(payments.razorpayOrderId, orders.razorpayOrderId))
      .leftJoin(donors, eq(payments.donorId, donors.id))
      .orderBy(desc(payments.createdAt));
    json(res, result);
  },

  'GET /api/subscriptions': async (_req, res) => {
    const result = await db.select({
      subscriptionId: subscriptions.razorpaySubscriptionId, planId: subscriptions.planId,
      amount: subscriptions.amount, sevaType: subscriptions.sevaType,
      totalMonths: subscriptions.totalMonths, paidCount: subscriptions.paidCount,
      status: subscriptions.status, createdAtIst: subscriptions.createdAtIst,
      donorName: donors.name, donorEmail: donors.email, donorPhone: donors.phone,
    }).from(subscriptions)
      .leftJoin(donors, eq(subscriptions.donorId, donors.id))
      .orderBy(desc(subscriptions.createdAt));
    json(res, result);
  },
};

const server = createServer(async (req, res) => {
  if (req.method === 'OPTIONS') {
    res.writeHead(204, {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    });
    return res.end();
  }
  const key = `${req.method} ${req.url.split('?')[0]}`;
  const handler = routes[key];
  if (handler) {
    try { await handler(req, res); }
    catch (err) {
      console.error(`[${key}] Error:`, err.message);
      json(res, { error: err.message }, 500);
    }
  } else {
    json(res, { error: 'Not found' }, 404);
  }
});

server.listen(PORT, () => console.log(`Dev server on http://localhost:${PORT}`));
