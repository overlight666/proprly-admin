/* eslint-disable prettier/prettier */
// import type { PayloadAction } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import type { RootState } from "../store";
import { getAllBuilders, getAllLeads, registerLead } from "./reducers";
import type { Lead, LeadState } from "../../types";

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
  selectedLead: undefined,
  loading: false,
  leadData: leadInitialValue,
  isIdle: true,
  builderList: [],
  loadingBuilders: false,
  loadingLeads: false,
  leadList: undefined,
};

export const leadSlice = createSlice({
  name: "lead",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    selectLead: (state, action: PayloadAction<Lead>) => {
      state.selectedLead = action.payload;
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
      state.builderList = undefined;
    });
    builder.addCase(getAllBuilders.fulfilled, (state, action) => {
      state.builderList = action.payload;
      state.loadingBuilders = false;
    });
    builder.addCase(getAllBuilders.rejected, (state) => {
      state.loadingBuilders = false;
    });
    builder.addCase(getAllLeads.pending, (state) => {
      state.loadingLeads = true;
    });
    builder.addCase(getAllLeads.fulfilled, (state, action) => {
      state.leadList =
        action.payload && action.payload.data
          ? action.payload.data
          : action.payload;
      state.loadingLeads = false;
    });
    builder.addCase(getAllLeads.rejected, (state) => {
      state.loadingLeads = false;
    });
  },
});

export const { selectLead } = leadSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectCount = (state: RootState) => state.counter.value;

export default leadSlice.reducer;
