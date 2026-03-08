import { useLanguage } from "@/contexts/LanguageContext";

const AboutSection = () => {
  const { t } = useLanguage();

  return (
    <section id="about" className="relative z-10 py-24 px-4">
      <div className="container mx-auto max-w-2xl text-center">
        <h2 className="font-heading text-3xl md:text-4xl text-foreground glow-text mb-8 tracking-wider">
          {t.about.heading}
        </h2>
        <p className="font-body text-lg text-foreground/70 leading-relaxed italic">
          {t.about.text}
        </p>
      </div>
    </section>
  );
};

export default AboutSection;
