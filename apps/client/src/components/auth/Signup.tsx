import { z } from "zod";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useNavigate, useRouter } from "@tanstack/react-router";
import {
  createUserWithEmail,
  signOut,
  UserCredential,
  signInWithApple,
  signInWithFacebook,
  signInWithGoogle,
  signInWithMicrosoft,
} from "@eastgate/auth/client";
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
import { useSignUpCongregant } from "@/hooks/auth";
import { clearSessionFn, createSessionFn } from "@/server/auth.function";
import { AppleIcon, GoogleIcon, MetaIcon, MicrosoftIcon } from "./Assets";

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
type FirebaseSignIn = () => Promise<UserCredential>;

export function SignupForm() {
  const navigate = useNavigate();
  const router = useRouter();
  const { signUpCongregant, loading: signingUpCongregant } =
    useSignUpCongregant();

  const form = useForm<SignupFormValues>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const isLoading = form.formState.isSubmitting || signingUpCongregant;

  const onSubmit = async ({ email, password }: SignupFormValues) => {
    const credentials = await createUserWithEmail(email, password);

    const { user } = await signUpCongregant();

    if (!user) {
      await signOut();
      await clearSessionFn();
      return;
    }

    const idToken = await credentials.user.getIdToken(true);

    if (idToken) {
      await createSessionFn({ data: { idToken } });
    }

    await router.invalidate();

    await navigate({ to: "/home" });
  };

  const completeProviderSignup = async (signIn: FirebaseSignIn) => {
    const credentials = await signIn();

    const { user } = await signUpCongregant();

    if (!user) {
      await signOut();
      await clearSessionFn();
      return;
    }

    const idToken = await credentials.user.getIdToken(true);

    if (idToken) {
      await createSessionFn({ data: { idToken } });
    }

    await router.invalidate();

    await navigate({ to: "/home" });
  };

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
                  <FieldLabel htmlFor="password">Password</FieldLabel>
                  <Input
                    {...field}
                    id="password"
                    type="password"
                    autoComplete="new-password"
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
                    disabled={isLoading}
                  />
                  <FieldError
                    errors={fieldState.error ? [fieldState.error] : []}
                  />
                </Field>
              )}
            />

            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Creating account…" : "Create account"}
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
            onClick={() => completeProviderSignup(signInWithGoogle)}
            aria-label="Continue with Google"
          >
            <GoogleIcon />
          </Button>
          <Button
            type="button"
            variant="outline"
            size="icon"
            disabled={isLoading}
            onClick={() => completeProviderSignup(signInWithApple)}
            aria-label="Continue with Apple"
          >
            <AppleIcon />
          </Button>
          <Button
            type="button"
            variant="outline"
            size="icon"
            disabled={isLoading}
            onClick={() => completeProviderSignup(signInWithFacebook)}
            aria-label="Continue with Facebook"
          >
            <MetaIcon />
          </Button>
          <Button
            type="button"
            variant="outline"
            size="icon"
            disabled={isLoading}
            onClick={() => completeProviderSignup(signInWithMicrosoft)}
            aria-label="Continue with Microsoft"
          >
            <MicrosoftIcon />
          </Button>
        </div>

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
