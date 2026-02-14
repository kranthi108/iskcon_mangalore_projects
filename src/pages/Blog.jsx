import HeroSection from '../components/HeroSection';
import ImpactSection from '../components/ImpactSection';
import DonationCard from '../components/DonationCard';
import ConstructionUpdates from '../components/ConstructionUpdates';
import TestimonialsSection from '../components/TestimonialsSection';
import SevaOpportunitiesSection from '../components/SevaOpportunitiesSection';
import TransparencySection from '../components/TransparencySection';
import ModernFooter from '../components/ModernFooter';
import '../App.css';

export default function Blog() {
  return (
    <div className="app">
      <HeroSection />
      <DonationCard />
      <ImpactSection />
      <ConstructionUpdates />
      <SevaOpportunitiesSection />
      <TestimonialsSection />
      <TransparencySection />
      <ModernFooter />
    </div>
  );
}
