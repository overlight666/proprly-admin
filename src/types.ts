import type { leadRegistration, organizationRegistration } from "./apis";

export interface LeadState {
  leadData: leadRegistration;
  loading: boolean;
  isIdle: boolean;
}

export interface ImageState {
  imageData: ImageType;
  isIdle: boolean;
}

export interface OrgState {
  orgData: organizationRegistration;
  loading: boolean;
  isIdle: boolean;
  orgList: Organization[];
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
