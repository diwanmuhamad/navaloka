"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Artwork } from "@/types/artwork";
import axios from "axios";
import { useState } from "react";
import { toast } from "sonner";

interface ConfirmationModalProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  karya: Artwork | null;
}

export function ConfirmationModal({
  open,
  setOpen,
  karya,
}: ConfirmationModalProps) {
  const [loading, setLoading] = useState(false);
  const handleCheckout = async () => {
    setLoading(true);
    try {
      const res = await axios.post("/api/xendit/checkout", {
        item_id: karya?.id,
        price: karya?.price,
      });

      window.location.href = res.data.invoiceUrl;
    } catch {
      toast.error("Failed to initiate checkout. Please try again.");
    }
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Checkout Confirmation</DialogTitle>
          <DialogDescription>
            Are you sure you want to proceed to checkout? (you will be
            redirected to Xendit payment page)
          </DialogDescription>
        </DialogHeader>

        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
          </DialogClose>

          <Button
            onClick={handleCheckout}
            className="cursor-pointer"
            disabled={loading}
          >
            {loading ? "Redirecting..." : "Checkout"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
