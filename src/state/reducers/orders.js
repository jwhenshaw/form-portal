import * as actionTypes from '../actionTypes';

const removeOrders = (orders, toRemove) => {
  const toRemoveIds = toRemove.map(order => order.id);
  return orders.filter(order => !toRemoveIds.includes(order.id));
};

export default (state = {}, action) => {
  switch (action.type) {
    case actionTypes.SET_PURCHASE_ORDERS:
      return {
        ...state,
        purchaseOrders: action.purchaseOrders,
      };
    case actionTypes.REMOVE_PURCHASE_ORDERS: {
      const purchaseOrders = state.purchaseOrders || [];
      const toRemove = action.purchaseOrders || [];
      const remaining = removeOrders(purchaseOrders, toRemove);
      return {
        ...state,
        purchaseOrders: remaining,
      };
    }
    default:
      return state;
  }
};

export const ordersSelector = state => state.purchaseOrders;
export const checkedOrdersSelector = state => {
  const orders = state.purchaseOrders || [];
  return orders.reduce((acc, order) => {
    if (!order.checked) return acc;
    return [...acc, order];
  }, []);
};
