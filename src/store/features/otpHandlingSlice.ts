/* eslint-disable prettier/prettier */
// import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
// import type { RootState } from "../store";
import { resendOtpVerify, VerifyOtp } from "./reducers";
import type { OtpState } from "../../types";

const initialState: OtpState = {
  verifying: false,
  otpResponse: null,
  resendResponse: null,
};

export const OtpSlice = createSlice({
  name: "otp",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    clearOtp: (state) => {
      state.otpResponse = null;
    },
    clearResendResponse: (state) => {
      state.resendResponse = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(VerifyOtp.pending, (state) => {
      state.verifying = true;
    });
    builder.addCase(VerifyOtp.fulfilled, (state, action) => {
      state.otpResponse = action.payload;
      state.verifying = false;
    });
    builder.addCase(VerifyOtp.rejected, (state) => {
      state.verifying = false;
    });
    builder.addCase(resendOtpVerify.pending, (state) => {
      state.verifying = true;
    });
    builder.addCase(resendOtpVerify.fulfilled, (state, action) => {
      state.resendResponse = action.payload;
      state.verifying = false;
    });
    builder.addCase(resendOtpVerify.rejected, (state) => {
      state.verifying = false;
    });
  },
});

export const { clearOtp, clearResendResponse } = OtpSlice.actions;

// Other code such as selectors can use the imported `RootState` type
// export const selectCount = (state: RootState) => state.counter.value;

export default OtpSlice.reducer;
