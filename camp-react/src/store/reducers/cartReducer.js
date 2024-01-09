//cartReducer.js
import {
  ADD_TO_CART,
  REMOVE_FROM_CART,
  SET_CART_ITEMS,
} from "../actions/cartActions";
import { cartItems } from "../initalValues/cartItems";

const initialState = {
  cartItems: cartItems,
};

export default function cartReducer(state = initialState, { type, payload }) {
  switch (type) {
    case ADD_TO_CART:
      let todo = state.cartItems.find((c) => c.todo.id === payload.id);
      if (todo) {
        if (todo.quantity === undefined || isNaN(todo.quantity)) {
          todo.quantity = 1;
        } else {
          todo.quantity++;
        }
        return { ...state };
      } else {
        return {
          ...state,
          cartItems: [...state.cartItems, { quantity: 1, todo: payload }],
        };
      }

    case REMOVE_FROM_CART:
      let existingProductIndex = state.cartItems.findIndex(
        (c) => c.todo.id === payload.id
      );

      if (existingProductIndex !== -1) {
        let existingProduct = state.cartItems[existingProductIndex];

        if (existingProduct.quantity > 1) {
          existingProduct.quantity--;
        } else {
          return {
            ...state,
            cartItems: [
              ...state.cartItems.slice(0, existingProductIndex),
              ...state.cartItems.slice(existingProductIndex + 1),
            ],
          };
        }

        return { ...state };
      }

      return state;

    case SET_CART_ITEMS:
      return {
        ...state,
        cartItems: payload,
      };

    default:
      return state;
  }
}
