/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable prettier/prettier */
import type { Project, Property } from "../types";
import api from "./instance";

export type leadRegistration = {
  fullName?: string;
  email?: string;
  password?: string;
  mobileNumber?: string;
  organizationName?: string;
  organizationCountryCode?: string;
  organizationTimezone?: string;
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

export const updateOrganization = async (params: organizationRegistration) => {
  return api
    .put(`/admin/organizations/${params.id}`, params)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      // log request error if any
      return error;
    });
};

export const addOrganizationUser = async (params: any) => {
  const newReq =
    params.req === "new"
      ? {
          email: params.email,
          fullName: params.fullName,
          mobile: params.mobile,
          roleId: params.roleId,
        }
      : {
          id: params.id,
          roleId: 1,
        };
  return api
    .post(`/organizations/${params.id}/user`, newReq)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      // log request error if any
      return error;
    });
};

export const uploadWarrantyFiles = async (params: any) => {
  return api
    .post(`/warranty`, params)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      // log request error if any
      return error;
    });
};

export const updateWarrantyFiles = async (params: any) => {
  return api
    .put(`/warranty/${params.warrantyId}`, params)
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

export const uploadWarranties = async (file: any, group: any) => {
  const formData = new FormData();
  formData.append("files", file);
  return api({
    method: "post",
    url: "/upload",
    data: formData,
    headers: { "Content-Type": "multipart/form-data" },
  })
    .then((response) => {
      return { ...response.data[0], group };
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

export const getOneOrganization = async (id: any) => {
  return api
    .get(`/admin/organizations/${id}`)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      // log request error if any
      return error;
    });
};

export const getAllProperties = async (id: any) => {
  return api
    .get(`/project/${id}/properties`)
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
      return error.response;
    });
};

export const updateProject = async (params: Project, id: number) => {
  return api
    .put(`/projects/${id}`, params)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      // log request error if any
      return error.response;
    });
};

export const newProperty = async (params: Property) => {
  return api
    .post(`/property`, params)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      // log request error if any
      return error.response;
    });
};

export const updateProperty = async (params: Property) => {
  return api
    .put(`/property/${params.id}`, params)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      // log request error if any
      return error.response;
    });
};

export const attachPropertyUser = async (params: any) => {
  return api
    .post(`/property/${params.propertyId}/user`, params)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      // log request error if any
      return error.response;
    });
};

export const getProperty = async (id: any) => {
  return api
    .get(`/property/${id}`)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      // log request error if any
      return error;
    });
};

export const getConfig = async () => {
  return api
    .get(`/global_config`)
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
    .get(`/project_towers/${id}`)
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

export const userLogin = async (params: loginUserType, isAdmin: boolean) => {
  return api
    .post(isAdmin ? `/admin/login` : `/login`, params)
    .then((response) => {
      return response && response.data;
    })
    .catch((error) => {
      return error && error.response && error.response.data;
    });
};

export const listOfBuilders = async () => {
  return api
    .get(`/users?roleKey=organization_admin`)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      // log request error if any
      return error;
    });
};

export const listOfLeads = async () => {
  return api
    .get(`/admin/signup-leads`)
    .then((response) => {
      return response && response.data ? response.data : response;
    })
    .catch((error) => {
      // log request error if any
      return error;
    });
};

export const getOneProject = async (id: any) => {
  return api
    .get(`/projects/${id}`)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      // log request error if any
      return error;
    });
};

export const registerToOrg = async (params: any) => {
  return api
    .post(`/admin/signup-leads/organization`, params)
    .then((response) => {
      return response && response.data;
    })
    .catch((error) => {
      return error && error.response && error.response.data;
    });
};

export const addDefectCode = async (params: any) => {
  return api
    .post(`/defect-code`, params)
    .then((response) => {
      return response && response.data;
    })
    .catch((error) => {
      return error && error.response && error.response.data;
    });
};

export const addTradeCode = async (params: any) => {
  return api
    .post(`/trade-code`, params)
    .then((response) => {
      return response && response.data;
    })
    .catch((error) => {
      return error && error.response && error.response.data;
    });
};

export const getAllDefectCodebyProject = async (id: any) => {
  return api
    .get(`/defect-code?projectId=${id}`)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      // log request error if any
      return error;
    });
};

export const getAllTradeCodebyProject = async (id: any) => {
  return api
    .get(`/trade-code?projectId=${id}`)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      // log request error if any
      return error;
    });
};
export const getRegions = async () => {
  return api
    .get(`/region`)
    .then((response) => {
      return response && response.data ? response.data : response;
    })
    .catch((error) => {
      // log request error if any
      return error;
    });
};

export const getCountries = async () => {
  return api
    .get(`/countries`)
    .then((response) => {
      return response && response.data ? response.data : response;
    })
    .catch((error) => {
      // log request error if any
      return error;
    });
};

export const getChecklistZones = async () => {
  return api
    .get(`/admin/checklist/zones`)
    .then((response) => {
      return response && response.data ? response.data : response;
    })
    .catch((error) => {
      // log request error if any
      return error;
    });
};

export const getChecklistElement = async (id: any) => {
  return api
    .get(`/admin/checklist/elements?checklistZoneId=${id}`)
    .then((response) => {
      return response && response.data ? response.data : response;
    })
    .catch((error) => {
      // log request error if any
      return error;
    });
};

export const getAllChecklist = async (id: any) => {
  return api
    .get(`property/${id}/checklist`)
    .then((response) => {
      return response && response.data ? response.data : response;
    })
    .catch((error) => {
      // log request error if any
      return error;
    });
};

export const getAllCommonArea = async (id: any) => {
  return api
    .get(`common_area/${id}/checklist`)
    .then((response) => {
      return response && response.data ? response.data : response;
    })
    .catch((error) => {
      // log request error if any
      return error;
    });
};

export const listUserByRole = async (role) => {
  return api
    .get(`/users?roleKey=${role}`)
    .then((response) => {
      return { ...response.data, role };
    })
    .catch((error) => {
      // log request error if any
      return error;
    });
};

export const createProjectUser = async (params: any) => {
  return api
    .post(`/project/${params.projectId}/user`, params)
    .then((response) => {
      return response && response.data;
    })
    .catch((error) => {
      return error && error.response && error.response.data;
    });
};

export const getAllDefectResolution = async (params: any) => {
  return api
    .get(
      `/admin/defect-submissions?projectId=${params.projectId}&status=${
        params.status ? params.status : ""
      }`
    )
    .then((response) => {
      return response && response.data;
    })
    .catch((error) => {
      return error && error.response && error.response.data;
    });
};

export const getDefectResolutionById = async (id: any) => {
  return api
    .get(`/admin/defect-submissions/${id}`)
    .then((response) => {
      return response && response.data;
    })
    .catch((error) => {
      return error && error.response && error.response.data;
    });
};

export const getCommonAreaByProject = async (id: any) => {
  return api
    .get(`/project/${id}/common_area`)
    .then((response) => {
      return response && response.data;
    })
    .catch((error) => {
      return error && error.response && error.response.data;
    });
};
