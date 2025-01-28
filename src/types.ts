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
  uploadProgress: ProgressType[] | undefined;
}

export interface ProgressType {
  progress: number;
  fileName: string;
}

export interface AppState {
  isGrid: boolean;
  masterTab: number;
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
  timeslot: Timeslot[] | undefined;
  timeslotResponse: any | undefined;
  isCalendarView: boolean;
  openProjects: any[];
  notifications: NotificationType[] | undefined;
  notificationsCount: NotificationCountType | undefined;
  propertyDefectSubmissions: DefectSumissionType[] | undefined;
  commonAreaDefectSubmissions: DefectSumissionType[] | undefined;
  projectDashboard: DashboardData | undefined;
  organizationDashboard: DashboardData | undefined;
}

export interface DefectsData {
  in_progress: number;
  disputed: number;
  resolved: number;
  pending: number;
  total: number;
  open: number;
}

export interface TradeVariables {
  Painter: number;
  Electrician: number;
  Tiler: number;
}

export interface StatusAndTrade {
  in_progress: TradeVariables;
  disputed: TradeVariables;
  resolved: TradeVariables;
  pending: TradeVariables;
  all: TradeVariables;
}

export interface TotalDefects {
  pending: number;
  in_progress: number;
  disputed: number;
  resolved: number;
  total: number;
  open: number;
}
export interface DashboardData {
  totalNotifications: number;
  needAttention: number;
  totalProjects: number;
  totalProperties: number;
  defectsByProperty: DefectsData;
  defectsByCommonArea: DefectsData;
  propertyDefectsByStatusAndTrade: StatusAndTrade;
  commonAreaDefectsByStatusAndTrade: StatusAndTrade;
  totalDefects: TotalDefects;
  totalOpenDefects: number;
  totalPropertyDefectsByTrade: number;
  totalCommonAreaDefectsByTrade: number;
}

export interface ExcelData {
  Bathroom: number;
  Bedroom: number;
  Ensuite: number;
  "External Area(m2)": number;
  Floor: string;
  "Internal Area(m2)": number;
  "Lot No": number;
  "Parking Spaces": number;
  "Property Status": string;
  Storage: number;
  "Study Room": number;
  Tower: string;
  "Unit No": number;
}

export interface NotificationCountType {
  count: number;
}

export interface NotificationType {
  id: number;
  title: string;
  body: string;
  data: NotificationDataType;
  isRead: boolean;
  forAdmin: boolean;
  userId: number;
  createdAt: string;
  updatedAt: string;
  bodyWeb: BodyWeb;
}
export interface BodyWeb {
  Project: string;
  Zone: string;
  Element: string;
  UnitNo: string;
}
export interface NotificationDataType {
  screen: string;
  id: number;
}
export interface Timeslot {
  id: number;
  projectId: number;
  startTime: string;
  endTime: string;
  duration: number;
  day: string;
  createdAt: string;
  updatedAt: string;
  appointmentTimeSlotsListAmPm: KeyValue[];
  appointmentTimeSlotsList24Hr: KeyValue[];
}

export interface KeyValue {
  key: string;
  value: string;
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
  roles?: Roles[];
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
  orgDashboard: OrganizationDashboard | undefined;
}

export interface OrganizationDashboard {
  totalNotifications: number;
  needAttention: number;
  totalProjects: number;
  totalProperties: number;
  defectsByProperty: DefectsByProperty;
  defectsByCommonArea: DefectsByCommonArea;
}

export interface DefectsByProperty {
  in_progress: number;
  disputed: number;
  resolved: number;
  pending: number;
}

export interface DefectsByCommonArea {
  in_progress: number;
  disputed: number;
  resolved: number;
  pending: number;
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
  report?: ReportDetails[];
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

export interface ReportDetails {
  commonAreaId: any;
  createdAt: number;
  id: number;
  inspectionId: any;
  organizationId: number;
  projectId: number;
  propertyId: any;
  reportFor: any;
  reportUrl: string;
  stage: any;
  updatedAt: string;
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
  commonAreaArray: commonAreaItemType[] | undefined;
  commonAreaConfig: commonAreaItemType | undefined;
  reloadAreaTable: boolean;
  projectAppointments: any[] | undefined;
  projectDashboard: ProjectDashboard | undefined;
  projectReports: ProjectReport | undefined;
}

export interface ProjectReport {
  totalProperties: number;
  totalDefects: number;
  openDefects: number;
  resolvedDefects: number;
  defectDescriptions: DefectDescriptions;
  name: string;
  address: string;
  devloper: string;
}
export interface DefectDescriptions {
  tableData: ProjectDefectData[];
}

export interface ProjectDefectData {
  srNo: number;
  unitNo: string;
  totalDefects: number;
  openDefects: number;
  closedDefects: number;
  openDefectCodes: string;
  lastInspectionDate: string;
}

export interface ProjectDashboard {
  totalNotifications: number;
  totalProjects: number;
  needAttention: number;
  totalProperties: number;
  defectsByProperty: DefectsByProperty;
  defectsByCommonArea: DefectsByCommonArea;
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
  projectBasements: any[];
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
  subElements: FullElements[];
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
  feedbackResponse: undefined | any;
  appointmentResponse: undefined | any;
  propertyReports: PropertyReport[] | undefined;
  appointmentRefresh: boolean;
  bulkPropertyResponse: any | undefined;
}

export interface PropertyReport {
  key: string;
  value: string;
  nextStatus: any[];
  reports: Report[];
}

export interface Report {
  propertyId: number;
  propertyStatus: string;
  inspectionId: number;
  reportUrl: string;
  reportStage: string;
  lotNo: string;
  unitNo: string;
  owners: userData[];
}

export interface DefectSumissionType {
  id: number;
  organizationId: number;
  inspectionId: number;
  propertyId: number;
  submittedUserRoleId?: number;
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
  approvalNeededBy: string;
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
  userRole: UserRoleType;
  loggedUserRoleId: number;
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
