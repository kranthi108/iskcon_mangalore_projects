import { useState, useEffect } from 'react';
import './DonationCard.css';
import { registerDonor, initiatePayment, initiateSubscription } from '../utils/razorpay';
import PaymentModal from './PaymentModal';
import DonorForm from './DonorForm';

const API_BASE = import.meta.env.VITE_API_BASE || 'https://iskcon-payment-worker.vedicsciencecenter-clt.workers.dev/api';

const DONATION_OPTIONS = [
  { id: 'brick', amount: 2100, label: 'Brick Seva' },
  { id: 'sqfeet', amount: 5000, label: 'Sq. Feet Seva', popular: true },
  { id: 'patron', amount: 10000, label: 'Patron Seva' },
  { id: 'membership', amount: 25000, label: 'Special Patron' },
];

const PREMIUM_SEVAS = [
  { amount: 108000, label: 'Dharma Sevak — ₹1,08,000' },
  { amount: 555555, label: 'Dharmaadhikari — ₹5,55,555' },
  { amount: 1055555, label: 'Maha Dharmaadhikari — ₹10,55,555' },
  { amount: 2525108, label: 'Mukhya Dharmaadhikari — ₹25,25,108' },
  { amount: 5050108, label: 'Vishesha Dharmaadhikari — ₹50,50,108' },
];

const MONTH_OPTIONS = [3, 6, 12, 24];

export default function DonationCard() {
  const [donationType, setDonationType] = useState('onetime');
  const [selectedAmount, setSelectedAmount] = useState(5000);
  const [customAmount, setCustomAmount] = useState('');
  const [totalMonths, setTotalMonths] = useState(12);
  const [showDonorForm, setShowDonorForm] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [paymentModal, setPaymentModal] = useState({ isOpen: false, status: null, details: null });
  const [donorCount, setDonorCount] = useState(0);

  useEffect(() => {
    fetch(`${API_BASE}/donor-count`)
      .then((r) => r.json())
      .then((data) => {
        if (data.count != null) setDonorCount(data.count);
      })
      .catch(() => {});
  }, []);

  const isMonthly = donationType === 'monthly';

  const handleAmountClick = (amount) => {
    setSelectedAmount(amount);
    setCustomAmount(amount.toLocaleString('en-IN'));
  };

  const handleCustomChange = (e) => {
    setCustomAmount(e.target.value);
    setSelectedAmount(null);
  };

  const getFinalAmount = () => {
    if (selectedAmount) return selectedAmount;
    const parsed = parseInt(customAmount.replace(/,/g, ''), 10);
    return isNaN(parsed) ? 0 : parsed;
  };

  const getSevaLabel = () => {
    if (selectedAmount) {
      const match = DONATION_OPTIONS.find((o) => o.amount === selectedAmount);
      if (match) return match.label;
      const premMatch = PREMIUM_SEVAS.find((o) => o.amount === selectedAmount);
      if (premMatch) return premMatch.label.split(' — ')[0];
    }
    return 'Custom Donation';
  };

  const handleDonateClick = () => {
    const amount = getFinalAmount();
    if (amount < 1) {
      alert('Please select or enter a donation amount.');
      return;
    }
    setShowDonorForm(true);
  };

  const handleDonorSubmit = async (donorInfo) => {
    setIsLoading(true);
    try {
      const donorId = await registerDonor(donorInfo);
      const amount = getFinalAmount();
      const sevaType = getSevaLabel();

      const callbacks = {
        onSuccess: (details) => {
          setPaymentModal({ isOpen: true, status: 'success', details });
        },
        onFailure: (details) => {
          setPaymentModal({ isOpen: true, status: 'failure', details });
        },
      };

      setShowDonorForm(false);

      if (isMonthly) {
        await initiateSubscription({
          amount,
          sevaType: `${sevaType} (Monthly)`,
          donorId,
          donorName: donorInfo.name,
          donorEmail: donorInfo.email,
          donorPhone: donorInfo.phone,
          totalMonths,
          ...callbacks,
        });
      } else {
        await initiatePayment({
          amount,
          sevaType: `${sevaType} (One-time)`,
          donorId,
          donorName: donorInfo.name,
          donorEmail: donorInfo.email,
          donorPhone: donorInfo.phone,
          ...callbacks,
        });
      }
    } catch (err) {
      alert(err.message || 'Something went wrong. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section id="support-our-mission" className="donation-card-section">
      <div className="container">
        <div className="donation-card-centered">
          <div className="donation-card">
            <div className="card-header">
              <h3>Support Our Mission</h3>
              <p>Every contribution builds the temple of tomorrow</p>
            </div>

            <div className="donation-tabs">
              <button 
                className={`tab ${!isMonthly ? 'active' : ''}`}
                onClick={() => setDonationType('onetime')}
              >
                One-time
              </button>
              <button 
                className={`tab ${isMonthly ? 'active' : ''}`}
                onClick={() => setDonationType('monthly')}
              >
                Monthly
              </button>
            </div>

            {isMonthly && (
              <div className="monthly-info">
                <p className="monthly-badge">🔄 Auto-debit via e-Mandate (UPI AutoPay / eNACH)</p>
                <div className="month-selector">
                  <span className="month-label">Duration:</span>
                  <div className="month-options">
                    {MONTH_OPTIONS.map((m) => (
                      <button
                        key={m}
                        className={`month-btn ${totalMonths === m ? 'active' : ''}`}
                        onClick={() => setTotalMonths(m)}
                      >
                        {m} months
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            <div className="donation-amounts">
              {DONATION_OPTIONS.map((option) => (
                <button
                  key={option.id}
                  className={`amount-btn ${selectedAmount === option.amount ? 'active' : ''}`}
                  onClick={() => handleAmountClick(option.amount)}
                >
                  <div className="amount">₹{option.amount.toLocaleString('en-IN')}</div>
                  <div className="amount-desc">{option.label}</div>
                  {isMonthly && <div className="amount-freq">/month</div>}
                  {option.popular && !isMonthly && <div className="badge-most">Most Popular</div>}
                </button>
              ))}
            </div>

            {!isMonthly && (
              <div className="premium-seva-select">
                <div className="premium-header">
                  <span className="premium-icon">👑</span>
                  <span>Membership Seva Options</span>
                </div>
                <div className="premium-list">
                  {PREMIUM_SEVAS.map((seva) => (
                    <button
                      key={seva.amount}
                      className={`premium-item ${selectedAmount === seva.amount ? 'active' : ''}`}
                      onClick={() => handleAmountClick(seva.amount)}
                    >
                      <span className="premium-label">{seva.label.split(' — ')[0]}</span>
                      <span className="premium-amount">₹{seva.amount.toLocaleString('en-IN')}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div className="custom-amount">
              <input 
                type="text" 
                placeholder={isMonthly ? 'Enter monthly amount (₹)' : 'Enter your custom amount (₹)'}
                className="amount-input"
                value={customAmount}
                onChange={handleCustomChange}
              />
            </div>

            {isMonthly && getFinalAmount() > 0 && (
              <div className="monthly-summary">
                ₹{getFinalAmount().toLocaleString('en-IN')}/month × {totalMonths} months = <strong>₹{(getFinalAmount() * totalMonths).toLocaleString('en-IN')} total</strong>
              </div>
            )}

            <button className="btn btn-primary btn-large donate-submit" onClick={handleDonateClick}>
              {isMonthly ? 'Set Up Monthly Donation' : 'Donate Now'}
            </button>

            <div className="recent-donation">
              🔥 <strong>{donorCount > 0 ? `${donorCount}+` : '...'} devotees</strong> contributed so far
            </div>
          </div>
        </div>
      </div>

      <DonorForm
        isOpen={showDonorForm}
        onSubmit={handleDonorSubmit}
        onClose={() => setShowDonorForm(false)}
        isLoading={isLoading}
      />

      <PaymentModal
        isOpen={paymentModal.isOpen}
        status={paymentModal.status}
        details={paymentModal.details}
        onClose={() => setPaymentModal({ isOpen: false, status: null, details: null })}
      />
    </section>
  );
}
