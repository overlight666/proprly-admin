/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable prettier/prettier */
import { createAsyncThunk } from "@reduxjs/toolkit";
import type { leadRegistration, organizationRegistration } from "../../apis";
import {
  addCommonAreaBasement,
  addCommonAreaTower,
  addDefectCode,
  addOrganizationUser,
  addTradeCode,
  attachPropertyUser,
  bookAppointmentApi,
  createCommonArea,
  createProjectUser,
  getAllChecklist,
  getAllCommonArea,
  getAllDefectCodebyProject,
  getAllDefectResolution,
  getAllOrganizations,
  getAllProperties,
  getAllTradeCodebyProject,
  getChecklistElement,
  getChecklistZones,
  getCommonArea,
  getCommonAreaByProject,
  getConfig,
  getCountries,
  getDefectResolutionById,
  getOneOrganization,
  getOneProject,
  getprojects,
  getProperty,
  getRegions,
  getTowers,
  listOfBuilders,
  listOfLeads,
  listUserByRole,
  newOrganization,
  newProject,
  newProperty,
  newTower,
  otpVerification,
  resendOTP,
  signupLead,
  submitFeedback,
  updateOrganization,
  updateProject,
  updateProperty,
  updateWarrantyFiles,
  uploadImage,
  uploadWarranties,
  uploadWarrantyFiles,
  userLogin,
} from "../../apis";
import type { Project, Property } from "../../types";

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

export const updateOrg: any = createAsyncThunk(
  "updateOrg",
  async (data: organizationRegistration) => {
    try {
      const response = await updateOrganization(data);
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

export const registerProperty: any = createAsyncThunk(
  "postProperty",
  async (data: Property) => {
    try {
      const response = await newProperty(data);
      // If you want to get something back
      return response.data;
    } catch (err) {
      console.error(err);
    }
  }
);

export const getOneOrg: any = createAsyncThunk("getOneOrg", async (id: any) => {
  try {
    const response = await getOneOrganization(id);
    // If you want to get something back
    return response.data;
  } catch (err) {
    console.error(err);
  }
});

export const addOrgUser: any = createAsyncThunk(
  "addOrgUser",
  async (params: any) => {
    try {
      const response = await addOrganizationUser(params);
      // If you want to get something back
      return response.data;
    } catch (err) {
      console.error(err);
    }
  }
);

export const getProperties: any = createAsyncThunk(
  "getProperties",
  async (id: any) => {
    try {
      const response = await getAllProperties(id);
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

export const getSingleProject: any = createAsyncThunk(
  "getSingleProject",
  async (id: any) => {
    try {
      const response = await getOneProject(id);
      // If you want to get something back
      return response;
    } catch (err) {
      console.error(err);
    }
  }
);

export const getAllDefectResolutionReducer: any = createAsyncThunk(
  "getAllDefectResolutionReducer",
  async (params: any) => {
    try {
      const response = await getAllDefectResolution(params);
      // If you want to get something back
      return response;
    } catch (err) {
      console.error(err);
    }
  }
);

export const getDefectResolutionByIdReducer: any = createAsyncThunk(
  "getDefectResolutionById",
  async (params: any) => {
    try {
      const response = await getDefectResolutionById(params);
      // If you want to get something back
      return response;
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

export const uploadDocument: any = createAsyncThunk(
  "postDocument",
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

export const postWarranties: any = createAsyncThunk(
  "postWarranties",
  async (data: any) => {
    try {
      const response = await uploadWarranties(data.file, data.group);
      // If you want to get something back
      return response;
    } catch (err) {
      console.error(err);
    }
  }
);

export const postWarrantyFiles: any = createAsyncThunk(
  "postWarrantyFiles",
  async (data: any) => {
    try {
      const response = await uploadWarrantyFiles(data);
      // If you want to get something back
      return response;
    } catch (err) {
      console.error(err);
    }
  }
);

export const putWarrantyFiles: any = createAsyncThunk(
  "putWarrantyFiles",
  async (data: any) => {
    try {
      const response = await updateWarrantyFiles(data);
      // If you want to get something back
      return response;
    } catch (err) {
      console.error(err);
    }
  }
);

export const patchProject: any = createAsyncThunk(
  "patchProject",
  async (data: any) => {
    try {
      const response = await updateProject(data, data.id);
      // If you want to get something back
      return response;
    } catch (err) {
      console.error(err);
    }
  }
);

export const patchProperty: any = createAsyncThunk(
  "patchProperty",
  async (data: any) => {
    try {
      const response = await updateProperty(data);
      // If you want to get something back
      return response;
    } catch (err) {
      console.error(err);
    }
  }
);

export const attachPropertyUserReducer: any = createAsyncThunk(
  "attachPropertyUserReducer",
  async (data: any) => {
    try {
      const response = await attachPropertyUser(data);
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

export const postDefectCode: any = createAsyncThunk(
  "postDefectCode",
  async (data: any) => {
    try {
      const response = await addDefectCode(data);
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
      const params = {
        email: data.email,
        password: data.password,
      };
      const response = await userLogin(params, data.isAdmin);
      // If you want to get something back
      return response;
    } catch (err) {
      console.error(err);
    }
  }
);

export const getAllBuilders: any = createAsyncThunk(
  "getAllBuilders",
  async () => {
    try {
      const response = await listOfBuilders();
      // If you want to get something back
      return response;
    } catch (err) {
      console.error(err);
    }
  }
);

export const getAllLeads: any = createAsyncThunk("getAllLeads", async () => {
  try {
    const response = await listOfLeads();
    // If you want to get something back
    return response;
  } catch (err) {
    console.error(err);
  }
});

export const getAllRegions: any = createAsyncThunk(
  "getAllRegions",
  async () => {
    try {
      const response = await getRegions();
      // If you want to get something back
      return response;
    } catch (err) {
      console.error(err);
    }
  }
);

export const getAllCountries: any = createAsyncThunk(
  "getAllCountries",
  async () => {
    try {
      const response = await getCountries();
      // If you want to get something back
      return response;
    } catch (err) {
      console.error(err);
    }
  }
);

export const getSingleProperty: any = createAsyncThunk(
  "getSingleProperty",
  async (id) => {
    try {
      const response = await getProperty(id);
      // If you want to get something back
      return response;
    } catch (err) {
      console.error(err);
    }
  }
);
export const getGlobalConfig: any = createAsyncThunk(
  "getGlobalConfig",
  async () => {
    try {
      const response = await getConfig();
      // If you want to get something back
      return response;
    } catch (err) {
      console.error(err);
    }
  }
);
export const getDefectCodeListByProject: any = createAsyncThunk(
  "getAllDefectCodeByProjectId",
  async (id) => {
    try {
      const response = await getAllDefectCodebyProject(id);
      // If you want to get something back
      return response;
    } catch (err) {
      console.error(err);
    }
  }
);

export const getTradeCodeListByProject: any = createAsyncThunk(
  "getAllTradeCodebyProjectId",
  async (id) => {
    try {
      const response = await getAllTradeCodebyProject(id);
      // If you want to get something back
      return response;
    } catch (err) {
      console.error(err);
    }
  }
);
export const postTradeCode: any = createAsyncThunk(
  "postTradeCode",
  async (data: any) => {
    try {
      const response = await addTradeCode(data);
      // If you want to get something back
      return response;
    } catch (err) {
      console.error(err);
    }
  }
);
export const getChecklistZonesReducer: any = createAsyncThunk(
  "getChecklistZones",
  async () => {
    try {
      const response = await getChecklistZones();
      // If you want to get something back
      return response;
    } catch (err) {
      console.error(err);
    }
  }
);

export const getChecklistElementReducer: any = createAsyncThunk(
  "getChecklistElement",
  async (id: any) => {
    try {
      const response = await getChecklistElement(id);
      // If you want to get something back
      return response;
    } catch (err) {
      console.error(err);
    }
  }
);

export const getAllChecklistReducer: any = createAsyncThunk(
  "getAllChecklist",
  async (id: any) => {
    try {
      const response = await getAllChecklist(id);
      // If you want to get something back
      return response;
    } catch (err) {
      console.error(err);
    }
  }
);

export const getAllCommonAreaReducer: any = createAsyncThunk(
  "getAllCommonArea",
  async (id: any) => {
    try {
      const response = await getAllCommonArea(id);
      // If you want to get something back
      return response;
    } catch (err) {
      console.error(err);
    }
  }
);

export const getCommonAreaByProjectReducer: any = createAsyncThunk(
  "getCommonAreaByProject",
  async (id: any) => {
    try {
      const response = await getCommonAreaByProject(id);
      // If you want to get something back
      return response;
    } catch (err) {
      console.error(err);
    }
  }
);

export const getCommonAreaByProjectArrayReducer: any = createAsyncThunk(
  "getCommonAreaByProjectArrayReducer",
  async (id: any) => {
    try {
      const response = await getCommonAreaByProject(id);
      // If you want to get something back
      return response;
    } catch (err) {
      console.error(err);
    }
  }
);

export const listUserByRoleReducer: any = createAsyncThunk(
  "listUserByRole",
  async (role: any) => {
    try {
      const response = await listUserByRole(role);
      // If you want to get something back
      return response;
    } catch (err) {
      console.error(err);
    }
  }
);

export const createProjectUserReducer: any = createAsyncThunk(
  "createProjectUser",
  async (data: any) => {
    try {
      const response = await createProjectUser(data);
      // If you want to get something back
      return response;
    } catch (err) {
      console.error(err);
    }
  }
);

export const createCommonAreaReducer: any = createAsyncThunk(
  "createCommonAreaReducer",
  async (data: any) => {
    try {
      const response = await createCommonArea(data);
      // If you want to get something back
      return response;
    } catch (err) {
      console.error(err);
    }
  }
);

export const getCommonAreaReducer: any = createAsyncThunk(
  "getCommonAreaReducer",
  async (id: any) => {
    try {
      const response = await getCommonArea(id);
      // If you want to get something back
      return response;
    } catch (err) {
      console.error(err);
    }
  }
);

export const addCommonAreaBasementReducer: any = createAsyncThunk(
  "addCommonAreaBasementReducer",
  async (data: any) => {
    try {
      const response = await addCommonAreaBasement(data);
      // If you want to get something back
      return response;
    } catch (err) {
      console.error(err);
    }
  }
);

export const addCommonAreaTowerReducer: any = createAsyncThunk(
  "addCommonAreaTowerReducer",
  async (data: any) => {
    try {
      const response = await addCommonAreaTower(data);
      // If you want to get something back
      return response;
    } catch (err) {
      console.error(err);
    }
  }
);

export const submitFeedbackReducer: any = createAsyncThunk(
  "submitFeedbackReducer",
  async (data: any) => {
    try {
      const response = await submitFeedback(data);
      // If you want to get something back
      return response;
    } catch (err) {
      console.error(err);
    }
  }
);

export const bookAppointmentReducer: any = createAsyncThunk(
  "bookAppointmentReducer",
  async (data: any) => {
    try {
      const response = await bookAppointmentApi(data);
      // If you want to get something back
      return response;
    } catch (err) {
      console.error(err);
    }
  }
);
