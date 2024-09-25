/* eslint-disable @typescript-eslint/no-explicit-any */
import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./features/counterSlice";
import userReducer from "./features/userSlice";
import leadReducer from "./features/leadSlice";
import organizationReducer from "./features/organizationSlice";
// ...

export const store: any = configureStore({
  reducer: {
    counter: counterReducer,
    user: userReducer,
    lead: leadReducer,
    organization: organizationReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
