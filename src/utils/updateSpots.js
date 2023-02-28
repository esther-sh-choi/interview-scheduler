// Returns a new days array with the updated spots
export const updateSpots = (state, appointments, appointmentId) => {
  return state.days.map((day) => {
    if (day.appointments.includes(appointmentId)) {
      let spots = 5;
      for (const id of day.appointments) {
        if (appointments[id].interview) {
          spots--;
        }
      }
      return { ...day, spots };
    }
    return day;
  });
};
