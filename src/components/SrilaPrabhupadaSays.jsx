import { useState, useEffect } from 'react';
import './SrilaPrabhupadaSays.css';

// Placeholder quotes - will be updated based on image requirements
const quotes = [
  { id: 1, text: 'Quote 1 from Srila Prabhupada...', source: 'Source 1' },
  { id: 2, text: 'Quote 2 from Srila Prabhupada...', source: 'Source 2' },
  { id: 3, text: 'Quote 3 from Srila Prabhupada...', source: 'Source 3' },
];

export default function SrilaPrabhupadaSays() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % quotes.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? quotes.length - 1 : prevIndex - 1
    );
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === quotes.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <section className="srila-prabhupada-section">
      <h2 className="section-heading">SRILA PRABHUPADA SAYS</h2>
      <div className="quotes-carousel">
        <button className="carousel-nav-btn prev-btn" onClick={goToPrevious}>
          &#8249;
        </button>
        <div 
          className="quotes-carousel-content"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {quotes.map((quote, index) => (
            <div
              key={quote.id}
              className="quote-item"
            >
              <p className="quote-text">"{quote.text}"</p>
              <p className="quote-source">— {quote.source}</p>
            </div>
          ))}
        </div>
        <button className="carousel-nav-btn next-btn" onClick={goToNext}>
          &#8250;
        </button>
        <div className="carousel-dots">
          {quotes.map((_, index) => (
            <button
              key={index}
              className={`dot ${index === currentIndex ? 'active' : ''}`}
              onClick={() => goToSlide(index)}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
