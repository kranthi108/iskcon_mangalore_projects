import { useState } from 'react';
import { Link } from 'react-router-dom';
import { registerDonor, initiatePayment } from '../utils/razorpay';
import DonorForm from '../components/DonorForm';
import PaymentModal from '../components/PaymentModal';
import ModernFooter from '../components/ModernFooter';
import logoImg from '../assets/logo.png';
import './AkshayaTritiya.css';

const ANNADANA_SEVAS = [
  { id: 'anna-10', devotees: 10, amount: 1500, label: 'Annadana Seva for 10 Devotees' },
  { id: 'anna-20', devotees: 20, amount: 3000, label: 'Annadana Seva for 20 Devotees' },
  { id: 'anna-40', devotees: 40, amount: 6000, label: 'Annadana Seva for 40 Devotees' },
  { id: 'anna-60', devotees: 60, amount: 9000, label: 'Annadana Seva for 60 Devotees' },
  { id: 'anna-100', devotees: 100, amount: 15000, label: 'Annadana Seva for 100 Devotees', popular: true },
  { id: 'anna-200', devotees: 200, amount: 30000, label: 'Annadana Seva for 200 Devotees' },
];

const FESTIVAL_SEVAS = [
  { id: 'abhisheka', amount: 2100, label: 'Special Abhisheka Seva', icon: '🪔', description: 'Sponsor the sacred abhisheka of Sri Sri Radha Govinda on Akshaya Tritiya' },
  { id: 'pushpa', amount: 3001, label: 'Pushpa Seva (Flower Decoration)', icon: '🌺', description: 'Offer flowers for the divine decoration of Their Lordships' },
  { id: 'vastra', amount: 5001, label: 'Vastra Seva (New Attire)', icon: '👑', description: 'Sponsor new divine attire for Sri Sri Radha Govinda' },
  { id: 'bhog', amount: 5100, label: 'Maha Bhog Seva', icon: '🍚', description: 'Sponsor the grand bhog offering on this auspicious day' },
];


export default function AkshayaTritiya() {
  const [selectedSeva, setSelectedSeva] = useState(null);
  const [showDonorForm, setShowDonorForm] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [paymentModal, setPaymentModal] = useState({ isOpen: false, status: null, details: null });
  const [customAmount, setCustomAmount] = useState('');
  const [activeTab, setActiveTab] = useState('annadana');

  const handleSevaSelect = (seva) => {
    setSelectedSeva(seva);
    setCustomAmount('');
    setShowDonorForm(true);
  };

  const handleCustomDonate = () => {
    const parsed = parseInt(customAmount.replace(/,/g, ''), 10);
    if (isNaN(parsed) || parsed < 1) {
      alert('Please enter a valid amount.');
      return;
    }
    setSelectedSeva({ id: 'custom', amount: parsed, label: 'Akshaya Tritiya Seva' });
    setShowDonorForm(true);
  };

  const handleDonorSubmit = async (donorInfo) => {
    if (!selectedSeva) return;
    setIsLoading(true);
    try {
      const donorId = await registerDonor(donorInfo);
      const callbacks = {
        onSuccess: (details) => {
          setPaymentModal({ isOpen: true, status: 'success', details });
        },
        onFailure: (details) => {
          setPaymentModal({ isOpen: true, status: 'failure', details });
        },
      };
      setShowDonorForm(false);
      await initiatePayment({
        amount: selectedSeva.amount,
        sevaType: `${selectedSeva.label} (Akshaya Tritiya)`,
        donorId,
        donorName: donorInfo.name,
        donorEmail: donorInfo.email,
        donorPhone: donorInfo.phone,
        ...callbacks,
      });
    } catch (err) {
      alert(err.message || 'Something went wrong. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="akshaya-page">
      {/* Navigation */}
      <nav className="at-nav">
        <div className="container">
          <div className="at-nav-content">
            <Link to="/" className="at-nav-brand">
              <img src={logoImg} alt="ISKCON Logo" className="at-nav-logo" />
              <div>
                <span className="at-nav-name">ISKCON Mangalore</span>
                <span className="at-nav-sub">Govardhan Hills</span>
              </div>
            </Link>
            <div className="at-nav-links">
              <a href="#annadana" className="at-nav-link">Annadana</a>
              <a href="#festival-sevas" className="at-nav-link">Festival Sevas</a>
              <a href="#annadana" className="btn btn-primary btn-small">Donate Now</a>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="at-hero">
        <div className="at-hero-overlay" />
        <div className="at-hero-content">
          <div className="container">
            <div className="at-hero-badge">Akshaya Tritiya 2026</div>
            <h1 className="at-hero-title">
              Akshaya Tritiya<br />
              <span className="at-hero-highlight">Maha Annadaan</span>
            </h1>
            <p className="at-hero-subtitle">
              On this most auspicious day, every act of charity brings infinite, 
              imperishable merit. Offer Annadana and divine sevas at ISKCON Mangalore 
              and receive the eternal blessings of Sri Sri Radha Govinda.
            </p>
            <div className="at-hero-quote">
              <em>"Annadanam Maha Danam"</em> — The gift of food is the greatest charity
            </div>
            <div className="at-hero-actions">
              <a href="#annadana" className="btn btn-primary btn-large">Offer Annadana</a>
              <a href="#festival-sevas" className="btn btn-secondary btn-large">Explore Sevas</a>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="at-about">
        <div className="container container-narrow">
          <div className="at-about-grid">
            <div className="at-about-card">
              <div className="at-about-icon">🪷</div>
              <h3>What is Akshaya Tritiya?</h3>
              <p>
                Akshaya Tritiya is one of the most sacred days in the Vedic calendar. 
                The word <strong>"Akshaya"</strong> means imperishable — any charity, 
                puja, or spiritual activity performed on this day yields <strong>infinite, 
                everlasting merit</strong>. It is believed that Lord Parasurama appeared 
                on this day, and it also marks the beginning of the Treta Yuga.
              </p>
            </div>
            <div className="at-about-card">
              <div className="at-about-icon">🙏</div>
              <h3>Why Annadana?</h3>
              <p>
                The scriptures declare <strong>"Annadanam Param Danam"</strong> — 
                the gift of food is the greatest charity. When Annadana is performed 
                on Akshaya Tritiya, the blessings are <strong>multiplied infinitely</strong>. 
                ISKCON Mangalore serves prasadam to thousands of devotees daily, and 
                your generous contribution helps sustain this sacred service.
              </p>
            </div>
            <div className="at-about-card">
              <div className="at-about-icon">✨</div>
              <h3>The Akshaya Promise</h3>
              <p>
                As stated in the Padma Purana, charity given on Akshaya Tritiya 
                <strong> never diminishes</strong>. It brings prosperity, good health, 
                and spiritual advancement. By serving the Lord's devotees with prasadam 
                on this day, you accumulate <strong>inexhaustible spiritual credit</strong> 
                (punya) that protects you across lifetimes.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Tab Navigation */}
      <div className="at-tabs-wrapper" id="annadana">
        <div className="container">
          <div className="at-tabs">
            <button
              className={`at-tab ${activeTab === 'annadana' ? 'active' : ''}`}
              onClick={() => setActiveTab('annadana')}
            >
              🍚 Annadana Seva
            </button>
            <button
              className={`at-tab ${activeTab === 'festival' ? 'active' : ''}`}
              onClick={() => setActiveTab('festival')}
            >
              🪔 Festival Sevas
            </button>
          </div>
        </div>
      </div>

      {/* Annadana Section */}
      {activeTab === 'annadana' && (
        <section className="at-section at-annadana">
          <div className="container">
            <div className="at-section-header">
              <h2>Annadana is Maha Daana</h2>
              <p>Feed the devotees with sanctified Maha Prasadam on Akshaya Tritiya</p>
            </div>

            <div className="at-scripture-banner">
              <div className="at-scripture-text">
                "annadānāt paraṁ dānaṁ na bhūtaṁ na bhaviṣyati"
              </div>
              <div className="at-scripture-meaning">
                There has never been, nor will there ever be, a charity greater than the gift of food.
              </div>
            </div>

            <div className="at-custom-donation">
              <h4>Enter a custom amount</h4>
              <div className="at-custom-row">
                <input
                  type="text"
                  placeholder="Enter amount (₹)"
                  className="at-custom-input"
                  value={customAmount}
                  onChange={(e) => setCustomAmount(e.target.value)}
                />
                <button className="btn btn-primary" onClick={handleCustomDonate}>
                  Donate Custom Amount
                </button>
              </div>
            </div>

            <div className="at-annadana-grid">
              {ANNADANA_SEVAS.map((seva) => (
                <div
                  key={seva.id}
                  className={`at-anna-card ${seva.popular ? 'popular' : ''}`}
                  onClick={() => handleSevaSelect(seva)}
                >
                  {seva.popular && <div className="at-anna-badge">Most Chosen</div>}
                  <div className="at-anna-devotees">
                    <span className="at-anna-count">{seva.devotees}</span>
                    <span className="at-anna-label">Devotees</span>
                  </div>
                  <div className="at-anna-amount">₹{seva.amount.toLocaleString('en-IN')}</div>
                  <button className="btn btn-primary btn-small at-anna-btn">Donate</button>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Festival Sevas Section */}
      {activeTab === 'festival' && (
        <section className="at-section at-festival" id="festival-sevas">
          <div className="container">
            <div className="at-section-header">
              <h2>Festival Sevas</h2>
              <p>Participate in special sevas for Akshaya Tritiya celebrations at ISKCON Mangalore</p>
            </div>

            <div className="at-festival-grid">
              {FESTIVAL_SEVAS.map((seva) => (
                <div key={seva.id} className="at-festival-card" onClick={() => handleSevaSelect(seva)}>
                  <div className="at-festival-icon">{seva.icon}</div>
                  <h3 className="at-festival-name">{seva.label}</h3>
                  <p className="at-festival-desc">{seva.description}</p>
                  <div className="at-festival-amount">₹{seva.amount.toLocaleString('en-IN')}</div>
                  <button className="btn btn-primary btn-small">Offer Seva</button>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}


      {/* Bhagavad Gita Quote Banner */}
      <section className="at-gita-banner">
        <div className="container container-narrow">
          <div className="at-gita-content">
            <div className="at-gita-ref">Srimad Bhagavad Gita 8.28</div>
            <blockquote className="at-gita-quote">
              "A person who accepts the path of devotional service is not bereft of the results 
              derived from studying the Vedas, performing sacrifices, undergoing austerities, 
              giving charity or pursuing philosophical and fruitive activities. Simply by performing 
              devotional service, he attains all these, and at the end he reaches the supreme eternal abode."
            </blockquote>
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="at-trust">
        <div className="container">
          <div className="at-trust-grid">
            <div className="at-trust-item">
              <div className="at-trust-icon">🛡️</div>
              <h4>80G Tax Exemption</h4>
              <p>All donations are eligible for tax benefits under Section 80G</p>
            </div>
            <div className="at-trust-item">
              <div className="at-trust-icon">🔒</div>
              <h4>Secure Payments</h4>
              <p>Powered by Razorpay with bank-grade encryption</p>
            </div>
            <div className="at-trust-item">
              <div className="at-trust-icon">📜</div>
              <h4>Instant Receipt</h4>
              <p>Digital receipt sent immediately after donation</p>
            </div>
            <div className="at-trust-item">
              <div className="at-trust-icon">🏛️</div>
              <h4>ISKCON Verified</h4>
              <p>Official initiative of ISKCON Mangalore, Govardhan Hills</p>
            </div>
          </div>
        </div>
      </section>

      <ModernFooter />

      {/* Donor Form & Payment Modal */}
      <DonorForm
        isOpen={showDonorForm}
        onSubmit={handleDonorSubmit}
        onClose={() => setShowDonorForm(false)}
        isLoading={isLoading}
        amount={selectedSeva?.amount || 0}
        sevaLabel={selectedSeva?.label || ''}
        isMonthly={false}
      />
      <PaymentModal
        isOpen={paymentModal.isOpen}
        status={paymentModal.status}
        details={paymentModal.details}
        onClose={() => setPaymentModal({ isOpen: false, status: null, details: null })}
      />
    </div>
  );
}
