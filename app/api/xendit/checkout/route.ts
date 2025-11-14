// app/api/checkout/route.ts
import { NextResponse } from "next/server";
import Xendit from "xendit-node";
import { CreateInvoiceRequest } from "xendit-node/invoice/models";

const x = new Xendit({
  secretKey: process.env.XENDIT_SECRET_KEY!,
});

export async function POST(req: Request) {
  try {
    const { item_id, price } = await req.json();

    const data: CreateInvoiceRequest = {
      amount: price,
      invoiceDuration: 172800,
      externalId: `order_${item_id}_${Date.now()}`,
      description: "Payment for digital product",
      currency: "IDR",
      reminderTime: 1,
    };

    const invoice = await x.Invoice.createInvoice({ data });

    return NextResponse.json({
      invoiceId: invoice.id,
      invoiceUrl: invoice.invoiceUrl, // FIXED
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
