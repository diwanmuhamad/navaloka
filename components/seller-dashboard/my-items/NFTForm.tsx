"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { nftSchema, NFTFormValues } from "@/lib/validations/nftSchema";
import { handleNFTUpload } from "@/lib/handleNFTUpload";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
  DrawerClose,
} from "@/components/ui/drawer";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import { Artwork } from "@/types/artwork";
import { is } from "zod/v4/locales";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";

interface NFTFormDrawerProps {
  open: boolean;
  onOpenChangeAction: (open: boolean) => void;
  initialData?: Partial<NFTFormValues> & { id?: string };
  onSubmitAction?: (
    data: Omit<Artwork, "id" | "created_at" | "updated_at">
  ) => void;
  resetSignal?: number;
}

export function NFTFormDrawer({
  open,
  onOpenChangeAction,
  initialData,
  onSubmitAction,
  resetSignal,
}: NFTFormDrawerProps) {
  const { user } = useSelector((state: RootState) => state.auth);
  const [uploading, setUploading] = React.useState(false);
  const form = useForm<NFTFormValues>({
    resolver: zodResolver(nftSchema),
    defaultValues: {
      title: initialData?.title || "",
      description: initialData?.description || "",
      creator_name: initialData?.creator_name || "",
      receiver_account: initialData?.receiver_account || "",
      owner: initialData?.owner || "",
      price: initialData?.price || 0,
      supply: initialData?.supply || 1,
      artwork_type: initialData?.artwork_type || "digital",
      artwork_format: initialData?.artwork_format || "2D",
      category: initialData?.category || "",
      region: initialData?.region || "",
      license_terms: initialData?.license_terms || "",
    },
  });

  // Reset when new data or reset signal
  React.useEffect(() => {
    form.reset(initialData || {});
  }, [initialData, resetSignal]);

  const onSubmit = async (values: NFTFormValues) => {
    try {
      setUploading(true);
      const result = await handleNFTUpload(values);
      toast.success("NFT successfully uploaded and minted!");
      const newAddedValue: Omit<Artwork, "id" | "created_at" | "updated_at"> = {
        ...values,
        creator_id: user?.id || "",
        is_verified: true,
        status: "published",
        image_url: result.imageUri,
        metadata_uri: result.metadataUri,
        nft_address: result.nftAddress,
      };
      onSubmitAction?.(newAddedValue);
      onOpenChangeAction(false);
    } catch (error: any) {
      toast.error(error.message || "Failed to upload NFT");
    } finally {
      setUploading(false);
    }
  };

  const isMobile =
    typeof window !== "undefined" ? window.innerWidth < 1024 : false;

  return (
    <Drawer
      open={open}
      onOpenChange={onOpenChangeAction}
      direction={isMobile ? "bottom" : "right"}
    >
      <DrawerContent>
        <DrawerHeader className="gap-1">
          <DrawerTitle>
            {initialData?.id ? "Edit Karya" : "Tambah Karya"}
          </DrawerTitle>
          <DrawerDescription>
            {initialData?.id
              ? "Edit NFT metadata or update mint details."
              : "Isi form untuk menambahkan karya."}
          </DrawerDescription>
        </DrawerHeader>
        {!isMobile && <Separator />}
        <div className="flex flex-col gap-4 overflow-y-auto px-4 py-2 text-sm">
          <form
            onSubmit={form.handleSubmit(onSubmit, (errors) => {
              console.log("❌ Validation errors:", errors);
            })}
            className="flex flex-col gap-4"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex flex-col gap-3 md:col-span-2">
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  {...form.register("title")}
                  placeholder="Artwork title"
                />
              </div>

              <div className="flex flex-col gap-3 md:col-span-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  {...form.register("description")}
                  placeholder="Short description"
                />
              </div>

              <div className="flex flex-col gap-3 md:col-span-1">
                <Label htmlFor="creator_name">Creator Name</Label>
                <Input
                  id="creator_name"
                  {...form.register("creator_name")}
                  placeholder="Your name"
                />
              </div>

              <div className="flex flex-col gap-3 md:col-span-1">
                <Label htmlFor="receiver_account">Receiver Account</Label>
                <Input
                  id="receiver_account"
                  {...form.register("receiver_account")}
                  placeholder="Receiver wallet (if any)"
                />
              </div>

              <div className="flex flex-col gap-3 md:col-span-1">
                <Label htmlFor="owner">Owner</Label>
                <Input
                  id="owner"
                  {...form.register("owner")}
                  placeholder="Owner"
                />
              </div>

              <div className="flex flex-col gap-3 md:col-span-1">
                <Label htmlFor="price">Price (IDR)</Label>
                <Input
                  type="number"
                  id="price"
                  {...form.register("price", { valueAsNumber: true })}
                />
              </div>

              <div className="flex flex-col gap-3 md:col-span-1">
                <Label htmlFor="supply">Supply</Label>
                <Input
                  type="number"
                  id="supply"
                  {...form.register("supply", { valueAsNumber: true })}
                />
              </div>

              <div className="flex flex-col gap-3 md:col-span-1">
                <Label>Artwork Type</Label>
                <Select
                  onValueChange={(val) =>
                    form.setValue("artwork_type", val as "digital" | "physical")
                  }
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="digital">Digital</SelectItem>
                    <SelectItem value="physical">Physical</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex flex-col gap-3 md:col-span-2">
                <Label htmlFor="category">Category</Label>
                <Input
                  id="category"
                  {...form.register("category")}
                  placeholder="e.g. Abstract, Portrait"
                />
              </div>

              <div className="flex flex-col gap-3 md:col-span-1">
                <Label>Format</Label>
                <Select
                  onValueChange={(val) =>
                    form.setValue("artwork_format", val as "2D" | "3D")
                  }
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select format" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="2D">2D</SelectItem>
                    <SelectItem value="3D">3D</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex flex-col gap-3 md:col-span-1">
                <Label htmlFor="region">Region</Label>
                <Input
                  id="region"
                  {...form.register("region")}
                  placeholder="e.g. Asia, Europe"
                />
              </div>

              <div className="flex flex-col gap-3 md:col-span-2">
                <Label htmlFor="license_terms">License Terms</Label>
                <Textarea
                  id="license_terms"
                  {...form.register("license_terms")}
                  placeholder="Describe usage rights or license terms"
                />
              </div>

              <div className="flex flex-col gap-3 md:col-span-2">
                <Label htmlFor="image">Upload Image</Label>
                <Input
                  type="file"
                  accept="image/*"
                  id="image"
                  onChange={(e) => {
                    if (e.target.files?.[0]) {
                      form.setValue("image", e.target.files[0]);
                    }
                  }}
                />
              </div>
            </div>

            <Button
              type="submit"
              disabled={uploading}
              className="w-full cursor-pointer mb-2"
            >
              {uploading
                ? "Uploading..."
                : initialData?.id
                ? "Save Changes"
                : "Submit"}
            </Button>

            <DrawerClose asChild>
              <Button variant="outline" type="button" className="w-full mb-4">
                Batal
              </Button>
            </DrawerClose>
          </form>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
