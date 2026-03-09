import { useState, useEffect } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/lib/supabase";
import { MessageSquare, Plus, ArrowLeft, Trash2, Mail, Heart, Search } from "lucide-react";
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
  like_count?: number;
  user_has_liked?: boolean;
}

const EmailOtpForm = ({ context }: { context: "topic" | "reply" }) => {
  const { lang } = useLanguage();
  const { signInWithOtp, verifyOtp } = useAuth();

  const [email, setEmail] = useState("");
  const [otpCode, setOtpCode] = useState("");
  const [step, setStep] = useState<"email" | "code">("email");
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState<string>("");

  const handleSendCode = async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedEmail = email.trim();
    if (!trimmedEmail) return;

    setSending(true);
    setError("");
    setNotice("");

    const { error: otpError } = await signInWithOtp(trimmedEmail);

    if (otpError) {
      const errAny = otpError as any;
      const code = errAny?.code as string | undefined;
      const msg = (otpError.message ?? "").toLowerCase();

      const isRateLimit =
        code === "over_email_send_rate_limit" ||
        otpError.message?.includes("429") ||
        msg.includes("rate") ||
        errAny?.status === 429;

      // Important: do NOT auto-switch to code step when sending was blocked by rate limit.
      // If user already has a valid code, they can use the "Man jau ir kods" action.
      if (isRateLimit) {
        setNotice(
          lang === "lv"
            ? "E-pasta sūtīšana šobrīd ir limitēta; pagaidi un mēģini vēlāk, vai spied “Man jau ir kods”, ja to jau saņēmi."
            : "Email sending is rate-limited right now; wait and try later, or press “I already have a code” if you already received one.",
        );
      } else {
        setError(otpError.message);
      }
    } else {
      setStep("code");
    }

    setSending(false);
  };

  const handleVerifyCode = async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedEmail = email.trim();
    if (!otpCode.trim() || otpCode.length < 6 || otpCode.length > 8 || !trimmedEmail) return;

    setSending(true);
    setError("");

    const { error: verifyError } = await verifyOtp(trimmedEmail, otpCode.trim());

    if (verifyError) {
      const errAny = verifyError as any;
      const code = errAny?.code as string | undefined;
      const msg = (verifyError.message ?? "").toLowerCase();

      const isRateLimit =
        verifyError.message?.includes("429") || msg.includes("rate") || errAny?.status === 429;

      const isExpiredOrInvalid =
        code === "otp_expired" || msg.includes("expired") || msg.includes("invalid");

      setError(
        isRateLimit
          ? lang === "lv"
            ? "Neizdevās apstiprināt kodu. Pamēģini vēlāk."
            : "Couldn't verify the code. Please try again later."
          : isExpiredOrInvalid
            ? lang === "lv"
              ? "Šis kods vairs nav derīgs (vai ir novecojis) — pieprasi jaunu kodu un ievadi tieši pēdējo saņemto."
              : "This code is no longer valid (or expired) — request a new one and enter the latest code you received."
            : verifyError.message,
      );
    }

    setSending(false);
  };

  if (step === "code") {
    return (
      <div className="w-full space-y-3">
        <div className="py-4 px-5 rounded-xl border border-primary/30 bg-primary/5 text-center">
          <Mail className="w-5 h-5 text-primary mx-auto mb-2" />
          <p className="font-body text-sm text-primary tracking-wide">
            {lang === "lv" ? "Ievadi kodu" : "Enter the code"}
          </p>
          <p className="font-body text-xs text-muted-foreground mt-1">
            {lang === "lv" ? `Pārbaudi ${email} un ievadi kodu.` : `Check ${email} and enter the code.`}
          </p>
          {notice && <p className="font-body text-xs text-muted-foreground mt-2">{notice}</p>}
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
          onClick={() => {
            setStep("email");
            setOtpCode("");
            setError("");
            setNotice("");
          }}
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
      {notice && <p className="font-body text-xs text-muted-foreground">{notice}</p>}
      <button
        type="button"
        onClick={() => {
          if (!email.trim()) return;
          setStep("code");
          setError("");
        }}
        className="text-xs font-body text-muted-foreground hover:text-primary transition-colors"
      >
        {lang === "lv" ? "Man jau ir kods" : "I already have a code"}
      </button>
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
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetchTopics();
  }, []);

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(() => {
      fetchTopics();
    });
    return () => subscription.unsubscribe();
  }, []);

  // Real-time subscriptions for topics
  useEffect(() => {
    const topicsChannel = supabase
      .channel('topics-changes')
      .on('postgres_changes', { 
        event: '*', 
        schema: 'public', 
        table: 'topics' 
      }, () => {
        fetchTopics();
      })
      .subscribe();

    return () => {
      supabase.removeChannel(topicsChannel);
    };
  }, []);

  // Real-time subscriptions for comments when viewing a topic
  useEffect(() => {
    if (!selectedTopic) return;

    const commentsChannel = supabase
      .channel(`comments-${selectedTopic.id}`)
      .on('postgres_changes', {
        event: '*',
        schema: 'public',
        table: 'comments',
        filter: `topic_id=eq.${selectedTopic.id}`
      }, () => {
        fetchComments(selectedTopic.id);
      })
      .subscribe();

    return () => {
      supabase.removeChannel(commentsChannel);
    };
  }, [selectedTopic]);

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

    if (!data) {
      setComments([]);
      return;
    }

    // Try to fetch likes (table might not exist yet)
    try {
      if (user) {
        const commentIds = data.map(c => c.id);
        const { data: likes, error } = await supabase
          .from("comment_likes")
          .select("comment_id, user_id")
          .in("comment_id", commentIds);

        if (!error && likes) {
          const likeCounts: Record<string, number> = {};
          const userLikes = new Set<string>();

          likes.forEach(like => {
            likeCounts[like.comment_id] = (likeCounts[like.comment_id] || 0) + 1;
            if (like.user_id === user.id) {
              userLikes.add(like.comment_id);
            }
          });

          const commentsWithLikes = data.map(c => ({
            ...c,
            like_count: likeCounts[c.id] || 0,
            user_has_liked: userLikes.has(c.id)
          }));

          setComments(commentsWithLikes);
          return;
        }
      }
    } catch (error) {
      console.log("Like system not ready yet - table might not exist");
    }

    // Fallback if likes table doesn't exist or user not logged in
    setComments(data.map(c => ({ ...c, like_count: 0, user_has_liked: false })));
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
        title: newTopicTitle.trim().slice(0, 100),
        author_name: displayName,
        author_avatar: avatarUrl || null,
        user_id: user.id,
      }])
      .select()
      .single();

    if (!error && data) {
      const { data: commentData } = await supabase.from("comments").insert([{
        topic_id: data.id,
        message: newTopicMessage.trim().slice(0, 50),
        author_name: displayName,
        user_id: user.id,
        avatar_url: avatarUrl || null,
      }]).select().single();

      setNewTopicTitle("");
      setNewTopicMessage("");
      setShowNewTopic(false);
      
      // Open the newly created topic so user sees their message
      const newTopic: Topic = { ...data, comment_count: 1 };
      setSelectedTopic(newTopic);
      if (commentData) {
        setComments([{ ...commentData, like_count: 0, user_has_liked: false }]);
      } else {
        fetchComments(data.id);
      }
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
        message: newComment.trim().slice(0, 50),
        author_name: displayName,
        user_id: user.id,
        avatar_url: avatarUrl || null,
      }])
      .select()
      .single();

    if (!error && data) {
      setComments((prev) => [...prev, { ...data, like_count: 0, user_has_liked: false }]);
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

  const canDelete = (ownerId: string) => isAdmin;

  const handleLikeComment = async (commentId: string, currentlyLiked: boolean) => {
    if (!user) return;

    if (currentlyLiked) {
      // Unlike
      await supabase
        .from("comment_likes")
        .delete()
        .eq("comment_id", commentId)
        .eq("user_id", user.id);
    } else {
      // Like
      await supabase
        .from("comment_likes")
        .insert({ comment_id: commentId, user_id: user.id });
    }

    // Update local state
    setComments(prev => prev.map(c => 
      c.id === commentId 
        ? { 
            ...c, 
            like_count: (c.like_count || 0) + (currentlyLiked ? -1 : 1),
            user_has_liked: !currentlyLiked 
          }
        : c
    ));
  };

  const filteredTopics = topics.filter(topic => 
    topic.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    topic.author_name.toLowerCase().includes(searchQuery.toLowerCase())
  );

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

  // ── Auth Gate: Show login form if not authenticated ──
  if (authLoading) {
    return (
      <section id="community" className="relative z-10 py-24 px-4">
        <div className="container mx-auto max-w-2xl text-center">
          <p className="font-body text-sm text-muted-foreground">
            {lang === "lv" ? "Ielādē..." : "Loading..."}
          </p>
        </div>
      </section>
    );
  }

  if (!user) {
    return (
      <section id="community" className="relative z-10 py-24 px-4">
        <div className="container mx-auto max-w-2xl">
          <h2 className="font-heading text-3xl md:text-4xl text-center text-foreground glow-text mb-8 tracking-wider">
            {lang === "lv" ? "Kopiena" : "Community"}
          </h2>
          <div className="p-8 rounded-2xl border border-border/30 bg-card/20 backdrop-blur-sm text-center space-y-6">
            <Mail className="w-12 h-12 text-primary mx-auto" />
            <div>
              <h3 className="font-heading text-xl text-foreground mb-2 tracking-wider">
                {lang === "lv" ? "Privāta kopiena" : "Private Community"}
              </h3>
              <p className="font-body text-sm text-muted-foreground">
                {lang === "lv" 
                  ? "Lai piekļūtu kopienai, lūdzu, reģistrējies vai piesakies ar e-pastu." 
                  : "To access the community, please register or sign in with email."}
              </p>
            </div>
            <EmailOtpForm context="topic" />
          </div>
        </div>
      </section>
    );
  }

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
                  {user && (
                    <button
                      onClick={() => handleLikeComment(c.id, c.user_has_liked || false)}
                      className="flex items-center gap-1.5 mt-2 text-xs font-body text-muted-foreground hover:text-primary transition-colors group"
                    >
                      <Heart 
                        className={`w-3.5 h-3.5 transition-all ${
                          c.user_has_liked 
                            ? 'fill-primary text-primary' 
                            : 'group-hover:fill-primary/20'
                        }`} 
                      />
                      <span>{c.like_count || 0}</span>
                    </button>
                  )}
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
            <div className="space-y-2">
              <form onSubmit={handlePostComment} className="flex gap-3">
                <input
                  type="text"
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value.slice(0, 50))}
                  placeholder={lang === "lv" ? "Raksti atbildi..." : "Write a reply..."}
                  maxLength={50}
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
              {newComment && (
                <div className="text-right text-xs text-muted-foreground">
                  {newComment.length}/50
                </div>
              )}
            </div>
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
              <AvatarBubble url={avatarUrl} name={displayName} />
              <span className="text-xs font-body text-muted-foreground tracking-wide truncate">
                {displayName}
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
                <div className="space-y-1">
                  <textarea
                    value={newTopicMessage}
                    onChange={(e) => setNewTopicMessage(e.target.value.slice(0, 50))}
                    placeholder={lang === "lv" ? "Pirmā ziņa..." : "First message..."}
                    rows={3}
                    maxLength={50}
                    className="w-full bg-card/40 border border-border rounded-lg px-4 py-2.5 font-body text-foreground text-sm focus:border-primary focus:outline-none transition-colors resize-none"
                  />
                  <div className="text-right text-xs text-muted-foreground">
                    {newTopicMessage.length}/50
                  </div>
                </div>
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

        {/* Search bar */}
        <div className="mb-6 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={lang === "lv" ? "Meklēt tēmas vai autorus..." : "Search topics or authors..."}
            className="w-full bg-card/40 border border-border rounded-lg pl-10 pr-4 py-2.5 font-body text-foreground text-sm focus:border-primary focus:outline-none transition-colors"
          />
        </div>

        {/* Topic list */}
        {loading ? (
          <p className="text-center text-muted-foreground font-body text-sm">Loading...</p>
        ) : filteredTopics.length === 0 ? (
          <p className="text-center text-muted-foreground font-body text-sm py-8">
            {searchQuery 
              ? (lang === "lv" ? "Nav rezultātu." : "No results found.")
              : (lang === "lv" ? "Vēl nav tēmu. Esi pirmais!" : "No topics yet. Be the first!")
            }
          </p>
        ) : (
          <div className="space-y-3">
            {filteredTopics.map((topic) => (
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
