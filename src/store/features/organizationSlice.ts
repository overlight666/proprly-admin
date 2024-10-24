/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable prettier/prettier */
// import type { PayloadAction } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import type { RootState } from "../store";
import { getOrganizations, registerOrg } from "./reducers";
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
  },
  extraReducers: (builder) => {
    builder.addCase(registerOrg.pending, (state) => {
      state.loading = true;
      state.isIdle = false;
    });
    builder.addCase(registerOrg.fulfilled, (state, action) => {
      state.orgData = action.payload;
      state.loading = false;
      state.isIdle = true;
    });
    builder.addCase(registerOrg.rejected, (state) => {
      state.loading = false;
      state.isIdle = true;
    });
    //get organization
    builder.addCase(getOrganizations.pending, (state) => {
      state.loading = true;
      state.isIdle = false;
    });
    builder.addCase(getOrganizations.fulfilled, (state, action) => {
      state.orgList = action.payload;
      state.loading = false;
      state.isIdle = true;
    });
    builder.addCase(getOrganizations.rejected, (state) => {
      state.loading = false;
      state.isIdle = true;
    });
  },
});

export const { registration, setSelectedOrganization } =
  organizationSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectCount = (state: RootState) => state.counter.value;

export default organizationSlice.reducer;
