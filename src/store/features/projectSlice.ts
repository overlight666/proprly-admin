/* eslint-disable prettier/prettier */
// import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import type { RootState } from "../store";
import {
  getProjects,
  getTowersReducer,
  postTower,
  registerProject,
} from "./reducers";
import type { ProjectState } from "../../types";

// Define the initial state using that type
const initialValue = {
  name: "",
  organizationId: 0,
  type: "",
  maintenance_service_type: "",
  address: "",
  image: "",
};

const initialState: ProjectState = {
  projectData: initialValue,
  isIdle: true,
  projectResponse: undefined,
  towerResponse: {},
  towerData: [],
  projectList: [],
};

export const projectSlice = createSlice({
  name: "project",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    clearProject: (state) => {
      state.projectResponse = undefined;
      state.towerResponse = {};
      state.towerData = [];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(registerProject.pending, (state) => {
      state.isIdle = false;
    });
    builder.addCase(registerProject.fulfilled, (state, action) => {
      state.projectResponse = action.payload;
      state.isIdle = true;
    });
    builder.addCase(registerProject.rejected, (state) => {
      state.isIdle = true;
    });
    //get projects
    builder.addCase(getProjects.pending, (state) => {
      state.isIdle = false;
    });
    builder.addCase(getProjects.fulfilled, (state, action) => {
      state.projectList = action.payload;
      state.isIdle = true;
    });
    builder.addCase(getProjects.rejected, (state) => {
      state.isIdle = true;
    });
    //post tower
    builder.addCase(postTower.pending, (state) => {
      state.isIdle = false;
    });
    builder.addCase(postTower.fulfilled, (state, action) => {
      state.towerResponse = action.payload.data
        ? action.payload.data
        : action.payload;
      state.isIdle = true;
    });
    builder.addCase(postTower.rejected, (state) => {
      state.isIdle = true;
    });
    //get towers
    builder.addCase(getTowersReducer.pending, (state) => {
      state.isIdle = false;
    });
    builder.addCase(getTowersReducer.fulfilled, (state, action) => {
      state.towerData = action.payload.projectTower;
      state.isIdle = true;
    });
    builder.addCase(getTowersReducer.rejected, (state) => {
      state.isIdle = true;
    });
  },
});

export const { clearProject } = projectSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectCount = (state: RootState) => state.counter.value;

export default projectSlice.reducer;
