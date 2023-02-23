import { useState } from "react";

export default function useVisualMode(initialMode) {
  const [mode, setMode] = useState(initialMode);
  const [history, setHistory] = useState([initialMode]);

  const transition = (newMode, replace = false) => {
    setMode(newMode);
    setHistory((prev) =>
      replace ? [...prev.slice(0, -1), newMode] : [...prev, newMode]
    );
  };

  const back = () => {
    if (history.length > 1) {
      const prevHistory = history.slice(0, -1);
      setHistory(prevHistory);
      setMode(prevHistory[prevHistory.length - 1]);
    }
  };

  return { mode, transition, back };
}
