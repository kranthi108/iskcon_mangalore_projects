import { useState } from 'react';
import './LatestNews.css';

// Placeholder - will be updated based on image requirements
const newsItems = [
  { id: 1, title: 'News Item 1', date: '2024-01-01', excerpt: 'News excerpt 1...', image: '' },
  { id: 2, title: 'News Item 2', date: '2024-01-02', excerpt: 'News excerpt 2...', image: '' },
  { id: 3, title: 'News Item 3', date: '2024-01-03', excerpt: 'News excerpt 3...', image: '' },
  { id: 4, title: 'News Item 4', date: '2024-01-04', excerpt: 'News excerpt 4...', image: '' },
  { id: 5, title: 'News Item 5', date: '2024-01-05', excerpt: 'News excerpt 5...', image: '' },
  { id: 6, title: 'News Item 6', date: '2024-01-06', excerpt: 'News excerpt 6...', image: '' },
];

const ITEMS_PER_PAGE = 3;

export default function LatestNews() {
  const [currentPage, setCurrentPage] = useState(0);
  const totalPages = Math.ceil(newsItems.length / ITEMS_PER_PAGE);

  const goToPrevious = () => {
    setCurrentPage((prevPage) =>
      prevPage === 0 ? totalPages - 1 : prevPage - 1
    );
  };

  const goToNext = () => {
    setCurrentPage((prevPage) =>
      prevPage === totalPages - 1 ? 0 : prevPage + 1
    );
  };

  const goToPage = (page) => {
    setCurrentPage(page);
  };

  const startIndex = currentPage * ITEMS_PER_PAGE;
  const visibleItems = newsItems.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  return (
    <section className="latest-news-section">
      <h2 className="section-heading">LATEST NEWS</h2>
      <div className="news-carousel">
        <button className="carousel-nav-btn prev-btn" onClick={goToPrevious}>
          &#8249;
        </button>
        <div className="news-grid">
          {visibleItems.map((item) => (
            <div key={item.id} className="news-item">
              {item.image && (
                <div className="news-image">
                  <img src={item.image} alt={item.title} />
                </div>
              )}
              <div className="news-content">
                <h3>{item.title}</h3>
                <p className="news-date">{item.date}</p>
                <p className="news-excerpt">{item.excerpt}</p>
              </div>
            </div>
          ))}
        </div>
        <button className="carousel-nav-btn next-btn" onClick={goToNext}>
          &#8250;
        </button>
        <div className="carousel-dots">
          {Array.from({ length: totalPages }).map((_, index) => (
            <button
              key={index}
              className={`dot ${index === currentPage ? 'active' : ''}`}
              onClick={() => goToPage(index)}
              aria-label={`Go to page ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
