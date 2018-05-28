import * as actionTypes from "../actionTypes";

export default (state = {}, action) => {
  switch (action.type) {
    case actionTypes.SET_BOOKINGS:
      return {
        ...state,
        bookings: action.bookings
      };
    default:
      return state;
  }
};

// Selector
export const bookingsSelector = state => state.bookings;
