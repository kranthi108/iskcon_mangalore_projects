import { useState } from 'react';
import './DonationCard.css';

const DONATION_OPTIONS = [
  { id: 'brick', amount: 2000, label: 'Brick Seva' },
  { id: 'sqfeet', amount: 5000, label: 'Sq. Feet Seva', popular: true },
  { id: 'patron', amount: 10000, label: 'Patron Seva' },
  { id: 'membership', amount: 75000, label: 'Membership Seva' },
];

export default function DonationCard() {
  const [donationType, setDonationType] = useState('onetime');
  const [selectedAmount, setSelectedAmount] = useState(5000);
  const [customAmount, setCustomAmount] = useState('');
  
  const fundsRaised = 2.5;
  const targetFunds = 8;
  const percentage = Math.round((fundsRaised / targetFunds) * 100);

  const handleAmountClick = (amount) => {
    setSelectedAmount(amount);
    setCustomAmount(amount.toLocaleString('en-IN'));
  };

  const handleCustomChange = (e) => {
    setCustomAmount(e.target.value);
    setSelectedAmount(null);
  };

  return (
    <section className="donation-card-section">
      <div className="container">
        <div className="donation-card-centered">
          <div className="donation-card">
            <div className="card-header">
              <h3>Support Our Mission</h3>
              <p>Every contribution builds the temple of tomorrow</p>
            </div>

            <div className="donation-tabs">
              <button 
                className={`tab ${donationType === 'onetime' ? 'active' : ''}`}
                onClick={() => setDonationType('onetime')}
              >
                One-time
              </button>
              <button 
                className={`tab ${donationType === 'monthly' ? 'active' : ''}`}
                onClick={() => setDonationType('monthly')}
              >
                Monthly
              </button>
            </div>

            <div className="donation-amounts">
              {DONATION_OPTIONS.map((option) => (
                <button
                  key={option.id}
                  className={`amount-btn ${selectedAmount === option.amount ? 'active' : ''}`}
                  onClick={() => handleAmountClick(option.amount)}
                >
                  <div className="amount">₹{option.amount.toLocaleString('en-IN')}</div>
                  <div className="amount-desc">{option.label}</div>
                  {option.popular && <div className="badge-most">Most Popular</div>}
                </button>
              ))}
            </div>

            <div className="custom-amount">
              <input 
                type="text" 
                placeholder="Enter custom amount (₹)"
                className="amount-input"
                value={customAmount}
                onChange={handleCustomChange}
              />
            </div>

            <button className="btn btn-primary btn-large donate-submit">
              Donate Now
            </button>

            <div className="recent-donation">
              🔥 <strong>125+ devotees</strong> contributed this month
            </div>

            <div className="goal-progress">
              <div className="goal-header">
                <span>Construction Progress</span>
                <span><strong>₹{fundsRaised} Cr</strong> / ₹{targetFunds} Cr</span>
              </div>
              <div className="progress-bar">
                <div className="progress-fill" style={{ width: `${percentage}%` }}></div>
              </div>
              <p className="goal-text">₹{(targetFunds - fundsRaised).toFixed(1)} Cr needed to complete the project</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
