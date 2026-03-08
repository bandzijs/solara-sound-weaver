import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAdmin } from "@/contexts/AdminContext";
import { supabase } from "@/lib/supabase";
import { Trash2, Plus, ArrowLeft, Music, MessageCircle, Pencil } from "lucide-react";

interface SongRow {
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

interface CommentRow {
  id: string;
  name: string;
  message: string;
  created_at: string;
}

const STYLE_OPTIONS = [
  { value: "dance", label: "Deju mūzika" },
  { value: "rock-ballad", label: "Rock balāde" },
  { value: "love-ballad", label: "Mīlestības balāde" },
  { value: "club-remix", label: "Club Remix" },
  { value: "folk-rock", label: "Folk Rock" },
];

const BADGE_OPTIONS_LV = ["Oriģināla dziesma", "Pārstrādāta dzeja"];
const BADGE_OPTIONS_EN = ["Original", "Adapted poetry"];

const emptyForm = {
  title_lv: "",
  title_en: "",
  youtube_id: "",
  style: "dance",
  badge_lv: "Oriģināla dziesma",
  badge_en: "Original",
  poem_lv: "",
  poem_en: "",
  author_note_lv: "",
  author_note_en: "",
};

const AdminPanel = () => {
  const { isAdmin, loginAdmin } = useAdmin();
  const navigate = useNavigate();
  const [tab, setTab] = useState<"songs" | "comments">("songs");
  const [songs, setSongs] = useState<SongRow[]>([]);
  const [comments, setComments] = useState<CommentRow[]>([]);
  const [form, setForm] = useState(emptyForm);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");

  useEffect(() => {
    if (isAdmin) {
      fetchSongs();
      fetchComments();
    }
  }, [isAdmin]);

  const fetchSongs = async () => {
    const { data } = await supabase
      .from("songs")
      .select("*")
      .order("created_at", { ascending: false });
    if (data) setSongs(data);
  };

  const fetchComments = async () => {
    const { data } = await supabase
      .from("comments")
      .select("id, name, message, created_at")
      .eq("is_deleted", false)
      .order("created_at", { ascending: false });
    if (data) setComments(data);
  };

  const handleSaveSong = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    const payload = {
      title_lv: form.title_lv,
      title_en: form.title_en,
      youtube_id: form.youtube_id,
      style: form.style,
      badge_lv: form.badge_lv,
      badge_en: form.badge_en,
      poem_lv: form.poem_lv,
      poem_en: form.poem_en,
      author_note_lv: form.author_note_lv || null,
      author_note_en: form.author_note_en || null,
    };
    console.log("[AdminPanel] Saving song:", payload);
    const { data, error } = await supabase.from("songs").insert([payload]).select();
    if (error) {
      console.error("[AdminPanel] Save error:", error);
      alert(`Error saving song: ${error.message}`);
    } else {
      console.log("[AdminPanel] Song saved successfully:", data);
      setForm(emptyForm);
      setShowForm(false);
      fetchSongs();
    }
    setSaving(false);
  };

  const handleDeleteSong = async (id: string) => {
    console.log("[AdminPanel] Deleting song:", id);
    const { error, count } = await supabase.from("songs").delete().eq("id", id);
    if (error) {
      console.error("[AdminPanel] Delete error:", error);
      alert(`Error deleting song: ${error.message}\n\nThis is likely an RLS policy issue. Add this policy in Supabase SQL Editor:\n\nCREATE POLICY "Anyone can delete songs" ON public.songs FOR DELETE USING (true);`);
    } else {
      console.log("[AdminPanel] Song deleted successfully, count:", count);
      setSongs((prev) => prev.filter((s) => s.id !== id));
    }
  };

  const handleDeleteComment = async (id: string) => {
    const { error } = await supabase
      .from("comments")
      .update({ is_deleted: true, deleted_at: new Date().toISOString() })
      .eq("id", id);
    if (!error) setComments((prev) => prev.filter((c) => c.id !== id));
  };

  const handleAdminLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (loginAdmin(password)) {
      setPassword("");
      setLoginError("");
    } else {
      setLoginError("Wrong password");
    }
  };

  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-background text-foreground flex items-center justify-center">
        <form onSubmit={handleAdminLogin} className="w-full max-w-sm p-8 rounded-2xl border border-border/50 bg-card/30 backdrop-blur-sm space-y-4 text-center">
          <h1 className="font-heading text-xl text-primary tracking-wider">Solara Admin</h1>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter admin password"
            autoFocus
            className="w-full bg-card/40 border border-border rounded-lg px-4 py-2.5 font-body text-foreground text-sm focus:border-primary focus:outline-none transition-colors"
          />
          {loginError && <p className="text-destructive text-xs font-body">{loginError}</p>}
          <button type="submit" className="w-full px-6 py-2.5 rounded-lg bg-primary text-primary-foreground font-body text-sm tracking-widest hover:bg-primary/80 transition-all">
            Login
          </button>
          <button type="button" onClick={() => navigate("/")} className="text-xs text-muted-foreground hover:text-foreground font-body transition-colors">
            ← Back to site
          </button>
        </form>
      </div>
    );
  }

  const inputClass =
    "w-full bg-card/40 border border-border rounded-lg px-4 py-2.5 font-body text-foreground text-sm focus:border-primary focus:outline-none transition-colors";

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="border-b border-border/50 bg-background/80 backdrop-blur-md sticky top-0 z-40">
        <div className="container mx-auto flex items-center justify-between py-3 px-4">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate("/")}
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <h1 className="font-heading text-lg text-primary tracking-wider">Solara Admin</h1>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setTab("songs")}
              className={`flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-body tracking-widest border transition-all ${
                tab === "songs"
                  ? "border-primary text-primary glow-box"
                  : "border-border text-muted-foreground hover:border-primary/50"
              }`}
            >
              <Music className="w-3.5 h-3.5" /> Songs
            </button>
            <button
              onClick={() => setTab("comments")}
              className={`flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-body tracking-widest border transition-all ${
                tab === "comments"
                  ? "border-primary text-primary glow-box"
                  : "border-border text-muted-foreground hover:border-primary/50"
              }`}
            >
              <MessageCircle className="w-3.5 h-3.5" /> Comments
            </button>
          </div>
        </div>
      </header>

      <main className="container mx-auto max-w-4xl px-4 py-8">
        {tab === "songs" && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-heading text-xl text-foreground tracking-wider">
                Songs ({songs.length})
              </h2>
              <button
                onClick={() => setShowForm(!showForm)}
                className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-primary text-primary-foreground font-body text-sm tracking-widest hover:bg-primary/80 transition-all"
              >
                <Plus className="w-4 h-4" /> Add Song
              </button>
            </div>

            {showForm && (
              <form
                onSubmit={handleSaveSong}
                className="mb-8 p-6 rounded-2xl border border-border/50 bg-card/30 backdrop-blur-sm space-y-4"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-body text-muted-foreground mb-1 tracking-wider">Title LV</label>
                    <input required value={form.title_lv} onChange={(e) => setForm({ ...form, title_lv: e.target.value })} className={inputClass} />
                  </div>
                  <div>
                    <label className="block text-xs font-body text-muted-foreground mb-1 tracking-wider">Title EN</label>
                    <input required value={form.title_en} onChange={(e) => setForm({ ...form, title_en: e.target.value })} className={inputClass} />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-body text-muted-foreground mb-1 tracking-wider">YouTube ID</label>
                    <input required value={form.youtube_id} onChange={(e) => setForm({ ...form, youtube_id: e.target.value })} placeholder="e.g. IWEwra0b4p4" className={inputClass} />
                  </div>
                  <div>
                    <label className="block text-xs font-body text-muted-foreground mb-1 tracking-wider">Style</label>
                    <select value={form.style} onChange={(e) => setForm({ ...form, style: e.target.value })} className={inputClass}>
                      {STYLE_OPTIONS.map((s) => (<option key={s.value} value={s.value}>{s.label}</option>))}
                    </select>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-xs font-body text-muted-foreground mb-1 tracking-wider">Badge LV</label>
                      <select value={form.badge_lv} onChange={(e) => setForm({ ...form, badge_lv: e.target.value })} className={inputClass}>
                        {BADGE_OPTIONS_LV.map((b) => (<option key={b} value={b}>{b}</option>))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-body text-muted-foreground mb-1 tracking-wider">Badge EN</label>
                      <select value={form.badge_en} onChange={(e) => setForm({ ...form, badge_en: e.target.value })} className={inputClass}>
                        {BADGE_OPTIONS_EN.map((b) => (<option key={b} value={b}>{b}</option>))}
                      </select>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-body text-muted-foreground mb-1 tracking-wider">Poem LV</label>
                    <textarea required rows={4} value={form.poem_lv} onChange={(e) => setForm({ ...form, poem_lv: e.target.value })} className={inputClass + " resize-y"} />
                  </div>
                  <div>
                    <label className="block text-xs font-body text-muted-foreground mb-1 tracking-wider">Poem EN</label>
                    <textarea required rows={4} value={form.poem_en} onChange={(e) => setForm({ ...form, poem_en: e.target.value })} className={inputClass + " resize-y"} />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-body text-muted-foreground mb-1 tracking-wider">Author Note LV (optional)</label>
                    <input value={form.author_note_lv} onChange={(e) => setForm({ ...form, author_note_lv: e.target.value })} className={inputClass} />
                  </div>
                  <div>
                    <label className="block text-xs font-body text-muted-foreground mb-1 tracking-wider">Author Note EN (optional)</label>
                    <input value={form.author_note_en} onChange={(e) => setForm({ ...form, author_note_en: e.target.value })} className={inputClass} />
                  </div>
                </div>

                <div className="flex gap-3 pt-2">
                  <button type="submit" disabled={saving} className="px-6 py-2.5 rounded-lg bg-primary text-primary-foreground font-body text-sm tracking-widest hover:bg-primary/80 transition-all disabled:opacity-50">
                    {saving ? "Saving..." : "Save Song"}
                  </button>
                  <button type="button" onClick={() => setShowForm(false)} className="px-6 py-2.5 rounded-lg border border-border text-muted-foreground font-body text-sm hover:text-foreground transition-colors">
                    Cancel
                  </button>
                </div>
              </form>
            )}

            <div className="space-y-3">
              {songs.map((song) => (
                <div key={song.id} className="flex items-center justify-between p-4 rounded-xl border border-border/30 bg-card/20 backdrop-blur-sm">
                  <div className="flex-1 min-w-0">
                    <h3 className="font-heading text-sm tracking-wider text-foreground truncate">{song.title_lv}</h3>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-[10px] font-body tracking-widest text-primary/60 border border-primary/20 rounded-full px-2 py-0.5">
                        {STYLE_OPTIONS.find((s) => s.value === song.style)?.label}
                      </span>
                      <span className="text-[10px] font-body tracking-widest text-muted-foreground">{song.badge_lv}</span>
                    </div>
                  </div>
                  <button onClick={() => handleDeleteSong(song.id)} className="text-muted-foreground hover:text-destructive transition-colors ml-3">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
              {songs.length === 0 && <p className="text-center text-muted-foreground font-body text-sm py-8">No songs yet</p>}
            </div>
          </div>
        )}

        {tab === "comments" && (
          <div>
            <h2 className="font-heading text-xl text-foreground tracking-wider mb-6">Comments ({comments.length})</h2>
            <div className="space-y-3">
              {comments.map((c) => (
                <div key={c.id} className="flex items-start justify-between p-4 rounded-xl border border-border/30 bg-card/20 backdrop-blur-sm gap-3">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="font-heading text-xs tracking-wider text-primary">{c.name}</span>
                      <span className="text-[10px] text-muted-foreground font-body">{new Date(c.created_at).toLocaleDateString()}</span>
                    </div>
                    <p className="font-body text-sm text-foreground/70 mt-1">{c.message}</p>
                  </div>
                  <button onClick={() => handleDeleteComment(c.id)} className="text-muted-foreground hover:text-destructive transition-colors shrink-0 mt-1">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
              {comments.length === 0 && <p className="text-center text-muted-foreground font-body text-sm py-8">No comments</p>}
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default AdminPanel;
