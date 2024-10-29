interface permissionType {
  CAN_ADD_ORG: string;
  CAN_VIEW_ORG: string;
  CAN_ACCESS_LEADS: string;
}
/* eslint-disable @typescript-eslint/no-explicit-any */
const PERMISSIONS: permissionType = {
  CAN_ADD_ORG: "can_add_organization",
  CAN_VIEW_ORG: "can_view_organization",
  CAN_ACCESS_LEADS: "can_access_leads",
};
export default PERMISSIONS;
