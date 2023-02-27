import { useState, useEffect } from "react";

import axios from "axios";

const useApplicationData = () => {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
  });

  // Returns a new days array with the updated spots
  const updateSpots = (appointments) => {
    return state.days.map((day) => {
      let spots = 5;

      for (const appointmentId of day.appointments) {
        if (appointments[appointmentId].interview) {
          spots--;
        }
      }

      return { ...day, spots };
    });
  };

  const bookInterview = (id, interview) => {
    return new Promise((resolve, reject) => {
      if (!interview.student || !interview.interviewer) {
        return reject("Empty field");
      }

      axios
        .put(`/api/appointments/${id}`, { interview })
        .then((res) => {
          const interviewData = JSON.parse(res.config.data);

          const appointment = {
            ...state.appointments[id],
            interview: { ...interviewData.interview },
          };

          const appointments = {
            ...state.appointments,
            [id]: appointment,
          };

          const days = updateSpots(appointments);

          setState((prev) => ({ ...prev, appointments, days }));
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
          const appointment = {
            ...state.appointments[id],
            interview: null,
          };

          const appointments = {
            ...state.appointments,
            [id]: appointment,
          };

          const days = updateSpots(appointments);

          setState((prev) => ({ ...prev, appointments, days }));
          resolve();
        })
        .catch((err) => {
          reject(err);
        });
    });
  };

  const setDay = (day) => {
    setState(Object.assign({}, state, { day }));
  };

  useEffect(() => {
    Promise.all([
      axios.get("/api/days"),
      axios.get("/api/appointments"),
      axios.get("/api/interviewers"),
    ]).then((all) =>
      setState((prev) => ({
        ...prev,
        days: all[0].data,
        appointments: all[1].data,
        interviewers: all[2].data,
      }))
    );
  }, []);

  return { state, setDay, bookInterview, cancelInterview };
};

export default useApplicationData;
