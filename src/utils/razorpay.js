// In production, replace with your Cloudflare Worker URL:
// e.g., https://iskcon-payment-worker.YOUR_SUBDOMAIN.workers.dev/api
const API_BASE = import.meta.env.VITE_API_BASE || 'https://iskcon-payment-worker.vedicsciencecenter-clt.workers.dev/api';

// Register donor and get donorId
export async function registerDonor(donorInfo) {
  const res = await fetch(`${API_BASE}/register-donor`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(donorInfo),
  });
  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.error || 'Failed to register donor');
  }
  const data = await res.json();
  return data.donorId;
}

// One-time payment
export async function initiatePayment({
  amount,
  sevaType = 'General Donation',
  donorId,
  donorName = '',
  donorEmail = '',
  donorPhone = '',
  onSuccess,
  onFailure,
}) {
  try {
    const res = await fetch(`${API_BASE}/create-order`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ amount, sevaType, donorId }),
    });

    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.error || 'Failed to create order');
    }

    const { orderId, currency, keyId } = await res.json();

    const options = {
      key: keyId,
      amount: Math.round(amount * 100),
      currency,
      name: 'ISKCON Mangalore Govardhan Hills',
      description: sevaType,
      order_id: orderId,
      image: '/src/assets/logo.png',
      prefill: {
        name: donorName,
        email: donorEmail,
        contact: donorPhone,
      },
      theme: { color: '#d97917' },
      handler: async function (response) {
        try {
          const verifyRes = await fetch(`${API_BASE}/verify-payment`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              donorId,
            }),
          });
          const result = await verifyRes.json();
          if (result.success) {
            onSuccess?.({
              paymentId: response.razorpay_payment_id,
              orderId: response.razorpay_order_id,
              amount,
              sevaType,
            });
          } else {
            onFailure?.({ reason: 'Payment verification failed' });
          }
        } catch {
          onFailure?.({ reason: 'Could not verify payment' });
        }
      },
      modal: {
        ondismiss: function () {
          onFailure?.({ reason: 'Payment cancelled by user' });
        },
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  } catch (err) {
    onFailure?.({ reason: err.message || 'Something went wrong' });
  }
}

// Monthly subscription with e-mandate
export async function initiateSubscription({
  amount,
  sevaType = 'Monthly Donation',
  donorId,
  donorName = '',
  donorEmail = '',
  donorPhone = '',
  totalMonths = 12,
  onSuccess,
  onFailure,
}) {
  try {
    const res = await fetch(`${API_BASE}/create-subscription`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ amount, sevaType, donorId, totalMonths }),
    });

    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.error || 'Failed to create subscription');
    }

    const { subscriptionId, keyId } = await res.json();

    const options = {
      key: keyId,
      subscription_id: subscriptionId,
      name: 'ISKCON Mangalore Govardhan Hills',
      description: `${sevaType} — ₹${amount.toLocaleString('en-IN')}/month`,
      image: '/src/assets/logo.png',
      prefill: {
        name: donorName,
        email: donorEmail,
        contact: donorPhone,
      },
      theme: { color: '#d97917' },
      handler: async function (response) {
        try {
          const verifyRes = await fetch(`${API_BASE}/verify-subscription`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              razorpay_subscription_id: response.razorpay_subscription_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              donorId,
            }),
          });
          const result = await verifyRes.json();
          if (result.success) {
            onSuccess?.({
              subscriptionId: response.razorpay_subscription_id,
              paymentId: response.razorpay_payment_id,
              amount,
              sevaType,
              isSubscription: true,
              totalMonths,
            });
          } else {
            onFailure?.({ reason: 'Subscription verification failed' });
          }
        } catch {
          onFailure?.({ reason: 'Could not verify subscription' });
        }
      },
      modal: {
        ondismiss: function () {
          onFailure?.({ reason: 'Subscription setup cancelled by user' });
        },
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  } catch (err) {
    onFailure?.({ reason: err.message || 'Something went wrong' });
  }
}
