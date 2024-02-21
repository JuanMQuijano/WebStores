import { createSlice } from "@reduxjs/toolkit";

export const productsSlice = createSlice({
  name: "products",
  initialState: {
    loading: null,
    product: {},
    products: [],
  },
  reducers: {
    setProducts: (state, { payload }) => {
      state.products = payload;
      state.product = {};
    },
    setProduct: (state, { payload }) => {
      state.product = payload;
    },
    setLoading: (state, { payload }) => {
      state.loading = payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setProducts, setProduct, setLoading } = productsSlice.actions;
