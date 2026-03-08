import { useLanguage } from "@/contexts/LanguageContext";

const HeroSection = () => {
  const { t } = useLanguage();

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center text-center px-4 z-10">
      {/* Halo glow behind logo area */}
      <div className="absolute w-64 h-64 rounded-full bg-primary/10 blur-[100px] animate-pulse-glow" />

      <img
        src="https://i.postimg.cc/TYMZgDs6/Chat-GPT-Image-2025-g-28-okt-11-22-58.png"
        alt="Solara Music Vibes logo — poetry transformed into AI music"
        className="w-full max-w-[200px] rounded-full mb-4"
        width={200}
        height={200}
        style={{ filter: "drop-shadow(0 0 25px rgba(77,217,224,0.8))" }}
      />

      <h1
        className="font-heading text-[3rem] tracking-[0.3em] text-foreground mb-2"
        style={{ textShadow: "0 0 20px rgba(77,217,224,0.6)" }}
      >
        SOLARA
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
