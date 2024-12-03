/* eslint-disable prettier/prettier */
// import type { PayloadAction } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import type { RootState } from "../store";
import {
  createCommonAreaReducer,
  createProjectUserReducer,
  getAllChecklistReducer,
  getAllCommonAreaReducer,
  getChecklistElementReducer,
  getChecklistZonesReducer,
  getCommonAreaByProjectReducer,
  getCommonAreaReducer,
  getDefectCodeListByProject,
  getProjects,
  getSingleProject,
  getTowersReducer,
  getTradeCodeListByProject,
  patchProject,
  postDefectCode,
  postTower,
  postTradeCode,
  registerProject,
} from "./reducers";
import type {
  FullChecklist,
  FullElements,
  Project,
  ProjectState,
  TowerData,
} from "../../types";

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
  reloadProject: true,
  checklistZones: [],
  checklistElements: [],
  selectedZone: undefined,
  selectedElement: undefined,
  allChecklist: [],
  allCommonArea: [],
  selectedCommonArea: undefined,
  selectedCommonAreaElement: undefined,
  responseStatus: "",
  userType: "",
  userResponse: undefined,
  listCommonAreas: [],
  commonAreaTab: 1,
  commonAreaIdle: true,
  commonAreaResponse: undefined,
  commonAreaItem: undefined,
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
    clearCommonAreaResponse: (state) => {
      state.commonAreaResponse = undefined;
    },
    reloadProjectStatus: (state, action: PayloadAction<boolean>) => {
      state.reloadProject = action.payload;
    },
    selectZone: (state, action: PayloadAction<FullChecklist | undefined>) => {
      state.selectedZone = action.payload;
    },
    selectElement: (state, action: PayloadAction<FullElements | undefined>) => {
      state.selectedElement = action.payload;
    },
    selectCommonArea: (
      state,
      action: PayloadAction<FullChecklist | undefined>
    ) => {
      state.selectedCommonArea = action.payload;
    },
    selectCommonAreaElement: (
      state,
      action: PayloadAction<FullElements | undefined>
    ) => {
      state.selectedCommonAreaElement = action.payload;
    },
    clearProjectList: (state) => {
      state.projectList = [];
      state.loadedProject = false;
    },
    clearTrigger: (state) => {
      state.projectTrigger = false;
    },
    clearSelectedProject: (state) => {
      state.selectedProject = undefined;
    },
    updateSelectedProject: (state, action: PayloadAction<Project>) => {
      state.selectedProject = action.payload;
    },
    updateTowers: (state, action: PayloadAction<TowerData[]>) => {
      state.projectTowers = action.payload;
    },
    clearTradeList: (state) => {
      state.tradeCodeList = [];
      state.defectCodeList = [];
    },
    setResponseStatus: (state, action: PayloadAction<string>) => {
      state.responseStatus = action.payload;
    },
    setUserType: (state, action: PayloadAction<string>) => {
      state.userType = action.payload;
    },
    updateCommonAreaTab: (state, action: PayloadAction<number>) => {
      state.commonAreaTab = action.payload;
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
    builder.addCase(patchProject.pending, (state) => {
      state.isIdle = false;
    });
    builder.addCase(patchProject.fulfilled, (state, action) => {
      state.projectResponse = action.payload;
      state.isIdle = true;
      state.projectTrigger = true;
      state.responseStatus = "project_update";
    });
    builder.addCase(patchProject.rejected, (state) => {
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
      state.towerData = action.payload?.projectTower
        ? action.payload?.projectTower
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
      state.isIdle = false;
    });
    builder.addCase(getSingleProject.fulfilled, (state, action) => {
      state.selectedProject = action.payload;
      state.hasProjectSelected = true;
      state.gettingTowers = false;
      // state.defectCodeList = [];
      // state.tradeCodeList = [];
      state.isIdle = true;
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
      // state.defectCodeList = [];
      state.isIdle = false;
    });
    builder.addCase(getDefectCodeListByProject.fulfilled, (state, action) => {
      state.defectCodeList =
        action.payload && action.payload.data
          ? action.payload.data
          : action.payload;
      state.isIdle = true;
    });
    builder.addCase(getDefectCodeListByProject.rejected, (state) => {
      state.isIdle = true;
    });
    // get All Trade Code
    builder.addCase(getTradeCodeListByProject.pending, (state) => {
      state.tradeCodeList = [];
    });
    builder.addCase(getTradeCodeListByProject.fulfilled, (state, action) => {
      state.tradeCodeList =
        action.payload && action.payload.data
          ? action.payload.data
          : action.payload;
    });
    builder.addCase(getTradeCodeListByProject.rejected, (state) => {
      state.isIdle = true;
    });
    // get checklist zone
    builder.addCase(getChecklistZonesReducer.pending, (state) => {
      state.checklistZones = [];
    });
    builder.addCase(getChecklistZonesReducer.fulfilled, (state, action) => {
      state.checklistZones =
        action.payload && action.payload.data
          ? action.payload.data
          : action.payload;
    });
    builder.addCase(getChecklistZonesReducer.rejected, (state) => {
      state.isIdle = true;
    });
    // get checklist element
    builder.addCase(getChecklistElementReducer.pending, (state) => {
      state.checklistElements = [];
    });
    builder.addCase(getChecklistElementReducer.fulfilled, (state, action) => {
      state.checklistElements =
        action.payload && action.payload.data
          ? action.payload.data
          : action.payload;
    });
    builder.addCase(getChecklistElementReducer.rejected, (state) => {
      state.isIdle = true;
    });
    // get all checklist element
    builder.addCase(getAllChecklistReducer.pending, (state) => {
      state.allChecklist = [];
    });
    builder.addCase(getAllChecklistReducer.fulfilled, (state, action) => {
      state.allChecklist =
        action.payload && action.payload.data
          ? action.payload.data
          : action.payload;
    });
    builder.addCase(getAllChecklistReducer.rejected, (state) => {
      state.isIdle = true;
    });
    // get all common area
    builder.addCase(getAllCommonAreaReducer.pending, (state) => {
      state.allCommonArea = [];
    });
    builder.addCase(getAllCommonAreaReducer.fulfilled, (state, action) => {
      state.allCommonArea =
        action.payload && action.payload.data
          ? action.payload.data
          : action.payload;
    });
    builder.addCase(getAllCommonAreaReducer.rejected, (state) => {
      state.isIdle = true;
    });
    //get common area by project
    builder.addCase(getCommonAreaByProjectReducer.pending, (state) => {
      state.listCommonAreas = [];
      state.isIdle = false;
    });
    builder.addCase(
      getCommonAreaByProjectReducer.fulfilled,
      (state, action) => {
        state.listCommonAreas =
          action.payload && action.payload.data
            ? action.payload.data
            : action.payload;
      }
    );
    builder.addCase(getCommonAreaByProjectReducer.rejected, (state) => {
      state.listCommonAreas = [];
      state.isIdle = true;
    });
    // create project admin
    builder.addCase(createProjectUserReducer.pending, (state) => {
      state.responseStatus = "Adding User";
    });
    builder.addCase(createProjectUserReducer.fulfilled, (state, action) => {
      state.responseStatus = "User Added";
      state.userResponse =
        action.payload && action.payload.data
          ? action.payload.data
          : action.payload;
    });
    builder.addCase(createProjectUserReducer.rejected, (state) => {
      state.responseStatus = "Adding User Failed";
    });
    //create common area
    builder.addCase(createCommonAreaReducer.pending, (state) => {
      state.commonAreaIdle = false;
    });
    builder.addCase(createCommonAreaReducer.fulfilled, (state, action) => {
      state.commonAreaIdle = true;
      state.commonAreaResponse =
        action.payload && action.payload.data
          ? action.payload.data
          : action.payload;
    });
    builder.addCase(createCommonAreaReducer.rejected, (state) => {
      state.commonAreaIdle = true;
    });
    //get common area
    builder.addCase(getCommonAreaReducer.pending, (state) => {
      state.commonAreaIdle = false;
      state.commonAreaItem = undefined;
    });
    builder.addCase(getCommonAreaReducer.fulfilled, (state, action) => {
      state.commonAreaIdle = true;
      state.commonAreaItem =
        action.payload && action.payload.data
          ? action.payload.data
          : action.payload;
    });
    builder.addCase(getCommonAreaReducer.rejected, (state) => {
      state.commonAreaIdle = true;
      state.commonAreaItem = undefined;
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
  reloadProjectStatus,
  clearSelectedProject,
  clearTradeList,
  selectZone,
  selectElement,
  selectCommonAreaElement,
  selectCommonArea,
  setResponseStatus,
  setUserType,
  updateSelectedProject,
  updateCommonAreaTab,
  clearCommonAreaResponse,
} = projectSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectCount = (state: RootState) => state.counter.value;

export default projectSlice.reducer;
