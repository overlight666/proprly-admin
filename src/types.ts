import type { leadRegistration, organizationRegistration } from "./apis";

export interface LeadState {
  leadData: leadRegistration;
  loading: boolean;
  isIdle: boolean;
}

export interface OrgState {
  orgData: organizationRegistration;
  loading: boolean;
  isIdle: boolean;
}
