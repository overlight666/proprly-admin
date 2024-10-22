// import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
// import type { RootState } from "../store";
import type { UserState } from "../../types";
import { loginUser } from "./reducers";

// Define the initial state using that type
const initialState: UserState = {
  userData: {
    error: "",
    message: "",
    token: "",
    user: undefined,
  },
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
  },
  extraReducers: (builder) => {
    builder.addCase(loginUser.pending, (state) => {
      state.isIdle = false;
    });
    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.userData = action.payload;
      state.isIdle = true;
    });
    builder.addCase(loginUser.rejected, (state) => {
      state.isIdle = true;
    });
  },
});

// export const { increment, decrement, incrementByAmount } = userSlice.actions;

// Other code such as selectors can use the imported `RootState` type
// export const selectCount = (state: RootState) => state.counter.value;

export default userSlice.reducer;
