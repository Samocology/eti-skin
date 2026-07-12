import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";

export const Route = createFileRoute("/auth")({
  component: AuthPage,
  head: () => ({ meta: [{ title: "Sign in — EtiSkin" }, { name: "robots", content: "noindex" }]}),
});

function AuthPage() {
  const [mode, setMode] = useState<"login" | "signup">("login");
  const nav = useNavigate();
  return (
    <div className="min-h-[80vh] flex items-center py-12 px-4">
      <div className="mx-auto grid md:grid-cols-2 max-w-5xl w-full rounded-2xl overflow-hidden shadow-glow border border-border">
        <div className="bg-gradient-hero text-white p-10 hidden md:flex flex-col justify-between">
          <div>
            <div className="font-serif text-3xl"><span>ETI</span> <span className="text-gold">SKIN</span></div>
            <h2 className="mt-10 text-4xl font-serif font-semibold leading-tight">
              Your best skin<br /><span className="text-gold italic">is one login away.</span>
            </h2>
            <p className="mt-4 opacity-80 text-sm">Track orders, save your wishlist, and unlock member-only deals.</p>
          </div>
          <div className="text-xs opacity-60">© 2026 EtiSkin</div>
        </div>

        <div className="bg-card p-8 md:p-10">
          <div className="flex gap-1 bg-muted rounded-md p-1 mb-6">
            {(["login", "signup"] as const).map(m => (
              <button key={m} onClick={() => setMode(m)}
                className={`flex-1 py-2 rounded text-sm font-semibold transition ${mode === m ? "bg-background shadow-soft text-primary" : "text-muted-foreground"}`}>
                {m === "login" ? "Sign In" : "Create Account"}
              </button>
            ))}
          </div>
          <h1 className="text-2xl font-serif font-semibold">{mode === "login" ? "Welcome back" : "Join EtiSkin"}</h1>
          <p className="text-sm text-muted-foreground mt-1">{mode === "login" ? "Enter your details to continue." : "Create your account in seconds."}</p>

          <form onSubmit={(e) => { e.preventDefault(); toast.success(mode === "login" ? "Signed in!" : "Account created!"); nav({ to: "/account" }); }}
            className="mt-6 space-y-4">
            {mode === "signup" && (
              <label className="block">
                <span className="text-xs font-semibold uppercase tracking-wider">Name</span>
                <input required className="mt-1 w-full px-3 py-2.5 rounded-md bg-background border border-border focus:ring-2 focus:ring-primary focus:outline-none" />
              </label>
            )}
            <label className="block">
              <span className="text-xs font-semibold uppercase tracking-wider">Email</span>
              <input type="email" required className="mt-1 w-full px-3 py-2.5 rounded-md bg-background border border-border focus:ring-2 focus:ring-primary focus:outline-none" />
            </label>
            <label className="block">
              <span className="text-xs font-semibold uppercase tracking-wider">Password</span>
              <input type="password" required minLength={6} className="mt-1 w-full px-3 py-2.5 rounded-md bg-background border border-border focus:ring-2 focus:ring-primary focus:outline-none" />
            </label>
            {mode === "login" && <div className="text-right"><a href="#" className="text-xs text-primary font-semibold">Forgot password?</a></div>}
            <button className="w-full bg-primary text-primary-foreground py-3 rounded-md font-semibold hover:bg-primary/90 transition">
              {mode === "login" ? "Sign In" : "Create Account"}
            </button>
          </form>

          <div className="mt-6 text-center text-xs text-muted-foreground">
            Or continue as <Link to="/admin" className="text-gold font-semibold">Admin →</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
