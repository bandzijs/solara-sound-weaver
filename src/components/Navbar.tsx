import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useAdmin } from "@/contexts/AdminContext";
import { useAuth } from "@/contexts/AuthContext";
import { Shield, LogOut, Menu, X } from "lucide-react";
import { Link } from "react-router-dom";
import AdminLogin from "@/components/AdminLogin";

const Navbar = () => {
  const { lang, t, toggleLang } = useLanguage();
  const { isAdmin: isLocalAdmin } = useAdmin();
  const { user, displayName, avatarUrl, signOut } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);

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

        {/* Desktop links */}
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
          {user && (
            <div className="flex items-center gap-2">
              {avatarUrl ? (
                <img src={avatarUrl} alt="" className="w-7 h-7 rounded-full" />
              ) : (
                <div className="w-7 h-7 rounded-full bg-secondary flex items-center justify-center text-xs font-heading text-primary">
                  {displayName?.[0]?.toUpperCase() || "?"}
                </div>
              )}
              <span className="hidden sm:block text-xs font-body text-foreground/70 max-w-[100px] truncate">
                {displayName}
              </span>
              <button
                onClick={signOut}
                className="text-muted-foreground hover:text-primary transition-colors"
                title={lang === "lv" ? "Iziet" : "Sign out"}
              >
                <LogOut className="w-3.5 h-3.5" />
              </button>
            </div>
          )}

          {isLocalAdmin && (
            <Link
              to="/admin"
              className="flex items-center gap-1 text-xs font-body text-primary border border-primary/30 rounded-full px-2.5 py-1 hover:bg-primary/10 transition-colors"
            >
              <Shield className="w-3 h-3" />
              Admin
            </Link>
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

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden text-foreground/70 hover:text-primary transition-colors"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden border-t border-border/30 bg-background/95 backdrop-blur-md">
          <div className="container mx-auto px-4 py-4 flex flex-col gap-3">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="text-sm font-body text-foreground/70 hover:text-primary transition-colors duration-300 tracking-wide py-2 border-b border-border/20"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
