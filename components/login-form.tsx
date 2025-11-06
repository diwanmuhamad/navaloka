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
import { useDispatch, useSelector } from "react-redux";
import { signIn } from "@/store/authSlice";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { AppDispatch, RootState } from "@/store/store";
import { useState } from "react";

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"form">) {
  const [loadingLogin, setLoadingLogin] = useState(false);
  const { loading } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoadingLogin(true);
    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    try {
      await dispatch(signIn({ email, password })).unwrap();
      toast.success("Selamat anda berhasil masuk");
      router.push("/dashboard");
    } catch (error: any) {
      const message =
        error?.message ||
        (typeof error === "string" ? error : "Terjadi kesalahan saat login");
      toast.error(message);
    }
    setLoadingLogin(false);
    // Dispatch your Redux thunk
  };
  return (
    <form
      className={cn("flex flex-col gap-6", className)}
      {...props}
      onSubmit={handleSubmit}
    >
      <FieldGroup>
        <div className="flex flex-col items-center gap-1 text-center">
          <h1 className="text-2xl font-bold">Masuk ke akun Anda</h1>
          <p className="text-muted-foreground text-sm text-balance">
            Masukkan email Anda di bawah untuk masuk ke akun
          </p>
        </div>
        <Field>
          <FieldLabel htmlFor="email">Email</FieldLabel>
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="m@example.com"
          />
        </Field>
        <Field>
          <div className="flex items-center">
            <FieldLabel htmlFor="password">Kata Sandi</FieldLabel>
            <a
              href="#"
              className="ml-auto text-sm underline-offset-4 hover:underline"
            >
              Lupa kata sandi?
            </a>
          </div>
          <Input id="password" name="password" type="password" />
        </Field>
        <Field>
          <Button
            type="submit"
            disabled={loadingLogin}
            className="cursor-pointer"
          >
            {" "}
            {loadingLogin ? "Sedang Proses..." : "Masuk"}
          </Button>
        </Field>
        <FieldSeparator></FieldSeparator>

        <FieldDescription className="text-center">
          Belum punya akun?{" "}
          <a href="/signup" className="underline underline-offset-4">
            Daftar
          </a>
        </FieldDescription>
      </FieldGroup>
    </form>
  );
}
