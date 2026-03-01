import './ImpactSection.css';

export default function ImpactSection() {
    const membershipPrivileges = [
      {
        icon: '🪪',
        title: 'Life-Membership Card',
        description: 'Receive an exclusive Life-Membership Card recognizing your commitment to the divine mission.',
      },
      {
        icon: '🙏',
        title: 'Special Puja',
        description: 'Personalized pujas on special occasions like birthdays, anniversaries, and auspicious days.',
      },
      {
        icon: '🎪',
        title: 'Festival Passes',
        description: 'Priority passes for major festivals like Sri Krishna Janmashtami, Gaura Purnima, and more.',
      },
      {
        icon: '🏨',
        title: 'Guest House Facility',
        description: 'Complimentary stay at the temple guest house during your visits to Govardhan Hills.',
      },
    ];

  const impactData = [
    {
      icon: '🍚',
//       number: 'Shri Krishna Prasadam',
      label: 'Shri Krishna Prasadam',
      description: 'Prasadam, offered to the Lord will be delivered to the mentioned address .'
    },
    {
      icon: '📚',
//       number: 'Books',
      label: 'Books',
      description: 'Books on Timeless Vedic Knowledge.'
    },
    {
      icon: '📿',
//       number: 'Japa Meditation Kit',
      label: 'Japa Meditation Kit',
      description: 'Japa mala, Mantra card etc which are helpful for daily meditation activity.'
    },
    {
      icon: '🖼️️',
//       number: 'Photo Frames',
      label: 'Photo Frames',
      description: 'Beautiful and all Attractive photo frames of the Lord.'
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
        <div className="section-header text-center membership-header">
                  <h2>Membership Privileges</h2>
                  <p className="section-subtitle">
                    Life patrons are offered the following privileges
                  </p>
                </div>
                <div className="membership-grid">
                  {membershipPrivileges.map((item, i) => (
                    <div key={i} className="membership-card">
                      <div className="membership-icon">{item.icon}</div>
                      <h3 className="membership-title">{item.title}</h3>
                      <p className="membership-desc">{item.description}</p>
                    </div>
                  ))}
                </div>
        {/* Visual Divider */}
      </div>
    </section>
  );
}
