/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
// import type { PayloadAction } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import type { Property, PropertyState } from "../../types";
import {
  attachPropertyUserReducer,
  bookAppointmentReducer,
  cancelAppointmentReducer,
  getAllDefectResolutionReducer,
  getCommonAreaDefectResolutionReducer,
  getCommonAreaReportsReducer,
  getDefectResolutionByIdReducer,
  getProperties,
  getPropertyReportsHistoryReducer,
  getPropertyReportsReducer,
  getSingleProperty,
  patchProperty,
  registerBulkProperty,
  registerProperty,
  rescheduleAppointmentReducer,
  submitFeedbackReducer,
} from "./reducers";

// Define the initial state using that type

const initialState: PropertyState = {
  propertyData: undefined,
  isIdle: true,
  propertyResponse: undefined,
  selectedProperty: undefined,
  attachedUser: undefined,
  defectSubmissions: undefined,
  loadingDefect: false,
  defect: undefined,
  feedbackResponse: undefined,
  appointmentResponse: undefined,
  propertyReports: undefined,
  commonAreaReports: undefined,
  appointmentRefresh: false,
  bulkPropertyResponse: undefined,
  commonAreaDefectSubmissions: undefined,
  propertyReportsHistory: undefined,
};

export const propertySlice = createSlice({
  name: "property",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    clearSubmittion: (state) => {
      state.feedbackResponse = undefined;
    },
    clearAttachedUsers: (state) => {
      state.attachedUser = undefined;
    },
    clearPropertyResponse: (state) => {
      state.propertyResponse = undefined;
    },
    clearPropertyData: (state) => {
      state.propertyData = undefined;
    },
    selectProperty: (state, action: PayloadAction<Property | undefined>) => {
      state.selectedProperty = action.payload;
    },
    clearAppointmentResponse: (state) => {
      state.appointmentResponse = undefined;
    },
    setRefreshAppontments: (state, action: PayloadAction<boolean>) => {
      state.appointmentRefresh = action.payload;
    },
    resetBulkResponse: (state) => {
      state.bulkPropertyResponse = undefined;
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

    builder.addCase(registerBulkProperty.pending, (state) => {
      state.isIdle = false;
      state.bulkPropertyResponse = undefined;
    });
    builder.addCase(registerBulkProperty.fulfilled, (state, action) => {
      state.bulkPropertyResponse =
        action.payload && action.payload.data
          ? action.payload.data
          : action.payload;
      state.isIdle = true;
    });
    builder.addCase(registerBulkProperty.rejected, (state) => {
      state.isIdle = true;
      state.bulkPropertyResponse = undefined;
    });
    builder.addCase(getProperties.pending, (state) => {
      state.isIdle = false;
      state.propertyData = undefined;
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
    builder.addCase(getSingleProperty.pending, (state) => {
      state.isIdle = false;
      state.selectedProperty = undefined;
    });
    builder.addCase(getSingleProperty.fulfilled, (state, action) => {
      state.selectedProperty =
        action.payload && action.payload.data
          ? action.payload.data
          : action.payload;
      state.isIdle = true;
    });
    builder.addCase(getSingleProperty.rejected, (state) => {
      state.isIdle = true;
    });

    builder.addCase(patchProperty.pending, (state) => {
      state.isIdle = false;
      state.selectedProperty = undefined;
    });
    builder.addCase(patchProperty.fulfilled, (state, action) => {
      state.selectedProperty =
        action.payload && action.payload.data
          ? action.payload.data
          : action.payload;
      state.isIdle = true;
    });
    builder.addCase(patchProperty.rejected, (state) => {
      state.isIdle = true;
    });

    builder.addCase(attachPropertyUserReducer.pending, (state) => {
      state.isIdle = false;
      state.attachedUser = undefined;
    });
    builder.addCase(attachPropertyUserReducer.fulfilled, (state, action) => {
      state.attachedUser =
        action.payload && action.payload.data
          ? action.payload.data
          : action.payload;
      state.isIdle = true;
    });
    builder.addCase(attachPropertyUserReducer.rejected, (state) => {
      state.isIdle = true;
    });

    builder.addCase(getAllDefectResolutionReducer.pending, (state) => {
      state.isIdle = false;
    });
    builder.addCase(
      getAllDefectResolutionReducer.fulfilled,
      (state, action) => {
        state.defectSubmissions =
          action.payload && action.payload.data
            ? action.payload.data
            : action.payload;
        state.isIdle = true;
      },
    );
    builder.addCase(getAllDefectResolutionReducer.rejected, (state) => {
      state.isIdle = true;
    });

    //common area

    builder.addCase(getCommonAreaDefectResolutionReducer.pending, (state) => {
      state.isIdle = false;
      state.commonAreaDefectSubmissions = undefined;
    });
    builder.addCase(
      getCommonAreaDefectResolutionReducer.fulfilled,
      (state, action) => {
        state.commonAreaDefectSubmissions =
          action.payload && action.payload.data
            ? action.payload.data
            : action.payload;
        state.isIdle = true;
      },
    );
    builder.addCase(getCommonAreaDefectResolutionReducer.rejected, (state) => {
      state.isIdle = true;
      state.commonAreaDefectSubmissions = undefined;
    });

    builder.addCase(getDefectResolutionByIdReducer.pending, (state) => {
      // state.loadingDefect = true;
      state.defect = undefined;
    });
    builder.addCase(
      getDefectResolutionByIdReducer.fulfilled,
      (state, action) => {
        state.defect =
          action.payload && action.payload.data
            ? action.payload.data
            : action.payload;
        // state.loadingDefect = false;
      },
    );
    builder.addCase(getDefectResolutionByIdReducer.rejected, (state) => {
      // state.loadingDefect = false;
      state.defect = undefined;
    });
    // feedback
    builder.addCase(submitFeedbackReducer.pending, (state) => {
      // state.loadingDefect = true;
      state.feedbackResponse = undefined;
    });
    builder.addCase(submitFeedbackReducer.fulfilled, (state, action) => {
      state.feedbackResponse =
        action.payload && action.payload.data
          ? action.payload.data
          : action.payload;
      // state.loadingDefect = false;
    });
    builder.addCase(submitFeedbackReducer.rejected, (state) => {
      // state.loadingDefect = false;
      state.feedbackResponse = undefined;
    });
    // book appointment
    builder.addCase(bookAppointmentReducer.pending, (state) => {
      // state.loadingDefect = true;
      state.appointmentResponse = undefined;
    });
    builder.addCase(bookAppointmentReducer.fulfilled, (state, action) => {
      state.appointmentResponse =
        action.payload && action.payload.data
          ? action.payload.data
          : action.payload;
      // state.loadingDefect = false;
    });
    builder.addCase(bookAppointmentReducer.rejected, (state) => {
      // state.loadingDefect = false;
      state.appointmentResponse = undefined;
    });
    // resched appointment
    builder.addCase(rescheduleAppointmentReducer.pending, (state) => {
      // state.loadingDefect = true;
      state.appointmentResponse = undefined;
    });
    builder.addCase(rescheduleAppointmentReducer.fulfilled, (state, action) => {
      state.appointmentResponse =
        action.payload && action.payload.data
          ? action.payload.data
          : action.payload;
      // state.loadingDefect = false;
    });
    builder.addCase(rescheduleAppointmentReducer.rejected, (state) => {
      // state.loadingDefect = false;
      state.appointmentResponse = undefined;
    });
    // cancel appointment
    builder.addCase(cancelAppointmentReducer.pending, (state) => {
      // state.loadingDefect = true;
      state.appointmentResponse = undefined;
    });
    builder.addCase(cancelAppointmentReducer.fulfilled, (state, action) => {
      state.appointmentResponse =
        action.payload && action.payload.data
          ? action.payload.data
          : action.payload;
      // state.loadingDefect = false;
    });
    builder.addCase(cancelAppointmentReducer.rejected, (state) => {
      // state.loadingDefect = false;
      state.appointmentResponse = undefined;
    });
    //property reports
    builder.addCase(getPropertyReportsReducer.pending, (state) => {
      state.propertyReports = undefined;
    });
    builder.addCase(getPropertyReportsReducer.fulfilled, (state, action) => {
      state.propertyReports =
        action.payload && action.payload.data
          ? action.payload.data
          : action.payload;
    });
    builder.addCase(getPropertyReportsReducer.rejected, (state) => {
      state.propertyReports = undefined;
    });

    // property report history

    builder.addCase(getPropertyReportsHistoryReducer.pending, (state) => {
      state.propertyReportsHistory = undefined;
    });
    builder.addCase(
      getPropertyReportsHistoryReducer.fulfilled,
      (state, action) => {
        state.propertyReportsHistory =
          action.payload && action.payload.data
            ? action.payload.data
            : action.payload;
      }
    );
    builder.addCase(getPropertyReportsHistoryReducer.rejected, (state) => {
      state.propertyReportsHistory = undefined;
    });
    //common Area reports
    builder.addCase(getCommonAreaReportsReducer.pending, (state) => {
      state.commonAreaReports = undefined;
    });
    builder.addCase(getCommonAreaReportsReducer.fulfilled, (state, action) => {
      state.commonAreaReports =
        action.payload && action.payload.data
          ? action.payload.data
          : action.payload;
    });
    builder.addCase(getCommonAreaReportsReducer.rejected, (state) => {
      state.commonAreaReports = undefined;
    });
  },
});

export const {
  clearPropertyResponse,
  selectProperty,
  clearAttachedUsers,
  clearSubmittion,
  clearAppointmentResponse,
  clearPropertyData,
  setRefreshAppontments,
  resetBulkResponse,
} = propertySlice.actions;
export default propertySlice.reducer;
