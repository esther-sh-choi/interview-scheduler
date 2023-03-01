import { useReducer, useEffect } from "react";

import reducer, {
  SET_APPLICATION_DATA,
  SET_DAY,
  SET_INTERVIEW,
} from "../reducers/application";

import axios from "axios";

const useApplicationData = () => {
  const [state, dispatch] = useReducer(reducer, {
    // initial state
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {},
  });

  // connect to web socket on load
  useEffect(() => {
    const socket = new WebSocket(process.env.REACT_APP_WEBSOCKET_URL);

    socket.onmessage = (event) => {
      // JSON.parse(event.data) has the following structure
      // {
      //   type: SET_INTERVIEW,
      //   id,
      //   interview: null or {...},
      // }
      dispatch(JSON.parse(event.data));
    };

    // clean up effect
    return () => {
      socket.close();
    };
  }, []);

  /**
   * Returns the new promise after making an axios put request for booking interview.
   *
   * @param {object} state The current state of day, days, appointments, and interviewers of the entire app.
   * @param {object} action The actions contains the action value of day (string -> e.g., "Monday", "Tuesday", etc.).
   * @return {object} new updated state that includes the newly selected day.
   */
  const bookInterview = (id, interview) => {
    return new Promise((resolve, reject) => {
      if (!interview.student || !interview.interviewer) {
        return reject("Empty field");
      }

      axios
        .put(`/api/appointments/${id}`, { interview })
        .then((res) => {
          const interviewData = JSON.parse(res.config.data);

          dispatch({
            type: SET_INTERVIEW,
            id,
            interview: { ...interviewData.interview },
          });
          resolve();
        })
        .catch((err) => {
          reject(err);
        });
    });
  };

  const cancelInterview = (id) => {
    return new Promise((resolve, reject) => {
      axios
        .delete(`/api/appointments/${id}`)
        .then((res) => {
          dispatch({ type: SET_INTERVIEW, id, interview: null });
          resolve();
        })
        .catch((err) => {
          reject(err);
        });
    });
  };

  const setDay = (day) => {
    dispatch({ type: SET_DAY, day });
  };

  useEffect(() => {
    Promise.all([
      axios.get("/api/days"),
      axios.get("/api/appointments"),
      axios.get("/api/interviewers"),
    ]).then((all) =>
      dispatch({
        type: SET_APPLICATION_DATA,
        days: all[0].data,
        appointments: all[1].data,
        interviewers: all[2].data,
      })
    );
  }, []);

  return { state, setDay, bookInterview, cancelInterview };
};

export default useApplicationData;
