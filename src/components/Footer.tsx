import { useLanguage } from "@/contexts/LanguageContext";
import { Instagram, Youtube } from "lucide-react";
import { useState } from "react";
import { useAdmin } from "@/contexts/AdminContext";

const Footer = () => {
  const { t } = useLanguage();
  const { isAdmin, loginAdmin } = useAdmin();
  const [showLogin, setShowLogin] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (loginAdmin(password)) {
      setShowLogin(false);
      setPassword("");
      setError("");
    } else {
      setError("✦");
    }
  };

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
        <p className="font-body text-xs text-muted-foreground mb-4">{t.footer.copyright}</p>

        {!isAdmin && (
          <>
            {!showLogin ? (
              <button
                onClick={() => setShowLogin(true)}
                className="text-muted-foreground/20 hover:text-muted-foreground/40 transition-colors text-xs font-body"
              >
                ✦
              </button>
            ) : (
              <form onSubmit={handleSubmit} className="inline-flex items-center gap-2">
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="✦"
                  autoFocus
                  className="bg-transparent border-b border-border/30 text-xs font-body text-muted-foreground w-24 py-1 focus:outline-none focus:border-primary/50"
                />
                {error && <span className="text-destructive text-xs">{error}</span>}
              </form>
            )}
          </>
        )}
      </div>
    </footer>
  );
};

export default Footer;
