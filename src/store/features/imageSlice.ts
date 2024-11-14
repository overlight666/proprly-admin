/* eslint-disable prettier/prettier */
// import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import { uploadDocument, uploadImageFile } from "./reducers";
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
    });
    builder.addCase(uploadDocument.rejected, (state) => {
      state.fileData = undefined;
    });
  },
});

export const { clear, clearFile } = imageSlice.actions;

// Other code such as selectors can use the imported `RootState` type
// export const selectCount = (state: RootState) => state.counter.value;

export default imageSlice.reducer;
