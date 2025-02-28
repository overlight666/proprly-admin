/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";

const submitCall = Promise.resolve();

export const useAsyncSubmit = () => {
  const [submitId, setSubmitId] = useState<any>(undefined);

  const submitRequest = async (params: any) => {
    setSubmitId(params);
    const processCall = submitCall.then(() =>
      fetch(`https://jsonplaceholder.typicode.com/todos`)
    );

    try {
      await processCall;
      return params;
    } catch (error) {
      return error;
    }
  };

  return { submitId, submitRequest };
};
