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

  const onSubmit = (data: RegisterFormData) => {
    console.log("Form submitted:", data);
    // you can call Supabase signup here
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
            {errors.password
              ? errors.password.message
              : "Minimal 8 karakter."}
          </FieldDescription>
        </Field>
        <Field>
          <FieldLabel htmlFor="confirm-password">Konfirmasi Kata Sandi</FieldLabel>
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
          <Button type="submit">Buat Akun</Button>
        </Field>
        <FieldSeparator />
        <FieldDescription className="px-6 text-center">
          Sudah punya akun? <a href="/login">Masuk</a>
        </FieldDescription>
      </FieldGroup>
    </form>
  );
}
