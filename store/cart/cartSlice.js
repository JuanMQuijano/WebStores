import { createSlice } from "@reduxjs/toolkit";

export const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cart: JSON.parse(localStorage.getItem("cart-licorlab")) || [],
  },
  reducers: {
    addToCart: (state, { payload }) => {
      if (state.cart.some((p) => p.uid === payload.uid)) {
        state.cart = state.cart.map((p) => {
          if (p.uid === payload.uid) {
            p.cantidad++;
            return p;
          } else {
            return p;
          }
        });
      } else {
        state.cart = [...state.cart, payload];
      }

      localStorage.setItem("cart-licorlab", JSON.stringify(state.cart));
    },
    removeFromCart: (state, { payload }) => {
      state.cart.forEach((p) => {
        if (p.uid === payload) {
          if (p.cantidad === 1) {
            state.cart = state.cart.filter((p) => p.uid !== payload);
          } else {
            p.cantidad--;
          }
        }
      });

      localStorage.setItem("cart-licorlab", JSON.stringify(state.cart));
    },
    clearCart: (state) => {
      state.cart = [];
      localStorage.removeItem("cart-licorlab");
    },
  },
});

// Action creators are generated for each case reducer function
export const { addToCart, removeFromCart, clearCart } = cartSlice.actions;
