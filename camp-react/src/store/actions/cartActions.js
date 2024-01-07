import { cartItems } from "../initalValues/cartItems";

export const ADD_TO_CART = "ADD_TO_CART";
export const REMOVE_FROM_CART = "REMOVE_FROM_CART";
export const SET_CART_ITEMS = "SET_CART_ITEMS";
export const CLEAR_CART = "CLEAR_CART";

export function addToCart(todo) {
  return {
    type: ADD_TO_CART,
    payload: todo,
  };
}

export function removeFromCart(todo) {
  return {
    type: REMOVE_FROM_CART,
    payload: todo,
  };
}

export const setCartItems = (cartItems) => ({
  type: SET_CART_ITEMS,
  payload: cartItems,
});
// cartActions.js
export const clearCartAction = (todo) => {
  return {
    type: "CLEAR_CART",
    payload: todo,
  };
};
