import { useState, useEffect } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Instagram, Youtube, Mail, Phone } from "lucide-react";
import { useAdmin } from "@/contexts/AdminContext";
import { supabase } from "@/lib/supabase";

interface SocialLink {
  platform: string;
  url: string;
}

const Footer = () => {
  const { t } = useLanguage();
  const { isAdmin, loginAdmin } = useAdmin();
  const [showLogin, setShowLogin] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [socialLinks, setSocialLinks] = useState<Record<string, string>>({});

  useEffect(() => {
    const fetchLinks = async () => {
      const { data } = await supabase
        .from("social_links")
        .select("platform, url");
      if (data) {
        const map: Record<string, string> = {};
        data.forEach((l: SocialLink) => { map[l.platform] = l.url; });
        setSocialLinks(map);
      }
    };
    fetchLinks();
  }, []);

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

  const socialItems = [
    {
      platform: "instagram",
      icon: <Instagram className="w-5 h-5" />,
      label: "Instagram",
    },
    {
      platform: "youtube",
      icon: <Youtube className="w-5 h-5" />,
      label: "YouTube",
    },
    {
      platform: "spotify",
      icon: (
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/>
        </svg>
      ),
      label: "Spotify",
    },
  ];

  return (
    <footer className="relative z-10 border-t border-border/30 py-12 px-4">
      <div className="container mx-auto max-w-4xl text-center">
        <h3 className="font-heading text-xl tracking-wider text-primary glow-text mb-4">
          Solara Music Vibes
        </h3>

        <div className="flex justify-center gap-5 mb-6">
          {socialItems.map((item) => {
            const url = socialLinks[item.platform];
            if (!url) return (
              <span
                key={item.platform}
                className="text-muted-foreground/30 cursor-default"
                title={`${item.label} — nav pievienots`}
              >
                {item.icon}
              </span>
            );
            return (
              <a
                key={item.platform}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors duration-300"
                aria-label={item.label}
              >
                {item.icon}
              </a>
            );
          })}
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-6 text-sm font-body">
          <a
            href="mailto:info@solaraflames.com"
            className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors duration-300"
          >
            <Mail className="w-4 h-4 text-primary/70" />
            info@solaraflames.com
          </a>
          <a
            href="tel:+37126769475"
            className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors duration-300"
          >
            <Phone className="w-4 h-4 text-primary/70" />
            +371 26769475
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
