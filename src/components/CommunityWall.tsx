import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";

const sampleComments = [
  { name: "Elīna", message: "Šī dziesma lika man raudāt. Skaisti. ✦" },
  { name: "Māris", message: "Mana dzeja beidzot skan! Paldies, Solara." },
  { name: "Anna", message: "The cosmic mood captured exactly what I felt." },
];

const CommunityWall = () => {
  const { t } = useLanguage();
  const [comments, setComments] = useState(sampleComments);
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !message.trim()) return;
    setComments([{ name, message }, ...comments]);
    setName("");
    setMessage("");
  };

  return (
    <section id="community" className="relative z-10 py-24 px-4">
      <div className="container mx-auto max-w-2xl">
        <h2 className="font-heading text-3xl md:text-4xl text-center text-foreground glow-text mb-12 tracking-wider">
          {t.community.heading}
        </h2>

        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 mb-12">
          <input
            type="text"
            placeholder={t.community.namePlaceholder}
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="bg-card/40 border border-border rounded-lg px-4 py-2.5 font-body text-foreground text-sm focus:border-primary focus:outline-none transition-colors sm:w-1/4"
          />
          <input
            type="text"
            placeholder={t.community.messagePlaceholder}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="bg-card/40 border border-border rounded-lg px-4 py-2.5 font-body text-foreground text-sm focus:border-primary focus:outline-none transition-colors flex-1"
          />
          <button
            type="submit"
            className="px-6 py-2.5 rounded-lg border border-primary text-primary font-body text-sm tracking-widest hover:bg-primary hover:text-primary-foreground transition-all duration-300"
          >
            {t.community.send}
          </button>
        </form>

        <div className="space-y-4">
          {comments.map((c, i) => (
            <div
              key={i}
              className="p-4 rounded-xl border border-border/30 bg-card/20 backdrop-blur-sm"
            >
              <span className="font-heading text-xs tracking-wider text-primary">{c.name}</span>
              <p className="font-body text-sm text-foreground/70 mt-1">{c.message}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CommunityWall;
