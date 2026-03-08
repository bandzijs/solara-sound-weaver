import { useState } from "react";
import { useAdmin } from "@/contexts/AdminContext";
import { LogOut } from "lucide-react";

const AdminLogin = () => {
  const { isAdmin, loginAdmin, logoutAdmin } = useAdmin();
  const [open, setOpen] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

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

  if (!open) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (loginAdmin(password)) {
      setOpen(false);
      setPassword("");
      setError("");
    } else {
      setError("Wrong password");
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-background/80 backdrop-blur-sm">
      <form
        onSubmit={handleSubmit}
        className="bg-card border border-border rounded-2xl p-6 w-full max-w-xs space-y-4"
      >
        <h3 className="font-heading text-lg text-foreground tracking-wider">Admin</h3>
        {error && <p className="text-destructive text-xs font-body">{error}</p>}
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoFocus
          className="w-full bg-card/40 border border-border rounded-lg px-4 py-2.5 font-body text-foreground text-sm focus:border-primary focus:outline-none"
        />
        <div className="flex gap-3">
          <button
            type="submit"
            className="flex-1 px-4 py-2.5 rounded-lg bg-primary text-primary-foreground font-body text-sm tracking-widest hover:bg-primary/80 transition-all"
          >
            Enter
          </button>
          <button
            type="button"
            onClick={() => { setOpen(false); setError(""); setPassword(""); }}
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
export { AdminLogin };
