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
    // if (history.length > 1) {
    //   const prevHistory = history.slice(0, -1);
    //   setHistory(prevHistory ? prevHistory : [initialMode]);
    //   setMode(prevHistory[prevHistory.length - 1]);
    // }

    let prevHistory = [...history];
    if (history.length > 1) {
      prevHistory.pop();
    } else {
      prevHistory = [initialMode];
    }

    const mode = prevHistory[prevHistory.length - 1];

    setHistory(prevHistory);
    setMode(mode);
  };

  return { mode, transition, back };
}
