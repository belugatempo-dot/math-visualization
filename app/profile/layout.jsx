"use client";
import { ProgressProvider } from "@/lib/progress/progress-context";

export default function ProfileLayout({ children }) {
  return (
    <ProgressProvider courseId="ba4">
      {children}
    </ProgressProvider>
  );
}
