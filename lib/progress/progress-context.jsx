"use client";
import { createContext, useContext, useState, useEffect, useCallback, useRef } from "react";
import { useAuth } from "@/lib/auth/auth-context";
import { loadProgressFromSupabase, saveChapterToSupabase, migrateLocalStorageToSupabase } from "./supabase-sync";

const ProgressContext = createContext(null);

const STORAGE_KEY_PREFIX = "math-viz-progress-";

function loadFromStorage(courseId) {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(STORAGE_KEY_PREFIX + courseId);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (parsed.version === 1 && parsed.courseId === courseId) return parsed;
  } catch {
    // corrupted data
  }
  return null;
}

function saveToStorage(courseId, data) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEY_PREFIX + courseId, JSON.stringify(data));
  } catch {
    // storage full or unavailable
  }
}

function clearStorage(courseId) {
  if (typeof window === "undefined") return;
  try {
    localStorage.removeItem(STORAGE_KEY_PREFIX + courseId);
  } catch {
    // ignore
  }
}

function createEmptyProgress(courseId) {
  return {
    version: 1,
    courseId,
    chapters: {},
  };
}

export function ProgressProvider({ courseId, children }) {
  const [progress, setProgress] = useState(() => createEmptyProgress(courseId));
  const [loaded, setLoaded] = useState(false);
  const saveTimerRef = useRef(null);
  const pendingChaptersRef = useRef(new Set());

  let user = null;
  try {
    const auth = useAuth();
    user = auth.user;
  } catch {
    // AuthProvider not available — guest mode
  }

  const isLoggedIn = !!user;

  // Load progress on mount / auth change
  useEffect(() => {
    let cancelled = false;

    async function load() {
      if (isLoggedIn) {
        // Load from Supabase
        const supaData = await loadProgressFromSupabase(user.id, courseId);
        if (cancelled) return;

        if (supaData) {
          // Check if there's localStorage data to migrate
          const localData = loadFromStorage(courseId);
          if (localData && Object.keys(localData.chapters).length > 0) {
            // Merge local into Supabase (local wins for chapters not in Supabase)
            const merged = { ...supaData };
            for (const [chId, chData] of Object.entries(localData.chapters)) {
              if (!merged.chapters[chId]) {
                merged.chapters[chId] = chData;
              }
            }
            await migrateLocalStorageToSupabase(user.id, courseId, localData);
            clearStorage(courseId);
            setProgress(merged);
          } else {
            setProgress(supaData);
          }
        } else {
          // No Supabase data — migrate localStorage if exists
          const localData = loadFromStorage(courseId);
          if (localData && Object.keys(localData.chapters).length > 0) {
            await migrateLocalStorageToSupabase(user.id, courseId, localData);
            clearStorage(courseId);
            setProgress(localData);
          } else {
            setProgress(createEmptyProgress(courseId));
          }
        }
      } else {
        // Guest mode — load from localStorage
        const stored = loadFromStorage(courseId);
        if (!cancelled && stored) {
          setProgress(stored);
        }
      }
      if (!cancelled) setLoaded(true);
    }

    load();
    return () => { cancelled = true; };
  }, [courseId, isLoggedIn, user?.id]);

  // Flush pending Supabase saves
  const flushToSupabase = useCallback((latestProgress) => {
    if (!isLoggedIn || !user) return;
    const chapters = pendingChaptersRef.current;
    if (chapters.size === 0) return;

    const toSave = new Set(chapters);
    chapters.clear();

    for (const chapterId of toSave) {
      const chData = latestProgress.chapters[chapterId];
      if (chData) {
        saveChapterToSupabase(user.id, courseId, chapterId, chData);
      }
    }
  }, [isLoggedIn, user, courseId]);

  const scheduleSave = useCallback((newProgress, changedChapterId) => {
    if (isLoggedIn) {
      // Save to Supabase with debounce
      if (changedChapterId) {
        pendingChaptersRef.current.add(changedChapterId);
      }
      if (saveTimerRef.current) clearTimeout(saveTimerRef.current);
      saveTimerRef.current = setTimeout(() => {
        flushToSupabase(newProgress);
      }, 1500);
    } else {
      // Save to localStorage with debounce
      if (saveTimerRef.current) clearTimeout(saveTimerRef.current);
      saveTimerRef.current = setTimeout(() => {
        saveToStorage(courseId, newProgress);
      }, 1000);
    }
  }, [courseId, isLoggedIn, flushToSupabase]);

  useEffect(() => {
    return () => {
      if (saveTimerRef.current) clearTimeout(saveTimerRef.current);
    };
  }, []);

  const markVisited = useCallback((chapterId) => {
    setProgress(prev => {
      const chapterKey = String(chapterId);
      const existing = prev.chapters[chapterKey] || {};
      const updated = {
        ...prev,
        chapters: {
          ...prev.chapters,
          [chapterKey]: {
            ...existing,
            visited: true,
            lastVisited: new Date().toISOString(),
            widgetState: existing.widgetState || {},
          },
        },
      };
      scheduleSave(updated, chapterKey);
      return updated;
    });
  }, [scheduleSave]);

  const isVisited = useCallback((chapterId) => {
    return !!progress.chapters[String(chapterId)]?.visited;
  }, [progress]);

  const getWidgetState = useCallback((chapterId, key) => {
    const chapter = progress.chapters[String(chapterId)];
    if (!chapter?.widgetState) return undefined;
    return chapter.widgetState[key];
  }, [progress]);

  const setWidgetState = useCallback((chapterId, key, value) => {
    setProgress(prev => {
      const chapterKey = String(chapterId);
      const existing = prev.chapters[chapterKey] || { visited: true, lastVisited: new Date().toISOString(), widgetState: {} };
      const updated = {
        ...prev,
        chapters: {
          ...prev.chapters,
          [chapterKey]: {
            ...existing,
            widgetState: {
              ...existing.widgetState,
              [key]: value,
            },
          },
        },
      };
      scheduleSave(updated, chapterKey);
      return updated;
    });
  }, [scheduleSave]);

  const getProgress = useCallback(() => progress, [progress]);

  const setFullProgress = useCallback((newProgress) => {
    setProgress(newProgress);
    if (isLoggedIn) {
      // Save all chapters to Supabase
      for (const chapterId of Object.keys(newProgress.chapters)) {
        pendingChaptersRef.current.add(chapterId);
      }
      flushToSupabase(newProgress);
    } else {
      saveToStorage(courseId, newProgress);
    }
  }, [courseId, isLoggedIn, flushToSupabase]);

  const value = {
    progress,
    loaded,
    markVisited,
    isVisited,
    getWidgetState,
    setWidgetState,
    getProgress,
    setFullProgress,
  };

  return (
    <ProgressContext.Provider value={value}>
      {children}
    </ProgressContext.Provider>
  );
}

export function useProgress() {
  const ctx = useContext(ProgressContext);
  if (!ctx) {
    throw new Error("useProgress must be used within a ProgressProvider");
  }
  return ctx;
}
