import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";

export const store = configureStore({
  reducer: { auth: authReducer },
});

// Types for dispatch and selector
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
