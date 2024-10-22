/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable prettier/prettier */
import { createAsyncThunk } from "@reduxjs/toolkit";
import type { leadRegistration, organizationRegistration } from "../../apis";
import {
  getAllOrganizations,
  getprojects,
  getTowers,
  newOrganization,
  newProject,
  newTower,
  otpVerification,
  resendOTP,
  signupLead,
  uploadImage,
  userLogin,
} from "../../apis";
import type { Project } from "../../types";

export const registerLead: any = createAsyncThunk(
  "postSignup",
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
  "postOrg",
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

export const registerProject: any = createAsyncThunk(
  "postProject",
  async (data: Project) => {
    try {
      const response = await newProject(data);
      // If you want to get something back
      return response.data;
    } catch (err) {
      console.error(err);
    }
  }
);

export const getProjects: any = createAsyncThunk(
  "getProjects",
  async (id: any) => {
    try {
      const response = await getprojects(id);
      // If you want to get something back
      return response.data;
    } catch (err) {
      console.error(err);
    }
  }
);

export const getOrganizations: any = createAsyncThunk(
  "getOrganization",
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

export const uploadImageFile: any = createAsyncThunk(
  "postImage",
  async (data: any) => {
    try {
      const response = await uploadImage(data);
      // If you want to get something back
      return response;
    } catch (err) {
      console.error(err);
    }
  }
);

export const getTowersReducer: any = createAsyncThunk(
  "getTowers",
  async (id: any) => {
    try {
      const response = await getTowers(id);
      // If you want to get something back
      return response.data;
    } catch (err) {
      console.error(err);
    }
  }
);

export const postTower: any = createAsyncThunk(
  "postTower",
  async (data: any) => {
    try {
      const response = await newTower(data);
      // If you want to get something back
      return response;
    } catch (err) {
      console.error(err);
    }
  }
);

export const VerifyOtp: any = createAsyncThunk("postOtp", async (data: any) => {
  try {
    const response = await otpVerification(data);
    // If you want to get something back
    return response;
  } catch (err) {
    console.error(err);
  }
});

export const resendOtpVerify: any = createAsyncThunk(
  "resendOtp",
  async (data: any) => {
    try {
      const response = await resendOTP(data);
      // If you want to get something back
      return response;
    } catch (err) {
      console.error(err);
    }
  }
);

export const loginUser: any = createAsyncThunk(
  "loginUser",
  async (data: any) => {
    try {
      const response = await userLogin(data);
      // If you want to get something back
      return response;
    } catch (err) {
      console.error(err);
    }
  }
);
