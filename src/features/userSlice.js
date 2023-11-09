import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user:{},
    isLoggedIn:false,
    token: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login: (state, action) => {
      // state.user = { ...state.user, ...action.payload };
      state.isLoggedIn = true;
      state.token = action.payload;
    },
    logout: (state) => {
      // state.user = null;
      state.isLoggedIn = false;
      state.token = null;
    },
    // saveToken: (state, action) => {
    //   state.token = action.payload;
    // },
  },
});
export const { login, logout } = userSlice.actions;
export default userSlice.reducer;
