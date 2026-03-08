import { useState, useEffect } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/lib/supabase";
import { MessageSquare, Plus, ArrowLeft, Trash2, Mail } from "lucide-react";
import NicknameModal from "@/components/NicknameModal";

interface Topic {
  id: string;
  title: string;
  author_name: string;
  author_avatar: string | null;
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

const EmailOtpForm = ({ context }: { context: "topic" | "reply" }) => {
  const { lang } = useLanguage();
  const { signInWithOtp, verifyOtp } = useAuth();
  const [email, setEmail] = useState("");
  const [otpCode, setOtpCode] = useState("");
  const [step, setStep] = useState<"email" | "code">("email");
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");

  const handleSendCode = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setSending(true);
    setError("");

    const { error: otpError } = await signInWithOtp(email.trim());

    if (otpError) {
      setError(otpError.message);
    } else {
      setStep("code");
    }
    setSending(false);
  };

  const handleVerifyCode = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!otpCode.trim() || otpCode.length < 6 || otpCode.length > 8) return;
    setSending(true);
    setError("");

    const { error: verifyError } = await verifyOtp(email.trim(), otpCode.trim());

    if (verifyError) {
      setError(verifyError.message);
    }
    setSending(false);
  };

  if (step === "code") {
    return (
      <div className="w-full space-y-3">
        <div className="py-4 px-5 rounded-xl border border-primary/30 bg-primary/5 text-center">
          <Mail className="w-5 h-5 text-primary mx-auto mb-2" />
          <p className="font-body text-sm text-primary tracking-wide">
            {lang === "lv" ? "Kods nosūtīts!" : "Code sent!"}
          </p>
          <p className="font-body text-xs text-muted-foreground mt-1">
            {lang === "lv"
              ? `Pārbaudiet ${email} un ievadiet 6-ciparu kodu.`
              : `Check ${email} and enter the 6-digit code.`}
          </p>
        </div>
        <form onSubmit={handleVerifyCode} className="flex gap-2">
          <input
            type="text"
            inputMode="numeric"
            pattern="[0-9]*"
            maxLength={8}
            required
            value={otpCode}
            onChange={(e) => setOtpCode(e.target.value.replace(/\D/g, "").slice(0, 8))}
            placeholder={lang === "lv" ? "Kods" : "Code"}
            autoFocus
            className="flex-1 bg-card/40 border border-border rounded-lg px-4 py-2.5 font-body text-foreground text-sm text-center tracking-[0.3em] focus:border-primary focus:outline-none transition-colors"
          />
          <button
            type="submit"
            disabled={sending || otpCode.length < 6 || otpCode.length > 8}
            className="px-5 py-2.5 rounded-lg border border-primary text-primary font-body text-sm tracking-widest hover:bg-primary hover:text-primary-foreground transition-all duration-300 disabled:opacity-50 whitespace-nowrap"
          >
            {sending ? "..." : lang === "lv" ? "Apstiprināt" : "Verify"}
          </button>
        </form>
        <button
          type="button"
          onClick={() => { setStep("email"); setOtpCode(""); setError(""); }}
          className="text-xs font-body text-muted-foreground hover:text-primary transition-colors"
        >
          {lang === "lv" ? "← Mainīt e-pastu" : "← Change email"}
        </button>
        {error && <p className="font-body text-xs text-destructive">{error}</p>}
      </div>
    );
  }

  const label =
    context === "topic"
      ? lang === "lv"
        ? "Ievadiet e-pastu, lai izveidotu tēmu"
        : "Enter email to create a topic"
      : lang === "lv"
        ? "Ievadiet e-pastu, lai atbildētu"
        : "Enter email to reply";

  return (
    <form onSubmit={handleSendCode} className="w-full space-y-2">
      <p className="font-body text-xs text-muted-foreground tracking-wide">{label}</p>
      <div className="flex gap-2">
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.com"
          className="flex-1 bg-card/40 border border-border rounded-lg px-4 py-2.5 font-body text-foreground text-sm focus:border-primary focus:outline-none transition-colors"
        />
        <button
          type="submit"
          disabled={sending || !email.trim()}
          className="px-5 py-2.5 rounded-lg border border-primary text-primary font-body text-sm tracking-widest hover:bg-primary hover:text-primary-foreground transition-all duration-300 disabled:opacity-50 whitespace-nowrap"
        >
          {sending ? "..." : lang === "lv" ? "Nosūtīt kodu" : "Send code"}
        </button>
      </div>
      {error && <p className="font-body text-xs text-destructive">{error}</p>}
    </form>
  );
};

const Forum = () => {
  const { lang } = useLanguage();
  const { user, isAdmin, displayName, avatarUrl, needsNickname, setNickname, loading: authLoading } = useAuth();

  const [topics, setTopics] = useState<Topic[]>([]);
  const [selectedTopic, setSelectedTopic] = useState<Topic | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);

  const [newTopicTitle, setNewTopicTitle] = useState("");
  const [newTopicMessage, setNewTopicMessage] = useState("");
  const [showNewTopic, setShowNewTopic] = useState(false);
  const [newComment, setNewComment] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchTopics();
  }, []);

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(() => {
      fetchTopics();
    });
    return () => subscription.unsubscribe();
  }, []);

  async function fetchTopics() {
    setLoading(true);
    const { data, error } = await supabase
      .from("topics")
      .select("id, title, author_name, author_avatar, user_id, created_at")
      .order("created_at", { ascending: false });

    if (!error && data) {
      const topicIds = data.map((t) => t.id);
      const counts: Record<string, number> = {};

      if (topicIds.length > 0) {
        const { data: countData } = await supabase
          .from("comments")
          .select("topic_id")
          .in("topic_id", topicIds);

        countData?.forEach((c) => {
          counts[c.topic_id] = (counts[c.topic_id] || 0) + 1;
        });
      }

      setTopics(data.map((t) => ({ ...t, comment_count: counts[t.id] || 0 })));
    }
    setLoading(false);
  }

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
    if (!user || !newTopicTitle.trim() || !newTopicMessage.trim()) return;
    setSaving(true);

    const { data, error } = await supabase
      .from("topics")
      .insert([{
        title: newTopicTitle.trim(),
        author_name: displayName,
        author_avatar: avatarUrl || null,
        user_id: user.id,
      }])
      .select()
      .single();

    if (!error && data) {
      await supabase.from("comments").insert([{
        topic_id: data.id,
        message: newTopicMessage.trim(),
        author_name: displayName || user.email || "User",
        user_id: user.id,
        avatar_url: avatarUrl || null,
      }]);

      setNewTopicTitle("");
      setNewTopicMessage("");
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

  const AvatarBubble = ({ url, name }: { url?: string | null; name: string }) => (
    url ? (
      <img src={url} alt="" className="w-8 h-8 rounded-full shrink-0" />
    ) : (
      <div className="w-8 h-8 rounded-full bg-secondary shrink-0 flex items-center justify-center text-xs font-heading text-primary">
        {name?.[0]?.toUpperCase() || "?"}
      </div>
    )
  );

  // ── Thread view ──
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
              <AvatarBubble url={selectedTopic.author_avatar} name={selectedTopic.author_name} />
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

          <div className="space-y-3 mb-8">
            {comments.map((c) => (
              <div key={c.id} className="p-4 rounded-xl border border-border/20 bg-card/10 backdrop-blur-sm flex items-start gap-3">
                <AvatarBubble url={c.avatar_url} name={c.author_name} />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="font-heading text-xs tracking-wider text-primary">{c.author_name}</span>
                    <span className="text-[10px] font-body text-muted-foreground">{formatDate(c.created_at)}</span>
                  </div>
                  <p className="font-body text-sm text-foreground/70 mt-1 whitespace-pre-wrap">{c.message}</p>
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

          {user ? (
            <form onSubmit={handlePostComment} className="flex gap-3">
              <input
                type="text"
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder={lang === "lv" ? "Raksti atbildi..." : "Write a reply..."}
                className="flex-1 bg-card/40 border border-border rounded-lg px-4 py-2.5 font-body text-foreground text-sm focus:border-primary focus:outline-none transition-colors"
              />
              <button
                type="submit"
                disabled={saving || !newComment.trim()}
                className="px-5 py-2.5 rounded-lg border border-primary text-primary font-body text-sm tracking-widest hover:bg-primary hover:text-primary-foreground transition-all duration-300 disabled:opacity-50"
              >
                {lang === "lv" ? "Atbildēt" : "Reply"}
              </button>
            </form>
          ) : (
            <EmailOtpForm context="reply" />
          )}
        </div>
      </section>
    );
  }

  // ── Topic list view ──
  return (
    <section id="community" className="relative z-10 py-24 px-4">
      <NicknameModal open={needsNickname} onSaved={setNickname} />
      <div className="container mx-auto max-w-2xl">
        <h2 className="font-heading text-3xl md:text-4xl text-center text-foreground glow-text mb-12 tracking-wider">
          {lang === "lv" ? "Kopiena" : "Community"}
        </h2>

        {/* Create topic */}
        {user ? (
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-3">
              <AvatarBubble url={avatarUrl} name={displayName || user.email || "User"} />
              <span className="text-xs font-body text-muted-foreground tracking-wide truncate">
                {displayName || user.email}
              </span>
            </div>

            {showNewTopic ? (
              <form onSubmit={handleCreateTopic} className="p-5 rounded-2xl border border-border/30 bg-card/20 backdrop-blur-sm space-y-3">
                <input
                  type="text"
                  value={newTopicTitle}
                  onChange={(e) => setNewTopicTitle(e.target.value)}
                  placeholder={lang === "lv" ? "Tēmas nosaukums..." : "Topic title..."}
                  autoFocus
                  className="w-full bg-card/40 border border-border rounded-lg px-4 py-2.5 font-body text-foreground text-sm focus:border-primary focus:outline-none transition-colors"
                />
                <textarea
                  value={newTopicMessage}
                  onChange={(e) => setNewTopicMessage(e.target.value)}
                  placeholder={lang === "lv" ? "Pirmā ziņa..." : "First message..."}
                  rows={3}
                  className="w-full bg-card/40 border border-border rounded-lg px-4 py-2.5 font-body text-foreground text-sm focus:border-primary focus:outline-none transition-colors resize-none"
                />
                <div className="flex gap-3">
                  <button
                    type="submit"
                    disabled={saving || !newTopicTitle.trim() || !newTopicMessage.trim()}
                    className="px-5 py-2 rounded-lg bg-primary text-primary-foreground font-body text-sm tracking-widest hover:bg-primary/80 transition-all disabled:opacity-50"
                  >
                    {saving ? "..." : lang === "lv" ? "Izveidot" : "Create"}
                  </button>
                  <button
                    type="button"
                    onClick={() => { setShowNewTopic(false); setNewTopicTitle(""); setNewTopicMessage(""); }}
                    className="px-5 py-2 rounded-lg border border-border text-muted-foreground font-body text-sm hover:text-foreground transition-colors"
                  >
                    {lang === "lv" ? "Atcelt" : "Cancel"}
                  </button>
                </div>
              </form>
            ) : (
              <button
                onClick={() => setShowNewTopic(true)}
                className="w-full flex items-center justify-center gap-2 py-3 rounded-xl border border-dashed border-border/50 text-muted-foreground font-body text-sm hover:border-primary hover:text-primary transition-all"
              >
                <Plus className="w-4 h-4" />
                {lang === "lv" ? "Izveidot jaunu tēmu" : "Create new topic"}
              </button>
            )}
          </div>
        ) : (
          <div className="mb-8">
            <EmailOtpForm context="topic" />
          </div>
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
                <div className="flex items-start gap-3">
                  <AvatarBubble url={topic.author_avatar} name={topic.author_name} />
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
