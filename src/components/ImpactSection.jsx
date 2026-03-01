import './ImpactSection.css';

export default function ImpactSection() {
  const impactData = [
    {
      icon: '🍚',
      number: '4%',
      label: 'Construction Complete',
      description: 'The main temple structure is taking shape beautifully.'
    },
    {
      icon: '📚',
      number: '5 Floors',
      label: 'Tallest in Coastal Karnataka',
      description: 'A magnificent beacon of spirituality and culture.'
    },
    {
      icon: '📿',
      number: '1,000+',
      label: 'Devotees Supported',
      description: 'United by faith, building together with devotion.'
    },
    {
      icon: '🖼️️',
      number: '100%',
      label: 'Pure Dedication',
      description: 'Every brick laid is an offering to the Divine.'
    }
  ];

  return (
    <section className="impact-section section">
      <div className="container">
        <div className="section-header text-center">
          <h2>Our Donor Privileges</h2>
          <p className="section-subtitle">
            Our respected contributors will receive the following privileges.
          </p>
        </div>

        <div className="impact-grid">
          {impactData.map((item, index) => (
            <div key={index} className="impact-card">
              <div className="impact-icon">{item.icon}</div>
              <div className="impact-number">{item.number}</div>
              <h3 className="impact-label">{item.label}</h3>
              <p className="impact-description">{item.description}</p>
            </div>
          ))}
        </div>

        {/* Visual Divider */}
      </div>
    </section>
  );
}
