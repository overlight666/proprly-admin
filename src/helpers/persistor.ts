/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */

export { usePersistor };

function usePersistor() {
  return {
    getValues,
    putValues,
    clearValues,
  };

  function getValues(name: string) {
    const rawValue = localStorage.getItem(name);

    if (rawValue) {
      try {
        return JSON.parse(rawValue);
      } catch (_e) {
        return rawValue;
      }
    }
    return undefined;
  }

  function putValues(name: string, value: any) {
    const parsedValue =
      typeof value === "object" ? JSON.stringify(value) : value;
    localStorage.setItem(name, parsedValue);
  }

  function clearValues(name: string) {
    localStorage.removeItem(name);
  }
}
