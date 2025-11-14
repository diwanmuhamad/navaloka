export interface Artwork {
  id: string;
  creator_id: string;
  receiver_account?: string | null;
  creator_name: string;
  title: string;
  description?: string | null;
  price: number;
  category?: string | null;
  region?: string | null;
  artwork_type: "digital" | "physical";
  artwork_format: "2D" | "3D";
  image_url?: string | null;
  metadata_uri?: string | null;
  nft_address?: string | null;
  status: "draft" | "published" | "sold" | "archived";
  supply: number;
  is_verified: boolean;
  created_at: string;
  updated_at: string;
}

export interface fetchArtWorksParams {
  creator_id?: string;
  status?: string;
  artwork_format?: string;
}

export interface ArtWorkState {
  records: Artwork[];
  loading: boolean;
  error: string | null;
}
