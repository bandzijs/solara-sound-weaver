import { useState, useEffect, useMemo, useRef } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { supabase } from "@/lib/supabase";
import { styleKeys, type Song } from "@/data/songs";
import { Search, ChevronLeft, ChevronRight } from "lucide-react";

const SONGS_PER_PAGE = 9;

interface DbSong {
  id: string;
  title_lv: string;
  title_en: string;
  youtube_id: string;
  style: string;
  badge_lv: string;
  badge_en: string;
  poem_lv: string;
  poem_en: string;
  author_note_lv?: string;
  author_note_en?: string;
}

const mapDbSong = (s: DbSong, i: number): Song => ({
  id: 1000 + i,
  titleLV: s.title_lv,
  titleEN: s.title_en,
  youtubeId: s.youtube_id,
  style: s.style,
  badgeLV: s.badge_lv,
  badgeEN: s.badge_en,
  poemLV: s.poem_lv,
  poemEN: s.poem_en,
  authorNoteLV: s.author_note_lv,
  authorNoteEN: s.author_note_en,
});

const MusicGallery = () => {
  const { lang, t } = useLanguage();
  const [filter, setFilter] = useState<string>("all");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [allSongs, setAllSongs] = useState<Song[]>([]);
  const sectionRef = useRef<HTMLElement>(null);

  const fetchSongs = async () => {
    const { data } = await supabase
      .from("songs")
      .select("*")
      .order("created_at", { ascending: false });

    if (data) {
      setAllSongs((data as DbSong[]).map(mapDbSong));
    }
  };

  useEffect(() => {
    fetchSongs();

    const channel = supabase
      .channel("public:songs")
      .on("postgres_changes", { event: "*", schema: "public", table: "songs" }, () => {
        fetchSongs();
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const filtered = useMemo(() => {
    let result = filter === "all" ? allSongs : allSongs.filter((s) => s.style === filter);
    if (search.trim()) {
      const q = search.toLowerCase().trim();
      result = result.filter((s) =>
        s.titleLV.toLowerCase().includes(q) ||
        s.titleEN.toLowerCase().includes(q) ||
        s.poemLV.toLowerCase().includes(q) ||
        s.poemEN.toLowerCase().includes(q)
      );
    }
    return result;
  }, [allSongs, filter, search]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / SONGS_PER_PAGE));
  const safePage = Math.min(page, totalPages);
  const startIdx = (safePage - 1) * SONGS_PER_PAGE;
  const visible = filtered.slice(startIdx, startIdx + SONGS_PER_PAGE);

  const changePage = (newPage: number) => {
    setPage(newPage);
    sectionRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  // Reset page when filter or search changes
  useEffect(() => { setPage(1); }, [filter, search]);

  return (
    <section id="music" ref={sectionRef} className="relative z-10 py-24 px-4">
      <div className="container mx-auto max-w-5xl">
        <h2 className="font-heading text-3xl md:text-4xl text-center text-foreground glow-text mb-12 tracking-wider">
          {t.music.heading}
        </h2>

        {/* Search bar */}
        <div className="flex justify-center mb-6">
          <div className="relative w-full max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder={lang === "lv" ? "Meklēt dziesmu..." : "Search songs..."}
              className="w-full pl-10 pr-4 py-2.5 rounded-full text-sm font-body tracking-wide bg-card/40 border border-border text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none transition-colors"
            />
          </div>
        </div>

        {/* Style filters */}
        <div className="flex flex-wrap justify-center gap-3 mb-4">
          <button
            onClick={() => setFilter("all")}
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
              onClick={() => setFilter(style)}
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
            ? `Rāda ${filtered.length === 0 ? 0 : startIdx + 1}-${startIdx + visible.length} no ${filtered.length} dziesmām`
            : `Showing ${filtered.length === 0 ? 0 : startIdx + 1}-${startIdx + visible.length} of ${filtered.length} songs`}
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

        {filtered.length === 0 && (
          <p className="text-center text-muted-foreground font-body text-sm py-12">
            {lang === "lv" ? "Neviena dziesma nav atrasta" : "No songs found"}
          </p>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-4 mt-10">
            <button
              onClick={() => changePage(safePage - 1)}
              disabled={safePage <= 1}
              className="flex items-center gap-1 px-4 py-2 rounded-full text-sm font-body tracking-widest border border-border text-muted-foreground hover:border-primary/50 hover:text-primary transition-all duration-300 disabled:opacity-30 disabled:pointer-events-none"
            >
              <ChevronLeft className="w-4 h-4" />
              {lang === "lv" ? "Iepriekšējā" : "Previous"}
            </button>
            <span className="text-xs font-body text-muted-foreground tracking-widest">
              {lang === "lv"
                ? `Lapa ${safePage} no ${totalPages}`
                : `Page ${safePage} of ${totalPages}`}
            </span>
            <button
              onClick={() => changePage(safePage + 1)}
              disabled={safePage >= totalPages}
              className="flex items-center gap-1 px-4 py-2 rounded-full text-sm font-body tracking-widest border border-border text-muted-foreground hover:border-primary/50 hover:text-primary transition-all duration-300 disabled:opacity-30 disabled:pointer-events-none"
            >
              {lang === "lv" ? "Nākamā" : "Next"}
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default MusicGallery;
