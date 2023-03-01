import { updateSpots } from "utils/updateSpots";

export const SET_DAY = "SET_DAY";
export const SET_APPLICATION_DATA = "SET_APPLICATION_DATA";
export const SET_INTERVIEW = "SET_INTERVIEW";

const reducers = {
  SET_DAY(state, action) {
    const { day } = action;
    return { ...state, day };
  },
  SET_APPLICATION_DATA(state, action) {
    const { days, appointments, interviewers } = action;

    return {
      ...state,
      days,
      appointments,
      interviewers,
    };
  },
  SET_INTERVIEW(state, action) {
    const { id, interview } = action;

    const appointment = {
      ...state.appointments[id],
      interview,
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };

    const days = updateSpots(state, appointments, id);

    return { ...state, appointments, days };
  },
};

function reducer(state, action) {
  switch (action.type) {
    case SET_DAY:
      return reducers[SET_DAY](state, action);
    case SET_APPLICATION_DATA:
      return reducers[SET_APPLICATION_DATA](state, action);
    case SET_INTERVIEW: {
      return reducers[SET_INTERVIEW](state, action);
    }
    default:
      throw new Error(
        `Tried to reduce with unsupported action type: ${action.type}`
      );
  }
}

export default reducer;
