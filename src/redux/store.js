import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./slides/counterSlice";
import productReducer from "./slides/productSlice";
import userReducer from "./slides/userSlide";
import orderReducer from "./slides/orderSlice";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    user: userReducer,
    product: productReducer,
    order: orderReducer,
  },
});
