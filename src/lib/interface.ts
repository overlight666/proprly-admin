import { Dayjs } from "dayjs";

export interface signUpForm {
    userType?: string;
    userRole?: string;
    organizationName: string;
    uniqueId?: string;
    organizationCountryCode: string;
    organizationTimezone: string;
    address?: string;
    buildingNumber?: string;
    fullName: string;
    email: string;
    password: string;
    confirmPassword?: string;
    mobileNumber: string;
    agreed: boolean;
}

export interface signInForm {
    email: string;
    password: string;
}

export interface forgotPasswordForm {
    email: string;
}

export interface resetPasswordForm {
    password: string;
    confirmPassword: string;
}

export interface changePasswordForm {
    oldPassword: string;
    newPassword: string;
    confirmPassword: string;
}

export interface organizationForm {
    id?: number | string;
    organizationName: string;
    organizationAddress: string;
    organizationPhoneNumber: string;
    organizationFaxNumber: string;
    organizationEmail: string;
    organizationWebsite: string;
    countryCode: string;
    timeZone: string;
    currency: string;
    logo?: File | null;
    logoUrl?: string;
}

export interface organizationInfo {
    id?: number | string;
    name: string;
    address: string;
    phoneNumber: string;
    faxNumber: string;
    email: string;
    website: string;
    countryCode: string;
    timeZone: string;
    currency: string;
    logo?: File | null;
    logoUrl?: string;
    regions?: regionInfo[];
    country?: any;
    projectsCount?: number;
    createdAt?: string;
    usersCount?: number;
}

export interface projectForm {
    id?: string | number;
    projectName: string;
    projectDescription: string;
    projectAddress: string;
    projectPhoneNumber: string;
    projectEmail: string;
    projectWebsite: string;
    organizationId: string | number;
    regionId: string | number;
    builderIds: (string | number)[];
    currency: string;
    projectTypes: (string | number)[];
    attachments?: File[];
    previewImageFile?: File;
    previewImage?: string;
    previewImageUrl?: string;
    attachmentUrls?: string[];
    logo?: File | null;
    logoUrl?: string;
}

export interface userForm {
    id?: string | number;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    projectId?: string | number;
    organizationId?: string | number;
    roleKey: string;
    tradeIds?: (string | number)[];
}

export interface defectForm {
    id?: string | number;
    reportedDate?: Dayjs | string;
    description: string;
    costToFix?: number | string;
    location: string;
    status: string;
    propertyId?: string | number;
    defectCodeId: string | number;
    images?: File[];
    reportedByUser?: userInfo;
    reportedBy?: string | number;
    notes?: any[];
    attachments?: File[];
    attachmentUrls?: string[];
    imageUrls?: string[];
}

export interface builderForm {
    builderName: string;
    builderAddress: string;
    builderPhoneNumber: string;
    builderEmail: string;
    builderWebsite: string;
    logo?: File | null;
    logoUrl?: string;
}

export interface propertyForm {
    id?: string | number;
    propertyAddress: string;
    propertyCode: string;
    propertyType: string;
    propertyStatus: string;
    tower?: string;
    level?: string;
    projectId?: string | number;
    lotNumber?: string;
    ownerForm?: ownerForm;
    owner?: ownerInfo;
    builderId?: string | number;
    builder?: builderInfo;
}

export interface commonAreaForm {
    id?: string | number;
    commonAreaName: string;
    commonAreaDescription: string;
    commonAreaType: string;
    commonAreaStatus: string;
    tower?: string;
    level?: string;
    projectId?: string | number;
    builderId?: string | number;
}

export interface ownerForm {
    id?: string | number;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    address?: string;
}

export interface towerForm {
    towerName: string;
    towerDescription: string;
    projectId?: string | number;
}

export interface userInfo {
    id: string | number;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    roleKey: string;
    role?: roleInfo;
    organization?: organizationInfo;
    project?: projectInfo;
    trades?: tradeInfo[];
    profilePicture?: string;
    fullName?: string;
    status?: string;
}

export interface ownerInfo {
    id: string | number;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    address?: string;
    fullName?: string;
}

export interface roleInfo {
    id: string | number;
    roleName: string;
    roleKey: string;
}

export interface projectInfo {
    id: string | number;
    name: string;
    description: string;
    address: string;
    phoneNumber: string;
    email: string;
    website: string;
    organizationId: string | number;
    organization?: organizationInfo;
    region?: regionInfo;
    regionId?: string | number;
    currency: string;
    attachmentUrls?: string[];
    previewImageUrl?: string;
    logoUrl?: string;
    builders?: builderInfo[];
    projectTypes?: projectTypeInfo[];
    properties?: propertyInfo[];
    commonAreas?: commonAreaInfo[];
    defects?: defectInfo[];
    createdAt?: string;
    propertiesCount?: number;
    commonAreasCount?: number;
    defectsCount?: number;
    usersCount?: number;
    status?: string;
}

export interface propertyInfo {
    id: string | number;
    address: string;
    code: string;
    type: string;
    status: string;
    tower?: string;
    level?: string;
    lotNumber?: string;
    project?: projectInfo;
    projectId?: string | number;
    owner?: ownerInfo;
    builder?: builderInfo;
    builderId?: string | number;
    defects?: defectInfo[];
    defectsCount?: number;
    createdAt?: string;
}

export interface commonAreaInfo {
    id: string | number;
    name: string;
    description: string;
    type: string;
    status: string;
    tower?: string;
    level?: string;
    project?: projectInfo;
    projectId?: string | number;
    builder?: builderInfo;
    builderId?: string | number;
    defects?: defectInfo[];
    defectsCount?: number;
    createdAt?: string;
}

export interface defectInfo {
    id: string | number;
    reportedDate: string;
    description: string;
    costToFix?: number;
    location: string;
    status: string;
    property?: propertyInfo;
    propertyId?: string | number;
    commonArea?: commonAreaInfo;
    commonAreaId?: string | number;
    defectCode?: defectCodeInfo;
    defectCodeId?: string | number;
    reportedByUser?: userInfo;
    reportedBy?: string | number;
    assignedToUser?: userInfo;
    assignedTo?: string | number;
    notes?: defectNoteInfo[];
    attachmentUrls?: string[];
    imageUrls?: string[];
    createdAt?: string;
    updatedAt?: string;
}

export interface defectNoteInfo {
    id: string | number;
    note: string;
    createdAt: string;
    user?: userInfo;
    userId?: string | number;
}

export interface builderInfo {
    id: string | number;
    name: string;
    address: string;
    phoneNumber: string;
    email: string;
    website: string;
    logoUrl?: string;
    organization?: organizationInfo;
    organizationId?: string | number;
    projects?: projectInfo[];
    properties?: propertyInfo[];
    commonAreas?: commonAreaInfo[];
    createdAt?: string;
}

export interface towerInfo {
    id: string | number;
    name: string;
    description: string;
    project?: projectInfo;
    projectId?: string | number;
    properties?: propertyInfo[];
    commonAreas?: commonAreaInfo[];
    createdAt?: string;
}

export interface regionInfo {
    id: string | number;
    name: string;
    code: string;
    countryCode: string;
    country?: countryInfo;
    timezone?: timezoneInfo[];
    organizations?: organizationInfo[];
    projects?: projectInfo[];
    createdAt?: string;
    deletedAt?: string;
    isDeleted?: boolean;
}

export interface countryInfo {
    id: string | number;
    countryName: string;
    countryCode: string;
    timezone?: timezoneInfo[];
}

export interface timezoneInfo {
    id: string | number;
    name: string;
    offset: string;
    countryId?: string | number;
    regionId?: string | number;
}

export interface tradeInfo {
    id: string | number;
    tradeName: string;
    tradeCode: string;
    description?: string;
    organization?: organizationInfo;
    organizationId?: string | number;
    users?: userInfo[];
    createdAt?: string;
    deletedAt?: string;
    isDeleted?: boolean;
}

export interface defectCodeInfo {
    id: string | number;
    defectName: string;
    defectCode: string;
    description?: string;
    organization?: organizationInfo;
    organizationId?: string | number;
    defects?: defectInfo[];
    createdAt?: string;
    deletedAt?: string;
    isDeleted?: boolean;
}

export interface projectTypeInfo {
    id: string | number;
    typeName: string;
    typeCode: string;
    description?: string;
    projects?: projectInfo[];
}

export interface OptionType {
    label: string;
    value: string | number;
}

export interface TableColumn {
    key: string;
    label: string;
    sortable?: boolean;
    render?: (value: any, item: any) => React.ReactNode;
}

export interface PaginationInfo {
    currentPage: number;
    totalPages: number;
    totalItems: number;
    itemsPerPage: number;
}

export interface ApiResponse<T> {
    data: T;
    message?: string;
    success: boolean;
    pagination?: PaginationInfo;
}

export interface SortInfo {
    key: string;
    direction: 'asc' | 'desc';
}

export interface FilterInfo {
    [key: string]: any;
}

export interface SearchInfo {
    query: string;
    fields?: string[];
}

export interface ItpLocation {
    name: string;
    key: string;
}

export interface ITPOption {
    id: number;
    types: string;
    label: string;
    isDefault: boolean;
    isActive: boolean;
    isVisible: boolean;
    createdAt: string;
    updatedAt: string;
    description: any;
}

export interface LocationItem {
    key: string;
    name: string;
    commonAreaCategoryId?: number;
    type?: string;
}

export interface TimingFrequency {
    id: number;
    types: string;
    label: string;
    isDefault: boolean;
    isActive: boolean;
    isVisible: boolean;
    createdAt: string;
    updatedAt: string;
    description: any;
}

export interface ITPMethod {
    id: number;
    types: string;
    label: string;
    isDefault: boolean;
    isActive: boolean;
    isVisible: boolean;
    createdAt: string;
    updatedAt: string;
    description: any;
}

export interface VerificationType {
    id: number;
    types: string;
    label: string;
    isDefault: boolean;
    isActive: boolean;
    isVisible: boolean;
    createdAt: string;
    updatedAt: string;
    description: any;
}

export interface ItpTemplates {
    id: number;
    name: string;
    isDefault: boolean;
    isActive: boolean;
    isVisible: boolean;
    regionId: any;
    organizationId: any;
    projectId: number;
    createdAt: string;
    updatedAt: string;
}

export interface ITPTask {
    id: number;
    status?: string;
    itpTemplatesId: number;
    methodId: number;
    timingFrequencyId: number;
    inspectionWorkActivity: string;
    acceptanceCriteria: string;
    reference: string;
    isFinal: boolean;
    comments: string;
    createdAt: string;
    updatedAt: string;
    verificationTypeId: number;
    timingFrequency: TimingFrequency
    method: ITPMethod;
    verificationType: VerificationType;
    itpTemplates: ItpTemplates;
}

export interface ITPList {
    id: any;
    name: string;
    isDefault: boolean;
    isActive: boolean;
    isVisible: boolean;
    regionId: any;
    organizationId: any;
    projectId: any;
    createdAt: string;
    updatedAt: string;
    tasks: any[];
    tradeCodes: any[];
    locations: any[];
}

export interface itpTaskForm {
    id?: any;
    itpTemplateId: any;
    methodId: any;
    timingFrequencyId: any;
    inspectionWorkActivity: any;
    verificationTypeId: any;
    acceptanceCriteria: any;
    reference: any;
    comments: any;
    isFinal: any;
}
export interface itpTemplateForm {
    id?: any;
    name: string;
    isDefault?: boolean;
    tradeCodes: any[];
    locations: LocationFormItem[]
}

export interface LocationFormItem {
    isMandatory: boolean;
    locationKey: string;
    commonAreaCategoryId: any;
    name: string;
}

export interface forgotForm {
    email: string;
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
    defectCounts?: any;
    totalProjects: any;
    totalProperties: any;
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
    isNeedAction: boolean;
    userId: number;
    createdAt: string;
    updatedAt: string;
    bodyWeb: BodyWeb;
    property: Property;
    localDateTime: string;
}

export interface BodyWeb {
    project: string;
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
    basementList?: any;
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
    icon?: any;
    id: number;
    approvalOptions: any[];
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
    inspection?: any;
    bgColor?: any;
}

export interface DefectSubmissionStatusSections {
    name: string;
    key: any;
    status: any[];
    forMobile: boolean;
    forWeb: boolean;
}

export interface Config {
    defectSubmissionStatusSections?: DefectSubmissionStatusSections[]
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
    towerStatusOptions: OptionType[];
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

// Start: Organization Setting Interface

export type InputType = "string" | "number" | "boolean" | "select";

export interface FieldGroup {
  inputType: InputType;
  multiple: boolean;
  filedKey: string;
  options?: string[];
  optionsFromConfigApiKey?: string;
}

export interface Result {
  value: string;
  roleId: number | null;
  projectId: number | null;
  organizationId: number;
  createdAt: string;
  updatedAt: string;
  id: number;
}

export interface SettingItem {
  key: string;
  label: string;
  multipleFieldsGroups: boolean;
  fieldsGroup: FieldGroup[];
  results: Result[];
}

// End: Organization Setting Interface