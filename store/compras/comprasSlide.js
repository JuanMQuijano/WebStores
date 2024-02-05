import { createSlice } from "@reduxjs/toolkit";

export const comprasSlice = createSlice({
  name: "compras",
  initialState: {
    loading: null,
    compras: [],
  },
  reducers: {
    setCompras: (state, { payload }) => {
      state.compras = payload;
    },
    setLoading: (state, { payload }) => {
      state.loading = payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setLoading, setCompras } = comprasSlice.actions;
