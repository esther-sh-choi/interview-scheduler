import React, { useState, useEffect } from "react";

import Axios from "axios";

import "components/Application.scss";

import Appointment from "./Appointment/index";
import DayList from "./DayList";
import {
  getAppointmentsForDay,
  getInterview,
  getInterviewersForDay,
} from "helpers/selectors";

interface AppointmentState {
  day: "Monday" | "Tuesday" | "Wednesday" | "Thursday" | "Friday";
  days: {
    id: number;
    name: "Monday" | "Tuesday" | "Wednesday" | "Thursday" | "Friday";
    appointments: number[];
    interviewers: number[];
    spots: number;
  }[];
  appointments: {
    [key: number]: {
      id: number;
      time: string;
      interview: { student: string; interviewer: number };
    };
  };
}

const Application = () => {
  const [state, setState] = useState<AppointmentState>({
    day: "Monday",
    days: [],
    appointments: {},
  });

  const appointments = getAppointmentsForDay(state, state.day);
  const interviewers = getInterviewersForDay(state, state.day);

  const schedule = appointments.map(
    (appointment: {
      interview: { student: string; interviewer: number };
      id: number;
      time: string;
    }) => {
      const interview = getInterview(state, appointment.interview);
      return (
        <Appointment
          key={appointment.id}
          id={appointment.id}
          time={appointment.time}
          interview={interview}
          interviewers={interviewers}
        />
      );
    }
  );

  const setDay = (
    day: "Monday" | "Tuesday" | "Wednesday" | "Thursday" | "Friday"
  ) => {
    setState(Object.assign({}, state, { day }));
  };

  useEffect(() => {
    Promise.all([
      Axios.get("/api/days"),
      Axios.get("/api/appointments"),
      Axios.get("/api/interviewers"),
    ]).then((all) =>
      setState((prev) => ({
        ...prev,
        days: all[0].data,
        appointments: all[1].data,
        interviewers: all[2].data,
      }))
    );
  }, []);

  return (
    <main className="layout">
      <section className="sidebar">
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
          <DayList days={state.days} value={state.day} setDay={setDay} />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">
        {schedule}
        <Appointment key="last" time="5pm" />
      </section>
    </main>
  );
};

export default Application;
