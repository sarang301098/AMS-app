import { applyMiddleware, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import Thunk from "redux-thunk";
import reducers from "./rootReducer";
import { apiMiddleware } from "../middlewares/middleware";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["user", "purchase"],
};
const persistedReducer = persistReducer(persistConfig, reducers);

const store: ReturnType<typeof createStore> = createStore(
  persistedReducer,
  composeWithDevTools(applyMiddleware(Thunk), applyMiddleware(apiMiddleware))
);

export const persistor = persistStore(store);
export default store;
