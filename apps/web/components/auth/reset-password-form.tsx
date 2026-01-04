"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@saas/ui/components/ui/button";
import { Field, FieldGroup, FieldLabel } from "@saas/ui/components/ui/field";
import InputPassword from "@saas/ui/components/ui/input-password";
import { Spinner } from "@saas/ui/components/ui/spinner";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";

import { authClient } from "@/lib/auth-client";

const resetPasswordSchema = z
  .object({
    password: z
      .string({ message: "Password is required" })
      .min(8, { message: "Password must be at least 8 characters long" }),
    confirmPassword: z
      .string({ message: "Confirm password is required" })
      .min(8, { message: "Confirm password must be at least 8 characters long" }),
  })
  .superRefine(({ password, confirmPassword }, ctx) => {
    if (password !== confirmPassword) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Passwords do not match",
        path: ["confirmPassword"],
      });
    }
  });

type ResetPasswordSchema = z.infer<typeof resetPasswordSchema>;

export default function ResetPasswordForm() {
  const { token } = useParams<{ token: string }>();
  const [isPending, setIsPending] = useState<boolean>(false);

  const form = useForm<ResetPasswordSchema>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  const router = useRouter();

  const handleResetPassword = async (values: ResetPasswordSchema) => {
    setIsPending(true);
    const { error } = await authClient.resetPassword({
      token: token,
      newPassword: values.password,
    });
    setIsPending(false);

    if (error) {
      toast.error(error.message ?? "An error occurred while resetting your password");
      return;
    }

    toast.success("Password reset successfully");
    router.push("/login");
  };

  return (
    <form onSubmit={form.handleSubmit(handleResetPassword)}>
      <FieldGroup>
        <div className="flex flex-col items-center gap-1 text-center">
          <h1 className="text-2xl font-bold">Reset your password</h1>
          <p className="text-muted-foreground text-sm text-balance">
            Enter your new password below to reset your password
          </p>
        </div>
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
        <Controller
          name="confirmPassword"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor={field.name}>Confirm Password</FieldLabel>
              <InputPassword id={field.name} {...field} aria-invalid={fieldState.invalid} />
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
