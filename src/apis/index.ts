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
