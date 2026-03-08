import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { MessageCircle } from "lucide-react";
import { songs, styleKeys } from "@/data/songs";

const SONGS_PER_PAGE = 6;

const MusicGallery = () => {
  const { lang, t } = useLanguage();
  const [filter, setFilter] = useState<string>("all");
  const [visibleCount, setVisibleCount] = useState(SONGS_PER_PAGE);

  const filtered = filter === "all" ? songs : songs.filter((s) => s.style === filter);
  const visible = filtered.slice(0, visibleCount);
  const hasMore = visibleCount < filtered.length;

  return (
    <section id="music" className="relative z-10 py-24 px-4">
      <div className="container mx-auto max-w-5xl">
        <h2 className="font-heading text-3xl md:text-4xl text-center text-foreground glow-text mb-12 tracking-wider">
          {t.music.heading}
        </h2>

        {/* Style filters */}
        <div className="flex flex-wrap justify-center gap-3 mb-4">
          <button
            onClick={() => { setFilter("all"); setVisibleCount(SONGS_PER_PAGE); }}
            className={`px-4 py-1.5 rounded-full text-xs font-body tracking-widest border transition-all duration-300 ${
              filter === "all"
                ? "border-primary text-primary glow-box"
                : "border-border text-muted-foreground hover:border-primary/50"
            }`}
          >
            {t.music.filterAll}
          </button>
          {styleKeys.map((style) => (
            <button
              key={style}
              onClick={() => { setFilter(style); setVisibleCount(SONGS_PER_PAGE); }}
              className={`px-4 py-1.5 rounded-full text-xs font-body tracking-widest border transition-all duration-300 ${
                filter === style
                  ? "border-primary text-primary glow-box"
                  : "border-border text-muted-foreground hover:border-primary/50"
              }`}
            >
              {t.styles[style as keyof typeof t.styles]}
            </button>
          ))}
        </div>

        {/* Song count */}
        <p className="text-center text-xs font-body text-muted-foreground tracking-widest mb-10">
          {lang === "lv"
            ? `Rāda ${visible.length} no ${filtered.length} dziesmām`
            : `Showing ${visible.length} of ${filtered.length} songs`}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {visible.map((song) => (
            <div
              key={song.id}
              className="rounded-2xl border border-border/50 bg-card/40 backdrop-blur-sm overflow-hidden glow-box-hover"
            >
              <div className="aspect-video bg-secondary/30">
                <iframe
                  src={`https://www.youtube.com/embed/${song.youtubeId}`}
                  className="w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  title={lang === "lv" ? song.titleLV : song.titleEN}
                  loading="lazy"
                />
              </div>
              <div className="p-5">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-heading text-sm tracking-wider text-foreground">
                    {lang === "lv" ? song.titleLV : song.titleEN}
                  </h3>
                </div>
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-[10px] font-body tracking-widest text-primary/60 border border-primary/20 rounded-full px-2 py-0.5">
                    {t.styles[song.style as keyof typeof t.styles]}
                  </span>
                  <span className="text-[10px] font-body tracking-widest text-accent-foreground bg-accent/20 border border-accent/30 rounded-full px-2 py-0.5">
                    {lang === "lv" ? song.badgeLV : song.badgeEN}
                  </span>
                </div>
                <p className="font-body text-sm text-foreground/50 italic mb-3 whitespace-pre-line line-clamp-4">
                  {lang === "lv" ? song.poemLV : song.poemEN}
                </p>
                {song.authorNoteLV && (
                  <p className="font-body text-[11px] text-primary/50 mb-2">
                    {lang === "lv" ? song.authorNoteLV : song.authorNoteEN}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>

        {hasMore && (
          <div className="flex justify-center mt-10">
            <button
              onClick={() => setVisibleCount((prev) => prev + SONGS_PER_PAGE)}
              className="px-6 py-2.5 rounded-full text-sm font-body tracking-widest border border-primary text-primary hover:bg-primary/10 transition-all duration-300 glow-box-hover"
            >
              {lang === "lv" ? "Ielādēt vairāk" : "Load more"}
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default MusicGallery;
