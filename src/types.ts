/* eslint-disable @typescript-eslint/no-explicit-any */
import type { leadRegistration, organizationRegistration } from "./apis";

export interface OtpState {
  otpResponse: any;
  verifying: boolean;
  resendResponse: any;
}

export interface LeadState {
  leadData: leadRegistration;
  loading: boolean;
  isIdle: boolean;
  builderList: any;
  loadingBuilders: boolean;
  loadingLeads: boolean;
  leadList: Lead[] | undefined;
}

export interface Lead {
  id: number;
  fullName: string;
  email: string;
  mobileNumber: string;
  organizationName: string;
  organizationCountryCode: string;
  isEmailVerified: boolean;
  isMobileVerified: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface UserState {
  userData: User;
  isIdle: boolean;
  loginTrigger: boolean;
}

export interface ImageState {
  imageData: ImageType;
  isIdle: boolean;
}

export interface AppState {
  isGrid: boolean;
  projectTab: number;
  orgTab: number;
}

export interface OrgState {
  orgData: organizationRegistration;
  loading: boolean;
  isIdle: boolean;
  orgList: Organization[];
  selectedOrganization: Organization | undefined;
}

export interface TowerResponseState {
  id?: number;
}

export interface TowerData {
  id: number;
  name: string;
  projectId: string;
  numFloors: string;
  organizationId?: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface Project {
  id?: number;
  organizationId: number;
  name: string;
  type: string;
  maintenanceServiceType: string;
  numBasementLevels?: any | null;
  address: string;
  imageId: number | undefined;
  createdAt?: string;
  updatedAt?: string;
  projectTower?: TowerData[];
  errors?: any;
}

export interface ProjectListType {
  id: number;
  organizationId: number;
  name: string;
  type: string;
  maintenanceServiceType: string;
  numBasementLevels: any;
  address: string;
  image: string;
  createdAt?: string;
  updatedAt?: string;
  projectTower: TowerData[];
}

export interface ProjectState {
  projectData: Project;
  isIdle: boolean;
  projectResponse: Project | undefined;
  towerResponse: TowerResponseState;
  towerData: TowerData[];
  projectTowers: TowerData[];
  projectList: ProjectListType[];
  projectTrigger: boolean;
  loadedProject: boolean;
  selectedProject: Project | undefined;
  hasProjectSelected: boolean;
  gettingTowers: boolean;
  defectCodeList: DefectCode[] | undefined;
  defectCodeResponse: DefectCode | undefined;
}

export interface DefectCode {
  id: number;
  defectName: string;
  defectCode: string;
  isDefault: boolean;
  isActive: boolean;
  regionId: string | null;
  organizationId: string | null;
  projectId: string | null | number;
  createdAt: string;
  updatedAt: string;
}

export interface ImageType {
  id: number;
  name: string;
  key: string;
  mimeType: string;
  createdAt: string;
  updatedAt: string;
  url: string;
}

export interface Organization {
  id: number;
  name: string;
  timezone: Timezone;
  currency: string;
  dateFormat: string;
  imageId: number;
  createdAt: string;
  updatedAt: string;
  image: ImageType;
}

export interface Timezone {
  abbreviation: string;
  createdAt: string;
  description: string;
  id: number;
  name: string;
  offset: string;
  regionId: number;
  updatedAt: string;
}
export interface ReducerTypes {
  organization: OrgState;
  uploads: ImageState;
  lead: LeadState;
  user: UserState;
  application: AppState;
}

export interface userData {
  id: number;
  fullName: string;
  email: string;
  mobile: string;
  isEmailVerified: boolean;
  isMobileVerified: boolean;
  createdAt: string;
  updatedAt: string;
  userType?: string;
  permissions?: any[];
}

export interface User {
  error: string;
  message: string;
  token: string;
  user: userData | undefined;
}
