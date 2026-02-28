"use client";
import { AuthProvider } from "@/lib/auth/auth-context";
import NavBar from "@/components/NavBar";

export default function Providers({ children }) {
  return (
    <AuthProvider>
      <NavBar />
      {children}
    </AuthProvider>
  );
}
