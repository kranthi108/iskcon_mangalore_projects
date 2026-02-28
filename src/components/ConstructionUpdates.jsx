import { useState, useRef, useEffect } from 'react';
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
  const [activeGroup, setActiveGroup] = useState(0);
  const scrollRef = useRef(null);

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
      title: 'Infrastructure Setup — Structural development',
    },
    {
      image: img7,
      title: 'Initial Construction — Beginning of main temple work',
    }
  ];

  const CARDS_PER_VIEW = 4;
  const totalGroups = Math.ceil(updates.length / CARDS_PER_VIEW);

  const scrollToGroup = (groupIndex) => {
    if (!scrollRef.current) return;
    const container = scrollRef.current;
    const cardWidth = container.querySelector('.update-card')?.offsetWidth || 280;
    const gap = 20;
    const scrollPos = groupIndex * CARDS_PER_VIEW * (cardWidth + gap);
    container.scrollTo({ left: scrollPos, behavior: 'smooth' });
    setActiveGroup(groupIndex);
  };

  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    const handleScroll = () => {
      const cardWidth = container.querySelector('.update-card')?.offsetWidth || 280;
      const gap = 20;
      const scrollPos = container.scrollLeft;
      const group = Math.round(scrollPos / (CARDS_PER_VIEW * (cardWidth + gap)));
      setActiveGroup(Math.min(group, totalGroups - 1));
    };

    container.addEventListener('scroll', handleScroll, { passive: true });
    return () => container.removeEventListener('scroll', handleScroll);
  }, [totalGroups]);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveGroup((prev) => {
        const next = (prev + 1) % totalGroups;
        scrollToGroup(next);
        return next;
      });
    }, 3000);
    return () => clearInterval(interval);
  }, [totalGroups]);

  return (
    <section id="construction-progress" className="construction-updates section">
      <div className="container">
        <div className="section-header text-center">
          <h2 className="construction-title">Construction Status — as on February 2026</h2>
          <p className="construction-subtitle">
            The construction of the <strong>Garbha Griha</strong> of{' '}
            <span className="highlight-text">Sri Radha Krishna Temple</span>{' '}
            is presently underway.
          </p>
        </div>

        <div className="carousel-wrapper">
          <div className="carousel-track" ref={scrollRef}>
            {updates.map((update, index) => (
              <div
                key={index}
                className="update-card"
                onClick={() => setSelectedImage(update)}
              >
                <div className="update-image-wrapper">
                  <img src={update.image} alt={update.title} className="update-image" />
                  <div className="update-caption">
                    <p>{update.title}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="carousel-dots">
          {Array.from({ length: totalGroups }, (_, i) => (
            <button
              key={i}
              className={`dot ${activeGroup === i ? 'active' : ''}`}
              onClick={() => scrollToGroup(i)}
              aria-label={`Go to group ${i + 1}`}
            />
          ))}
        </div>

        {selectedImage && (
          <div className="image-modal" onClick={() => setSelectedImage(null)}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <button className="modal-close" onClick={() => setSelectedImage(null)}>
                ✕
              </button>
              <img src={selectedImage.image} alt={selectedImage.title} />
              <div className="modal-info">
                <h3>{selectedImage.title}</h3>
              </div>
            </div>
          </div>
        )}

        <div className="updates-cta">
          <a href="#support-our-mission" className="btn btn-primary btn-donate">
            Donate
          </a>
        </div>
      </div>
    </section>
  );
}
