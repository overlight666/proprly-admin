/* eslint-disable prettier/prettier */
// import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import type { RootState } from "../store";
import { registerLead } from "./reducers";
import type { LeadState } from "../../types";

// Define a type for the slice state

const leadInitialValue = {
  fullName: "",
  email: "",
  password: "",
  mobileNumber: "",
  organizationName: "",
  organizationCountryCode: "",
  id: 0,
};
// Define the initial state using that type
const initialState: LeadState = {
  loading: false,
  leadData: leadInitialValue,
  isIdle: true,
};

export const leadSlice = createSlice({
  name: "lead",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    registration: (state) => {
      console.log(state);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(registerLead.pending, (state) => {
      state.loading = true;
      state.isIdle = false;
    });
    builder.addCase(registerLead.fulfilled, (state, action) => {
      state.leadData = action.payload;
      state.loading = false;
      state.isIdle = true;
    });
    builder.addCase(registerLead.rejected, (state) => {
      state.loading = false;
      state.isIdle = true;
    });
  },
});

export const { registration } = leadSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectCount = (state: RootState) => state.counter.value;

export default leadSlice.reducer;
