import './TransparencySection.css';

export default function TransparencySection() {
  const trustFeatures = [
    {
      icon: (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
          <path d="M20 4H4c-1.11 0-1.99.89-1.99 2L2 18c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V6c0-1.11-.89-2-2-2zm0 14H4v-6h16v6zm0-10H4V6h16v2z"/>
        </svg>
      ),
      title: '80G Tax Benefits',
      description: 'All donations are eligible for 50% tax exemption under Section 80G of the Income Tax Act. You will receive your tax certificate instantly.'
    },
    {
      icon: (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm-2 16l-4-4 1.41-1.41L10 14.17l6.59-6.59L18 9l-8 8z"/>
        </svg>
      ),
      title: 'Government Registered',
      description: 'Registered Public Charitable Trust, fully compliant with all CSR and government regulations.'
    },
    {
      icon: (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
          <path d="M9 17H7v-7h2v7zm4 0h-2V7h2v10zm4 0h-2v-4h2v4zm2.5 2.1h-15V5h15v14.1zm0-16.1h-15c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h15c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z"/>
        </svg>
      ),
      title: 'Audited Financials',
      description: 'Our books are audited annually by independent Chartered Accountants. We publish every report for public view.'
    },
    {
      icon: (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
          <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z"/>
        </svg>
      ),
      title: 'Bank-Grade Security',
      description: 'Your transaction is secured with 256-bit SSL encryption. We use industry-standard payment gateways to keep your data safe.'
    }
  ];

  const facilities = [
    { name: 'Mukhya Mandira (Main Temple)', icon: '🏛️' },
    { name: 'Annadana Hall', icon: '🍽️' },
    { name: 'Goshala (Cow Shelter)', icon: '🐄' },
    { name: 'Yoga Center', icon: '🧘' },
    { name: 'Guest House', icon: '🏨' },
    { name: 'Vedic School', icon: '📚' }
  ];

  return (
    <section className="transparency-section section">
      <div className="container">
        {/* Facilities Section */}
        <div className="hospitals-section">
          <h3 className="hospitals-heading">What We're Building</h3>
          <div className="hospitals-grid">
            {facilities.map((facility, index) => (
              <div key={index} className="hospital-badge">
                <span className="hospital-icon">{facility.icon}</span>
                <span className="hospital-name">{facility.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
