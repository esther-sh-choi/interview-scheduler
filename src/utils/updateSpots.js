// Returns a new days array with the updated spots
export const updateSpots = (state, appointments, appointmentId) => {
  const days = state.days.map((day) => {
    if (day.appointments.includes(appointmentId)) {
      // const dayCopy = JSON.parse(JSON.stringify(day));
      if (appointments[appointmentId].interview) {
        day.spots--;
      } else {
        day.spots++;
      }
      // return dayCopy;
    }
    return day;
  });

  return days;
};
