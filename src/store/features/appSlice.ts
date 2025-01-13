/* eslint-disable prettier/prettier */
// import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import type { AppState } from "../../types";
import {
  getAllCountries,
  getAllDefectResolutionByCommonAreaReducer,
  getAllDefectResolutionByPropertyReducer,
  getAllRegions,
  getGlobalConfig,
  getNotificationsCountReducer,
  getNotificationsReducer,
  getTimeSlotByProjectReducer,
  listUserByRoleReducer,
  updateTimeSlotsReducer,
} from "./reducers";

// Define the initial state using that type

const initialState: AppState = {
  isGrid: true,
  masterTab: 1,
  projectTab: 1,
  projectTabMain: 0,
  propertyTab: 1,
  orgTab: 1,
  appointmentTab: 1,
  regions: [],
  countries: [],
  config: undefined,
  projectUsers: [],
  projectAuditors: [],
  projectSubContractor: [],
  projectStrata: [],
  propertyOwnerList: [],
  timeslot: [],
  timeslotResponse: undefined,
  isCalendarView: true,
  openProjects: [],
  notifications: undefined,
  notificationsCount: undefined,
  propertyDefectSubmissions: undefined,
  commonAreaDefectSubmissions: undefined,
};

const mapDays = {
  monday: 1,
  tuesday: 2,
  wednesday: 3,
  thursday: 4,
  friday: 5,
  saturday: 6,
  sunday: 7,
};

export const appSlice = createSlice({
  name: "application",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    updateGrid: (state, action) => {
      state.isGrid = action.payload;
    },
    updateProjectOpen: (state, action) => {
      if (
        !state.openProjects ||
        (state.openProjects && state.openProjects.length == 0)
      ) {
        state.openProjects = [action.payload];
      } else {
        if (state.openProjects && state.openProjects.length > 0) {
          if (state.openProjects.find((e) => e == action.payload)) {
            state.openProjects = state.openProjects.filter(
              (e) => e != action.payload
            );
          } else {
            state.openProjects = [...state.openProjects, action.payload];
          }
        }
      }
    },
    clearProjectOpen: (state) => {
      state.openProjects = [];
    },
    updateCalendarView: (state, action) => {
      state.isCalendarView = action.payload;
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
    updateMasterTab: (state, action) => {
      state.masterTab = action.payload;
    },
    updateOrgTab: (state, action) => {
      state.orgTab = action.payload;
    },
    updatePropertyTab: (state, action) => {
      state.propertyTab = action.payload;
    },
    clearConfig: (state) => {
      state.config = undefined;
    },
    clearTImeSlot: (state) => {
      state.timeslotResponse = undefined;
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

    builder.addCase(listUserByRoleReducer.pending, (state) => {
      state.projectUsers = [];
    });
    builder.addCase(listUserByRoleReducer.fulfilled, (state, action) => {
      const users =
        action.payload && action.payload.data
          ? action.payload.data
          : action.payload;
      if (action.payload.role === "project_auditor") {
        state.projectAuditors = users;
      } else if (action.payload.role === "project_admin") {
        state.projectUsers = users;
      } else if (action.payload.role === "project_sub_contractor") {
        state.projectSubContractor = users;
      } else if (action.payload.role === "project_strata") {
        state.projectStrata = users;
      } else if (action.payload.role === "property_owner") {
        state.propertyOwnerList = users;
      }
    });
    builder.addCase(listUserByRoleReducer.rejected, (state) => {
      state.projectUsers = [];
    });
    // time slot
    builder.addCase(getTimeSlotByProjectReducer.pending, (state) => {
      state.timeslot = undefined;
    });
    builder.addCase(getTimeSlotByProjectReducer.fulfilled, (state, action) => {
      state.timeslot =
        action.payload &&
        action.payload.length &&
        action.payload.sort((a, b) => {
          return mapDays[a.day] - mapDays[b.day];
        });
    });
    builder.addCase(getTimeSlotByProjectReducer.rejected, (state) => {
      state.timeslot = undefined;
    });
    //update timeslots
    builder.addCase(updateTimeSlotsReducer.pending, (state) => {
      state.timeslotResponse = undefined;
    });
    builder.addCase(updateTimeSlotsReducer.fulfilled, (state, action) => {
      state.timeslotResponse = action.payload;
    });
    builder.addCase(updateTimeSlotsReducer.rejected, (state) => {
      state.timeslotResponse = undefined;
    });
    //get notifications
    builder.addCase(getNotificationsReducer.pending, (state) => {
      state.notifications = undefined;
    });
    builder.addCase(getNotificationsReducer.fulfilled, (state, action) => {
      state.notifications =
        action.payload && action.payload.data
          ? action.payload.data
          : action.payload;
    });
    builder.addCase(getNotificationsReducer.rejected, (state) => {
      state.notifications = undefined;
    });
    //get notifications count
    builder.addCase(getNotificationsCountReducer.pending, (state) => {
      state.notificationsCount = undefined;
    });
    builder.addCase(getNotificationsCountReducer.fulfilled, (state, action) => {
      state.notificationsCount =
        action.payload && action.payload.data
          ? action.payload.data
          : action.payload;
    });
    builder.addCase(getNotificationsCountReducer.rejected, (state) => {
      state.notificationsCount = undefined;
    });

    builder.addCase(
      getAllDefectResolutionByPropertyReducer.pending,
      (state) => {
        state.propertyDefectSubmissions = undefined;
      }
    );
    builder.addCase(
      getAllDefectResolutionByPropertyReducer.fulfilled,
      (state, action) => {
        state.propertyDefectSubmissions =
          action.payload && action.payload.data
            ? action.payload.data
            : action.payload;
      }
    );
    builder.addCase(
      getAllDefectResolutionByPropertyReducer.rejected,
      (state) => {
        state.propertyDefectSubmissions = undefined;
      }
    );

    builder.addCase(
      getAllDefectResolutionByCommonAreaReducer.pending,
      (state) => {
        state.commonAreaDefectSubmissions = undefined;
      }
    );
    builder.addCase(
      getAllDefectResolutionByCommonAreaReducer.fulfilled,
      (state, action) => {
        state.commonAreaDefectSubmissions =
          action.payload && action.payload.data
            ? action.payload.data
            : action.payload;
      }
    );
    builder.addCase(
      getAllDefectResolutionByCommonAreaReducer.rejected,
      (state) => {
        state.commonAreaDefectSubmissions = undefined;
      }
    );
  },
});

export const {
  updateGrid,
  updateProjectTab,
  updateOrgTab,
  updatePropertyTab,
  updateProjectTabMain,
  updateAppointmentTab,
  clearConfig,
  clearTImeSlot,
  updateCalendarView,
  updateProjectOpen,
  clearProjectOpen,
  updateMasterTab,
} = appSlice.actions;

// Other code such as selectors can use the imported `RootState` type
// export const selectCount = (state: RootState) => state.counter.value;

export default appSlice.reducer;
