import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { supabase } from "@/lib/supabaseClient";
import { Artwork } from "@/types/artwork";

interface ArtWorkState {
  records: Artwork[];
  loading: boolean;
  error: string | null;
}

const initialState: ArtWorkState = {
  records: [],
  loading: false,
  error: null,
};

export const fetchArtWorkRecords = createAsyncThunk(
  "artworkRecords/fetchArtWorkRecords",
  async (id: string) => {
    let query = supabase
      .from("artworks")
      .select("*")
      .eq("creator_id", id)
      .order("created_at", { ascending: false });
    const { data, error } = await query;
    if (error) throw error;

    return data as Artwork[];
  }
);

export const addArtWorkRecord = createAsyncThunk(
  "artworkRecords/addArtWorkRecord",
  async (payload: Omit<Artwork, "id" | "created_at" | "updated_at">) => {
    const {
      creator_id,
      receiver_account,
      creator_name,
      title,
      description,
      price,
      category,
      region,
      artwork_type,
      artwork_format,
      image_url,
      metadata_uri,
      nft_address,
      status,
      supply,
      is_verified,
    } = payload;
    const { data, error } = await supabase
      .from("artworks")
      .insert([
        {
          creator_id,
          receiver_account,
          creator_name,
          title,
          description,
          price,
          category,
          region,
          artwork_type,
          artwork_format,
          image_url,
          metadata_uri,
          nft_address,
          status,
          supply,
          is_verified,
        },
      ])
      .select("*")
      .single();

    if (error) throw error;
    return data as Artwork;
  }
);

export const updateArtWorkRecord = createAsyncThunk(
  "artworkRecords/updateArtWorkRecord",
  async (payload: Artwork) => {
    const { id, ...rest } = payload;
    const { data, error } = await supabase
      .from("artworks")
      .update(rest)
      .eq("id", id)
      .select("*")
      .single();

    if (error) throw error;
    return data as Artwork;
  }
);

export const deleteArtWorkRecord = createAsyncThunk(
  "artworkRecords/deleteArtWorkRecord",
  async (id: string) => {
    const { data, error } = await supabase
      .from("artworks")
      .delete()
      .eq("id", id)
      .select();
    if (error) throw new Error(error.message);
    return id;
  }
);

const artworkRecordsSlice = createSlice({
  name: "artworkRecords",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchArtWorkRecords.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchArtWorkRecords.fulfilled, (state, action) => {
        state.loading = false;
        state.records = action.payload;
      })
      .addCase(fetchArtWorkRecords.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch artwork records";
      })
      .addCase(addArtWorkRecord.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addArtWorkRecord.fulfilled, (state, action) => {
        state.loading = false;
        state.records.unshift(action.payload);
      })
      .addCase(addArtWorkRecord.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to add artwork record";
      })
      .addCase(updateArtWorkRecord.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateArtWorkRecord.fulfilled, (state, action) => {
        state.loading = false;
        const idx = state.records.findIndex((r) => r.id === action.payload.id);
        if (idx !== -1) state.records[idx] = action.payload;
      })
      .addCase(updateArtWorkRecord.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to update artwork record";
      })
      .addCase(deleteArtWorkRecord.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteArtWorkRecord.fulfilled, (state, action) => {
        state.loading = false;
        state.records = state.records.filter((r) => r.id !== action.payload);
      })
      .addCase(deleteArtWorkRecord.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to delete artwork record";
      });
  },
});

export default artworkRecordsSlice.reducer;
