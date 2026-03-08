import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { Trash2, MessageSquare, Users } from "lucide-react";

interface TopicRow {
  id: string;
  title: string;
  author_name: string;
  created_at: string;
  comment_count: number;
}

interface ForumCommentRow {
  id: string;
  topic_id: string;
  message: string;
  author_name: string;
  created_at: string;
  topic_title?: string;
}

const CommunityModeration = () => {
  const [topics, setTopics] = useState<TopicRow[]>([]);
  const [forumComments, setForumComments] = useState<ForumCommentRow[]>([]);
  const [subTab, setSubTab] = useState<"topics" | "forum-comments">("topics");

  useEffect(() => {
    fetchTopics();
    fetchForumComments();
  }, []);

  const fetchTopics = async () => {
    const { data } = await supabase
      .from("topics")
      .select("id, title, author_name, created_at")
      .order("created_at", { ascending: false });

    if (data) {
      // Get comment counts
      const topicsWithCounts = await Promise.all(
        data.map(async (topic) => {
          const { count } = await supabase
            .from("comments")
            .select("*", { count: "exact", head: true })
            .eq("topic_id", topic.id)
            .eq("is_deleted", false);
          return { ...topic, comment_count: count || 0 };
        })
      );
      setTopics(topicsWithCounts);
    }
  };

  const fetchForumComments = async () => {
    const { data } = await supabase
      .from("comments")
      .select("id, topic_id, message, author_name, created_at")
      .eq("is_deleted", false)
      .not("topic_id", "is", null)
      .order("created_at", { ascending: false });

    if (data) {
      // Enrich with topic titles
      const topicIds = [...new Set(data.map((c) => c.topic_id))];
      const { data: topicsData } = await supabase
        .from("topics")
        .select("id, title")
        .in("id", topicIds);

      const titleMap = new Map(topicsData?.map((t) => [t.id, t.title]) || []);
      setForumComments(
        data.map((c) => ({ ...c, topic_title: titleMap.get(c.topic_id) || "—" }))
      );
    }
  };

  const handleDeleteTopic = async (id: string) => {
    if (!confirm("Dzēst tēmu un visus tās komentārus?")) return;

    // Delete all comments for this topic first
    const { error: commentsError } = await supabase
      .from("comments")
      .delete()
      .eq("topic_id", id);

    if (commentsError) {
      console.error("[Admin] Error deleting topic comments:", commentsError);
      alert(`Error deleting comments: ${commentsError.message}`);
      return;
    }

    const { error } = await supabase.from("topics").delete().eq("id", id);
    if (error) {
      console.error("[Admin] Error deleting topic:", error);
      alert(`Error deleting topic: ${error.message}`);
    } else {
      setTopics((prev) => prev.filter((t) => t.id !== id));
      setForumComments((prev) => prev.filter((c) => c.topic_id !== id));
    }
  };

  const handleDeleteForumComment = async (id: string) => {
    const { error } = await supabase.from("comments").delete().eq("id", id);
    if (error) {
      console.error("[Admin] Error deleting forum comment:", error);
      alert(`Error: ${error.message}`);
    } else {
      setForumComments((prev) => prev.filter((c) => c.id !== id));
    }
  };

  const tabClass = (active: boolean) =>
    `flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-body tracking-widest border transition-all ${
      active
        ? "border-primary text-primary glow-box"
        : "border-border text-muted-foreground hover:border-primary/50"
    }`;

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-heading text-xl text-foreground tracking-wider">
          Kopiena moderācija
        </h2>
        <div className="flex gap-2">
          <button onClick={() => setSubTab("topics")} className={tabClass(subTab === "topics")}>
            <Users className="w-3.5 h-3.5" /> Tēmas ({topics.length})
          </button>
          <button onClick={() => setSubTab("forum-comments")} className={tabClass(subTab === "forum-comments")}>
            <MessageSquare className="w-3.5 h-3.5" /> Komentāri ({forumComments.length})
          </button>
        </div>
      </div>

      {subTab === "topics" && (
        <div className="space-y-3">
          {topics.map((topic) => (
            <div
              key={topic.id}
              className="flex items-center justify-between p-4 rounded-xl border border-border/30 bg-card/20 backdrop-blur-sm"
            >
              <div className="flex-1 min-w-0">
                <h3 className="font-heading text-sm tracking-wider text-foreground truncate">
                  {topic.title}
                </h3>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-[10px] font-body tracking-widest text-primary/60">
                    {topic.author_name}
                  </span>
                  <span className="text-[10px] font-body text-muted-foreground">
                    {new Date(topic.created_at).toLocaleDateString()}
                  </span>
                  <span className="text-[10px] font-body text-muted-foreground">
                    {topic.comment_count} komentāri
                  </span>
                </div>
              </div>
              <button
                onClick={() => handleDeleteTopic(topic.id)}
                className="text-muted-foreground hover:text-destructive transition-colors ml-3"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
          {topics.length === 0 && (
            <p className="text-center text-muted-foreground font-body text-sm py-8">Nav tēmu</p>
          )}
        </div>
      )}

      {subTab === "forum-comments" && (
        <div className="space-y-3">
          {forumComments.map((c) => (
            <div
              key={c.id}
              className="flex items-start justify-between p-4 rounded-xl border border-border/30 bg-card/20 backdrop-blur-sm gap-3"
            >
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="font-heading text-xs tracking-wider text-primary">
                    {c.author_name}
                  </span>
                  <span className="text-[10px] text-muted-foreground font-body">
                    {new Date(c.created_at).toLocaleDateString()}
                  </span>
                </div>
                <p className="font-body text-sm text-foreground/70 mt-1">{c.message}</p>
                <p className="text-[10px] text-muted-foreground/50 font-body mt-1">
                  Tēma: {c.topic_title}
                </p>
              </div>
              <button
                onClick={() => handleDeleteForumComment(c.id)}
                className="text-muted-foreground hover:text-destructive transition-colors shrink-0 mt-1"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
          {forumComments.length === 0 && (
            <p className="text-center text-muted-foreground font-body text-sm py-8">Nav komentāru</p>
          )}
        </div>
      )}
    </div>
  );
};

export default CommunityModeration;
