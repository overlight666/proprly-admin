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


export function moveKeyToEnd(obj: any, keyToMove: any) {
  if (!obj.hasOwnProperty(keyToMove)) {
    return obj;
  }

  const value = obj[keyToMove];
  delete obj[keyToMove];
  obj[keyToMove] = value;
  return obj;
}

export function moveValueToEnd(arr: any, value: any) {
  const newArray = arr.filter((item: any) => item !== value);
  newArray.push(value);
  return newArray;
}

export function removeItemOnce(arr: any, value: any) {
  var index = arr.indexOf(value);
  if (index > -1) {
    arr.splice(index, 1);
  }
  return arr;
}


export function combineAndRemoveDuplicates(arr1: any, arr2: any) {
  const combinedArray = [...arr1, ...arr2]; // Combines arrays using spread syntax
  const uniqueArray = [...new Set(combinedArray)]; // Removes duplicates using Set
  return uniqueArray;
}