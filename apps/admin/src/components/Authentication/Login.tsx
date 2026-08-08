import { useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { z } from "zod";

import {
  Card,
  CardHeader,
  CardDescription,
  CardContent,
} from "@eastgate/ui/components/card";
import { TypographyH3 } from "@eastgate/ui/components/typography";
import { Button } from "@eastgate/ui/components/button";
import { Input } from "@eastgate/ui/components/input";
import { Label } from "@eastgate/ui/components/label";
import { Separator } from "@eastgate/ui/components/separator";
import { Field, FieldGroup, FieldError } from "@eastgate/ui/components/field";
import { useAdminAuth } from "../AuthProvider/auth.context";
import { useAppForm } from "../Form/useAppForm";

const loginSchema = z.object({
  email: z.email("Please enter a valid email."),
  password: z.string().min(8, "Password must be at least 8 characters."),
});
export function LoginForm() {
  const { loginWithGoogle, loginWithEmail, isAuthenticating } = useAdminAuth();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const navigate = useNavigate();

  const form = useAppForm({
    defaultValues: {
      email: "",
      password: "",
    },
    schema: loginSchema,
    onSubmit: async value => {
      setErrorMessage(null);
      try {
        await loginWithEmail(value.email, value.password);
        navigate({ to: "/" });
      } catch (error: unknown) {
        const err = error as Error;
        setErrorMessage(err.message || "Invalid credentials or access denied.");
      }
    },
  });

  const handleGoogleLogin = async () => {
    setErrorMessage(null);
    try {
      await loginWithGoogle();
      navigate({ to: "/" });
    } catch (error: unknown) {
      const err = error as Error;
      setErrorMessage(err.message || "Google sign-in failed or access denied.");
    }
  };

  return (
    <Card className="w-full max-w-md">
      <CardHeader className="text-center space-y-1">
        <TypographyH3>Admin Portal</TypographyH3>
        <CardDescription>
          Enter your credentials to access the dashboard
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-4">
        <form
          id="login-form"
          onSubmit={e => {
            e.preventDefault();
            form.handleSubmit();
          }}
        >
          <FieldGroup className="space-y-4">
            <form.Field
              name="email"
              children={field => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;
                return (
                  <Field data-invalid={isInvalid}>
                    <Label htmlFor={field.name}>Email</Label>
                    <Input
                      id={field.name}
                      name={field.name}
                      type="email"
                      placeholder="admin@eastgate.com"
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={e => field.handleChange(e.target.value)}
                      aria-invalid={isInvalid}
                      disabled={isAuthenticating}
                      autoComplete="email"
                    />
                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                );
              }}
            />

            <form.Field
              name="password"
              children={field => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;
                return (
                  <Field data-invalid={isInvalid}>
                    <Label htmlFor={field.name}>Password</Label>
                    <Input
                      id={field.name}
                      name={field.name}
                      type="password"
                      placeholder="••••••••"
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={e => field.handleChange(e.target.value)}
                      aria-invalid={isInvalid}
                      disabled={isAuthenticating}
                      autoComplete="current-password"
                    />
                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                );
              }}
            />
          </FieldGroup>
        </form>

        {errorMessage && (
          <div className="p-3 bg-destructive/10 text-destructive text-sm rounded-md text-center">
            {errorMessage}
          </div>
        )}

        <Button
          type="submit"
          form="login-form"
          disabled={isAuthenticating}
          className="w-full mt-2"
        >
          {isAuthenticating ? "Verifying..." : "Sign in with Email"}
        </Button>

        <div className="relative my-4">
          <div className="absolute inset-0 flex items-center">
            <Separator />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-card px-2 text-muted-foreground">
              Or continue with
            </span>
          </div>
        </div>

        <Button
          type="button"
          variant="outline"
          onClick={handleGoogleLogin}
          disabled={isAuthenticating}
          className="w-full"
        >
          Google
        </Button>
      </CardContent>
    </Card>
  );
}
