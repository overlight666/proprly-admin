/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable prettier/prettier */
import type { Project } from "../types";
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

export type loginUserType = {
  email: string;
  password: string;
};

export type OtpType = {
  otp: string;
  type: string;
  id: any;
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

export const newProject = async (params: Project) => {
  return api
    .post(`/projects`, params)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      // log request error if any
      return error;
    });
};

export const newTower = async (params: Project) => {
  return api
    .post(`/project_towers`, params)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      // log request error if any
      return error;
    });
};

export const getTowers = async (id: any) => {
  return api
    .get(`/projects/${id}`)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      // log request error if any
      return error;
    });
};

export const getprojects = async (id: any) => {
  return api
    .get(`/organization/${id}/projects`)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      // log request error if any
      return error;
    });
};

export const otpVerification = async (params: OtpType) => {
  const otpPayload = {
    otp: params.otp,
  };
  return api
    .post(`/signup-leads/${params.id}/verify/${params.type}`, otpPayload)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      // log request error if any
      return error;
    });
};

export const resendOTP = async (params: OtpType) => {
  return api
    .post(`signup-leads/${params.id}/resend/${params.type}`)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      // log request error if any
      return error;
    });
};

export const userLogin = async (params: loginUserType) => {
  return api
    .post(`/login`, params)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return error.response.data;
    });
};
