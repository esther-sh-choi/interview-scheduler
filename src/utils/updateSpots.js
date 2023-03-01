/**
 * Returns the array of days with the updated number of interview spots available.
 *
 * @param {object} state The current state of days, appointments, and interviewers of entire app.
 * @param {array} appointments The new updated appointments when user add/edit/deletes an appointment. NOT state.appointments.
 * @param {number} appointmentId The appointmentId that the user updated.
 * @return {array} new updated days arrays that includes the calculated spots available.
 */
export const updateSpots = (state, appointments, appointmentId) => {
  return state.days.map((day) => {
    if (day.appointments.includes(appointmentId)) {
      const emptyAppointments = day.appointments.filter(
        (id) => !appointments[id].interview
      );
      const spots = emptyAppointments.length;

      return { ...day, spots };
    }
    return day;
  });
};
