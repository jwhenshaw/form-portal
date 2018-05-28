import * as actionTypes from "../actionTypes";

const removeOrders = (orders, toRemove) => {
  const toRemoveKeys = Object.keys(toRemove);
  return Object.keys(orders).reduce((acc, key) => {
    if (toRemoveKeys.includes(key)) return acc;
    return {
      ...acc,
      [key]: orders[key]
    };
  }, {});
};

export default (state = {}, action) => {
  switch (action.type) {
    case actionTypes.SET_PURCHASE_ORDERS:
      return {
        ...state,
        purchaseOrders: action.purchaseOrders
      };
    case actionTypes.REMOVE_PURCHASE_ORDERS: {
      const purchaseOrders = state.purchaseOrders || {};
      const toRemove = action.purchaseOrders;
      const remaining = removeOrders(purchaseOrders, toRemove);
      return {
        ...state,
        purchaseOrders: remaining
      };
    }
    default:
      return state;
  }
};

export const ordersSelector = state => state.purchaseOrders;
export const checkedOrdersSelector = state => {
  const orders = state.purchaseOrders;
  return Object.keys(orders).reduce((acc, key) => {
    if (!orders[key].checked) return acc;

    return {
      ...acc,
      [key]: orders[key]
    };
  }, {});
};
