import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // LocalStorage as storage
import sidebarReducer from "../features/sidebarSlice";
import cartReducer from "../features/cartSlice";
import productReducer from "../features/productSlice";
import wishlistReducer from "../features/wishlistSlice";
import themeReducer from "../features/themeSlice";
import {
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";

const rootReducer = combineReducers({
  sidebar: sidebarReducer,
  cart: cartReducer,
  products: productReducer,
  wishlist: wishlistReducer,
  theme: themeReducer,
});

//Redux Persist Configuration
const persistConfig = {
  key: "root",
  storage,
  whitelist: ["cart", "wishlist"], //Only persist cart and wishlist slices
};

//Wrap Reducers with Persist Reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

//Create Store with Persist Middleware
const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

//Create Persistor
const persistor = persistStore(store);

export { store, persistor };
