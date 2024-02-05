import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    loading: null,
    user: {
      uid: "",
      name: "",
      admin: null,
    },
  },
  reducers: {
    onAuth: (state, { payload }) => {
      state.user = payload;
    },
    onLogout: (state) => {
      state.user = {
        uid: "",
        name: "",
        admin: null,
      };
    },
    setLoading: (state, { payload }) => {
      state.loading = payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { onAuth, onLogout, setLoading } = authSlice.actions;
