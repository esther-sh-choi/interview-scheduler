// Returns a new days array with the updated spots
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
