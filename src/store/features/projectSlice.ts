/* eslint-disable prettier/prettier */
// import type { PayloadAction } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import type { RootState } from "../store";
import {
  getDefectCodeListByProject,
  getProjects,
  getSingleProject,
  getTowersReducer,
  getTradeCodeListByProject,
  postDefectCode,
  postTower,
  postTradeCode,
  registerProject,
} from "./reducers";
import type { ProjectState, TowerData } from "../../types";

// Define the initial state using that type
const initialValue = {
  name: "",
  organizationId: 0,
  type: "",
  maintenanceServiceType: "",
  address: "",
  imageId: undefined,
};

const initialState: ProjectState = {
  projectData: initialValue,
  isIdle: true,
  projectResponse: undefined,
  towerResponse: {},
  towerData: [],
  projectList: [],
  projectTowers: [],
  projectTrigger: false,
  loadedProject: false,
  selectedProject: undefined,
  hasProjectSelected: false,
  gettingTowers: false,
  defectCodeList: [],
  defectCodeResponse: undefined,
  tradeCodeResponse: undefined,
  tradeCodeList: [],
  isTradeFired: false,
  isCodeFired: false,
};

export const projectSlice = createSlice({
  name: "project",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    fireTrade: (state) => {
      state.isTradeFired = false;
    },
    fireCode: (state) => {
      state.isCodeFired = false;
    },
    clearProject: (state) => {
      state.projectResponse = undefined;
      state.towerResponse = {};
      state.towerData = [];
    },
    clearProjectList: (state) => {
      state.projectList = [];
      state.loadedProject = false;
    },
    clearTrigger: (state) => {
      state.projectTrigger = false;
    },
    updateTowers: (state, action: PayloadAction<TowerData[]>) => {
      state.projectTowers = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(registerProject.pending, (state) => {
      state.isIdle = false;
    });
    builder.addCase(registerProject.fulfilled, (state, action) => {
      state.projectResponse = action.payload;
      state.isIdle = true;
      state.projectTrigger = true;
    });
    builder.addCase(registerProject.rejected, (state) => {
      state.isIdle = true;
    });
    //get projects
    builder.addCase(getProjects.pending, (state) => {
      state.isIdle = false;
      state.loadedProject = false;
    });
    builder.addCase(getProjects.fulfilled, (state, action) => {
      state.projectList = action.payload;
      state.loadedProject = true;
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
      state.towerData = action.payload.projectTower
        ? action.payload.projectTower
        : action.payload;
      state.isIdle = true;
    });
    builder.addCase(getTowersReducer.rejected, (state) => {
      state.isIdle = true;
    });
    //get one project
    builder.addCase(getSingleProject.pending, (state) => {
      state.gettingTowers = true;
      state.hasProjectSelected = false;
    });
    builder.addCase(getSingleProject.fulfilled, (state, action) => {
      state.selectedProject = action.payload;
      state.hasProjectSelected = true;
      state.gettingTowers = false;
    });
    builder.addCase(getSingleProject.rejected, (state) => {
      state.hasProjectSelected = false;
      state.gettingTowers = false;
    });
    // add defect
    builder.addCase(postDefectCode.pending, (state) => {
      state.defectCodeResponse = undefined;
      state.isCodeFired = true;
      // state.defectCodeList = undefined;
    });
    builder.addCase(postDefectCode.fulfilled, (state, action) => {
      state.defectCodeResponse = action.payload;
    });
    builder.addCase(postDefectCode.rejected, (state) => {
      state.defectCodeResponse = undefined;
    });
    //add trade

    // add defect
    builder.addCase(postTradeCode.pending, (state) => {
      state.tradeCodeResponse = undefined;
      state.isTradeFired = true;
      // state.defectCodeList = undefined;
    });
    builder.addCase(postTradeCode.fulfilled, (state, action) => {
      state.tradeCodeResponse = action.payload;
    });
    builder.addCase(postTradeCode.rejected, (state) => {
      state.tradeCodeResponse = undefined;
    });
    // get All Defect Code
    builder.addCase(getDefectCodeListByProject.pending, (state) => {
      state.defectCodeList = undefined;
    });
    builder.addCase(getDefectCodeListByProject.fulfilled, (state, action) => {
      state.defectCodeList =
        action.payload && action.payload.data
          ? action.payload.data
          : action.payload;
    });
    builder.addCase(getDefectCodeListByProject.rejected, (state) => {
      state.defectCodeList = undefined;
    });
    // get All Trade Code
    builder.addCase(getTradeCodeListByProject.pending, (state) => {
      state.tradeCodeList = undefined;
    });
    builder.addCase(getTradeCodeListByProject.fulfilled, (state, action) => {
      state.tradeCodeList =
        action.payload && action.payload.data
          ? action.payload.data
          : action.payload;
    });
    builder.addCase(getTradeCodeListByProject.rejected, (state) => {
      state.tradeCodeList = undefined;
    });
  },
});

export const {
  clearProject,
  clearTrigger,
  clearProjectList,
  updateTowers,
  fireTrade,
  fireCode,
} = projectSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectCount = (state: RootState) => state.counter.value;

export default projectSlice.reducer;
