import { createSlice } from "@reduxjs/toolkit";

export const categoriasSlice = createSlice({
  name: "categorias",
  initialState: {
    categorias: [],
    categoria: {},
    loading: null,
  },
  reducers: {
    setCategorias: (state, { payload }) => {
      state.categorias = payload;
      state.categoria = {};
    },
    setLoading: (state, { payload }) => {
      state.loading = payload;
    },
    setCategoria: (state, { payload }) => {
      state.categoria = payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setCategorias, setLoading, setCategoria } =
  categoriasSlice.actions;
