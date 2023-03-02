import { useReducer, useEffect } from "react";

import reducer, {
  SET_APPLICATION_DATA,
  SET_DAY,
  SET_INTERVIEW,
} from "../reducers/application";

import axios from "axios";

// A custom hook that returns new state and functions that update state.
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
   * @param {number} id The appointment id of the interview that is being booked/edited.
   * @param {object} interview Object that contains student name and the interviewer object.
   * @return {Promise} Promise that resolves when put request is successful and rejects with the error data when failed.
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

  /**
   * Returns the new promise after making an axios delete request for a booked interview.
   *
   * @param {number} id The appointment id of the interview that is being cancelled.
   * @return {Promise} Promise that resolves when delete request is successful and rejects with the error data when failed.
   */
  const cancelInterview = (id) => {
    return new Promise((resolve, reject) => {
      axios
        .delete(`/api/appointments/${id}`)
        .then(() => {
          dispatch({ type: SET_INTERVIEW, id, interview: null });
          resolve();
        })
        .catch((err) => {
          reject(err);
        });
    });
  };

  /**
   * Dispatch action with value of day with the action.type of SET_DAY.
   *
   * @param {string} day The day that is selected by the user from the day list.
   * @return {undefined} There are no return values.
   */
  const setDay = (day) => {
    dispatch({ type: SET_DAY, day });
  };

  // Make a request to all three endpoints to get the initial state when loading page the first time.
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
