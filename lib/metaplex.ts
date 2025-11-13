import {
  Metaplex,
  keypairIdentity,
  bundlrStorage,
} from "@metaplex-foundation/js";
import { Connection, clusterApiUrl, Keypair } from "@solana/web3.js";

export function createMetaplexInstance() {
  const connection = new Connection(
    "https://api.devnet.solana.com",
    "confirmed"
  );
  const secret = process.env.NEXT_PUBLIC_SOLANA_PRIVATE_KEY!;
  const secretKey = Uint8Array.from(JSON.parse(secret));
  const wallet = Keypair.fromSecretKey(secretKey);

  const metaplex = Metaplex.make(connection)
    .use(keypairIdentity(wallet))
    .use(
      bundlrStorage({
        address: "https://devnet.bundlr.network",
        providerUrl: "https://api.devnet.solana.com",
        timeout: 60000,
      })
    );
  return metaplex;
}
