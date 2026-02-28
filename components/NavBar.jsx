"use client";
import Link from "next/link";
import { useAuth } from "@/lib/auth/auth-context";

export default function NavBar() {
  const { user, loading, configured, signOut } = useAuth();

  return (
    <nav className="sticky top-0 z-20 bg-nav-bg backdrop-blur-sm border-b border-white/15 px-4 py-2 flex items-center justify-between">
      <Link href="/ba4" className="text-lg font-bold font-display text-accent">
        BA4
      </Link>
      <div className="flex items-center gap-3">
        <Link href="/profile" className="text-sm text-text-secondary hover:text-text-primary">
          Profile
        </Link>
        {configured && !loading && (
          user ? (
            <>
              <span className="text-sm text-text-secondary truncate max-w-[150px]">
                {user.email}
              </span>
              <button onClick={signOut}
                className="text-sm px-3 py-1 bg-white/10 text-text-secondary rounded hover:bg-white/20">
                Logout
              </button>
            </>
          ) : (
            <>
              <Link href="/login"
                className="text-sm px-3 py-1 bg-accent text-night-deep font-bold rounded hover:opacity-90">
                Login
              </Link>
            </>
          )
        )}
      </div>
    </nav>
  );
}
