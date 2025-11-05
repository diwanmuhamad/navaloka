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
          <h1 className="text-2xl font-bold">Create your account</h1>
          <p className="text-muted-foreground text-sm text-balance">
            Fill in the form below to create your account
          </p>
        </div>
        <Field>
          <FieldLabel htmlFor="name">Full Name</FieldLabel>
          <Input
            id="name"
            type="text"
            placeholder="John Doe"
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
              : "We'll use this to contact you. We will not share your email with anyone else."}
          </FieldDescription>
        </Field>
        <Field>
          <FieldLabel htmlFor="password">Password</FieldLabel>
          <Input id="password" type="password" {...register("password")} />
          <FieldDescription
            className={errors.password ? "text-red-500" : "text-zinc-400"}
          >
            {errors.password
              ? errors.password.message
              : "Must be at least 8 characters long."}
          </FieldDescription>
        </Field>
        <Field>
          <FieldLabel htmlFor="confirm-password">Confirm Password</FieldLabel>
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
          <Button type="submit">Create Account</Button>
        </Field>
        <FieldSeparator />
        <FieldDescription className="px-6 text-center">
          Already have an account? <a href="/login">Sign in</a>
        </FieldDescription>
      </FieldGroup>
    </form>
  );
}
