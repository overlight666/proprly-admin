/* eslint-disable prettier/prettier */
// import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import {
  postWarranties,
  postWarrantyFiles,
  uploadDocument,
  uploadImageFile,
} from "./reducers";
import type { ImageState } from "../../types";

// Define the initial state using that type
const initialValue = {
  id: 0,
  name: "",
  key: "",
  mimeType: "",
  createdAt: "",
  updatedAt: "",
  url: "",
};

const initialState: ImageState = {
  imageData: initialValue,
  fileData: undefined,
  isIdle: true,
  warrantyData: undefined,
  warrantyResponse: undefined,
  warrantyResponseStatus: false,
  uploadDone: false,
};

export const imageSlice = createSlice({
  name: "uploads",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    clear: (state) => {
      state.imageData = initialValue;
    },
    clearFile: (state) => {
      state.fileData = undefined;
    },
    clearWarranty: (state) => {
      state.warrantyData = undefined;
    },
    resetWarranty: (state) => {
      state.warrantyResponse = undefined;
      state.warrantyResponseStatus = false;
      state.uploadDone = false;
    },
    resetUpload: (state) => {
      state.uploadDone = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(uploadImageFile.pending, (state) => {
      state.isIdle = false;
    });
    builder.addCase(uploadImageFile.fulfilled, (state, action) => {
      if (action.payload.code) {
        state.imageData = initialValue;
      } else {
        state.imageData = action.payload[0];
      }
      state.isIdle = true;
      state.uploadDone = true;
    });
    builder.addCase(uploadImageFile.rejected, (state) => {
      state.isIdle = true;
    });
    builder.addCase(uploadDocument.pending, (state) => {
      state.fileData = undefined;
    });
    builder.addCase(uploadDocument.fulfilled, (state, action) => {
      if (action.payload.code) {
        state.fileData = initialValue;
      } else {
        state.fileData = action.payload[0];
      }
      state.uploadDone = true;
    });
    builder.addCase(uploadDocument.rejected, (state) => {
      state.fileData = undefined;
    });
    builder.addCase(postWarranties.pending, (state) => {
      state.warrantyData = undefined;
    });
    builder.addCase(postWarranties.fulfilled, (state, action) => {
      if (action.payload.code) {
        state.warrantyData = undefined;
      } else {
        state.warrantyData = action.payload;
      }
      state.uploadDone = true;
    });
    builder.addCase(postWarranties.rejected, (state) => {
      state.warrantyData = undefined;
    });
    builder.addCase(postWarrantyFiles.pending, (state) => {
      state.warrantyResponse = undefined;
      state.uploadDone = true;
      state.warrantyResponseStatus = true;
    });
    builder.addCase(postWarrantyFiles.fulfilled, (state, action) => {
      state.warrantyResponse = action.payload;
    });
    builder.addCase(postWarrantyFiles.rejected, (state) => {
      state.warrantyResponse = undefined;
      state.uploadDone = true;
      state.warrantyResponseStatus = false;
    });
  },
});

export const { clear, clearFile, clearWarranty, resetWarranty, resetUpload } =
  imageSlice.actions;

// Other code such as selectors can use the imported `RootState` type
// export const selectCount = (state: RootState) => state.counter.value;

export default imageSlice.reducer;
