# ISKCON Mangalore - Professional Donation Platform

A professionally redesigned website for ISKCON Mangalore's fundraising initiatives, inspired by modern donation platforms like Subhojanam. This project focuses on emotional storytelling, clear impact demonstration, and seamless donation flows to maximize donor engagement.

## 🌟 Key Features

### 1. **Emotional Hero Section**
- Compelling headline focusing on caregiver stories
- Prominent donation card with preset amounts (₹500, ₹1,000, ₹2,500, ₹5,000)
- Custom amount input for flexibility
- Real-time donation counter and goal progress
- Trust badges (80G Tax Exempt, 100% Transparent, 12,000+ families trust)
- One-time and monthly donation options

### 2. **Impact Statistics Section**
- **3,65,000+ meals** served with hope
- **15+ hospitals** reached
- **2,500+ volunteers** serving with love
- **100% devotion** in every offering

### 3. **Testimonials with Stories**
- Real caregiver stories that connect emotionally
- Rotating testimonial cards
- Personal quotes highlighting the impact
- Visual avatars and hospital affiliations

### 4. **Transparency & Trust**
- **80G Tax Benefits**: 50% tax exemption under Section 80G
- **Government Registered**: Public Charitable Trust
- **Audited Financials**: Transparent annual reports
- **Bank-Grade Security**: 256-bit SSL encryption
- Hospital partner badges (Victoria Hospital, Bowring Hospital, KC General, etc.)

### 5. **Seva Opportunities**
- **Annadana Hall**: Feed 1,000+ meals daily (₹50,000)
- **Goshala**: Protect 25+ cows (₹25,000)
- **Mukhya Mandira**: Temple construction legacy donation (₹1,00,000)
- **Educational Programs**: Support 500+ students (₹15,000)

### 6. **Professional Footer**
- Complete contact information
- Quick navigation links
- Social media integration
- Sticky bottom donation bar with live meal counter

## 🎨 Design System

### Color Palette
```css
Primary Orange: #d97917
Primary Dark: #b86412
Secondary Navy: #1a2333
Success Green: #0b6e4f
Accent Red: #ff6b35
Background Cream: #fef6ed
```

### Typography
- **Primary Font**: System fonts (SF Pro, Segoe UI, Roboto)
- **Secondary Font**: Georgia (for quotes)
- **Headings**: Bold, modern, responsive (clamp for fluid sizing)
- **Body**: 1rem, line-height 1.7 for readability

### Components
- Modern card-based layouts
- Smooth transitions and hover effects
- Mobile-first responsive design
- Accessible color contrasts (WCAG AA compliant)

## 🚀 Getting Started

### Prerequisites
- Node.js 16+ and npm

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

### Development Server
Once started, the site will be available at:
- Local: http://localhost:5173/

## 📁 Project Structure

```
src/
├── components/
│   ├── HeroSection.jsx          # Hero with donation card
│   ├── ImpactSection.jsx        # Statistics and metrics
│   ├── TestimonialsSection.jsx  # Caregiver stories
│   ├── SevaOpportunitiesSection.jsx  # Seva projects
│   ├── TransparencySection.jsx  # Trust indicators
│   └── ModernFooter.jsx         # Footer with sticky bar
├── pages/
│   ├── Blog.jsx                 # Main landing page
│   └── Home.jsx                 # Alternative view
├── assets/                      # Images and media
├── index.css                    # Global styles & design system
└── main.jsx                     # App entry point
```

## 🎯 Design Philosophy

### 1. **Donor-Centric Approach**
Every element is designed to answer the donor's questions:
- What impact will my donation have?
- Can I trust this organization?
- How easy is it to donate?
- Will I see where my money goes?

### 2. **Emotional Connection**
- Real stories from beneficiaries
- Powerful imagery and testimonials
- Personal impact statements
- Immediate gratification (showing real-time impact)

### 3. **Trust & Transparency**
- Clear financial information
- Government registration details
- Security certifications
- Annual audit reports

### 4. **Frictionless Donation**
- One-click preset amounts
- Simple custom input
- Multiple payment options
- Instant 80G certificate

## 📊 Key Metrics to Track

1. **Donation Conversion Rate**: Hero card to payment completion
2. **Average Donation Amount**: Track which preset amounts are most popular
3. **Bounce Rate**: Measure engagement with testimonials and impact sections
4. **Scroll Depth**: How far visitors read before donating
5. **Mobile vs Desktop**: Optimize for primary traffic source

## 🔄 Future Enhancements

### Phase 1 (Immediate)
- [ ] Payment gateway integration (Razorpay/Stripe)
- [ ] Email receipt automation
- [ ] WhatsApp notification integration
- [ ] Real-time meal counter API

### Phase 2 (Short-term)
- [ ] Donor dashboard
- [ ] Monthly giving management
- [ ] Impact reports by email
- [ ] Social sharing after donation

### Phase 3 (Long-term)
- [ ] Volunteer signup portal
- [ ] Live video feed from distribution
- [ ] Donor recognition wall
- [ ] Mobile app for tracking impact

## 🎨 Component Examples

### Hero Donation Card
```jsx
<HeroSection />
```
Features:
- Preset amounts with visual hierarchy
- "Most Donated" badge on popular amount
- Live donation counter
- Trust badges
- Progress bar to goal

### Impact Section
```jsx
<ImpactSection />
```
Features:
- Animated number counters
- Icon-based visual hierarchy
- Grid layout responsive to all screens

### Testimonials
```jsx
<TestimonialsSection />
```
Features:
- Carousel with smooth transitions
- Personal avatars
- Quote formatting
- Hospital affiliations

## 📱 Responsive Design

All components are fully responsive:
- **Mobile (<768px)**: Single column, stacked layout
- **Tablet (768-1024px)**: Two-column grid
- **Desktop (>1024px)**: Full multi-column layouts

## 🔐 Security Considerations

- All donation data should be transmitted over HTTPS
- PCI DSS compliance for payment processing
- GDPR-compliant data collection
- Secure storage of donor information

## 📞 Support

For questions or support:
- **Email**: info@iskconmangalore.org
- **Phone**: +91 824 2225 512
- **Address**: Govardhan Hills, Benjanapadavu, Mangalore - 575 002

## 🙏 Credits

Inspired by the excellent work at [Subhojanam](https://subhojanam.vercel.app/) by ISKCON Bangalore.

---

**Built with ❤️ for ISKCON Mangalore**

*"अन्नदानं परं दानम् — The gift of food is the greatest gift"*
