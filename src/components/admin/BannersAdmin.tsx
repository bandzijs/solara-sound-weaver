import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { Plus, Trash2, Image as ImageIcon } from "lucide-react";

interface Banner {
  id: string;
  image_url: string;
  link_url: string | null;
  is_active: boolean;
}

const BannersAdmin = () => {
  const [banners, setBanners] = useState<Banner[]>([]);
  const [loading, setLoading] = useState(true);
  
  const [newImage, setNewImage] = useState("");
  const [newLink, setNewLink] = useState("");

  useEffect(() => {
    fetchBanners();
  }, []);

  const fetchBanners = async () => {
    const { data, error } = await supabase.from("banners").select("*").order("created_at", { ascending: false });
    if (data && !error) {
      setBanners(data);
    }
    setLoading(false);
  };

  const handleAdd = async () => {
    if (!newImage) return;
    const { data, error } = await supabase.from("banners").insert([{ image_url: newImage, link_url: newLink || null, is_active: true }]).select();
    if (!error && data) {
      setBanners([data[0], ...banners]);
      setNewImage("");
      setNewLink("");
    } else if (error) {
      alert("Kļūda pievienojot baneri: pārliecinies, ka esi palaidis SQL skriptu.");
    }
  };

  const toggleActive = async (id: string, current: boolean) => {
    await supabase.from("banners").update({ is_active: !current }).eq("id", id);
    setBanners(banners.map(b => b.id === id ? { ...b, is_active: !current } : b));
  };

  const handleDelete = async (id: string) => {
    await supabase.from("banners").delete().eq("id", id);
    setBanners(banners.filter(b => b.id !== id));
  };

  const inputClass = "w-full bg-card/40 border border-border rounded-lg px-4 py-2.5 font-body text-foreground text-sm focus:border-primary focus:outline-none transition-colors";

  return (
    <div className="p-6 rounded-2xl border border-border/50 bg-card/30 backdrop-blur-sm space-y-6">
      <div>
        <h3 className="font-heading text-base text-foreground tracking-wider mb-1">Reklāmas baneri</h3>
        <p className="text-xs font-body text-muted-foreground mb-4">
          Pievieno baneru attēlu saites (URL) un norādi, kurp tām jāved.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <input 
            value={newImage} 
            onChange={e => setNewImage(e.target.value)} 
            placeholder="Attēla URL (https://...)" 
            className={inputClass}
          />
          <input 
            value={newLink} 
            onChange={e => setNewLink(e.target.value)} 
            placeholder="Saites URL (nav obligāts)" 
            className={inputClass}
          />
        </div>
        <button 
          onClick={handleAdd}
          disabled={!newImage}
          className="flex items-center gap-2 px-6 py-2.5 rounded-lg bg-primary text-primary-foreground font-body text-sm tracking-widest hover:bg-primary/80 transition-all disabled:opacity-50"
        >
          <Plus className="w-4 h-4" /> Pievienot baneri
        </button>
      </div>

      <div className="space-y-4">
        {banners.map(banner => (
          <div key={banner.id} className="flex items-center gap-4 p-4 border border-border/50 rounded-xl bg-background/50">
            <div className="w-24 h-16 bg-muted rounded-lg overflow-hidden shrink-0 flex items-center justify-center">
              {banner.image_url ? (
                <img src={banner.image_url} alt="Banner" className="w-full h-full object-cover" />
              ) : (
                <ImageIcon className="w-6 h-6 text-muted-foreground" />
              )}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-body truncate text-foreground">{banner.image_url}</p>
              <p className="text-xs font-body truncate text-muted-foreground">{banner.link_url || "Nav saites"}</p>
            </div>
            <div className="flex items-center gap-3">
              <button 
                onClick={() => toggleActive(banner.id, banner.is_active)}
                className={`text-xs px-3 py-1 rounded-full border transition-colors ${banner.is_active ? 'border-primary text-primary' : 'border-muted-foreground text-muted-foreground'}`}
              >
                {banner.is_active ? "Aktīvs" : "Neaktīvs"}
              </button>
              <button onClick={() => handleDelete(banner.id)} className="p-2 text-muted-foreground hover:text-destructive transition-colors">
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
        {banners.length === 0 && !loading && (
          <p className="text-sm text-muted-foreground text-center py-4">Nav pievienotu baneru</p>
        )}
      </div>
    </div>
  );
};

export default BannersAdmin;