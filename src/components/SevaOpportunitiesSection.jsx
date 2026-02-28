import { useState } from 'react';
import './SevaOpportunitiesSection.css';
import annadanaImg from '../assets/annadana.avif';
import gosevaImg from '../assets/goseva.jpg';
import dwaraImg from '../assets/dwajastambha.jpg';
import constructionImg from '../assets/1.jpeg';
import { registerDonor, initiatePayment } from '../utils/razorpay';
import PaymentModal from './PaymentModal';
import DonorForm from './DonorForm';

export default function SevaOpportunitiesSection() {
  const [paymentModal, setPaymentModal] = useState({ isOpen: false, status: null, details: null });
  const [showDonorForm, setShowDonorForm] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [pendingSeva, setPendingSeva] = useState(null);

  const sevaProjects = [
    {
      title: 'Annadana Hall Seva',
      tagline: 'Feed the Hungry, Serve the Divine',
      description: 'A sacred space where thousands will receive hot, nutritious prasadam daily. Help us build a state-of-the-art kitchen and dining hall.',
      sevaAmount: 108000,
      sevaAmountLabel: '₹1,08,000',
      totalSlots: 365,
      image: annadanaImg,
      color: '#d97917'
    },
    {
      title: 'Goshala Seva',
      tagline: 'Protect Our Sacred Mothers',
      description: 'Build a modern goshala with shelter, food, and medical facilities for rescued cows. Honor Vedic tradition with compassionate care.',
      sevaAmount: 108000,
      sevaAmountLabel: '₹1,08,000',
      totalSlots: 30,
      image: gosevaImg,
      color: '#0b6e4f'
    },
    {
      title: 'Dwara Seva',
      tagline: 'Gateway to the Divine',
      description: 'Contribute to the construction of the magnificent temple entrance — the sacred gateway through which devotees will enter for darshan.',
      sevaAmount: 108000,
      sevaAmountLabel: '₹1,08,000',
      totalSlots: 365,
      image: dwaraImg,
      color: '#7b1f1f'
    },
    {
      title: 'Volunteer Block Seva',
      tagline: 'Support the Servants',
      description: 'Help build accommodation facilities for volunteers and devotees who dedicate their time to serving the temple community.',
      sevaAmount: 108000,
      sevaAmountLabel: '₹1,08,000',
      totalSlots: 365,
      image: constructionImg,
      color: '#1a5490'
    }
  ];

  const handleBookSlot = (project) => {
    setPendingSeva(project);
    setShowDonorForm(true);
  };

  const handleDonorSubmit = async (donorInfo) => {
    if (!pendingSeva) return;
    setIsLoading(true);
    try {
      const donorId = await registerDonor(donorInfo);

      setShowDonorForm(false);

      initiatePayment({
        amount: pendingSeva.sevaAmount,
        sevaType: pendingSeva.title,
        donorId,
        donorName: donorInfo.name,
        donorEmail: donorInfo.email,
        donorPhone: donorInfo.phone,
        onSuccess: (details) => {
          setPaymentModal({ isOpen: true, status: 'success', details });
        },
        onFailure: (details) => {
          setPaymentModal({ isOpen: true, status: 'failure', details });
        },
      });
    } catch (err) {
      alert(err.message || 'Something went wrong. Please try again.');
    } finally {
      setIsLoading(false);
      setPendingSeva(null);
    }
  };

  return (
    <section id="choose-your-seva" className="seva-opportunities-section section-lg">
      <div className="container">
        <div className="section-header text-center">
          <div className="section-badge">Ways to Contribute</div>
          <h2>Choose Your Seva</h2>
          <p className="section-subtitle">
            Every seva is an offering to the Divine. Choose the cause closest to your heart.
          </p>
        </div>

        <div className="seva-grid">
          {sevaProjects.map((project, index) => (
            <div key={index} className="seva-card">
              <div 
                className="seva-image-bg" 
                style={{ backgroundImage: `url(${project.image})` }}
              >
                <div className="seva-overlay"></div>
              </div>
              <div className="seva-content">
                <h3 className="seva-title">{project.title}</h3>
                <p className="seva-tagline">{project.tagline}</p>
                <p className="seva-description">{project.description}</p>
                
                <div className="seva-action-row">
                  <div className="seva-banner">
                    {project.sevaAmountLabel} • {project.totalSlots} Slots
                  </div>
                  <button
                    className="btn btn-primary seva-btn"
                    onClick={() => handleBookSlot(project)}
                  >
                    Book a Slot
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="seva-bottom-message">
          <div className="sanskrit-quote">
            "अन्नदानं परं दानम् — The gift of food is the greatest gift"
          </div>
          <p className="quote-subtitle">
            Serving food is the greatest charity, the holiest form of seva.
          </p>
        </div>
      </div>

      <DonorForm
        isOpen={showDonorForm}
        onSubmit={handleDonorSubmit}
        onClose={() => { setShowDonorForm(false); setPendingSeva(null); }}
        isLoading={isLoading}
      />

      <PaymentModal
        isOpen={paymentModal.isOpen}
        status={paymentModal.status}
        details={paymentModal.details}
        onClose={() => setPaymentModal({ isOpen: false, status: null, details: null })}
      />
    </section>
  );
}
