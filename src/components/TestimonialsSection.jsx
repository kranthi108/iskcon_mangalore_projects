import { useState } from 'react';
import './TestimonialsSection.css';

export default function TestimonialsSection() {
  const testimonials = [
    {
      quote: "Contributing to this temple is not just a donation, it's my way of securing blessings for my family for generations.",
      story: "Radhika and her family have been ISKCON devotees for years. When they learned about the temple project, they sponsored the construction of an entire pillar. \"Every time we visit, we'll know we helped build this sacred space,\" she says with tears of joy.",
      name: "Radhika Sharma",
      role: "Patron Donor, Mangalore",
      initial: "R"
    },
    {
      quote: "This temple will be our spiritual home. I wanted my children to grow up with strong values and devotion.",
      story: "Prakash, a businessman from Udupi, committed to monthly donations for the temple construction. \"Business success means nothing without spiritual grounding. This temple will serve thousands of families like mine,\" he explains proudly.",
      name: "Prakash Shetty",
      role: "Monthly Contributor, Udupi",
      initial: "P"
    },
    {
      quote: "After my father passed, I wanted to do something meaningful in his memory. Supporting this temple felt right.",
      story: "Ananya chose to contribute to the Goshala in memory of her late father, who loved cows. \"Papa always said serving cows is serving Krishna. This is my way of honoring his devotion,\" she shares emotionally.",
      name: "Ananya Bhat",
      role: "Goshala Sponsor, Bangalore",
      initial: "A"
    }
  ];

  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section className="testimonials-section section">
      <div className="container">
        <div className="section-header text-center">
          <h2>Stories from Our Devotees</h2>
          <p className="section-subtitle">
            Hear from those who are building this temple with love and devotion
          </p>
        </div>

        <div className="testimonials-container">
          {testimonials.map((testimonial, index) => (
            <div 
              key={index} 
              className={`testimonial-card ${index === activeIndex ? 'active' : ''}`}
            >
              <div className="quote-mark">❝</div>
              <blockquote className="testimonial-quote">
                {testimonial.quote}
              </blockquote>
              <p className="testimonial-story">
                {testimonial.story}
              </p>
              <div className="testimonial-author">
                <div className="author-avatar">
                  {testimonial.initial}
                </div>
                <div className="author-info">
                  <div className="author-name">{testimonial.name}</div>
                  <div className="author-role">{testimonial.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Navigation Dots */}
        <div className="testimonials-nav">
          {testimonials.map((_, index) => (
            <button
              key={index}
              className={`nav-dot ${index === activeIndex ? 'active' : ''}`}
              onClick={() => setActiveIndex(index)}
              aria-label={`Go to testimonial ${index + 1}`}
            />
          ))}
        </div>

      </div>
    </section>
  );
}
