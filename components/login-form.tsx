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

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"form">) {
  return (
    <form className={cn("flex flex-col gap-6", className)} {...props}>
      <FieldGroup>
        <div className="flex flex-col items-center gap-1 text-center">
          <h1 className="text-2xl font-bold">Masuk ke akun Anda</h1>
          <p className="text-muted-foreground text-sm text-balance">
            Masukkan email Anda di bawah untuk masuk ke akun
          </p>
        </div>
        <Field>
          <FieldLabel htmlFor="email">Email</FieldLabel>
          <Input id="email" type="email" placeholder="m@example.com" />
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
          <Input id="password" type="password" />
        </Field>
        <Field>
          <Button type="submit">Masuk</Button>
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
