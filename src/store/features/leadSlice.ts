/* eslint-disable prettier/prettier */
// import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import type { RootState } from "../store";
import { getAllBuilders, registerLead } from "./reducers";
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
  builderList: [],
  loadingBuilders: false,
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
    builder.addCase(getAllBuilders.pending, (state) => {
      state.loadingBuilders = true;
    });
    builder.addCase(getAllBuilders.fulfilled, (state, action) => {
      state.builderList = action.payload;
      state.loadingBuilders = false;
    });
    builder.addCase(getAllBuilders.rejected, (state) => {
      state.loadingBuilders = false;
    });
  },
});

export const { registration } = leadSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectCount = (state: RootState) => state.counter.value;

export default leadSlice.reducer;
