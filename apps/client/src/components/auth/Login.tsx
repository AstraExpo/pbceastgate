import { z } from "zod";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useNavigate, useRouter } from "@tanstack/react-router";
import {
  signInWithApple,
  signInWithEmail,
  signInWithFacebook,
  signInWithGoogle,
  signInWithMicrosoft,
  signOut,
} from "@eastgate/auth/client";
import { Button } from "@eastgate/ui/components/button";
import { Input } from "@eastgate/ui/components/input";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@eastgate/ui/components/field";
import { useAuthenticateCongregant } from "@/hooks/auth";
import { AuthCard } from "./AuthCard";
import { AppleIcon, GoogleIcon, MetaIcon, MicrosoftIcon } from "./Assets";
import { AuthContainer } from "./AuthContainer";

const loginSchema = z.object({
  email: z.email("Please enter a valid email."),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters.")
    .max(16, "Password must not exceed 16 characters."),
});

type LoginFormValues = z.infer<typeof loginSchema>;
type FirebaseSignIn = () => Promise<unknown>;

export function LoginForm() {
  const navigate = useNavigate();
  const router = useRouter();
  const { authenticateCongregant, loading: authenticatingCongregant } =
    useAuthenticateCongregant();

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
  });

  const isLoading = form.formState.isSubmitting || authenticatingCongregant;

  const completeCongregantLogin = async (signIn: FirebaseSignIn) => {
    await signIn();

    const { user } = await authenticateCongregant();

    if (!user) {
      await signOut();
      return;
    }

    await router.invalidate();
    await navigate({ to: "/home" });
  };

  const onSubmit = async ({ email, password }: LoginFormValues) => {
    await completeCongregantLogin(() => signInWithEmail(email, password));
  };

  return (
    <AuthContainer>
      <AuthCard
        title="Welcome back"
        description="Sign in to continue to your account."
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
                    disabled={isLoading}
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
                  <div className="flex items-center justify-between">
                    <FieldLabel htmlFor="password">Password</FieldLabel>
                    <Link
                      to="/forgotpassword"
                      className="text-sm text-primary hover:underline"
                    >
                      Forgot password?
                    </Link>
                  </div>
                  <Input
                    {...field}
                    id="password"
                    type="password"
                    autoComplete="current-password"
                    disabled={isLoading}
                  />
                  <FieldError
                    errors={fieldState.error ? [fieldState.error] : []}
                  />
                </Field>
              )}
            />

            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Signing in…" : "Sign in"}
            </Button>
          </FieldGroup>
        </form>

        <div className="my-6 flex items-center gap-3 text-xs text-muted-foreground">
          <span className="h-px flex-1 bg-border" />
          OR CONTINUE WITH
          <span className="h-px flex-1 bg-border" />
        </div>

        <div className="grid grid-cols-4 gap-2">
          <Button
            type="button"
            variant="outline"
            size="icon"
            disabled={isLoading}
            onClick={() => completeCongregantLogin(signInWithGoogle)}
            aria-label="Continue with Google"
          >
            <GoogleIcon />
          </Button>
          <Button
            type="button"
            variant="outline"
            size="icon"
            disabled={isLoading}
            onClick={() => completeCongregantLogin(signInWithApple)}
            aria-label="Continue with Apple"
          >
            <AppleIcon />
          </Button>
          <Button
            type="button"
            variant="outline"
            size="icon"
            disabled={isLoading}
            onClick={() => completeCongregantLogin(signInWithFacebook)}
            aria-label="Continue with Facebook"
          >
            <MetaIcon />
          </Button>
          <Button
            type="button"
            variant="outline"
            size="icon"
            disabled={isLoading}
            onClick={() => completeCongregantLogin(signInWithMicrosoft)}
            aria-label="Continue with Microsoft"
          >
            <MicrosoftIcon />
          </Button>
        </div>

        <p className="mt-6 text-center text-sm text-muted-foreground">
          New here?{" "}
          <Link to="/signup" className="text-primary hover:underline">
            Create an account
          </Link>
        </p>
      </AuthCard>
    </AuthContainer>
  );
}
