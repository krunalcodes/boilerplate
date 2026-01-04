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

const loginSchema = z.object({
  email: z.email({ message: "Invalid email address" }),
  password: z.string({ message: "Password is required" }),
});

type LoginSchema = z.infer<typeof loginSchema>;

export default function LoginForm() {
  const [isPending, setIsPending] = useState<boolean>(false);

  const form = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const router = useRouter();

  const handleLogin = async (values: LoginSchema) => {
    setIsPending(true);
    const { error } = await authClient.signIn.email({
      email: values.email,
      password: values.password,
    });
    setIsPending(false);

    if (error) {
      toast.error(error.message ?? "An error occurred while logging in");
      return;
    }

    router.push("/app/dashboard");
  };

  return (
    <form onSubmit={form.handleSubmit(handleLogin)}>
      <FieldGroup>
        <div className="flex flex-col items-center gap-1 text-center">
          <h1 className="text-2xl font-bold">Login to your account</h1>
          <p className="text-muted-foreground text-sm text-balance">Enter your email below to login to your account</p>
        </div>
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
              <div className="flex items-center">
                <FieldLabel htmlFor={field.name}>Password</FieldLabel>
                <Link href="/forgot-password" className="ml-auto text-sm underline-offset-4 hover:underline">
                  Forgot your password?
                </Link>
              </div>
              <InputPassword id={field.name} {...field} aria-invalid={fieldState.invalid} />
            </Field>
          )}
        />
        <Field>
          <Button disabled={isPending} type="submit">
            {isPending ? <Spinner /> : "Login"}
          </Button>
        </Field>
        <FieldSeparator>Or continue with</FieldSeparator>
        <Field>
          <SocialLoginForm />
          <FieldDescription className="text-center">
            Don&apos;t have an account?{" "}
            <Link href="/signup" className="underline underline-offset-4">
              Sign up
            </Link>
          </FieldDescription>
        </Field>
      </FieldGroup>
    </form>
  );
}
