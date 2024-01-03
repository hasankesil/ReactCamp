export const ADD_TO_CART = "ADD_TO_CART";
export const REMOVE_FROM_CART = "REMOVE_FROM_CART";

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
