/* eslint-disable @typescript-eslint/no-explicit-any */
// import type { PayloadAction } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
// import type { RootState } from "../store";
import type { userData, UserState } from "../../types";
import { loginUser } from "./reducers";

// Define the initial state using that type
const initialState: UserState = {
  userData: {
    error: "",
    message: "",
    token: "",
    user: undefined,
  },
  loginTrigger: false,
  isIdle: true,
};

export const userSlice = createSlice({
  name: "user",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    clearUser: (state) => {
      state.userData.message = "";
      state.userData.token = "";
      state.userData.user = undefined;
    },
    updateUserData: (state, action: PayloadAction<userData>) => {
      state.userData.user = action.payload;
    },
    clearLoginTrigger: (state) => {
      state.loginTrigger = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loginUser.pending, (state) => {
      state.isIdle = false;
    });
    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.userData = action.payload;
      state.isIdle = true;
      state.loginTrigger = true;
    });
    builder.addCase(loginUser.rejected, (state) => {
      state.isIdle = true;
    });
  },
});

export const { clearUser, updateUserData, clearLoginTrigger } =
  userSlice.actions;

// Other code such as selectors can use the imported `RootState` type
// export const selectCount = (state: RootState) => state.counter.value;

export default userSlice.reducer;
