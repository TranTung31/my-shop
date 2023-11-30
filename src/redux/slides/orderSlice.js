import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  orderItems: [],
  shippingAddress: {},
  paymentMethod: "",
  itemsPrice: 0,
  taxPrice: 0,
  totalPrice: 0,
  isPaid: false,
  paidAt: "",
  isDelivered: false,
  delivered: "",
};

export const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    addProductToCart: (state, action) => {
      const { amount, image, name, price, product } = action.payload;
      const findProduct = state.orderItems.find(
        (item) => item.product === product
      );
      if (findProduct) {
        findProduct.amount += amount;
      } else {
        state.orderItems.push(action.payload);
      }
    },
    removeProduct: (state, action) => {
      const { productId } = action.payload;
      const findProduct = state.orderItems.find((item) => item.product === productId);
      if (findProduct) {
        const newOrderItems = state.orderItems.filter((item) => item.product !== productId);
        state.orderItems = newOrderItems;
      }
    }
  },
});

// Action creators are generated for each case reducer function
export const { addProductToCart, removeProduct } = orderSlice.actions;

export default orderSlice.reducer;
