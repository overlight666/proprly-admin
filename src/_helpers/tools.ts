/* eslint-disable @typescript-eslint/no-explicit-any */
export const hasViewDetails = (str: string) => {
  const statuses = [
    "Defect Logged",
    "Materials to be organised",
    "Tradesman to be organised",
    "Materials & Tradesman to be organised",
    "Defect Resolved",
    "Pending Auditor feedback",
    "Resolution Accepted by Auditor",
    "Resolution Rejected by Auditor",
    "Defect Re-opened By Auditor",
    "Pending Owner feedback",
    "Resolution Accepted By Owner",
    "Defect Resolution Disputed by Owner",
    "Defect Re-opened",
    "Defect Closed",
    "Warranty Issue",
    "Owner Defect",
    "Not a Defect",
    "Owner not at home",
    "Defect Accepted by Admin",
    "Defect Rejected by Admin",
    "Resolution Auto-Accepted due to owner inactivity",
  ];

  return statuses.includes(str);
};

export const dynamicSort = (property: any) => {
  return function (a: any, b: any) {
    return a[property] < b[property] ? -1 : a[property] > b[property] ? 1 : 0;
  };
};
