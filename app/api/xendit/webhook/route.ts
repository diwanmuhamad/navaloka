import { supabase } from "@/lib/supabaseClient";
import { NextResponse } from "next/server";
import { Xendit, Payout as PayoutClient } from "xendit-node";
import { CreatePayoutRequest } from "xendit-node/payout/models";

const xenditPayoutClient = new PayoutClient({
  secretKey: process.env.XENDIT_SECRET_KEY!,
});

export async function POST(req: Request) {
  try {
    const body = await req.json();

    if (body.status === "PAID") {
      const item_id = body.external_id.split("_")[1];
      const { data } = await supabase
        .from("artworks")
        .select("receiver_account, creator_name")
        .eq("id", item_id)
        .single();
      const receiverAccount = data?.receiver_account;
      if (receiverAccount) {
        const dataPayout: CreatePayoutRequest = {
          amount: Number(body.amount * 0.95),
          channelProperties: {
            accountNumber: "888888888",
            accountHolderName: data.creator_name,
          },
          description: `Royalty payment for artwork ${item_id}`,
          currency: "IDR",
          referenceId: `payout_${item_id}_${Date.now()}`,
          channelCode: "ID_BCA",
        };

        console.log(dataPayout);

        const payout = await xenditPayoutClient.createPayout({
          idempotencyKey: dataPayout.referenceId,
          data: dataPayout,
        });

        console.log(payout);
      }
    }

    return NextResponse.json({ message: "Webhook received" }, { status: 200 });
  } catch (e) {
    console.error("Webhook error:", e);
    return new NextResponse("Webhook error", { status: 400 });
  }
}
