"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@saas/ui/components/ui/button";
import { Field, FieldGroup, FieldLabel } from "@saas/ui/components/ui/field";
import { Input } from "@saas/ui/components/ui/input";
import { Spinner } from "@saas/ui/components/ui/spinner";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";

import { authClient } from "@/lib/auth-client";

const forgotPasswordSchema = z.object({
  email: z.email({ message: "Invalid email address" }),
});

type ForgotPasswordSchema = z.infer<typeof forgotPasswordSchema>;

export default function ForgotPasswordForm() {
  const [isPending, setIsPending] = useState<boolean>(false);

  const form = useForm<ForgotPasswordSchema>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  const router = useRouter();

  const handleForgotPassword = async (values: ForgotPasswordSchema) => {
    setIsPending(true);
    const { error } = await authClient.requestPasswordReset({
      email: values.email,
    });
    setIsPending(false);

    if (error) {
      toast.error(error.message ?? "An error occurred while resetting your password");
      return;
    }

    toast.success("Password reset email sent");
    router.push("/login");
  };

  return (
    <form onSubmit={form.handleSubmit(handleForgotPassword)}>
      <FieldGroup>
        <div className="flex flex-col items-center gap-1 text-center">
          <h1 className="text-2xl font-bold">Forgot your password?</h1>
          <p className="text-muted-foreground text-sm text-balance">Enter your email below to reset your password</p>
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
        <Field>
          <Button disabled={isPending} type="submit">
            {isPending ? <Spinner /> : "Reset password"}
          </Button>
        </Field>
      </FieldGroup>
    </form>
  );
}
