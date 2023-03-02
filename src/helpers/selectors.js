/**
 * A function that returns the list of appointment IDs for a given day.
 *
 * @param {object} state The current state that includes the day, days, appointments, and interviewers.
 * @param {string} day The selected day (e.g., Monday, Tuesday, Wednesday, Thursday, Friday).
 * @return {array} array containing the appointment IDs for a given day. If an invalid day string or an empty string is passed, the function will return an empty array.
 */
export const getAppointmentsForDay = (state, day) => {
  const dayObject = state.days.find((d) => d.name === day);

  if (!state.days || !state.days.length || !dayObject) {
    return [];
  }

  return dayObject.appointments.map((id) => {
    return state.appointments[id];
  });
};

/**
 * A functions that receives the interview object and returns a new object with updated interview property with an object rather than an ID.
 *
 * @param {object} state The current state that includes the day, days, appointments, and interviewers.
 * @param {object} interview Includes student (string) and interviewer (id : number).
 * @return {object} The returned object is the copy of the interview object, but the interviewer id (number) is replaced with an object containing interviewer id (number), name (string), and avatar url (string).
 */
export const getInterview = (state, interview) => {
  if (!interview) {
    // If interview doesn't exist in the appointment object (where interview object is from), return null.
    return null;
  }

  return {
    ...interview,
    interviewer: state.interviewers[interview.interviewer],
  };
};

/**
 * A function that returns the list of interviewer IDs for a given day.
 *
 * @param {object} state The current state that includes the day, days, appointments, and interviewers.
 * @param {string} day The selected day (e.g., Monday, Tuesday, Wednesday, Thursday, Friday).
 * @return {array} array containing the interview IDs for a given day. If an invalid day string or an empty string is passed, the function will return an empty array.
 */
export const getInterviewersForDay = (state, day) => {
  const dayObject = state.days.find((d) => d.name === day);

  if (!state.days || !state.days.length || !dayObject) {
    return [];
  }

  return dayObject.interviewers.map((id) => {
    return state.interviewers[id];
  });
};
