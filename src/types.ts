import type { leadRegistration } from "./apis";

export interface LeadState {
  leadData: leadRegistration;
  loading: boolean;
  isIdle: boolean;
}
