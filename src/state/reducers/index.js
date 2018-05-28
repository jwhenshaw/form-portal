import { combineReducers } from "redux";

import userReducer from "./user";
import ordersReducer from "./orders";
import bookedReducer from './booked';
import bookingReducer from './booking';
import * as actionTypes from "../actionTypes";


const appReducer = combineReducers({
  booked: bookedReducer,
  booking: bookingReducer,
  user: userReducer,
  orders: ordersReducer
});

const rootReducer = (state, action) => {
  if (action.type === actionTypes.LOGOUT) {
    state = undefined;
  }
  return appReducer(state, action);
};

export default rootReducer;

// Selectors
export const userSelector = state => state.user;
export const ordersSelector = state => state.orders;
export const bookedSelector = state => state.booked;
export const bookingSelector = state => state.booking;
