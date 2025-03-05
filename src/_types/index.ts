/* eslint-disable @typescript-eslint/no-explicit-any */
export interface Country {
  id: number;
  countryName: string;
  countryCode: string;
  timezone: Timezone[];
}

export interface Leads {
  id: number;
  fullName: string;
  email: string;
  mobileNumber: string;
  organizationName: string;
  organizationCountryCode: string;
  organizationTimezone: string;
  status: string;
  isEmailVerified: boolean;
  isMobileVerified: boolean;
  createdAt: string;
  updatedAt: string;
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

export interface OptionType {
  value: string;
  label: string;
}

export interface SignUpLeadResponseType {
  fullName: string;
  email: string;
  mobileNumber: string;
  organizationName: string;
  organizationCountryCode: string;
  organizationTimezone: string;
  createdAt: string;
  updatedAt: string;
  id: number;
}

export interface SignUpLeadPayloadType {
  email: string;
  fullName: string;
  mobileNumber: string;
  organizationCountryCode: string;
  organizationName: string;
  organizationTimezone: string;
  password: string;
}

export interface OTPType {
  otp: string;
}

export interface VerifyType {
  verified: boolean;
}

export interface ResentType {
  sent: boolean;
}

export interface AuthType {
  message: string;
  token: string;
  user: AuthUserType;
}

export interface AuthUserType {
  createdAt: string;
  email: string;
  fullName: string;
  id: number;
  isEmailVerified: boolean;
  isMobileVerified: boolean;
  mobile: string;
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
  organization_role?: OrganizationRole[];
}

export interface OrganizationRole {
  createdAt: string;
  id: number;
  isAdmin: boolean;
  isDefault: boolean;
  roleAccessLevel: string;
  roleDescription: string;
  roleKey: string;
  roleName: string;
  updatedAt: string;
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

export interface Region {
  createdAt: string;
  currency: string;
  dateFormat: string;
  id: number;
  regionCode: string;
  regionName: string;
  timezone: Timezone[];
  updatedAt: string;
}

export interface UploadResponse {
  name: string;
  key: string;
  mimeType: string;
  size: number;
  createdAt: string;
  updatedAt: string;
  id: number;
  url: string;
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

export interface DefectsData {
  in_progress: number;
  disputed: number;
  resolved: number;
  pending: number;
  total: number;
  open: number;
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

export interface TradeVariables {
  Painter: number;
  Electrician: number;
  Tiler: number;
}

export interface NotificationParent {
  data: NotificationType[];
  allRead: boolean;
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
  property: Property;
  localDateTime: string;
}

export interface BodyWeb {
  Project: string;
  Zone: string;
  Element: string;
  unitNo: string;
  appointmentDate: string;
}
export interface NotificationDataType {
  screen: string;
  id: number;
}

export interface Property {
  createdAt?: string;
  id?: number;
  name: string | undefined;
  projectId?: number | undefined;
  projectTowerId?: any;
  lotNo: any;
  floor: any;
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
  report?: ReportDetails[];
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
  tradeCodes?: TradeCodes[];
}

export interface TradeCodes {
  createdAt: string;
  id: number;
  isActive: boolean;
  isDefault: boolean;
  organizationId: any;
  regionId: any;
  tradeCode: string;
  tradeName: string;
  updatedAt: string;
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
  reportName: string;
  stage: any;
  updatedAt: string;
}

export interface CommonAreaData {
  createdAt: string;
  id: number;
  lotNo: string;
  organizationId: number;
  projectId: number;
  status: string;
  updatedAt: string;
}

export interface CommonAreaCategory {
  createdAt: string;
  id: number;
  isActive: boolean;
  isDefault: boolean;
  name: string;
  organizationId: any;
  projectId: any;
  regionId: any;
  sequence: number;
  updatedAt: string;
}

export interface DefectSumissionType {
  id: number;
  commonArea?: CommonAreaData;
  commonAreaCategory?: CommonAreaCategory;
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
  user?: userData | userData[];
  userRole?: UserRoleType;
  stage: string;
  approvalNeededBy: string;
  projectTower?: TowerData;
  floor?: any;
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
  group: string;
  files: number[];
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

export interface MaintenanceServiceType {
  before_7_year: string;
  after_7_year: string;
}

export interface ValueList {
  key: string;
  value: string;
}

export interface AccessLevel {
  system: string;
  organization: string;
  project: string;
  property: string;
}

export interface Roles {
  id?: number;
  roleName: string;
  roleDescription: string;
  roleKey: string;
  roleAccessLevel: string;
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
  color?: any;
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
  property: Property;
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

export interface TableUser {
  id: number;
  fullName: string;
  email: string;
  mobile: string;
  isEmailVerified: boolean;
  isMobileVerified: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface DefectSumissionType {
  color?: string;
  id: number;
  commonArea?: CommonAreaData;
  commonAreaCategory?: CommonAreaCategory;
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
  tradeCode: TradeCode;
  checklistElement: ChecklistElementType;
  checklistZone: CheckListZoneType;
  checklistSubElement: CheckListSubElementType;
  property: Property;
  activityLogs: ActivityLogsType[];
  user?: userData | userData[];
  userRole?: UserRoleType;
  stage: string;
  approvalNeededBy: string;
  projectTower?: TowerData;
  floor?: any;
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
