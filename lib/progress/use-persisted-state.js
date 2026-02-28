"use client";
import { useState, useEffect, useRef, useCallback } from "react";
import { useProgress } from "./progress-context";

export function usePersistedState(chapterId, key, defaultValue) {
  const { getWidgetState, setWidgetState } = useProgress();
  const saved = getWidgetState(chapterId, key);
  const [value, setValue] = useState(saved !== undefined ? saved : defaultValue);
  const timerRef = useRef(null);

  const setValueAndPersist = useCallback((newValue) => {
    const resolved = typeof newValue === "function" ? newValue(value) : newValue;
    setValue(resolved);

    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      setWidgetState(chapterId, key, resolved);
    }, 1000);
  }, [chapterId, key, setWidgetState, value]);

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  return [value, setValueAndPersist];
}
