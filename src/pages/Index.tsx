import { LanguageProvider } from "@/contexts/LanguageContext";
import StarField from "@/components/StarField";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import MusicGallery from "@/components/MusicGallery";
import HowItWorks from "@/components/HowItWorks";
import SubmitForm from "@/components/SubmitForm";
import Forum from "@/components/Forum";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <LanguageProvider>
      <div className="relative min-h-screen overflow-x-hidden">
        <StarField />
        <Navbar />
        <HeroSection />
        <AboutSection />
        <MusicGallery />
        <HowItWorks />
        <SubmitForm />
        <Forum />
        <Footer />
      </div>
    </LanguageProvider>
  );
};

export default Index;
