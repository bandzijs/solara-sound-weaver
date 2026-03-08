import { useState } from "react";
import { useAdmin } from "@/contexts/AdminContext";
import { LogIn, LogOut } from "lucide-react";

const AdminLogin = () => {
  const { isAdmin, loginAdmin, logoutAdmin } = useAdmin();
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  if (isAdmin) {
    return (
      <button
        onClick={logoutAdmin}
        className="flex items-center gap-1.5 text-xs font-body text-muted-foreground hover:text-destructive transition-colors"
      >
        <LogOut className="w-3.5 h-3.5" />
        Logout
      </button>
    );
  }

  if (!open) {
    return (
      <button
        onClick={() => setOpen(true)}
        className="text-muted-foreground/40 hover:text-muted-foreground transition-colors"
        title="Admin login"
      >
        <LogIn className="w-3.5 h-3.5" />
      </button>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    const err = await loginAdmin(email, password);
    if (err) setError(err);
    else setOpen(false);
    setLoading(false);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-background/80 backdrop-blur-sm">
      <form
        onSubmit={handleSubmit}
        className="bg-card border border-border rounded-2xl p-6 w-full max-w-sm space-y-4"
      >
        <h3 className="font-heading text-lg text-foreground tracking-wider">Admin Login</h3>
        {error && <p className="text-destructive text-xs font-body">{error}</p>}
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full bg-card/40 border border-border rounded-lg px-4 py-2.5 font-body text-foreground text-sm focus:border-primary focus:outline-none"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full bg-card/40 border border-border rounded-lg px-4 py-2.5 font-body text-foreground text-sm focus:border-primary focus:outline-none"
        />
        <div className="flex gap-3">
          <button
            type="submit"
            disabled={loading}
            className="flex-1 px-4 py-2.5 rounded-lg bg-primary text-primary-foreground font-body text-sm tracking-widest hover:bg-primary/80 transition-all disabled:opacity-50"
          >
            {loading ? "..." : "Login"}
          </button>
          <button
            type="button"
            onClick={() => setOpen(false)}
            className="px-4 py-2.5 rounded-lg border border-border text-muted-foreground font-body text-sm hover:text-foreground transition-colors"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default AdminLogin;
