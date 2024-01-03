import { ADD_TO_CART, REMOVE_FROM_CART } from "../actions/cartActions";
import { cartItems } from "../initalValues/cartItems";

const initialState = {
  cartItems: cartItems,
};

export default function cartReducer(state = initialState, { type, payload }) {
  switch (type) {
    case ADD_TO_CART:
      let todo = state.cartItems.find((c) => c.todo.id === payload.id);
      if (todo) {
        todo.quantity++;
        return { ...state };
      } else {
        return {
          ...state,
          cartItems: [...state.cartItems, { quantity: 1, todo: payload }],
        };
      }

    case REMOVE_FROM_CART:
      return {
        ...state,
        cartItems: state.cartItems.filter((c) => c.todo.id === payload.id),
      };

    default:
      return state;
  }
}
