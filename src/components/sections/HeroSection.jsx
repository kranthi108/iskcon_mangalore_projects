import { useState, useEffect } from 'react';
import './HeroSection.css';
import templeView1 from '../assets/001_temple_front_view.jpeg';
import templeView2 from '../assets/right_side_view.png';
import templeView3 from '../assets/side_view.png';
import logoImg from '../assets/logo.png';

export default function HeroSection() {
  const [currentBgIndex, setCurrentBgIndex] = useState(0);
  const backgroundImages = [templeView1, templeView2, templeView3];
  
  const constructionProgress = 4; // 45% complete
  const fundsRaised = 2.5; // In crores
  const targetFunds = 8; // In crores
  const percentage = Math.round((fundsRaised / targetFunds) * 100);

  // Rotate background images
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBgIndex((prev) => (prev + 1) % backgroundImages.length);
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="hero-section">
      {/* Top Navigation Bar */}
      <nav className="top-nav">
        <div className="container">
          <div className="nav-content">
            <div className="nav-left">
              <div className="brand">
                <div className="logo-icon">
                  <img src={logoImg} alt="ISKCON Logo" className="logo-image" />
                </div>
                <div className="brand-text">
                  <h1 className="brand-name">ISKCON Mangalore</h1>
                  <p className="brand-tagline">Centre for Culture & Education</p>
                </div>
              </div>
            </div>
            <div className="nav-right">
              <a href="#seva" className="nav-link">Seva Opportunities</a>
              <a href="#impact" className="nav-link">Our Impact</a>
              <a href="#about" className="nav-link">About Us</a>
              <button className="btn btn-primary">Donate Now</button>
            </div>
          </div>
        </div>
      </nav>

      {/* Background Image Carousel */}
      <div className="hero-background-carousel">
        {backgroundImages.map((image, index) => (
          <div
            key={index}
            className={`hero-bg-slide ${index === currentBgIndex ? 'active' : ''}`}
            style={{ backgroundImage: `url(${image})` }}
          />
        ))}
      </div>

      {/* Hero Content */}
      <div className="hero-content">
        <div className="container">
          <div className="hero-grid">
            {/* Left: Message */}
            <div className="hero-message">
              <div className="hero-badge">
                🏛️ Building the Tallest Temple of Coastal Karnataka
              </div>
              <h1 className="hero-title">
                Be Part of
                <span className="hero-title-highlight"> Divine History </span>
                Support Our
                <span className="hero-title-highlight"> Sacred Mission</span>
              </h1>
              <p className="hero-description">
                Join us in constructing a magnificent Centre for Culture & Education at Govardhan Hills, Mangalore. 
                Your contribution will create a <strong>spiritual beacon</strong> for generations to come — a place of worship, 
                learning, and community service.
              </p>

              <div className="hero-stats-inline">
                <div className="stat-item">
                  <div className="stat-icon">🏗️</div>
                  <div className="stat-text">
                    <strong>{constructionProgress}% Complete</strong>
                  </div>
                </div>
                <div className="stat-item">
                  <div className="stat-icon">🙏</div>
                  <div className="stat-text">
                    <strong>₹{fundsRaised} Cr</strong> raised of ₹{targetFunds} Cr
                  </div>
                </div>
              </div>

              <div className="hero-actions">
                <button className="btn btn-primary btn-large">
                  Contribute to Temple
                </button>
                <button className="btn btn-secondary btn-large">
                  View Progress
                </button>
              </div>

              {/* Trust Badges */}
              <div className="trust-badges">
                <div className="trust-badge">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z"/>
                  </svg>
                  <span>80G Tax Exempt</span>
                </div>
                <div className="trust-badge">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z"/>
                  </svg>
                  <span>100% Transparent</span>
                </div>
                <div className="trust-badge">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M19 4h-1V2h-2v2H8V2H6v2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2z"/>
                  </svg>
                  <span>Trusted by devotees worldwide</span>
                </div>
              </div>
            </div>

            {/* Right: Donation Card */}
            <div className="hero-donation-card">
              <div className="donation-card">
                <div className="card-header">
                  <h3>Support Our Mission</h3>
                  <p>Every meal brings comfort to someone in their darkest hour</p>
                </div>

                <div className="donation-tabs">
                  <button className="tab active">One-time</button>
                  <button className="tab">Monthly</button>
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
                    <div className="amount">₹25,000</div>
                    <div className="amount-desc">Special Patron Seva</div>
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
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="scroll-indicator">
        <div className="scroll-text">Scroll to see the impact</div>
        <div className="scroll-arrow">↓</div>
      </div>
    </div>
  );
}
