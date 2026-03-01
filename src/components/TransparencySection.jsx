import './TransparencySection.css';

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

export default function TransparencySection() {
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
        {/* Donor Privileges */}
        <div className="hospitals-section">
          <h3 className="hospitals-heading">Our Donor Privileges</h3>
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
