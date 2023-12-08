import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  orderItems: [],
  orderItemsSelected: [],
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
      const { amount, image, name, price, discount, product } = action.payload;
      const findProduct = state.orderItems.find(
        (item) => item.product === product
      );
      if (findProduct) {
        findProduct.amount += amount;
      } else {
        state.orderItems.push(action.payload);
      }
    },
    removeMoreProduct: (state, action) => {
      const { checkedList } = action.payload;
      const newCheckedList = state.orderItems.filter(
        (item) => !checkedList.includes(item.product)
      );
      state.orderItems = newCheckedList;
    },
    removeProduct: (state, action) => {
      const { productId } = action.payload;
      const findProduct = state.orderItems.find(
        (item) => item.product === productId
      );
      if (findProduct) {
        const newOrderItems = state.orderItems.filter(
          (item) => item.product !== productId
        );
        state.orderItems = newOrderItems;
      }
    },
    increaseProduct: (state, action) => {
      const { productId } = action.payload;
      const findProduct = state.orderItems.find(
        (item) => item.product === productId
      );
      const findProductSelected = state.orderItemsSelected.find(
        (item) => item.product === productId
      );
      if (findProduct) {
        findProduct.amount++;
      }
      if (findProductSelected) {
        findProductSelected.amount++;
      }
    },
    decreaseProduct: (state, action) => {
      const { productId } = action.payload;
      const findProduct = state.orderItems.find(
        (item) => item.product === productId
      );
      const findProductSelected = state.orderItemsSelected.find(
        (item) => item.product === productId
      );
      if (findProduct) {
        if (findProduct.amount > 1) {
          findProduct.amount--;
        }
      }
      if (findProductSelected) {
        if (findProductSelected.amount > 1) {
          findProductSelected.amount--;
        }
      }
    },
    addOrderItemsSelected: (state, action) => {
      const { checkedList } = action.payload;
      let arrChecked = [];
      state.orderItems.forEach((item) => {
        if (checkedList.includes(item.product)) {
          arrChecked.push(item);
        }
      });
      state.orderItemsSelected = arrChecked;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  addProductToCart,
  removeProduct,
  removeMoreProduct,
  increaseProduct,
  decreaseProduct,
  addOrderItemsSelected,
} = orderSlice.actions;

export default orderSlice.reducer;
