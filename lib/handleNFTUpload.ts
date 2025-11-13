import { z } from "zod";
import axios from "axios";

// ---------------------------
// ✅ Zod Schema
// ---------------------------
export const nftSchema = z.object({
  title: z.string().min(1),
  creator_name: z.string().min(1),
  owner: z.string().min(1),
  description: z.string().min(1),
  artwork_type: z.string().min(1),
  artwork_format: z.string().min(1),
  category: z.string().min(1),
  license_terms: z.string().min(1),
  region: z.string().min(1),
  image: z.instanceof(File),
});

// ---------------------------
// ✅ Function: upload to Pinata, then mint via API
// ---------------------------
export async function handleNFTUpload(values: z.infer<typeof nftSchema>) {
  try {
    const pinataJWT = process.env.NEXT_PUBLIC_PINATA_JWT!;
    if (!pinataJWT) throw new Error("Pinata JWT not found");

    // 1️⃣ Upload image to IPFS
    const imageForm = new FormData();
    imageForm.append("file", values.image);

    const imageUpload = await axios.post(
      "https://api.pinata.cloud/pinning/pinFileToIPFS",
      imageForm,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${pinataJWT}`,
        },
      }
    );

    const gatewayBaseUrl = process.env.NEXT_PUBLIC_PINATA_GATEWAY;
    const imageUri = `${gatewayBaseUrl}${imageUpload.data.IpfsHash}`;

    // 2️⃣ Create metadata JSON
    const metadata = {
      name: values.title,
      description: values.description,
      image: imageUri,
      attributes: [
        { trait_type: "Creator", value: values.creator_name },
        { trait_type: "Owner", value: values.owner },
        { trait_type: "Artwork Type", value: values.artwork_type },
        { trait_type: "Format", value: values.artwork_format },
        { trait_type: "Category", value: values.category },
        { trait_type: "License Terms", value: values.license_terms },
        { trait_type: "Region", value: values.region },
      ],
    };

    // 3️⃣ Upload metadata to IPFS
    const metadataUpload = await axios.post(
      "https://api.pinata.cloud/pinning/pinJSONToIPFS",
      metadata,
      {
        headers: {
          Authorization: `Bearer ${pinataJWT}`,
        },
      }
    );

    const metadataUri = `${gatewayBaseUrl}${metadataUpload.data.IpfsHash}`;

    // 4️⃣ Ask backend to mint the NFT (server-side)
    const mintResponse = await axios.post("/api/nft", {
      metadataUri,
      name: values.title,
    });

    return {
      imageUri,
      metadataUri,
      nftAddress: mintResponse.data.nftAddress,
    };
  } catch (error: any) {
    console.error("❌ Error uploading NFT:", error);
    throw new Error(error?.message || "Failed to upload NFT");
  }
}
