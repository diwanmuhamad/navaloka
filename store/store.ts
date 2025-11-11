import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import artworkReducer from "./artWorkSlice";

export const store = configureStore({
  reducer: { auth: authReducer, artwork: artworkReducer },
});

// Types for dispatch and selector
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
