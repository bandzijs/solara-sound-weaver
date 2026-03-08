import { useLanguage } from "@/contexts/LanguageContext";
import { useAdmin } from "@/contexts/AdminContext";
import AdminLogin from "@/components/AdminLogin";
import { Shield } from "lucide-react";

const Navbar = () => {
  const { lang, t, toggleLang } = useLanguage();
  const { isAdmin } = useAdmin();

  const links = [
    { label: t.nav.listen, href: "#music" },
    { label: t.nav.about, href: "#about" },
    { label: t.nav.submit, href: "#submit" },
    { label: t.nav.community, href: "#community" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border/50">
      <div className="container mx-auto flex items-center justify-between py-3 px-4">
        <a href="#" className="font-heading text-lg text-primary glow-text tracking-wider">
          Solara
        </a>

        <div className="hidden md:flex items-center gap-8">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-body text-foreground/70 hover:text-primary transition-colors duration-300 tracking-wide"
            >
              {link.label}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-3">
          {isAdmin && (
            <span className="flex items-center gap-1 text-xs font-body text-primary border border-primary/30 rounded-full px-2.5 py-1">
              <Shield className="w-3 h-3" />
              Admin
            </span>
          )}
          <AdminLogin />
          <button
            onClick={toggleLang}
            className="text-sm font-body tracking-widest border border-border rounded-full px-4 py-1.5 hover:border-primary hover:text-primary transition-all duration-300"
          >
            <span className={lang === "lv" ? "text-primary" : "text-muted-foreground"}>LV</span>
            <span className="text-muted-foreground mx-1">|</span>
            <span className={lang === "en" ? "text-primary" : "text-muted-foreground"}>EN</span>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
