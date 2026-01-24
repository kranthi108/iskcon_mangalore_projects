import { useState, useEffect } from 'react';
import './BlogTopSection.css';

// Import images - you can replace these with actual blog images
import img1 from '../assets/front_view.png';
import img2 from '../assets/right_side_view.png';
import img3 from '../assets/pravachan.jpg';
import img4 from '../assets/garbhagriha.jpg';
import img5 from '../assets/dwajastambha.jpg';

const carouselImages = [img1, img2];

export default function BlogTopSection() {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto-play carousel
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % carouselImages.length);
    }, 5000); // Change image every 5 seconds

    return () => clearInterval(interval);
  }, []);

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? carouselImages.length - 1 : prevIndex - 1
    );
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === carouselImages.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <div className="blog-top-section">
      {/* Carousel Background - Extended behind header */}
      <div className="carousel-background">
        <div className="carousel-wrapper">
          {carouselImages.map((image, index) => (
            <div
              key={index}
              className={`carousel-slide ${index === currentIndex ? 'active' : ''}`}
            >
              <img src={image} alt={`Slide ${index + 1}`} />
            </div>
          ))}
        </div>

        {/* Navigation Arrows */}
        <button className="carousel-arrow carousel-arrow-left" onClick={goToPrevious}>
          &#8249;
        </button>
        <button className="carousel-arrow carousel-arrow-right" onClick={goToNext}>
          &#8250;
        </button>

        {/* Dots Indicator */}
        <div className="carousel-dots">
          {carouselImages.map((_, index) => (
            <button
              key={index}
              className={`carousel-dot ${index === currentIndex ? 'active' : ''}`}
              onClick={() => goToSlide(index)}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Header Overlay - Top Bar */}
      <div className="header-overlay">
        <div className="top-header-bar">
          <div className="top-header-left">
            {/* Social Media Icons */}
            <a href="#" className="social-icon" aria-label="YouTube">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
              </svg>
            </a>
            <a href="#" className="social-icon" aria-label="Instagram">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
            </a>
            <a href="#" className="social-icon" aria-label="WhatsApp">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
              </svg>
            </a>
            <a href="#" className="social-icon" aria-label="Location">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0C7.589 0 4 3.589 4 8c0 4.245 7.273 15.107 7.583 15.577a1 1 0 0 0 .834.423 1 1 0 0 0 .833-.423C13.727 23.107 21 12.245 21 8c0-4.411-3.589-8-9-8zm0 11.5c-1.93 0-3.5-1.57-3.5-3.5S10.07 4.5 12 4.5s3.5 1.57 3.5 3.5-1.57 3.5-3.5 3.5z"/>
              </svg>
            </a>
          </div>
          <div className="top-header-right">
            <button className="action-btn donate-btn">DONATE NOW</button>
            <button className="action-btn sponsor-btn">SPONSOR</button>
            <button className="action-btn temple-btn">TALLEST TEMPLE OF COASTAL KARNATAKA</button>
          </div>
        </div>

        {/* Main Navigation Bar */}
        <div className="main-nav-bar">
          <div className="nav-left">
            <div className="logo-container">
              <div className="logo-circle">
                <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
                  {/* Temple illustration - simplified version */}
                  <rect x="15" y="25" width="10" height="8" fill="currentColor"/>
                  <rect x="12" y="20" width="16" height="5" fill="currentColor"/>
                  <rect x="10" y="15" width="20" height="5" fill="currentColor"/>
                  <polygon points="10,15 20,5 30,15" fill="currentColor"/>
                </svg>
              </div>
            </div>
            <div className="site-identity">
              <h1 className="site-title">CENTRE FOR CULTURE AND EDUCATION</h1>
              <p className="site-location">Govardhan Hills, Benjanapadavu, Mangalore</p>
            </div>
          </div>
          <div className="nav-right">
            <a href="/" className="nav-link">HOME</a>
            <a href="#" className="nav-link active">THE VISION</a>
            <a href="/" className="nav-link">OFFER SEVA</a>
            <a href="#" className="nav-link">UPDATES</a>
            <a href="#" className="nav-link">GET INVOLVED</a>
          </div>
        </div>
      </div>

      {/* Call to Action Section */}
      <div className="cta-section">
        <div className="cta-content">
          <p className="cta-text">
            Join us in building the tallest temple of Coastal Karnataka — a vibrant hub of devotion and learning in the serene valley of Benjanapadavu, Mangalore
          </p>
          <button className="cta-donate-btn">DONATE NOW</button>
        </div>
      </div>
    </div>
  );
}
