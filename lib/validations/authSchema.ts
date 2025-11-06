import { z } from "zod";

export const registerSchema = z
  .object({
    name: z.string().min(2, "Nama harus minimal 2 karakter"),
    email: z.string().email("Alamat email tidak valid"),
    password: z
      .string()
      .trim()
      .min(8, "Kata sandi harus minimal 8 karakter"),
    confirmPassword: z.string().trim().min(8, "Harap konfirmasi kata sandi Anda"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Kata sandi tidak cocok",
    path: ["confirmPassword"],
  });

export type RegisterFormData = z.infer<typeof registerSchema>;
