import { ADD_ORDERS } from "../actions/orders";
import Order from "../../models/order";

const initialState = {
  orders: []
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_ORDERS:
      const newOrder = new Order(
        new Date().toString(),
        action.orderData.item,
        action.orderData.totalAmount,
        new Date()
      );
      return {
        ...state,
        orders: state.orders.concat(newOrder)
      };
    default:
      return state;
  }
};
