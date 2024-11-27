/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
// import type { PayloadAction } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import type { Property, PropertyState } from "../../types";
import {
  attachPropertyUserReducer,
  getAllDefectResolutionReducer,
  getDefectResolutionByIdReducer,
  getProperties,
  getSingleProperty,
  patchProperty,
  registerProperty,
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
};

export const propertySlice = createSlice({
  name: "property",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    clearAttachedUsers: (state) => {
      state.attachedUser = undefined;
    },
    clearPropertyResponse: (state) => {
      state.propertyResponse = undefined;
    },
    selectProperty: (state, action: PayloadAction<Property | undefined>) => {
      state.selectedProperty = action.payload;
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
      }
    );
    builder.addCase(getAllDefectResolutionReducer.rejected, (state) => {
      state.isIdle = true;
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
      }
    );
    builder.addCase(getDefectResolutionByIdReducer.rejected, (state) => {
      // state.loadingDefect = false;
      state.defect = undefined;
    });
  },
});

export const { clearPropertyResponse, selectProperty, clearAttachedUsers } =
  propertySlice.actions;
export default propertySlice.reducer;
