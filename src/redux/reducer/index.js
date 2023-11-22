import { combineReducers ,createStore } from "redux";
import storage from "redux-persist/lib/storage";

import { persistStore, persistReducer } from "redux-persist";
import {
  setIsLoading,
  snacbarReducer,
  tempPathReducer,
} from "./defaultReducer";
import { adminReducer } from "./adminReducer";


const allAdminReducer = combineReducers({
  admin:adminReducer,
  snackbar: snacbarReducer,
  loading: setIsLoading,
  // tempSideMenuPath: tempPathReducer,
});
const reducer = allAdminReducer;
const persistConfig = {
  key: "root",
  storage,
  whitelist: ["admin"],
};
const adminPersistReducer = persistReducer(persistConfig, reducer);
export const store = createStore(
  adminPersistReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  // process.env.NODE_ENV !== 'production'
);
export const persistor = persistStore(store);
// export default allAdminReducer;
