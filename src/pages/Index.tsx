import { LanguageProvider } from "@/contexts/LanguageContext";
import { AdminProvider } from "@/contexts/AdminContext";
import StarField from "@/components/StarField";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import MusicGallery from "@/components/MusicGallery";
import HowItWorks from "@/components/HowItWorks";
import SubmitForm from "@/components/SubmitForm";
import CommunityWall from "@/components/CommunityWall";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <LanguageProvider>
      <AdminProvider>
        <div className="relative min-h-screen overflow-x-hidden">
          <StarField />
          <Navbar />
          <HeroSection />
          <AboutSection />
          <MusicGallery />
          <HowItWorks />
          <SubmitForm />
          <CommunityWall />
          <Footer />
        </div>
      </AdminProvider>
    </LanguageProvider>
  );
};

export default Index;
