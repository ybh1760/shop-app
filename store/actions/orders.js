export const ADD_ORDERS = "ADD_ORDERS";

export const addOrders = (item, amount) => {
  return { type: ADD_ORDERS, orderData: { item: item, totalAmount: amount } };
};
