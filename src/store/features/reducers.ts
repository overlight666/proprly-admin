/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable prettier/prettier */
import { createAsyncThunk } from "@reduxjs/toolkit";
import type { leadRegistration, organizationRegistration } from "../../apis";
import { getAllOrganizations, newOrganization, signupLead } from "../../apis";

export const registerLead: any = createAsyncThunk(
  "type/postData",
  async (data: leadRegistration) => {
    try {
      const response = await signupLead(data);
      // If you want to get something back
      return response.data;
    } catch (err) {
      console.error(err);
    }
  }
);

export const registerOrg: any = createAsyncThunk(
  "type/postData",
  async (data: organizationRegistration) => {
    try {
      const response = await newOrganization(data);
      // If you want to get something back
      return response.data;
    } catch (err) {
      console.error(err);
    }
  }
);

export const getOrganizations: any = createAsyncThunk(
  "type/getData",
  async () => {
    try {
      const response = await getAllOrganizations();
      // If you want to get something back
      return response.data;
    } catch (err) {
      console.error(err);
    }
  }
);
