import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { Instagram, Youtube, Save, Send } from "lucide-react";

interface SocialLink {
  id: string;
  platform: string;
  url: string;
}

const PLATFORM_META: Record<string, { label: string; icon: React.ReactNode; placeholder: string }> = {
  youtube: {
    label: "YouTube",
    icon: <Youtube className="w-4 h-4" />,
    placeholder: "https://youtube.com/@yourChannel",
  },
  instagram: {
    label: "Instagram",
    icon: <Instagram className="w-4 h-4" />,
    placeholder: "https://instagram.com/yourProfile",
  },
  spotify: {
    label: "Spotify",
    icon: (
      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z" />
      </svg>
    ),
    placeholder: "https://open.spotify.com/artist/...",
  },
};

const SocialLinksAdmin = () => {
  const [links, setLinks] = useState<SocialLink[]>([]);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    fetchLinks();
  }, []);

  const fetchLinks = async () => {
    const { data } = await supabase
      .from("social_links")
      .select("*")
      .order("platform");
    if (data) setLinks(data);
  };

  const handleChange = (platform: string, url: string) => {
    setLinks((prev) =>
      prev.map((l) => (l.platform === platform ? { ...l, url } : l))
    );
    setSaved(false);
  };

  const handleSave = async () => {
    setSaving(true);
    for (const link of links) {
      await supabase
        .from("social_links")
        .update({ url: link.url, updated_at: new Date().toISOString() })
        .eq("platform", link.platform);
    }
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const inputClass =
    "w-full bg-card/40 border border-border rounded-lg px-4 py-2.5 font-body text-foreground text-sm focus:border-primary focus:outline-none transition-colors";

  return (
    <div className="p-6 rounded-2xl border border-border/50 bg-card/30 backdrop-blur-sm space-y-4">
      <h3 className="font-heading text-base text-foreground tracking-wider">Sociālie tīkli</h3>
      <p className="text-xs font-body text-muted-foreground">
        Ievieto saites uz saviem kanāliem. Tās parādīsies footerī.
      </p>

      <div className="space-y-3">
        {links.map((link) => {
          const meta = PLATFORM_META[link.platform];
          if (!meta) return null;
          return (
            <div key={link.platform} className="flex items-center gap-3">
              <div className="flex items-center gap-2 w-28 text-sm font-body text-muted-foreground">
                {meta.icon}
                {meta.label}
              </div>
              <input
                value={link.url}
                onChange={(e) => handleChange(link.platform, e.target.value)}
                placeholder={meta.placeholder}
                className={inputClass}
              />
            </div>
          );
        })}
      </div>

      <button
        onClick={handleSave}
        disabled={saving}
        className="flex items-center gap-2 px-6 py-2.5 rounded-lg bg-primary text-primary-foreground font-body text-sm tracking-widest hover:bg-primary/80 transition-all disabled:opacity-50"
      >
        <Save className="w-4 h-4" />
        {saving ? "Saglabā..." : saved ? "✓ Saglabāts" : "Saglabāt"}
      </button>
    </div>
  );
};

export default SocialLinksAdmin;
