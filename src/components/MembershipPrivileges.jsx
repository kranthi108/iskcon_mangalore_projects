import './MembershipPrivileges.css';

const privileges = [
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

export default function MembershipPrivileges() {
  return (
    <section className="membership-section section">
      <div className="container">
        <div className="section-header text-center">
          <h2>Membership Privileges</h2>
          <p className="section-subtitle">
            Life patrons are offered the following privileges
          </p>
        </div>
        <div className="membership-grid">
          {privileges.map((item, i) => (
            <div key={i} className="membership-card">
              <div className="membership-icon">{item.icon}</div>
              <h3 className="membership-title">{item.title}</h3>
              <p className="membership-desc">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
