import { ADD_TO_CART, REMOVE_FROM_CART } from "../actions/cart";
import CartItem from "../../models/cart-item";
import { ADD_ORDERS } from "../actions/orders";

const initialState = {
  items: {},
  totalAmount: 0
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      const addedProduct = action.product;
      const productTitle = addedProduct.title;
      const productPrice = addedProduct.price;

      let updateOrNewCartItem;
      if (state.items[addedProduct.id]) {
        updateOrNewCartItem = new CartItem(
          state.items[addedProduct.id].quantity + 1,
          productPrice,
          productTitle,
          state.items[addedProduct.id].sum + productPrice
        );
      } else {
        updateOrNewCartItem = new CartItem(
          1,
          productPrice,
          productTitle,
          productPrice
        );
      }
      return {
        ...state,
        items: { ...state.items, [addedProduct.id]: updateOrNewCartItem },
        totalAmount: state.totalAmount + productPrice
      };
    case REMOVE_FROM_CART:
      const selectedCartItem = state.items[action.pid];
      const currentQty = selectedCartItem.quantity;

      let updatedCartItems;
      if (currentQty > 1) {
        const updatedCartItem = new CartItem(
          selectedCartItem.quantity - 1,
          selectedCartItem.price,
          selectedCartItem.title,
          selectedCartItem.sum - selectedCartItem.price
        );
        updatedCartItems = { ...state.items, [action.pid]: updatedCartItem };
      } else {
        updatedCartItems = { ...state.items };
        delete updatedCartItems[action.pid];
      }
      return {
        ...state,
        items: updatedCartItems,
        totalAmount: state.totalAmount - selectedCartItem.price
      };
    case ADD_ORDERS:
      return initialState;
    default:
      return state;
  }
};
