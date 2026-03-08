import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/contexts/AuthContext";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

interface NicknameModalProps {
  open: boolean;
  onSaved: (nickname: string) => void;
}

const NicknameModal = ({ open, onSaved }: NicknameModalProps) => {
  const { lang } = useLanguage();
  const { user } = useAuth();
  const [nickname, setNickname] = useState("");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = nickname.trim();
    if (!trimmed || !user) return;

    if (trimmed.length < 2 || trimmed.length > 30) {
      setError(lang === "lv" ? "2–30 rakstzīmes" : "2–30 characters");
      return;
    }

    setSaving(true);
    setError("");

    const { error: dbError } = await supabase
      .from("profiles")
      .upsert({ id: user.id, nickname: trimmed }, { onConflict: "id" });

    if (dbError) {
      setError(dbError.message);
      setSaving(false);
      return;
    }

    setSaving(false);
    onSaved(trimmed);
  };

  return (
    <Dialog open={open}>
      <DialogContent className="sm:max-w-md border-border/30 bg-card/95 backdrop-blur-md" onInteractOutside={(e) => e.preventDefault()}>
        <DialogHeader>
          <DialogTitle className="font-heading tracking-wider text-foreground">
            {lang === "lv" ? "Izvēlieties segvārdu" : "Choose a nickname"}
          </DialogTitle>
          <DialogDescription className="font-body text-muted-foreground text-sm">
            {lang === "lv"
              ? "Šis vārds būs redzams kopienā jūsu e-pasta vietā."
              : "This name will be shown in the community instead of your email."}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 mt-2">
          <input
            type="text"
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
            placeholder={lang === "lv" ? "Jūsu segvārds..." : "Your nickname..."}
            maxLength={30}
            autoFocus
            className="w-full bg-card/40 border border-border rounded-lg px-4 py-2.5 font-body text-foreground text-sm focus:border-primary focus:outline-none transition-colors"
          />
          {error && <p className="font-body text-xs text-destructive">{error}</p>}
          <button
            type="submit"
            disabled={saving || !nickname.trim()}
            className="w-full px-5 py-2.5 rounded-lg bg-primary text-primary-foreground font-body text-sm tracking-widest hover:bg-primary/80 transition-all disabled:opacity-50"
          >
            {saving ? "..." : lang === "lv" ? "Saglabāt" : "Save"}
          </button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default NicknameModal;
