import { createSlice } from "@reduxjs/toolkit";

export const cotizacionesSlice = createSlice({
  name: "cotizaciones",
  initialState: {
    loading: null,
    cotizaciones: [],
  },
  reducers: {
    setCotizaciones: (state, { payload }) => {
      state.cotizaciones = payload;
    },
    setLoading: (state, { payload }) => {
      state.loading = payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setLoading, setCotizaciones } = cotizacionesSlice.actions;
