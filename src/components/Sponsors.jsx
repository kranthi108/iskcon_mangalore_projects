import './Sponsors.css';

// Placeholder sponsors - will be updated based on image requirements
const sponsors = [
  { id: 1, name: 'Sponsor 1', logo: '' },
  { id: 2, name: 'Sponsor 2', logo: '' },
  { id: 3, name: 'Sponsor 3', logo: '' },
  { id: 4, name: 'Sponsor 4', logo: '' },
];

export default function Sponsors() {
  return (
    <section className="sponsors-section">
      <h2 className="section-heading">SPONSORS</h2>
      <div className="sponsors-grid">
        {sponsors.map((sponsor) => (
          <div key={sponsor.id} className="sponsor-item">
            <div className="sponsor-logo-placeholder">
              {sponsor.name}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
