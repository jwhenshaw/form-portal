import * as actionTypes from "../actionTypes";

export default (
  state = {
    quantity: 1
  },
  action
) => {
  switch (action.type) {
    case actionTypes.SET_BOOKING_ORDERS:
      return {
        ...state,
        purchaseOrders: action.purchaseOrders
      };
    case actionTypes.SET_BOOKING_DATE:
      return {
        ...state,
        date: action.date
      };
    case actionTypes.SET_BOOKING_TIME:
      return {
        ...state,
        time: action.time
      };
    case actionTypes.SET_BOOKING_QUANTITY:
      if (action.quantity < 1) return state;
      return {
        ...state,
        quantity: action.quantity
      };
    default:
      return state;
  }
};

// Selector
export const bookingDateSelector = state => state.date;
export const bookingTimeSelector = state => state.time;
export const bookingQuantitySelector = state => state.quantity;
export const bookingOrdersSelector = state => state.purchaseOrders;
