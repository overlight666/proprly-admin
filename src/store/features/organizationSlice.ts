/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable prettier/prettier */
// import type { PayloadAction } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import type { RootState } from "../store";
import {
  addOrgUser,
  getOneOrg,
  getOrganizationDashboardReducer,
  getOrganizations,
  registerOrg,
  updateOrg,
} from "./reducers";
import type { Organization, OrgState } from "../../types";

// Define the initial state using that type
const initialValue = {
  name: "",
  currency: "",
  dateFormat: "",
  timezone: "",
  id: 0,
};

const initialState: OrgState = {
  loading: false,
  orgData: initialValue,
  isIdle: true,
  orgList: [],
  selectedOrganization: undefined,
  isUpdated: false,
  orgDashboard: undefined,
};

export const organizationSlice = createSlice({
  name: "organization",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    registration: (state) => {
      console.log(state);
    },
    setSelectedOrganization: (
      state,
      action: PayloadAction<Organization | undefined>
    ) => {
      state.selectedOrganization = action.payload;
    },
    clearOrgUpdates: (state) => {
      state.isUpdated = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(registerOrg.pending, (state) => {
      state.loading = true;
      state.isIdle = false;
    });
    builder.addCase(registerOrg.fulfilled, (state, action) => {
      state.selectedOrganization = action.payload;
      state.loading = false;
      state.isIdle = true;
    });
    builder.addCase(registerOrg.rejected, (state) => {
      state.loading = false;
      state.isIdle = true;
    });
    //update organization
    builder.addCase(updateOrg.pending, (state) => {
      state.loading = true;
      state.isIdle = false;
    });
    builder.addCase(updateOrg.fulfilled, (state) => {
      state.isUpdated = true;
      state.loading = false;
      state.isIdle = true;
    });
    builder.addCase(updateOrg.rejected, (state) => {
      state.loading = false;
      state.isIdle = true;
    });
    //get one organization
    builder.addCase(getOneOrg.pending, (state) => {
      state.loading = true;
      state.isIdle = false;
    });
    builder.addCase(getOneOrg.fulfilled, (state, action) => {
      state.selectedOrganization = action.payload;
      state.loading = false;
      state.isIdle = true;
    });
    builder.addCase(getOneOrg.rejected, (state) => {
      state.loading = false;
      state.isIdle = true;
    });
    //get organization
    builder.addCase(getOrganizations.pending, (state) => {
      state.loading = true;
      state.isIdle = false;
      state.orgList = [];
    });
    builder.addCase(getOrganizations.fulfilled, (state, action) => {
      state.orgList = action.payload;
      state.loading = false;
      state.isIdle = true;
    });
    builder.addCase(getOrganizations.rejected, (state) => {
      state.loading = false;
      state.isIdle = true;
      state.orgList = [];
    });
    //add org user
    builder.addCase(addOrgUser.pending, (state) => {
      state.loading = true;
      state.isIdle = false;
    });
    builder.addCase(addOrgUser.fulfilled, (state) => {
      state.isUpdated = true;
      state.loading = false;
      state.isIdle = true;
    });
    builder.addCase(addOrgUser.rejected, (state) => {
      state.loading = false;
      state.isIdle = true;
    });
    //dashboard
    builder.addCase(getOrganizationDashboardReducer.pending, (state) => {
      state.loading = true;
      state.isIdle = false;
      state.orgDashboard = undefined;
    });
    builder.addCase(
      getOrganizationDashboardReducer.fulfilled,
      (state, action) => {
        state.orgDashboard = action.payload;
        state.loading = false;
        state.isIdle = true;
      }
    );
    builder.addCase(getOrganizationDashboardReducer.rejected, (state) => {
      state.loading = false;
      state.isIdle = true;
      state.orgDashboard = undefined;
    });
  },
});

export const { registration, setSelectedOrganization, clearOrgUpdates } =
  organizationSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectCount = (state: RootState) => state.counter.value;

export default organizationSlice.reducer;
