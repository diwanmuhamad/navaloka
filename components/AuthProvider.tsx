"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { store } from "@/store/store";
import { setUser } from "@/store/authSlice";
import { Provider } from "react-redux";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Sync Supabase session to Redux
    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        store.dispatch(setUser(session?.user ?? null));
      }
    );

    // Fetch initial session on load
    supabase.auth.getSession().then(({ data: { session } }) => {
      store.dispatch(setUser(session?.user ?? null));
    });

    return () => listener.subscription.unsubscribe();
  }, []);

  return <Provider store={store}>{children}</Provider>;
}
