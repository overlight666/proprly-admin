/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable prettier/prettier */
import api from "./instance";

export type leadRegistration = {
  fullName?: string;
  email?: string;
  password?: string;
  mobileNumber?: string;
  organizationName?: string;
  organizationCountryCode?: string;
  id?: number;
};

export type organizationRegistration = {
  name: string;
  timezone: string;
  currency: string;
  dateFormat: string;
  id?: number;
};

export const signupLead = async (params: leadRegistration) => {
  return api
    .post(`/signup-leads`, params)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      // log request error if any
      return error;
    });
};

export const newOrganization = async (params: organizationRegistration) => {
  return api
    .post(`/admin/organizations`, params)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      // log request error if any
      return error;
    });
};

export const uploadImage = async (file: any) => {
  const formData = new FormData();
  formData.append("files", file);
  return api({
    method: "post",
    url: "/upload",
    data: formData,
    headers: { "Content-Type": "multipart/form-data" },
  })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      // log request error if any
      return error;
    });
};

export const getAllOrganizations = async () => {
  return api
    .get(`/admin/organizations`)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      // log request error if any
      return error;
    });
};
