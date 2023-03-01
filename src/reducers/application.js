import { updateSpots } from "utils/updateSpots";

/****************************** Object Lookup Pattern ******************************/

// These keys for the reducer object will be exported to be used in the useApplicationData hook
export const SET_DAY = "SET_DAY";
export const SET_APPLICATION_DATA = "SET_APPLICATION_DATA";
export const SET_INTERVIEW = "SET_INTERVIEW";

// reducer object that defines the methods of [action.type]s
const reducers = {
  /**
   * Returns the new state with the updated day when user selects the day from the day list.
   *
   * @param {object} state The current state of day, days, appointments, and interviewers of the entire app.
   * @param {object} action The actions contains the action value of day (string -> e.g., "Monday", "Tuesday", etc.).
   * @return {object} new updated state that includes the newly selected day.
   */
  SET_DAY(state, action) {
    const { day } = action;
    return { ...state, day };
  },
  /**
   * Returns the new state with the days, appointments, and interviewers whenever page makes a GET request to API for any new/updated data.
   *
   * @param {object} state The current state of day, days, appointments, and interviewers of the entire app.
   * @param {object} action The actions contains the action value of days (array), appointments (object), and interviewers (object).
   * @return {object} new state that includes the updated days, appointments, and interviewers arrays.
   */
  SET_APPLICATION_DATA(state, action) {
    const { days, appointments, interviewers } = action;

    return {
      ...state,
      days,
      appointments,
      interviewers,
    };
  },
  /**
   * Returns the new state with the updated days (array) and appointments (objects) when user add/edit/deletes an appointment with the PUT/DELETE request to API.
   *
   * @param {object} state The current state of day, days, appointments, and interviewers of the entire app.
   * @param {object} action The actions contains the action value of appointment id (number) and interview (object).
   * @return {object} new state that includes the updated days and appointments of one updated appointment with the new interview object.
   */
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

    // Use the function to get the days array with the updated number of spots
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
    case SET_INTERVIEW:
      return reducers[SET_INTERVIEW](state, action);

    default:
      throw new Error(
        `Tried to reduce with unsupported action type: ${action.type}`
      );
  }
}

export default reducer;
