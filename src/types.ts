/* eslint-disable @typescript-eslint/no-explicit-any */
import type { leadRegistration, organizationRegistration } from "./apis";

export interface LeadState {
  leadData: leadRegistration;
  loading: boolean;
  isIdle: boolean;
}

export interface UserState {
  value: number;
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
  name: string;
  organizationId: number;
  type: string;
  maintenance_service_type: string;
  address: string;
  image: string;
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
  projectList: ProjectListType[];
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
  timezone: string;
  currency: string;
  dateFormat: string;
  imageId: number;
  createdAt: string;
  updatedAt: string;
  image: ImageType;
}

export interface ReducerTypes {
  organization: OrgState;
  uploads: ImageState;
  lead: LeadState;
  user: UserState;
  application: AppState;
}
