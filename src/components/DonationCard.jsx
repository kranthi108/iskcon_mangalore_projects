import { useState } from 'react';
import './DonationCard.css';

export default function DonationCard() {
  const [donationType, setDonationType] = useState('onetime');
  
  const fundsRaised = 2.5; // In crores
  const targetFunds = 8; // In crores
  const percentage = Math.round((fundsRaised / targetFunds) * 100);

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
              <button className="amount-btn">
                <div className="amount">₹2,000</div>
                <div className="amount-desc">Brick Seva</div>
              </button>
              <button className="amount-btn active">
                <div className="amount">₹5,000</div>
                <div className="amount-desc">Sq. Feet Seva</div>
                <div className="badge-most">Most Popular</div>
              </button>
              <button className="amount-btn">
                <div className="amount">₹10,000</div>
                <div className="amount-desc">Patron Seva</div>
              </button>
              <button className="amount-btn">
                <div className="amount">₹75,000</div>
                <div className="amount-desc">Membership Seva</div>
              </button>
            </div>

            <div className="custom-amount">
              <input 
                type="number" 
                placeholder="Enter custom amount (₹)"
                className="amount-input"
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
