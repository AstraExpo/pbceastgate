import { useState } from "react";
import { z } from "zod";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link } from "@tanstack/react-router";
import { createUserWithEmail } from "@eastgate/auth";
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

const signupSchema = z
  .object({
    email: z.email("Please enter a valid email."),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters.")
      .max(16, "Password must not exceed 16 characters."),
    confirmPassword: z.string(),
  })
  .refine(({ password, confirmPassword }) => password === confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match.",
  });

type SignupFormValues = z.infer<typeof signupSchema>;

export function SignupForm() {
  const [accountCreated, setAccountCreated] = useState(false);

  const form = useForm<SignupFormValues>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async ({ email, password }: SignupFormValues) => {
    await createUserWithEmail(email, password);

    /*
     * Client backend integration point:
     * Call the client registration/authentication mutation here once that
     * hook exists. No GraphQL operation is assumed or invented here.
     */
    setAccountCreated(true);
  };

  if (accountCreated) {
    return (
      <AuthContainer>
        <AuthCard
          title="Account created"
          description="Your account is ready. You can now sign in."
        >
          <Button asChild className="w-full">
            <Link to="/logIn">Continue to sign in</Link>
          </Button>
        </AuthCard>
      </AuthContainer>
    );
  }

  return (
    <AuthContainer>
      <AuthCard
        title="Create an account"
        description="Enter your details to get started."
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

            <Controller
              control={form.control}
              name="password"
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="password">Password</FieldLabel>
                  <Input
                    {...field}
                    id="password"
                    type="password"
                    autoComplete="new-password"
                    disabled={form.formState.isSubmitting}
                  />
                  <FieldError
                    errors={fieldState.error ? [fieldState.error] : []}
                  />
                </Field>
              )}
            />

            <Controller
              control={form.control}
              name="confirmPassword"
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="confirmPassword">
                    Confirm password
                  </FieldLabel>
                  <Input
                    {...field}
                    id="confirmPassword"
                    type="password"
                    autoComplete="new-password"
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
                ? "Creating account…"
                : "Create account"}
            </Button>
          </FieldGroup>
        </form>

        <p className="mt-6 text-center text-sm text-muted-foreground">
          Already have an account?{" "}
          <Link to="/logIn" className="text-primary hover:underline">
            Sign in
          </Link>
        </p>
      </AuthCard>
    </AuthContainer>
  );
}
