/* eslint-disable prettier/prettier */
// import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import type { AppState } from "../../types";

// Define the initial state using that type

const initialState: AppState = {
  isGrid: true,
  projectTab: 1,
  orgTab: 1,
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
    updateOrgTab: (state, action) => {
      state.orgTab = action.payload;
    },
  },
});

export const { updateGrid, updateProjectTab, updateOrgTab } = appSlice.actions;

// Other code such as selectors can use the imported `RootState` type
// export const selectCount = (state: RootState) => state.counter.value;

export default appSlice.reducer;
