import * as actionTypes from "../../../state/actionTypes";

// Bookings
export const setBookings = bookings => ({
  type: actionTypes.SET_BOOKINGS,
  bookings
});

// Orders
export const setPurchaseOrders = purchaseOrders => ({
  type: actionTypes.SET_PURCHASE_ORDERS,
  purchaseOrders
});

export const removePurchaseOrders = purchaseOrders => ({
  type: actionTypes.REMOVE_PURCHASE_ORDERS,
  purchaseOrders
});

// Booking
export const setBookingOrders = purchaseOrders => ({
  type: actionTypes.SET_BOOKING_ORDERS,
  purchaseOrders
});
export const setBookingDate = date => ({
  type: actionTypes.SET_BOOKING_DATE,
  date
});
export const setBookingTime = time => ({
  type: actionTypes.SET_BOOKING_TIME,
  time
});
export const setBookingQuantity = quantity => ({
  type: actionTypes.SET_BOOKING_QUANTITY,
  quantity
});
