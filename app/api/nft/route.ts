import { NextResponse } from "next/server";
import { createMetaplexInstance } from "@/lib/metaplex";

export async function POST(req: Request) {
  try {
    const { metadataUri, name } = await req.json();

    const metaplex = createMetaplexInstance();
    const { nft } = await metaplex.nfts().create({
      uri: metadataUri,
      name,
      sellerFeeBasisPoints: 500, // 5%
    });

    return NextResponse.json({
      nftAddress: nft.address.toBase58(),
    });
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message || "Failed to mint NFT" },
      { status: 500 }
    );
  }
}
