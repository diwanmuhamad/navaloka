"use client";

import { useState } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store/store";
import { DataTableArtWorksRecords } from "@/components/seller-dashboard/my-items/data-table-artworks";
import { Artwork } from "@/types/artwork";
import { toast } from "sonner";
import { addArtWorkRecord } from "@/store/artWorkSlice";
import { NFTFormDrawer } from "@/components/seller-dashboard/my-items/NFTForm";

export default function MyItemPage() {
  const [openForm, setOpenForm] = useState(false);
  const [resetSignal, setResetSignal] = useState(0);
  const dispatch = useDispatch<AppDispatch>();
  const handleFormSubmit = async (
    values: Omit<Artwork, "id" | "created_at" | "updated_at">
  ) => {
    try {
      await dispatch(
        addArtWorkRecord({
          creator_id: values.creator_id,
          receiver_account: values.receiver_account || null,
          creator_name: values.creator_name,
          title: values.title,
          description: values.description || null,
          price: values.price,
          category: values.category || null,
          region: values.region || null,
          artwork_type: values.artwork_type,
          artwork_format: values.artwork_format,
          image_url: values.image_url || null,
          metadata_uri: values.metadata_uri || null,
          nft_address: values.nft_address || null,
          status: values.status,
          supply: values.supply,
          is_verified: values.is_verified,
        })
      ).unwrap();
      toast.success("Karya berhasil ditambahkan");
      // trigger reset for add mode only
      setResetSignal((n) => n + 1);

      setOpenForm(false);
    } catch (error) {
      const msg =
        error && typeof error === "object" && "message" in error
          ? (error as { message: string }).message
          : typeof error === "string"
          ? error
          : "Gagal menyimpan rekam medis";

      toast.error(msg);
    }
  };
  return (
    <div className="flex flex-1 flex-col">
      <div className="@container/main flex flex-1 flex-col gap-2">
        <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
          <div className="px-4 lg:px-6">
            <DataTableArtWorksRecords
              onAdd={() => {
                setOpenForm(true);
              }}
              onEdit={() => {}}
            />
            <NFTFormDrawer
              open={openForm}
              onOpenChangeAction={setOpenForm}
              onSubmitAction={handleFormSubmit}
              resetSignal={resetSignal}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
