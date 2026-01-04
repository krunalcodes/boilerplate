"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@saas/ui/components/ui/button";
import { Field, FieldDescription, FieldGroup, FieldLabel, FieldSeparator } from "@saas/ui/components/ui/field";
import { Input } from "@saas/ui/components/ui/input";
import InputPassword from "@saas/ui/components/ui/input-password";
import { Spinner } from "@saas/ui/components/ui/spinner";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";

import { authClient } from "@/lib/auth-client";

import SocialLoginForm from "./social-login-form";

const signupSchema = z.object({
  email: z.email({ message: "Invalid email address" }),
  password: z
    .string({ message: "Password is required" })
    .min(8, { message: "Password must be at least 8 characters long" }),
  name: z.string({ message: "Name is required" }),
});

type SignupSchema = z.infer<typeof signupSchema>;

export default function SignupForm() {
  const [isPending, setIsPending] = useState<boolean>(false);

  const form = useForm<SignupSchema>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      email: "",
      password: "",
      name: "",
    },
  });

  const router = useRouter();

  const handleSignup = async (values: SignupSchema) => {
    setIsPending(true);
    const { error } = await authClient.signUp.email({
      email: values.email,
      password: values.password,
      name: values.name,
    });
    setIsPending(false);

    if (error) {
      toast.error(error.message ?? "An error occurred while signing up");
      return;
    }

    toast.success("Account created successfully");
    router.push("/login");
  };

  return (
    <form onSubmit={form.handleSubmit(handleSignup)}>
      <FieldGroup>
        <div className="flex flex-col items-center gap-1 text-center">
          <h1 className="text-2xl font-bold">Create your account</h1>
          <p className="text-muted-foreground text-sm text-balance">Fill in the form below to create your account</p>
        </div>
        <Controller
          name="name"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor={field.name}>Name</FieldLabel>
              <Input id={field.name} type="text" placeholder="John Doe" {...field} aria-invalid={fieldState.invalid} />
            </Field>
          )}
        />
        <Controller
          name="email"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor={field.name}>Email</FieldLabel>
              <Input
                id={field.name}
                type="email"
                placeholder="m@example.com"
                {...field}
                aria-invalid={fieldState.invalid}
              />
            </Field>
          )}
        />
        <Controller
          name="password"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor={field.name}>Password</FieldLabel>
              <InputPassword id={field.name} {...field} aria-invalid={fieldState.invalid} />
            </Field>
          )}
        />
        <Field>
          <Button disabled={isPending} type="submit">
            {isPending ? <Spinner /> : "Create account"}
          </Button>
        </Field>
        <FieldSeparator>Or continue with</FieldSeparator>
        <Field>
          <SocialLoginForm />
          <FieldDescription className="text-center">
            Already have an account?{" "}
            <Link href="/login" className="underline underline-offset-4">
              Login
            </Link>
          </FieldDescription>
        </Field>
      </FieldGroup>
    </form>
  );
}
