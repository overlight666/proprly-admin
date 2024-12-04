/* eslint-disable @typescript-eslint/no-explicit-any */
import type { leadRegistration, organizationRegistration } from "./apis";

export interface OtpState {
  otpResponse: any;
  verifying: boolean;
  resendResponse: any;
}

export interface LeadState {
  selectedLead: Lead | undefined;
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
  organizationTimezone?: string;
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
  appointmentTab: number;
  projectUsers: userInterface[];
  projectAuditors: userInterface[];
  projectSubContractor: userInterface[];
  projectStrata: userInterface[];
  propertyOwnerList: userInterface[];
}

export interface userInterface {
  id: number;
  fullName: string;
  email: string;
  mobileNumber: string;
  mobile?: string;
  organizationName: string;
  organizationCountryCode: string;
  isEmailVerified: boolean;
  isMobileVerified: boolean;
  status?: string;
  createdAt: string;
  updatedAt: string;
  project_role?: projectRole[];
}

export interface projectRole {
  id: number;
  roleName: string;
  roleDescription: string;
  roleKey: string;
  roleAccessLevel: string;
  isDefault: boolean;
  createdAt: string;
  updatedAt: string;
  isAdmin: boolean;
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
  isUpdated: boolean;
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
  floorList: FloorListData[];
}

export interface FloorListData {
  key: number;
  value: string;
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
  image?: ImageType;
  documents?: DocumentFile[];
  user?: userInterface[];
}

export interface DocumentFile {
  id: number;
  name: string;
  key: string;
  mimeType: string;
  size: string;
  createdAt: string;
  updatedAt: string;
  url: string;
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
  checklistZones: ZoneChecklist[];
  checklistElements: ElementChecklist[];
  selectedZone: FullChecklist | undefined;
  allChecklist: FullChecklist[];
  selectedElement: FullElements | undefined;
  allCommonArea: FullCommonArea[];
  selectedCommonArea: FullCommonArea | undefined;
  selectedCommonAreaElement: FullElements | undefined;
  responseStatus: string;
  userType: string;
  userResponse: Project | undefined;
  listCommonAreas: CommonAreaType[];
  commonAreaTab: number;
  commonAreaIdle: boolean;
  commonAreaResponse: commonAreaResponseType | undefined;
  commonAreaItem: commonAreaItemType | undefined;
}

export interface commonAreaItemType {
  id: number;
  organizationId: number;
  projectId: number;
  lotNo: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  projectTowers: any[];
  basements: any[];
  warranty: any[];
  warrantyStatus: string;
}

export interface commonAreaResponseType {
  projectId: number;
  lotNo: number;
  status: string;
  organizationId: number;
  createdAt: string;
  updatedAt: string;
  id: number;
}
export interface CommonAreaType {
  id: number;
  organizationId: number;
  projectId: number;
  lotNo: number;
  status: string;
  createdAt: string;
  updatedAt: string;
  warranty: WarrantyInterface[];
  projectTowers: TowerData[];
  basements: any[];
  warrantyStatus: string;
}
export interface FullCommonArea {
  id: number;
  name: string;
  sequence: number;
  isDefault: boolean;
  isActive: boolean;
  regionId: any;
  organizationId: any;
  projectId: any;
  createdAt: string;
  updatedAt: string;
  elements: FullElements[];
}

export interface FullChecklist {
  id: number;
  name: string;
  sequence: number;
  isDefault: boolean;
  isActive: boolean;
  regionId: any;
  organizationId: any;
  projectId: any;
  createdAt: string;
  updatedAt: string;
  elements: FullElements[];
}

export interface FullElements {
  id: number;
  name: string;
  sequence: number;
  parentId: any;
  checklistZoneId: number;
  commonAreaCategoryId: any;
  createdAt: string;
  updatedAt: string;
  subElements: FullElements;
  defectCode: FullDefectCode[];
}

export interface FullDefectCode {
  id: number;
  defectName: string;
  defectCode: string;
  isDefault: boolean;
  isActive: boolean;
  regionId: any;
  organizationId: any;
  projectId: any;
  createdAt: string;
  updatedAt: string;
}

export interface ZoneChecklist {
  name: string;
  code: string;
  order: number;
  stage: string;
  id: number;
  regionId: number;
}

export interface ElementChecklist {
  name: string;
  order: number;
  checklistZoneId: number;
  checklistSubElements: any;
  createdAt: string;
  updatedAt: string;
  id: number;
  defectCodes: DefectCodeItem[];
}

export interface DefectCodeItem {
  name: string;
  code: string;
  id: number;
}
export interface PropertyState {
  propertyData: Property[] | undefined;
  isIdle: boolean;
  propertyResponse: Project | undefined;
  selectedProperty: Property | undefined;
  attachedUser: any;
  defectSubmissions: DefectSumissionType[] | undefined;
  loadingDefect: boolean;
  defect: DefectSumissionType | undefined;
}

export interface DefectSumissionType {
  id: number;
  organizationId: number;
  inspectionId: number;
  propertyId: number;
  checklistZoneId: number;
  checklistElementId: number;
  checklistSubElementId: number;
  defectCodeId: number;
  comment: string;
  submittedUserId: number;
  propertyStatus: string;
  status: string;
  subStatus: string;
  subStatusCode: string;
  submittedBy: string;
  createdAt: string;
  updatedAt: string;
  images: ImageType[];
  defectCode: DefectCode;
  checklistElement: ChecklistElementType;
  checklistZone: CheckListZoneType;
  checklistSubElement: CheckListSubElementType;
  property: Property;
  activityLogs: ActivityLogsType[];
  user?: userData;
  userRole?: UserRoleType;
  stage: string;
}

export interface UserRoleType {
  id: number;
  roleName: string;
  roleDescription: string;
  roleKey: string;
  roleAccessLevel: string;
  isDefault: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface ActivityLogsType {
  comment: any;
  createdAt: string;
  defectSubStatus: string;
  defectSubmissionId: number;
  id: number;
  images?: ImageType[];
  loggedBy: string;
  loggedUserId: number;
  user?: userData;
}
export interface CheckListSubElementType {
  id: number;
  name: string;
  sequence: number;
  parentId: number;
  checklistZoneId: any;
  commonAreaCategoryId: any;
  createdAt: string;
  updatedAt: string;
}

export interface CheckListZoneType {
  id: number;
  name: string;
  sequence: number;
  isDefault: boolean;
  isActive: boolean;
  regionId: any;
  organizationId: any;
  projectId: any;
  createdAt: string;
  updatedAt: string;
}

export interface ChecklistElementType {
  id: number;
  name: string;
  sequence: number;
  parentId: any;
  checklistZoneId: number;
  commonAreaCategoryId: any;
  createdAt: string;
  updatedAt: string;
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
  user?: userData[];
  project?: Project;
  projectTower?: TowerData;
  warranty?: WarrantyInterface[];
  warrantyStatus?: string;
}

export interface WarrantyInterface {
  id: number;
  group: string;
  organizationId: number;
  projectId: number;
  propertyId: number;
  createdAt: string;
  updatedAt: string;
  files: ImageType[];
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
  defectCode: DefectCode[];
}

export interface ImageType {
  id: number;
  name: string;
  key: string;
  mimeType: string;
  createdAt: string;
  updatedAt: string;
  url: string;
  size?: any;
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
  region?: Regions;
  user?: userData[];
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
