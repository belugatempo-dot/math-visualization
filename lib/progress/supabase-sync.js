"use client";
import { createClient } from "@/lib/supabase/client";

export async function loadProgressFromSupabase(userId, courseId) {
  const supabase = createClient();
  if (!supabase) return null;

  const { data, error } = await supabase
    .from("progress")
    .select("chapter_id, visited, last_visited, widget_state")
    .eq("user_id", userId)
    .eq("course_id", courseId);

  if (error) {
    console.error("Failed to load progress from Supabase:", error);
    return null;
  }

  const chapters = {};
  for (const row of data) {
    chapters[String(row.chapter_id)] = {
      visited: row.visited,
      lastVisited: row.last_visited,
      widgetState: row.widget_state || {},
    };
  }

  return {
    version: 1,
    courseId,
    chapters,
  };
}

export async function saveChapterToSupabase(userId, courseId, chapterId, chapterData) {
  const supabase = createClient();
  if (!supabase) return;

  const { error } = await supabase
    .from("progress")
    .upsert(
      {
        user_id: userId,
        course_id: courseId,
        chapter_id: Number(chapterId),
        visited: chapterData.visited ?? true,
        last_visited: chapterData.lastVisited ?? new Date().toISOString(),
        widget_state: chapterData.widgetState ?? {},
        updated_at: new Date().toISOString(),
      },
      { onConflict: "user_id,course_id,chapter_id" }
    );

  if (error) {
    console.error("Failed to save progress to Supabase:", error);
  }
}

export async function migrateLocalStorageToSupabase(userId, courseId, localProgress) {
  const supabase = createClient();
  if (!supabase || !localProgress?.chapters) return;

  const rows = Object.entries(localProgress.chapters).map(([chapterId, data]) => ({
    user_id: userId,
    course_id: courseId,
    chapter_id: Number(chapterId),
    visited: data.visited ?? true,
    last_visited: data.lastVisited ?? new Date().toISOString(),
    widget_state: data.widgetState ?? {},
    updated_at: new Date().toISOString(),
  }));

  if (rows.length === 0) return;

  const { error } = await supabase
    .from("progress")
    .upsert(rows, { onConflict: "user_id,course_id,chapter_id" });

  if (error) {
    console.error("Failed to migrate localStorage to Supabase:", error);
  }
}
