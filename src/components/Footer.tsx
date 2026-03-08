import { useLanguage } from "@/contexts/LanguageContext";
import { Instagram, Youtube } from "lucide-react";

const Footer = () => {
  const { t } = useLanguage();

  return (
    <footer className="relative z-10 border-t border-border/30 py-12 px-4">
      <div className="container mx-auto max-w-4xl text-center">
        <h3 className="font-heading text-xl tracking-wider text-primary glow-text mb-4">
          Solara Music Vibes
        </h3>

        <div className="flex justify-center gap-5 mb-6">
          <a
            href="#"
            className="text-muted-foreground hover:text-primary transition-colors duration-300"
            aria-label="Instagram"
          >
            <Instagram className="w-5 h-5" />
          </a>
          <a
            href="#"
            className="text-muted-foreground hover:text-primary transition-colors duration-300"
            aria-label="YouTube"
          >
            <Youtube className="w-5 h-5" />
          </a>
        </div>

        <p className="font-body text-sm text-foreground/40 italic mb-2">{t.footer.poetic}</p>
        <p className="font-body text-xs text-muted-foreground">© Solara Music Vibes 2025</p>
      </div>
    </footer>
  );
};

export default Footer;
