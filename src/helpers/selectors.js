export const getAppointmentsForDay = (state, day) => {
  const dayObject = state.days.find((d) => d.name === day);

  if (!state.days || !state.days.length || !dayObject) {
    return [];
  }

  return dayObject.appointments.map((id) => {
    return state.appointments[id];
  });
};

export const getInterview = (state, interview) => {
  if (!interview) {
    return null;
  }

  return {
    ...interview,
    interviewer: state.interviewers[interview.interviewer],
  };
};
