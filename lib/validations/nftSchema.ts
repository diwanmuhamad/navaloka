import { z } from "zod";

// ✅ NFT form schema
export const nftSchema = z.object({
  receiver_account: z.string().nullable().optional(), // for Solana wallet address (if different from creator)
  creator_name: z.string().min(1, "Creator name is required"),
  title: z.string().min(1, "Title is required"),
  description: z.string(),
  price: z.number().min(0, "Price must be positive"),
  category: z.string(),
  region: z.string(),
  artwork_type: z.enum(["digital", "physical"]),
  artwork_format: z.enum(["2D", "3D"]),
  supply: z.number().min(1, "At least 1 item required"),
  owner: z.string(),
  license_terms: z.string().min(1, "License terms are required"),
  image: z.instanceof(File, { message: "Image file is required" }),
});

export type NFTFormValues = z.infer<typeof nftSchema>;
