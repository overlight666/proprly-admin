/* eslint-disable prettier/prettier */
// import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import type { AppState } from "../../types";
import { getAllCountries, getAllRegions, getGlobalConfig } from "./reducers";

// Define the initial state using that type

const initialState: AppState = {
  isGrid: true,
  projectTab: 1,
  projectTabMain: 0,
  propertyTab: 1,
  orgTab: 1,
  appointmentTab: 1,
  regions: [],
  countries: [],
  config: undefined,
};

export const appSlice = createSlice({
  name: "application",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    updateGrid: (state, action) => {
      state.isGrid = action.payload;
    },
    updateProjectTab: (state, action) => {
      state.projectTab = action.payload;
    },
    updateAppointmentTab: (state, action) => {
      state.appointmentTab = action.payload;
    },
    updateProjectTabMain: (state, action) => {
      state.projectTabMain = action.payload;
    },
    updateOrgTab: (state, action) => {
      state.orgTab = action.payload;
    },
    updatePropertyTab: (state, action) => {
      state.propertyTab = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getAllRegions.pending, (state) => {
      state.regions = [];
    });
    builder.addCase(getAllRegions.fulfilled, (state, action) => {
      state.regions =
        action.payload && action.payload.data
          ? action.payload.data
          : action.payload;
    });
    builder.addCase(getAllRegions.rejected, (state) => {
      state.regions = [];
    });
    builder.addCase(getAllCountries.pending, (state) => {
      state.countries = [];
    });
    builder.addCase(getAllCountries.fulfilled, (state, action) => {
      state.countries =
        action.payload && action.payload.data
          ? action.payload.data
          : action.payload;
    });
    builder.addCase(getAllCountries.rejected, (state) => {
      state.countries = [];
    });
    builder.addCase(getGlobalConfig.pending, (state) => {
      state.config = undefined;
    });
    builder.addCase(getGlobalConfig.fulfilled, (state, action) => {
      state.config =
        action.payload && action.payload.data
          ? action.payload.data
          : action.payload;
    });
    builder.addCase(getGlobalConfig.rejected, (state) => {
      state.config = undefined;
    });
  },
});

export const {
  updateGrid,
  updateProjectTab,
  updateOrgTab,
  updatePropertyTab,
  updateProjectTabMain,
  updateAppointmentTab,
} = appSlice.actions;

// Other code such as selectors can use the imported `RootState` type
// export const selectCount = (state: RootState) => state.counter.value;

export default appSlice.reducer;
