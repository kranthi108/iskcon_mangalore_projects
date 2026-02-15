import { useState } from 'react';
import './ConstructionUpdates.css';
import img1 from '../assets/1.jpeg';
import img2 from '../assets/2.jpeg';
import img3 from '../assets/3.jpeg';
import img4 from '../assets/4.jpeg';
import img5 from '../assets/5.jpeg';
import img6 from '../assets/6.jpeg';
import img7 from '../assets/7.jpeg';

export default function ConstructionUpdates() {
  const [selectedImage, setSelectedImage] = useState(null);
  
  const updates = [
    {
      image: img1,
      title: 'Foundation Work',
      date: 'Jan 20, 2026',
      description: 'Concrete pouring in progress for the main temple structure'
    },
    {
      image: img2,
      title: 'Structural Development',
      date: 'Jan 18, 2026',
      description: 'Steel framework and reinforcement installation'
    },
    {
      image: img3,
      title: 'Ground Floor Progress',
      date: 'Jan 15, 2026',
      description: 'Ground floor construction nearing completion'
    },
    {
      image: img4,
      title: 'Site Preparation',
      date: 'Jan 12, 2026',
      description: 'Land leveling and foundation preparation'
    },
    {
      image: img5,
      title: 'Building Phase',
      date: 'Jan 10, 2026',
      description: 'Wall construction and structural elements'
    },
    {
      image: img6,
      title: 'Infrastructure Setup',
      date: 'Jan 8, 2026',
      description: 'Electrical and plumbing groundwork'
    },
    {
      image: img7,
      title: 'Initial Construction',
      date: 'Jan 5, 2026',
      description: 'Beginning of the main temple construction'
    }
  ];

  return (
    <section className="construction-updates section">
      <div className="container">
        <div className="section-header text-center">
          <div className="section-badge">Latest Updates</div>
          <h2>Construction Progress</h2>
          <p className="section-subtitle">
            Witness the divine transformation as our temple takes shape, brick by brick
          </p>
        </div>

        <div className="updates-grid">
          {updates.map((update, index) => (
            <div 
              key={index} 
              className="update-card"
              onClick={() => setSelectedImage(update)}
            >
              <div className="update-image-wrapper">
                <img src={update.image} alt={update.title} className="update-image" />
                <div className="update-overlay">
                  <span className="view-icon">🔍</span>
                </div>
              </div>
              <div className="update-info">
                <div className="update-date">{update.date}</div>
                <h3 className="update-title">{update.title}</h3>
                <p className="update-description">{update.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Modal for full-size image */}
        {selectedImage && (
          <div className="image-modal" onClick={() => setSelectedImage(null)}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <button className="modal-close" onClick={() => setSelectedImage(null)}>
                ✕
              </button>
              <img src={selectedImage.image} alt={selectedImage.title} />
              <div className="modal-info">
                <h3>{selectedImage.title}</h3>
                <p className="modal-date">{selectedImage.date}</p>
                <p>{selectedImage.description}</p>
              </div>
            </div>
          </div>
        )}

        {/* Call to Action */}
        <div className="updates-cta">
          <h3>Be Part of This Divine Journey</h3>
          <p>Every contribution brings us closer to completion</p>
          <button className="btn btn-primary btn-large">
            Contribute to Construction
          </button>
        </div>
      </div>
    </section>
  );
}
