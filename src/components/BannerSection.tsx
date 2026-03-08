import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

interface Banner {
  id: string;
  image_url: string;
  link_url: string | null;
}

const BannerSection = () => {
  const [banners, setBanners] = useState<Banner[]>([]);

  useEffect(() => {
    const fetchBanners = async () => {
      try {
        const { data, error } = await supabase
          .from("banners")
          .select("id, image_url, link_url")
          .eq("is_active", true)
          .order("created_at", { ascending: false });
        
        if (data && !error) {
          setBanners(data);
        }
      } catch (e) {
        console.log("Banners not configured yet");
      }
    };
    
    fetchBanners();
  }, []);

  if (banners.length === 0) return null;

  return (
    <section className="w-full max-w-5xl mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {banners.map(banner => (
          <div key={banner.id} className="relative rounded-2xl overflow-hidden border border-border/30 bg-card/10 backdrop-blur-sm group hover:border-primary/50 transition-all duration-500">
            {banner.link_url ? (
              <a href={banner.link_url} target="_blank" rel="noopener noreferrer" className="block w-full h-full">
                <img src={banner.image_url} alt="Advertisement" className="w-full h-48 object-cover opacity-80 group-hover:opacity-100 transition-opacity" />
              </a>
            ) : (
              <img src={banner.image_url} alt="Advertisement" className="w-full h-48 object-cover opacity-80" />
            )}
            <div className="absolute top-2 right-2 px-2 py-0.5 rounded text-[10px] uppercase tracking-widest bg-background/80 text-muted-foreground backdrop-blur-md border border-border/50">
              Reklāma
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default BannerSection;