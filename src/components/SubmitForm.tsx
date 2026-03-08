import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { supabase } from "@/lib/supabase";

const SubmitForm = () => {
  const { t } = useLanguage();
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", text: "", mood: "" });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    const { error } = await supabase
      .from("submissions")
      .insert([{
        name: form.name.trim(),
        email: form.email.trim(),
        poem_text: form.text.trim(),
        mood: form.mood,
      }]);

    setSubmitting(false);

    if (!error) {
      setSubmitted(true);
      setTimeout(() => setSubmitted(false), 5000);
      setForm({ name: "", email: "", text: "", mood: "" });
    }
  };

  return (
    <section id="submit" className="relative z-10 py-24 px-4">
      <div className="container mx-auto max-w-lg">
        <h2 className="font-heading text-3xl md:text-4xl text-center text-foreground glow-text mb-12 tracking-wider">
          {t.form.heading}
        </h2>

        {submitted ? (
          <div className="text-center py-16">
            <p className="font-body text-lg text-primary italic animate-float">{t.form.success}</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="font-body text-xs tracking-widest text-muted-foreground mb-2 block">
                {t.form.name}
              </label>
              <input
                type="text"
                required
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full bg-card/40 border border-border rounded-lg px-4 py-3 font-body text-foreground text-sm focus:border-primary focus:outline-none transition-colors"
              />
            </div>
            <div>
              <label className="font-body text-xs tracking-widest text-muted-foreground mb-2 block">
                {t.form.email}
              </label>
              <input
                type="email"
                required
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="w-full bg-card/40 border border-border rounded-lg px-4 py-3 font-body text-foreground text-sm focus:border-primary focus:outline-none transition-colors"
              />
            </div>
            <div>
              <label className="font-body text-xs tracking-widest text-muted-foreground mb-2 block">
                {t.form.text}
              </label>
              <textarea
                required
                rows={5}
                value={form.text}
                onChange={(e) => setForm({ ...form, text: e.target.value })}
                className="w-full bg-card/40 border border-border rounded-lg px-4 py-3 font-body text-foreground text-sm focus:border-primary focus:outline-none transition-colors resize-none"
              />
            </div>
            <div>
              <label className="font-body text-xs tracking-widest text-muted-foreground mb-2 block">
                {t.form.mood}
              </label>
              <select
                required
                value={form.mood}
                onChange={(e) => setForm({ ...form, mood: e.target.value })}
                className="w-full bg-card/40 border border-border rounded-lg px-4 py-3 font-body text-foreground text-sm focus:border-primary focus:outline-none transition-colors appearance-none"
              >
                <option value="" disabled>{t.form.selectMood}</option>
                {t.form.moodOptions.map((opt, i) => (
                  <option key={i} value={opt}>{opt}</option>
                ))}
              </select>
            </div>
            <button
              type="submit"
              disabled={submitting}
              className="w-full py-3 rounded-full bg-primary text-primary-foreground font-body text-sm tracking-widest hover:bg-primary/80 transition-all duration-500 glow-box disabled:opacity-50"
            >
              {submitting ? "..." : t.form.submit}
            </button>
          </form>
        )}
      </div>
    </section>
  );
};

export default SubmitForm;
