import { useLanguage } from "@/contexts/LanguageContext";
import { PenLine, Sparkles, Music } from "lucide-react";

const icons = [PenLine, Sparkles, Music];

const HowItWorks = () => {
  const { t } = useLanguage();

  return (
    <section className="relative z-10 py-24 px-4">
      <div className="container mx-auto max-w-4xl">
        <h2 className="font-heading text-3xl md:text-4xl text-center text-foreground glow-text mb-16 tracking-wider">
          {t.howItWorks.heading}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {t.howItWorks.steps.map((step, i) => {
            const Icon = icons[i];
            return (
              <div
                key={i}
                className="flex flex-col items-center text-center p-8 rounded-2xl border border-border/50 bg-card/30 backdrop-blur-sm glow-box-hover"
              >
                <div className="w-14 h-14 rounded-full border border-primary/30 flex items-center justify-center mb-6">
                  <Icon className="w-6 h-6 text-primary" />
                </div>
                <span className="font-heading text-sm tracking-[0.2em] text-primary/60 mb-3">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <p className="font-body text-foreground/80 tracking-wide">{step}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
