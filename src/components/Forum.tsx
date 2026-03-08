import { useState, useEffect } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/lib/supabase";
import { MessageSquare, Plus, ArrowLeft, Trash2, LogIn } from "lucide-react";

interface Topic {
  id: string;
  title: string;
  author_name: string;
  user_id: string;
  created_at: string;
  comment_count: number;
}

interface Comment {
  id: string;
  topic_id: string;
  message: string;
  author_name: string;
  user_id: string;
  created_at: string;
  avatar_url?: string;
}

const Forum = () => {
  const { lang } = useLanguage();
  const { user, isAdmin, displayName, avatarUrl, signInWithGoogle } = useAuth();

  const [topics, setTopics] = useState<Topic[]>([]);
  const [selectedTopic, setSelectedTopic] = useState<Topic | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);

  const [newTopicTitle, setNewTopicTitle] = useState("");
  const [showNewTopic, setShowNewTopic] = useState(false);
  const [newComment, setNewComment] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchTopics();
  }, []);

  const fetchTopics = async () => {
    setLoading(true);
    // Fetch topics with comment count
    const { data, error } = await supabase
      .from("topics")
      .select("id, title, author_name, user_id, created_at")
      .order("created_at", { ascending: false });

    if (!error && data) {
      // Get comment counts
      const topicIds = data.map((t) => t.id);
      const { data: countData } = await supabase
        .from("comments")
        .select("topic_id")
        .in("topic_id", topicIds.length > 0 ? topicIds : ["__none__"]);

      const counts: Record<string, number> = {};
      countData?.forEach((c) => {
        counts[c.topic_id] = (counts[c.topic_id] || 0) + 1;
      });

      setTopics(data.map((t) => ({ ...t, comment_count: counts[t.id] || 0 })));
    }
    setLoading(false);
  };

  const fetchComments = async (topicId: string) => {
    const { data } = await supabase
      .from("comments")
      .select("id, topic_id, message, author_name, user_id, created_at, avatar_url")
      .eq("topic_id", topicId)
      .order("created_at", { ascending: true });

    if (data) setComments(data);
  };

  const openTopic = (topic: Topic) => {
    setSelectedTopic(topic);
    fetchComments(topic.id);
  };

  const handleCreateTopic = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !newTopicTitle.trim()) return;
    setSaving(true);

    const { data, error } = await supabase
      .from("topics")
      .insert([{
        title: newTopicTitle.trim(),
        author_name: displayName || user.email || "User",
        user_id: user.id,
      }])
      .select()
      .single();

    if (!error && data) {
      setNewTopicTitle("");
      setShowNewTopic(false);
      fetchTopics();
    }
    setSaving(false);
  };

  const handlePostComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !selectedTopic || !newComment.trim()) return;
    setSaving(true);

    const { data, error } = await supabase
      .from("comments")
      .insert([{
        topic_id: selectedTopic.id,
        message: newComment.trim(),
        author_name: displayName || user.email || "User",
        user_id: user.id,
        avatar_url: avatarUrl || null,
      }])
      .select()
      .single();

    if (!error && data) {
      setComments((prev) => [...prev, data]);
      setNewComment("");
    }
    setSaving(false);
  };

  const handleDeleteTopic = async (topicId: string) => {
    // Delete all comments first, then topic
    await supabase.from("comments").delete().eq("topic_id", topicId);
    const { error } = await supabase.from("topics").delete().eq("id", topicId);
    if (!error) {
      setTopics((prev) => prev.filter((t) => t.id !== topicId));
      if (selectedTopic?.id === topicId) setSelectedTopic(null);
    }
  };

  const handleDeleteComment = async (commentId: string) => {
    const { error } = await supabase.from("comments").delete().eq("id", commentId);
    if (!error) {
      setComments((prev) => prev.filter((c) => c.id !== commentId));
    }
  };

  const canDelete = (ownerId: string) => isAdmin || user?.id === ownerId;

  const formatDate = (dateStr: string) => {
    const d = new Date(dateStr);
    return d.toLocaleDateString(lang === "lv" ? "lv-LV" : "en-US", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  // Thread view
  if (selectedTopic) {
    return (
      <section id="community" className="relative z-10 py-24 px-4">
        <div className="container mx-auto max-w-2xl">
          <button
            onClick={() => { setSelectedTopic(null); setComments([]); }}
            className="flex items-center gap-2 text-sm font-body text-muted-foreground hover:text-primary transition-colors mb-6"
          >
            <ArrowLeft className="w-4 h-4" />
            {lang === "lv" ? "Atpakaļ uz tēmām" : "Back to topics"}
          </button>

          <div className="p-5 rounded-2xl border border-border/30 bg-card/20 backdrop-blur-sm mb-6">
            <h2 className="font-heading text-xl md:text-2xl text-foreground tracking-wider">
              {selectedTopic.title}
            </h2>
            <div className="flex items-center gap-3 mt-2">
              <span className="text-xs font-body text-primary tracking-wider">{selectedTopic.author_name}</span>
              <span className="text-xs font-body text-muted-foreground">{formatDate(selectedTopic.created_at)}</span>
            </div>
            {canDelete(selectedTopic.user_id) && (
              <button
                onClick={() => handleDeleteTopic(selectedTopic.id)}
                className="mt-3 flex items-center gap-1.5 text-xs font-body text-muted-foreground hover:text-destructive transition-colors"
              >
                <Trash2 className="w-3.5 h-3.5" />
                {lang === "lv" ? "Dzēst tēmu" : "Delete topic"}
              </button>
            )}
          </div>

          {/* Comments */}
          <div className="space-y-3 mb-8">
            {comments.map((c) => (
              <div key={c.id} className="p-4 rounded-xl border border-border/20 bg-card/10 backdrop-blur-sm flex items-start gap-3">
                {c.avatar_url ? (
                  <img src={c.avatar_url} alt="" className="w-8 h-8 rounded-full shrink-0 mt-0.5" />
                ) : (
                  <div className="w-8 h-8 rounded-full bg-secondary shrink-0 mt-0.5 flex items-center justify-center text-xs font-heading text-primary">
                    {c.author_name?.[0]?.toUpperCase() || "?"}
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="font-heading text-xs tracking-wider text-primary">{c.author_name}</span>
                    <span className="text-[10px] font-body text-muted-foreground">{formatDate(c.created_at)}</span>
                  </div>
                  <p className="font-body text-sm text-foreground/70 mt-1">{c.message}</p>
                </div>
                {canDelete(c.user_id) && (
                  <button
                    onClick={() => handleDeleteComment(c.id)}
                    className="text-muted-foreground hover:text-destructive transition-colors shrink-0 mt-1"
                    title={lang === "lv" ? "Dzēst" : "Delete"}
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            ))}
            {comments.length === 0 && (
              <p className="text-center text-muted-foreground font-body text-sm py-6">
                {lang === "lv" ? "Vēl nav komentāru." : "No comments yet."}
              </p>
            )}
          </div>

          {/* Post comment */}
          {user ? (
            <form onSubmit={handlePostComment} className="flex gap-3">
              <input
                type="text"
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder={lang === "lv" ? "Raksti komentāru..." : "Write a comment..."}
                className="flex-1 bg-card/40 border border-border rounded-lg px-4 py-2.5 font-body text-foreground text-sm focus:border-primary focus:outline-none transition-colors"
              />
              <button
                type="submit"
                disabled={saving || !newComment.trim()}
                className="px-5 py-2.5 rounded-lg border border-primary text-primary font-body text-sm tracking-widest hover:bg-primary hover:text-primary-foreground transition-all duration-300 disabled:opacity-50"
              >
                {lang === "lv" ? "Sūtīt" : "Send"}
              </button>
            </form>
          ) : (
            <button
              onClick={signInWithGoogle}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-lg border border-border text-muted-foreground font-body text-sm hover:border-primary hover:text-primary transition-all"
            >
              <LogIn className="w-4 h-4" />
              {lang === "lv" ? "Pierakstieties ar Google, lai komentētu" : "Sign in with Google to comment"}
            </button>
          )}
        </div>
      </section>
    );
  }

  // Topic list view
  return (
    <section id="community" className="relative z-10 py-24 px-4">
      <div className="container mx-auto max-w-2xl">
        <h2 className="font-heading text-3xl md:text-4xl text-center text-foreground glow-text mb-12 tracking-wider">
          {lang === "lv" ? "Kopiena" : "Community"}
        </h2>

        {/* Create topic */}
        {user ? (
          showNewTopic ? (
            <form onSubmit={handleCreateTopic} className="mb-8 p-5 rounded-2xl border border-border/30 bg-card/20 backdrop-blur-sm space-y-3">
              <input
                type="text"
                value={newTopicTitle}
                onChange={(e) => setNewTopicTitle(e.target.value)}
                placeholder={lang === "lv" ? "Tēmas nosaukums..." : "Topic title..."}
                autoFocus
                className="w-full bg-card/40 border border-border rounded-lg px-4 py-2.5 font-body text-foreground text-sm focus:border-primary focus:outline-none transition-colors"
              />
              <div className="flex gap-3">
                <button
                  type="submit"
                  disabled={saving || !newTopicTitle.trim()}
                  className="px-5 py-2 rounded-lg bg-primary text-primary-foreground font-body text-sm tracking-widest hover:bg-primary/80 transition-all disabled:opacity-50"
                >
                  {saving ? "..." : lang === "lv" ? "Izveidot" : "Create"}
                </button>
                <button
                  type="button"
                  onClick={() => { setShowNewTopic(false); setNewTopicTitle(""); }}
                  className="px-5 py-2 rounded-lg border border-border text-muted-foreground font-body text-sm hover:text-foreground transition-colors"
                >
                  {lang === "lv" ? "Atcelt" : "Cancel"}
                </button>
              </div>
            </form>
          ) : (
            <button
              onClick={() => setShowNewTopic(true)}
              className="mb-8 w-full flex items-center justify-center gap-2 py-3 rounded-xl border border-dashed border-border/50 text-muted-foreground font-body text-sm hover:border-primary hover:text-primary transition-all"
            >
              <Plus className="w-4 h-4" />
              {lang === "lv" ? "Izveidot jaunu tēmu" : "Create new topic"}
            </button>
          )
        ) : (
          <button
            onClick={signInWithGoogle}
            className="mb-8 w-full flex items-center justify-center gap-2 py-3 rounded-xl border border-dashed border-border/50 text-muted-foreground font-body text-sm hover:border-primary hover:text-primary transition-all"
          >
            <LogIn className="w-4 h-4" />
            {lang === "lv" ? "Pierakstieties ar Google, lai izveidotu tēmu" : "Sign in with Google to create a topic"}
          </button>
        )}

        {/* Topic list */}
        {loading ? (
          <p className="text-center text-muted-foreground font-body text-sm">Loading...</p>
        ) : topics.length === 0 ? (
          <p className="text-center text-muted-foreground font-body text-sm py-8">
            {lang === "lv" ? "Vēl nav tēmu. Esi pirmais!" : "No topics yet. Be the first!"}
          </p>
        ) : (
          <div className="space-y-3">
            {topics.map((topic) => (
              <div
                key={topic.id}
                onClick={() => openTopic(topic)}
                className="p-4 rounded-xl border border-border/30 bg-card/20 backdrop-blur-sm cursor-pointer hover:border-primary/30 hover:bg-card/30 transition-all duration-300 group"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1 min-w-0">
                    <h3 className="font-heading text-sm tracking-wider text-foreground group-hover:text-primary transition-colors truncate">
                      {topic.title}
                    </h3>
                    <div className="flex items-center gap-3 mt-1.5">
                      <span className="text-xs font-body text-primary/70 tracking-wider">{topic.author_name}</span>
                      <span className="text-[10px] font-body text-muted-foreground">{formatDate(topic.created_at)}</span>
                      <span className="flex items-center gap-1 text-[10px] font-body text-muted-foreground">
                        <MessageSquare className="w-3 h-3" />
                        {topic.comment_count}
                      </span>
                    </div>
                  </div>
                  {canDelete(topic.user_id) && (
                    <button
                      onClick={(e) => { e.stopPropagation(); handleDeleteTopic(topic.id); }}
                      className="text-muted-foreground hover:text-destructive transition-colors shrink-0 mt-1 opacity-0 group-hover:opacity-100"
                      title={lang === "lv" ? "Dzēst" : "Delete"}
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Forum;
