import { useState, useEffect } from 'react';
import './SponsorshipSection.css';
import templeImage from '../assets/001_temple_front_view.jpeg';
import constructionImage1 from '../assets/nityaannadana.jpg';
import constructionImage2 from '../assets/pravachan.jpg';
import constructionImage3 from '../assets/garbhagriha.jpg';
import constructionImage4 from '../assets/dwajastambha.jpg';

const constructionImages = [
  constructionImage1,
  constructionImage2,
  constructionImage3,
  constructionImage4
];

export default function SponsorshipSection() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Auto-play carousel for construction section
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => 
        (prevIndex + 1) % constructionImages.length
      );
    }, 5000); // Change image every 5 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="sponsorship-section">
      {/* Top Section - Sponsorship Promotion */}
      <div className="sponsorship-top">
        <div 
          className="sponsorship-top-background"
          style={{ backgroundImage: `url(${templeImage})` }}
        ></div>
        <div className="sponsorship-top-content">
          <div className="sponsorship-text-overlay">
            <p className="sponsorship-line1">Be a part of a sacred legacy</p>
            <p className="sponsorship-line2">Sponsor a block in your name today</p>
          </div>
          <button className="sponsor-btn-top">SPONSOR</button>
        </div>
      </div>

      {/* Bottom Section - Phase-I Construction Updates */}
      <div className="construction-updates">
        <div className="construction-background-carousel">
          {constructionImages.map((image, index) => (
            <div
              key={index}
              className={`construction-background-slide ${
                index === currentImageIndex ? 'active' : ''
              }`}
              style={{ backgroundImage: `url(${image})` }}
            ></div>
          ))}
        </div>
        <h2 className="construction-title">PHASE-I CONSTRUCTION UPDATES</h2>
        <div className="construction-content">
          <div className="construction-text-overlay">
            <p className="construction-line1">Building today what generations will treasure</p>
            <p className="construction-line2">tomorrow</p>
          </div>
          <div className="construction-buttons">
            <button className="donate-btn-construction">DONATE NOW</button>
            <button className="learn-more-btn">
              LEARN MORE
              <span className="arrow-icon">→</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
