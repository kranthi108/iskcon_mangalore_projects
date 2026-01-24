import BlogTopSection from '../components/BlogTopSection';
import SevaGrid from '../components/SevaGrid';
import SponsorshipSection from '../components/SponsorshipSection';
import LatestNews from '../components/LatestNews';
import SrilaPrabhupadaSays from '../components/SrilaPrabhupadaSays';
import Sponsors from '../components/Sponsors';
import BlogFooter from '../components/BlogFooter';
import '../App.css';

export default function Blog() {
  return (
    <div className="app">
      <BlogTopSection />
      <SevaGrid />
      <SponsorshipSection />
      <LatestNews />
      <SrilaPrabhupadaSays />
      <Sponsors />
      <BlogFooter />
    </div>
  );
}
