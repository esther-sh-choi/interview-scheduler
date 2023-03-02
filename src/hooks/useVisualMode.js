import { useState } from "react";

// A custom hook for switching visual modes for each appointment based on user input.
export default function useVisualMode(initialMode) {
  const [mode, setMode] = useState(initialMode);
  const [history, setHistory] = useState([initialMode]);

  /**
   * Function that changes the state of the mode for an appointment. And updates the history array with the new mode.
   *
   * @param {string} newMode new mode that is passed in as argument depending on the state of the appointment (e.g., show, edit, delete, saving, deleting, etc.).
   * @param {boolean} replace When transitioning to new mode, will the new mode replace the previous mode or will it simply be appended to the previous mode?
   * @return {undefined} There are no return values.
   */
  const transition = (newMode, replace = false) => {
    setMode(newMode);
    setHistory((prev) =>
      replace ? [...prev.slice(0, -1), newMode] : [...prev, newMode]
    );
  };

  /**
   * Function that changes the state of the mode to the previous mode and updates the history to remove the previous mode.
   */
  const back = () => {
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
