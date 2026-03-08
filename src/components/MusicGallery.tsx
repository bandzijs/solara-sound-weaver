import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { MessageCircle } from "lucide-react";

const songs = [
  {
    title: "Zvaigžņu Putekļi",
    titleEn: "Stardust",
    excerpt: { lv: "Naktī es dzirdu, kā zvaigznes dzied...", en: "At night I hear the stars singing..." },
    mood: "cosmic",
    comments: 12,
    youtubeId: "dQw4w9WgXcQ",
  },
  {
    title: "Meža Elpa",
    titleEn: "Forest Breath",
    excerpt: { lv: "Koki čukst noslēpumus zemei...", en: "Trees whisper secrets to the earth..." },
    mood: "nature",
    comments: 8,
    youtubeId: "dQw4w9WgXcQ",
  },
  {
    title: "Pazudušie Vārdi",
    titleEn: "Lost Words",
    excerpt: { lv: "Vārdi, kas nekad netika pateikti...", en: "Words that were never spoken..." },
    mood: "melancholic",
    comments: 15,
    youtubeId: "dQw4w9WgXcQ",
  },
];

const moodKeys = ["melancholic", "love", "nature", "cosmic", "other"] as const;

const MusicGallery = () => {
  const { lang, t } = useLanguage();
  const [filter, setFilter] = useState<string>("all");

  const filtered = filter === "all" ? songs : songs.filter((s) => s.mood === filter);

  return (
    <section id="music" className="relative z-10 py-24 px-4">
      <div className="container mx-auto max-w-5xl">
        <h2 className="font-heading text-3xl md:text-4xl text-center text-foreground glow-text mb-12 tracking-wider">
          {t.music.heading}
        </h2>

        {/* Mood filters */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
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
          {moodKeys.map((mood) => (
            <button
              key={mood}
              onClick={() => setFilter(mood)}
              className={`px-4 py-1.5 rounded-full text-xs font-body tracking-widest border transition-all duration-300 ${
                filter === mood
                  ? "border-primary text-primary glow-box"
                  : "border-border text-muted-foreground hover:border-primary/50"
              }`}
            >
              {t.moods[mood]}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((song, i) => (
            <div
              key={i}
              className="rounded-2xl border border-border/50 bg-card/40 backdrop-blur-sm overflow-hidden glow-box-hover"
            >
              <div className="aspect-video bg-secondary/30">
                <iframe
                  src={`https://www.youtube.com/embed/${song.youtubeId}`}
                  className="w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  title={lang === "lv" ? song.title : song.titleEn}
                  loading="lazy"
                />
              </div>
              <div className="p-5">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-heading text-sm tracking-wider text-foreground">
                    {lang === "lv" ? song.title : song.titleEn}
                  </h3>
                  <span className="text-[10px] font-body tracking-widest text-primary/60 border border-primary/20 rounded-full px-2 py-0.5">
                    {t.moods[song.mood as keyof typeof t.moods]}
                  </span>
                </div>
                <p className="font-body text-sm text-foreground/50 italic mb-3">
                  {song.excerpt[lang]}
                </p>
                <div className="flex items-center gap-1.5 text-muted-foreground text-xs">
                  <MessageCircle className="w-3 h-3" />
                  <span>{song.comments} {t.music.comments}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MusicGallery;
