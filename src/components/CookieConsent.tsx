import { useState, useEffect } from "react";
import { useLanguage } from "@/contexts/LanguageContext";

const COOKIE_KEY = "solara_cookie_consent";

const CookieConsent = () => {
  const { lang } = useLanguage();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem(COOKIE_KEY);
    if (!consent) {
      const timer = setTimeout(() => setVisible(true), 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem(COOKIE_KEY, "accepted");
    setVisible(false);
  };

  const handleReject = () => {
    localStorage.setItem(COOKIE_KEY, "rejected");
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[60] p-4 animate-in slide-in-from-bottom duration-500">
      <div className="container mx-auto max-w-2xl">
        <div className="rounded-2xl border border-border/50 bg-card/95 backdrop-blur-md p-5 shadow-lg">
          <p className="font-body text-sm text-foreground/80 mb-4 leading-relaxed">
            {lang === "lv"
              ? "Mēs izmantojam sīkdatnes, lai nodrošinātu vietnes darbību un uzlabotu jūsu pieredzi. Turpinot lietot vietni, jūs piekrītat sīkdatņu izmantošanai."
              : "We use cookies to ensure the website functions properly and to improve your experience. By continuing to use the site, you agree to our use of cookies."}
          </p>
          <div className="flex items-center gap-3">
            <button
              onClick={handleAccept}
              className="px-6 py-2 rounded-full bg-primary text-primary-foreground font-body text-sm tracking-widest hover:bg-primary/80 transition-all"
            >
              {lang === "lv" ? "Pieņemt" : "Accept"}
            </button>
            <button
              onClick={handleReject}
              className="px-6 py-2 rounded-full border border-border text-muted-foreground font-body text-sm tracking-widest hover:text-foreground hover:border-primary/50 transition-all"
            >
              {lang === "lv" ? "Noraidīt" : "Reject"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CookieConsent;
