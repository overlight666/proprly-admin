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
  status?: string;
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
  fileData: ImageType | undefined;
  warrantyData: any;
  warrantyResponse: any;
  warrantyResponseStatus: boolean;
  uploadDone: boolean;
}

export interface AppState {
  isGrid: boolean;
  projectTab: number;
  projectTabMain: number;
  orgTab: number;
  propertyTab: number;
  regions: Regions[];
  countries: Country[];
  config: Config | undefined;
}

export interface Config {
  roles: Roles[];
  roleAccessLevel: AccessLevel;
  roleAccessLevelList: ValueList[];
  projectMaintenanceServiceType: MaintenanceServiceType;
  projectMaintenanceServiceTypeList: ValueList[];
  projectType: ProjectType;
  projectTypeList: ValueList[];
  propertyStatus: PropertyStatus;
  propertyStatusList: ValueList[];
  warrantyGroup: WarrantyGroup;
  warrantyGroupList: WarrantyGroupList[];
  signupLeadStatus: SignupLeadStatus;
  signupLeadStatusList: ValueList[];
  appointmentStatus: AppointmentStatus;
  appointmentStatusList: ValueList[];
}

export interface AppointmentStatus {
  booked: string;
  rescheduled: string;
  canceled: string;
}

export interface SignupLeadStatus {
  pending: string;
  accepted: string;
  rejected: string;
}

export interface WarrantyGroupList {
  key: string;
  value: string;
  imageUrl: string;
}

export interface WarrantyGroup {
  appliances: string;
  bathroom_fixtures: string;
  air_conditioning: string;
  utilities: string;
  intercom: string;
  builder_warranty: string;
}

export interface PropertyStatus {
  pre_settlement: string;
  handover: string;
  post_handover: string;
  under_construction: string;
}

export interface ProjectType {
  apartment: string;
  villa: string;
  townhouse: string;
  house: string;
}

export interface ValueList {
  key: string;
  value: string;
}

export interface MaintenanceServiceType {
  before_7_year: string;
  after_7_year: string;
}

export interface Roles {
  id?: number;
  roleName: string;
  roleDescription: string;
  roleKey: string;
  roleAccessLevel: string;
}

export interface AccessLevel {
  system: string;
  organization: string;
  project: string;
  property: string;
}

export interface Country {
  id: number;
  countryName: string;
  countryCode: string;
  timezone: Timezone[];
}

export interface Regions {
  id: number;
  regionName: string;
  regionCode: string;
  currency: string;
  dateFormat: string;
  createdAt: string;
  updatedAt: string;
  timezone: Timezone[];
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
  imageId?: string | undefined;
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

export interface UploadedWarranties {
  propertyId: number;
  groups: WarrantyGroup[];
}

export interface WarrantyGroup {
  group: string;
  files: number[];
}
export interface ProjectState {
  reloadProject: boolean;
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
  tradeCodeList: TradeCode[] | undefined;
  defectCodeResponse: DefectCode | undefined;
  tradeCodeResponse: TradeCode | undefined;
  isTradeFired?: boolean;
  isCodeFired?: boolean;
}

export interface PropertyState {
  propertyData: Property | undefined;
  isIdle: boolean;
  propertyResponse: Project | undefined;
  selectedProperty: Property | undefined;
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

export interface Property {
  id?: number;
  name: string | undefined;
  projectId?: number | undefined;
  projectTowerId?: number | undefined;
  lotNo: any;
  floor: number | undefined;
  unitNo: any;
  tower: any;
  bedroom: any;
  bathroom: any;
  ensuite: any;
  studyRoom: any;
  storage: any;
  parkingSpaces: any;
  internalArea: any;
  externalArea: any;
  status: string;
}

export interface TradeCode {
  id: number;
  tradeName: string;
  tradeCode: string;
  isDefault: boolean;
  isActive: boolean;
  regionId?: string | null;
  organizationId: string | null;
  projectId: string | null | number;
  createdAt: string;
  updatedAt: string;
  defectcode: DefectCode[];
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
