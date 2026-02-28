"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth/auth-context";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const { signIn } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      await signIn(email, password);
      router.push("/ba4");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-night-deep flex items-center justify-center px-4">
      <div className="glass-card p-8 max-w-sm w-full">
        <h1 className="text-2xl font-bold text-text-primary mb-6 text-center">Login 登录</h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <label className="flex flex-col gap-1">
            <span className="text-sm text-text-secondary">Email</span>
            <input type="email" value={email} onChange={e => setEmail(e.target.value)} required
              className="px-3 py-2 bg-white/10 border border-white/15 rounded-lg text-text-primary placeholder:text-slate-500"
              placeholder="you@example.com" />
          </label>
          <label className="flex flex-col gap-1">
            <span className="text-sm text-text-secondary">Password 密码</span>
            <input type="password" value={password} onChange={e => setPassword(e.target.value)} required minLength={6}
              className="px-3 py-2 bg-white/10 border border-white/15 rounded-lg text-text-primary placeholder:text-slate-500"
              placeholder="••••••" />
          </label>
          {error && (
            <div className="p-2 bg-red-500/20 border border-red-500/30 rounded-lg text-sm text-red-400">
              {error}
            </div>
          )}
          <button type="submit" disabled={loading}
            className="px-4 py-2 bg-accent text-night-deep font-bold rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50">
            {loading ? "Signing in..." : "Sign In 登录"}
          </button>
        </form>
        <p className="text-sm text-text-secondary text-center mt-4">
          No account? <Link href="/register" className="text-accent underline">Register 注册</Link>
        </p>
        <p className="text-sm text-text-secondary text-center mt-2">
          <Link href="/ba4" className="underline">Continue as guest 访客模式</Link>
        </p>
      </div>
    </div>
  );
}
