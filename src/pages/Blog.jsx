import HeroSection from '../components/HeroSection';
import ImpactSection from '../components/ImpactSection';
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
      <ImpactSection />
      <ConstructionUpdates />
      <SevaOpportunitiesSection />
      <TestimonialsSection />
      <TransparencySection />
      <ModernFooter />
    </div>
  );
}
