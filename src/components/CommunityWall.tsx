import { useState, useEffect } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useAdmin } from "@/contexts/AdminContext";
import { supabase } from "@/lib/supabase";
import { Trash2 } from "lucide-react";

interface Comment {
  id: string;
  name: string;
  message: string;
}

const CommunityWall = () => {
  const { t } = useLanguage();
  const { isAdmin } = useAdmin();
  const [comments, setComments] = useState<Comment[]>([]);
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchComments();
  }, []);

  const fetchComments = async () => {
    const { data, error } = await supabase
      .from("comments")
      .select("id, name, message")
      .eq("is_deleted", false)
      .order("created_at", { ascending: false })
      .limit(50);

    if (!error && data) {
      setComments(data);
    }
    setLoading(false);
  };

  const handleDelete = async (id: string) => {
    const { error } = await supabase
      .from("comments")
      .update({ is_deleted: true, deleted_at: new Date().toISOString() })
      .eq("id", id);

    if (!error) {
      setComments((prev) => prev.filter((c) => c.id !== id));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !message.trim()) return;

    const { data, error } = await supabase
      .from("comments")
      .insert([{ name: name.trim(), message: message.trim() }])
      .select("id, name, message")
      .single();

    if (!error && data) {
      setComments([data, ...comments]);
      setMessage("");
    }
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

        {loading ? (
          <p className="text-center text-muted-foreground font-body text-sm">Loading...</p>
        ) : (
          <div className="space-y-4">
            {comments.map((c) => (
              <div
                key={c.id}
                className="p-4 rounded-xl border border-border/30 bg-card/20 backdrop-blur-sm flex items-start justify-between gap-3"
              >
                <div>
                  <span className="font-heading text-xs tracking-wider text-primary">{c.name}</span>
                  <p className="font-body text-sm text-foreground/70 mt-1">{c.message}</p>
                </div>
                {isAdmin && (
                  <button
                    onClick={() => handleDelete(c.id)}
                    className="text-muted-foreground hover:text-destructive transition-colors shrink-0 mt-1"
                    title="Delete comment"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default CommunityWall;
