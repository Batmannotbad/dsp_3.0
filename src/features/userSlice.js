import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user:{},
    isLoggedIn:false,
    token: null,
    role:null
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
      state.role = null;
    },
    setRole: (state,action) => {
      state.role = action.payload;
    }
    // saveToken: (state, action) => {
    //   state.token = action.payload;
    // },
  },
});
export const { login, logout,setRole } = userSlice.actions;
export default userSlice.reducer;
