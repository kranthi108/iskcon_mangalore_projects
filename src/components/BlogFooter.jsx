import './BlogFooter.css';

export default function BlogFooter() {
  return (
    <footer className="blog-footer">
      {/* Upper Band - Light Brown/Beige */}
      <div className="footer-upper">
        <div className="footer-upper-content">
          {/* Left Side - GET IN TOUCH */}
          <div className="footer-left">
            <h3 className="footer-heading">GET IN TOUCH</h3>
            <div className="contact-info">
              <span className="contact-item">7259206910</span>
              <span className="contact-separator">|</span>
              <span className="contact-item">contact@iskconmangalore.org</span>
            </div>
            <div className="address">
              <p>ISKCON, Sri Krishna Balram Mandir, Pvs Kalakunj,</p>
              <p>Kodailbail, Mangaluru, Karnataka 575003</p>
            </div>
          </div>

          {/* Right Side - QUICK LINKS */}
          <div className="footer-right">
            <h3 className="footer-heading">QUICK LINKS</h3>
            <div className="quick-links">
              <div className="links-column">
                <a href="#" className="footer-link">VISION</a>
                <a href="#" className="footer-link">DONOR BENEFITS</a>
              </div>
              <div className="links-column">
                <a href="#" className="footer-link">DONATE NOW</a>
                <a href="#" className="footer-link">GET INVOLVED</a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Separator Line */}
      <div className="footer-separator"></div>

      {/* Lower Band - Darker Brown */}
      <div className="footer-lower">
        <div className="footer-lower-content">
          {/* Left Side - Initiative Statement */}
          <div className="footer-lower-left">
            <p>An Initiative of ISKCON MANGALORE, Sri Sri Krishna Balaram Mandir</p>
          </div>

          {/* Right Side - Logo */}
          <div className="footer-lower-right">
            <div className="footer-logo">
              <svg className="logo-person" width="50" height="70" viewBox="0 0 50 70" fill="white">
                {/* Person walking silhouette - Srila Prabhupada */}
                <circle cx="25" cy="15" r="10"/>
                <path d="M25 25 L25 45" stroke="white" strokeWidth="3" strokeLinecap="round"/>
                <path d="M25 30 L18 38" stroke="white" strokeWidth="3" strokeLinecap="round"/>
                <path d="M25 30 L32 38" stroke="white" strokeWidth="3" strokeLinecap="round"/>
                <path d="M25 45 L20 60" stroke="white" strokeWidth="3" strokeLinecap="round"/>
                <path d="M25 45 L30 60" stroke="white" strokeWidth="3" strokeLinecap="round"/>
              </svg>
              <div className="logo-text">
                <span className="logo-text-small">Srila Prabhupada's</span>
                <span className="logo-text-large">ISKCON</span>
                <span className="logo-text-medium">MANGALORE</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
