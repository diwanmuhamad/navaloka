import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { supabase } from "@/lib/supabaseClient";
import type { User } from "@supabase/supabase-js";

interface AuthState {
  user: User | null;
  role: string | null;
  name: string | null;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  role: null,
  name: null,
  loading: true,
  error: null,
};

export const signUp = createAsyncThunk(
  "auth/signUp",
  async ({
    email,
    password,
    name,
  }: {
    email: string;
    password: string;
    name: string;
  }) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { role: null, name: name } },
    });
    if (error) throw error;
    return data.user;
  }
);

export const changeUserRole = createAsyncThunk(
  "auth/changeUserRole",
  async ({ newRole }: { newRole: string }) => {
    const { data, error } = await supabase.auth.updateUser({
      data: { role: newRole },
    });
    if (error) throw error;
    return data.user;
  }
);

export const signIn = createAsyncThunk(
  "auth/signIn",
  async ({ email, password }: { email: string; password: string }) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) throw error;
    return data.user;
  }
);

export const signOut = createAsyncThunk("auth/signOut", async () => {
  await supabase.auth.signOut();
  return null;
});

export const getUser = createAsyncThunk("auth/getUser", async () => {
  const { data } = await supabase.auth.getUser();
  return data.user;
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User | null>) => {
      state.user = action.payload;
      state.role = action.payload?.user_metadata?.role || null;
      state.name = action.payload?.user_metadata?.name;
      state.loading = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signUp.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.role = action.payload?.user_metadata?.role || "user";
        state.name = action.payload?.user_metadata?.name;
      })
      .addCase(signIn.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.role = action.payload?.user_metadata?.role || "user";
        state.name = action.payload?.user_metadata?.name;
      })
      .addCase(signOut.fulfilled, (state) => {
        state.user = null;
        state.role = null;
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.role = action.payload?.user_metadata?.role || null;
        state.name = action.payload?.user_metadata?.name;
      })
      .addMatcher(
        (action) => action.type.endsWith("rejected"),
        (state, action: any) => {
          state.loading = false;
          state.error = action.error.message;
        }
      );
  },
});

export const { setUser } = authSlice.actions;
export default authSlice.reducer;
