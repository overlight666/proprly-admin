/* eslint-disable prettier/prettier */
// import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import type { PropertyState } from "../../types";
import { getProperties, registerProperty } from "./reducers";

// Define the initial state using that type

const initialState: PropertyState = {
  propertyData: undefined,
  isIdle: true,
  propertyResponse: undefined,
};

export const propertySlice = createSlice({
  name: "property",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    clearPropertyResponse: (state) => {
      state.propertyResponse = undefined;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(registerProperty.pending, (state) => {
      state.isIdle = false;
    });
    builder.addCase(registerProperty.fulfilled, (state, action) => {
      state.propertyResponse = action.payload;
      state.isIdle = true;
    });
    builder.addCase(registerProperty.rejected, (state) => {
      state.isIdle = true;
    });
    builder.addCase(getProperties.pending, (state) => {
      state.isIdle = false;
    });
    builder.addCase(getProperties.fulfilled, (state, action) => {
      state.propertyData =
        action.payload && action.payload.data
          ? action.payload.data
          : action.payload;
      state.isIdle = true;
    });
    builder.addCase(getProperties.rejected, (state) => {
      state.isIdle = true;
    });
  },
});

export const { clearPropertyResponse } = propertySlice.actions;
export default propertySlice.reducer;
