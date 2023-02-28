import { useReducer, useEffect } from "react";

import {
  reducer,
  SET_APPLICATION_DATA,
  SET_DAY,
  SET_INTERVIEW,
} from "../reducers/ApplicationReducer";

import axios from "axios";

const useApplicationData = () => {
  const [state, dispatch] = useReducer(reducer, {
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {},
  });

  useEffect(() => {
    const socket = new WebSocket(process.env.REACT_APP_WEBSOCKET_URL);

    socket.onmessage = (event) => {
      dispatch(JSON.parse(event.data));
    };

    return () => {
      socket.close();
    };
  }, []);

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
      // setState((prev) => ({
      //   ...prev,
      //   days: all[0].data,
      //   appointments: all[1].data,
      //   interviewers: all[2].data,
      // }))
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
