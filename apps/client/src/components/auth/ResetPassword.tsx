import { useState } from "react";
import { z } from "zod";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link } from "@tanstack/react-router";
import { sendPasswordReset } from "@eastgate/auth";
import { Button } from "@eastgate/ui/components/button";
import { Input } from "@eastgate/ui/components/input";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@eastgate/ui/components/field";
import { AuthCard } from "./AuthCard";
import { AuthContainer } from "./AuthContainer";

const resetPasswordSchema = z.object({
  email: z.email("Please enter a valid email."),
});

type ResetPasswordFormValues = z.infer<typeof resetPasswordSchema>;

export function ResetPasswordForm() {
  const [emailSent, setEmailSent] = useState(false);

  const form = useForm<ResetPasswordFormValues>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: { email: "" },
  });

  const onSubmit = async ({ email }: ResetPasswordFormValues) => {
    await sendPasswordReset(email);
    setEmailSent(true);
  };

  if (emailSent) {
    return (
      <AuthCard
        title="Check your inbox"
        description="If an account exists for that email address, we sent a password-reset link."
      >
        <Button asChild className="w-full">
          <Link to="/logIn">Back to sign in</Link>
        </Button>
      </AuthCard>
    );
  }

  return (
    <AuthContainer>
      <AuthCard
        title="Reset your password"
        description="We'll email you a link to choose a new password."
      >
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FieldGroup>
            <Controller
              control={form.control}
              name="email"
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="email">Email address</FieldLabel>
                  <Input
                    {...field}
                    id="email"
                    type="email"
                    autoComplete="email"
                    placeholder="you@example.com"
                    disabled={form.formState.isSubmitting}
                  />
                  <FieldError
                    errors={fieldState.error ? [fieldState.error] : []}
                  />
                </Field>
              )}
            />

            <Button
              type="submit"
              className="w-full"
              disabled={form.formState.isSubmitting}
            >
              {form.formState.isSubmitting
                ? "Sending link…"
                : "Send reset link"}
            </Button>
          </FieldGroup>
        </form>

        <p className="mt-6 text-center text-sm text-muted-foreground">
          Remembered your password?{" "}
          <Link to="/logIn" className="text-primary hover:underline">
            Sign in
          </Link>
        </p>
      </AuthCard>
    </AuthContainer>
  );
}
