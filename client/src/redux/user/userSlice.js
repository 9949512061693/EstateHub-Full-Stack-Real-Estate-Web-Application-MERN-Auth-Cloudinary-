import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentUser: null,
  error: null,
  loading: false,
  darkTheme: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    userLogout: (state, action) => {
      state.currentUser = action.payload;
    },
    toggleTheme: (state) => {
      state.darkTheme = !state.darkTheme;
    },
    signInStart: (state) => {
      state.loading = true;
    },
    updateNewData: (state, action) => {
      state.currentUser = action.payload;
    },

    signSuccess: (state, action) => {
      state.currentUser = action.payload;
      state.loading = false;
      state.error = null;
    },
    signInFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export const {
  updateNewData,
  signInStart,
  signInFailure,
  signSuccess,
  toggleTheme,
  userLogout,
} = userSlice.actions;

export default userSlice.reducer;
