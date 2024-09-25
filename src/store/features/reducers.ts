/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable prettier/prettier */
import { createAsyncThunk } from "@reduxjs/toolkit";
import type { leadRegistration } from "../../apis";
import { signupLead } from "../../apis";

export const registerLead: any = createAsyncThunk(
  "type/postData",
  async (data: leadRegistration) => {
    try {
      const response = await signupLead(data);
      // If you want to get something back
      return response.data;
    } catch (err) {
      console.error(err);
    }
  }
);
