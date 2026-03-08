import { useLanguage } from "@/contexts/LanguageContext";

const HeroSection = () => {
  const { t } = useLanguage();

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center text-center px-4 z-10">
      {/* Halo glow behind logo area */}
      <div className="absolute w-64 h-64 rounded-full bg-primary/10 blur-[100px] animate-pulse-glow" />

      <h1 className="font-heading text-5xl md:text-7xl lg:text-8xl tracking-wider text-foreground glow-text mb-2">
        Solara
      </h1>
      <p className="font-heading text-lg md:text-xl tracking-[0.3em] text-primary/80 mb-8">
        Music Vibes
      </p>

      <p className="font-body text-lg md:text-xl text-foreground/80 max-w-xl leading-relaxed mb-12 italic">
        {t.hero.tagline}
      </p>

      <div className="flex flex-col sm:flex-row gap-4">
        <a
          href="#music"
          className="px-8 py-3 rounded-full border border-primary text-primary font-body text-sm tracking-widest hover:bg-primary hover:text-primary-foreground transition-all duration-500 glow-box-hover"
        >
          {t.hero.listenBtn}
        </a>
        <a
          href="#submit"
          className="px-8 py-3 rounded-full bg-primary text-primary-foreground font-body text-sm tracking-widest hover:bg-primary/80 transition-all duration-500 glow-box"
        >
          {t.hero.submitBtn}
        </a>
      </div>
    </section>
  );
};

export default HeroSection;
