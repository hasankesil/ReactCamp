import { createStoreHook } from "react-redux";
import { createStore } from "redux";
import rootReducer from "./rootReducer";
import { devToolsEnhancer } from "@redux-devtools/extension";

export function configureStore() {
  return createStore(rootReducer, devToolsEnhancer());
}
