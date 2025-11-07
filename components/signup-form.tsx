"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  registerSchema,
  type RegisterFormData,
} from "@/lib/validations/authSchema";
import { useDispatch } from "react-redux";
import { signUp } from "@/store/authSlice";
import { AppDispatch } from "@/store/store";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useState } from "react";

export function SignupForm({
  className,
  ...props
}: React.ComponentProps<"form">) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });
  const [loadingSignUP, setLoadingSignUP] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  const onSubmit = async (data: RegisterFormData) => {
    setLoadingSignUP(true);
    try {
      await dispatch(
        signUp({ email: data.email, password: data.password, name: data.name })
      ).unwrap();
      toast.success("Selamat anda berhasil terdaftar");
      router.push("/onboarding");
    } catch (error: any) {
      const message =
        error?.message ||
        (typeof error === "string" ? error : "Terjadi kesalahan saat login");
      toast.error(message);
    }

    setLoadingSignUP(false);
  };

  return (
    <form
      className={cn("flex flex-col gap-6", className)}
      {...props}
      onSubmit={handleSubmit(onSubmit)}
    >
      <FieldGroup>
        <div className="flex flex-col items-center gap-1 text-center">
          <h1 className="text-2xl font-bold">Buat akun Anda</h1>
          <p className="text-muted-foreground text-sm text-balance">
            Isi formulir di bawah untuk membuat akun
          </p>
        </div>
        <Field>
          <FieldLabel htmlFor="name">Nama Lengkap</FieldLabel>
          <Input
            id="name"
            type="text"
            placeholder="Nama Lengkap"
            {...register("name")}
          />
          {errors.name && (
            <FieldDescription className="text-red-500">
              {errors.name.message}
            </FieldDescription>
          )}
        </Field>
        <Field>
          <FieldLabel htmlFor="email">Email</FieldLabel>
          <Input
            id="email"
            type="email"
            placeholder="m@example.com"
            {...register("email")}
          />
          <FieldDescription
            className={errors.email ? "text-red-500" : "text-zinc-400"}
          >
            {errors.email
              ? errors.email.message
              : "Kami akan menggunakan ini untuk menghubungi Anda. Kami tidak akan membagikan email Anda kepada siapapun."}
          </FieldDescription>
        </Field>
        <Field>
          <FieldLabel htmlFor="password">Kata Sandi</FieldLabel>
          <Input id="password" type="password" {...register("password")} />
          <FieldDescription
            className={errors.password ? "text-red-500" : "text-zinc-400"}
          >
            {errors.password ? errors.password.message : "Minimal 8 karakter."}
          </FieldDescription>
        </Field>
        <Field>
          <FieldLabel htmlFor="confirm-password">
            Konfirmasi Kata Sandi
          </FieldLabel>
          <Input
            id="confirm-password"
            type="password"
            {...register("confirmPassword")}
          />
          <FieldDescription
            className={
              errors.confirmPassword ? "text-red-500" : "text-zinc-400"
            }
          >
            {errors.confirmPassword ? errors.confirmPassword.message : ""}
          </FieldDescription>
        </Field>
        <Field>
          <Button
            type="submit"
            disabled={loadingSignUP}
            className="cursor-pointer"
          >
            {loadingSignUP ? "Sedang Proses..." : "Buat Akun"}
          </Button>
        </Field>
        <FieldSeparator />
        <FieldDescription className="px-6 text-center">
          Sudah punya akun? <a href="/login">Masuk</a>
        </FieldDescription>
      </FieldGroup>
    </form>
  );
}
