// cartSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
  itemAmount: 0,
  total: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const item = action.payload;
      const existingItem = state.items.find((i) => i.id === item.id);

      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({ ...item, quantity: 1 });
      }
      state.itemAmount += 1;
      state.total += item.price;
    },
    decreaseQuantity: (state, action) => {
      const itemId = action.payload;
      const item = state.items.find((i) => i.id === itemId);

      if (item && item.quantity > 1) {
        item.quantity -= 1;
        state.itemAmount -= 1;
        state.total -= item.price;
      }
    },
    increaseQuantity: (state, action) => {
      const itemId = action.payload;
      const item = state.items.find((i) => i.id === itemId);

      if (item) {
        item.quantity += 1;
        state.itemAmount += 1;
        state.total += item.price;
      }
    },
    removeFromCart: (state, action) => {
      const itemId = action.payload;
      const item = state.items.find((i) => i.id === itemId);

      if (item) {
        state.items = state.items.filter((i) => i.id !== itemId);
        state.itemAmount -= item.quantity;
        state.total -= item.price * item.quantity;
      }
    },
    clearCart: (state) => {
      state.items = [];
      state.itemAmount = 0;
      state.total = 0;
    },
  },
});

export const {
  addToCart,
  decreaseQuantity,
  increaseQuantity,
  removeFromCart,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;
