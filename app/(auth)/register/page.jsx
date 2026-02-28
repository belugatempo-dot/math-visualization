"use client";
import { useState } from "react";
import Link from "next/link";
import { useAuth } from "@/lib/auth/auth-context";

export default function RegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const { signUp } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      await signUp(email, password);
      setSuccess(true);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen bg-night-deep flex items-center justify-center px-4">
        <div className="glass-card p-8 max-w-sm w-full text-center">
          <h1 className="text-2xl font-bold text-text-primary mb-4">Check your email!</h1>
          <p className="text-text-secondary mb-4">
            We sent a confirmation link to <strong className="text-text-primary">{email}</strong>.
          </p>
          <Link href="/login" className="text-accent underline">Back to login</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-night-deep flex items-center justify-center px-4">
      <div className="glass-card p-8 max-w-sm w-full">
        <h1 className="text-2xl font-bold text-text-primary mb-6 text-center">Register 注册</h1>
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
              placeholder="At least 6 characters" />
          </label>
          {error && (
            <div className="p-2 bg-red-500/20 border border-red-500/30 rounded-lg text-sm text-red-400">
              {error}
            </div>
          )}
          <button type="submit" disabled={loading}
            className="px-4 py-2 bg-accent text-night-deep font-bold rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50">
            {loading ? "Creating account..." : "Create Account 创建账户"}
          </button>
        </form>
        <p className="text-sm text-text-secondary text-center mt-4">
          Already have an account? <Link href="/login" className="text-accent underline">Sign in 登录</Link>
        </p>
      </div>
    </div>
  );
}
