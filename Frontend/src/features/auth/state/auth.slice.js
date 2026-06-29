import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "authSlice",
  initialState: {
    user: null,
    loading: false,
    error: null,
    isHydrating: true,
  },

  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    setIsHydrating: (state, action) => {
      state.isHydrating = action.payload;
    },
  },
});

export const { setUser, setLoading, setError, setIsHydrating } = authSlice.actions;

export default authSlice.reducer;
