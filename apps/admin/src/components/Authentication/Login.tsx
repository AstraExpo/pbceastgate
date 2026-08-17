import { z } from "zod";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@eastgate/ui/components/card";
import { Button } from "@eastgate/ui/components/button";
import { Input } from "@eastgate/ui/components/input";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@eastgate/ui/components/field";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller } from "react-hook-form";
import {
  signInWithApple,
  signInWithEmail,
  signInWithFacebook,
  signInWithGoogle,
  signInWithMicrosoft,
  signOut,
} from "@eastgate/auth";
import { useAuthenticateAdmin } from "@/hooks/auth";
import { useNavigate, useRouter } from "@tanstack/react-router";
import { AppleIcon, GoogleIcon, MetaIcon, MicrosoftIcon } from "./Assets";

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

  const { authenticateAdmin, loading: authenticatingAdmin } =
    useAuthenticateAdmin();

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const isLoading = form.formState.isSubmitting || authenticatingAdmin;

  const completeAdminLogin = async (signIn: FirebaseSignIn) => {
    await signIn();

    const { user } = await authenticateAdmin();

    if (!user) {
      await signOut();
      return;
    }

    await router.invalidate();

    await navigate({
      to: "/dashboard",
    });
  };

  const onSubmit = async (data: LoginFormValues) => {
    await completeAdminLogin(() => signInWithEmail(data.email, data.password));
  };

  const handleGoogleLogin = async () => {
    await completeAdminLogin(signInWithGoogle);
  };

  const handleAppleLogin = async () => {
    await completeAdminLogin(signInWithApple);
  };

  const handleMicrosoftLogin = async () => {
    await completeAdminLogin(signInWithMicrosoft);
  };

  const handleFacebookLogin = async () => {
    await completeAdminLogin(signInWithFacebook);
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center p-4"
      style={{
        backgroundImage: "url('/images/gradient-background.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div
        className="absolute inset-0 opacity-0"
        style={{
          background: "rgba(0, 0, 0, 0.15)",
        }}
      ></div>

      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute top-1/4 left-1/4 w-32 h-32 rounded-full opacity-50 animate-pulse"
          style={{
            background: "rgba(255, 255, 255, 0.15)",
            backdropFilter: "blur(20px) saturate(180%)",
            border: "2px solid rgba(255, 255, 255, 0.3)",
            boxShadow:
              "0 8px 32px rgba(255, 255, 255, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.4)",
          }}
        ></div>
        <div
          className="absolute top-3/4 right-1/4 w-24 h-24 rounded-full opacity-40 animate-pulse delay-1000"
          style={{
            background: "rgba(255, 255, 255, 0.15)",
            backdropFilter: "blur(20px) saturate(180%)",
            border: "2px solid rgba(255, 255, 255, 0.3)",
            boxShadow:
              "0 8px 32px rgba(255, 255, 255, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.4)",
          }}
        ></div>
        <div
          className="absolute top-1/2 right-1/3 w-16 h-16 rounded-full opacity-45 animate-pulse delay-500"
          style={{
            background: "rgba(255, 255, 255, 0.15)",
            backdropFilter: "blur(20px) saturate(180%)",
            border: "2px solid rgba(255, 255, 255, 0.3)",
            boxShadow:
              "0 8px 32px rgba(255, 255, 255, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.4)",
          }}
        ></div>
      </div>

      <Card
        className="max-w-md hover-lift shadow-2xl relative z-10 opacity-100 w-[126%] mx-0 border-transparent"
        style={{
          background: "rgba(255, 255, 255, 0.25)",
          backdropFilter: "blur(40px) saturate(250%)",
          border: "1px solid rgba(255, 255, 255, 0.4)",
          boxShadow:
            "0 32px 80px rgba(0, 0, 0, 0.3), 0 16px 64px rgba(255, 255, 255, 0.2), inset 0 3px 0 rgba(255, 255, 255, 0.6), inset 0 -1px 0 rgba(255, 255, 255, 0.3)",
        }}
      >
        <CardHeader className="text-center space-y-2">
          <CardTitle className="text-3xl font-bold font-sans text-card-foreground">
            Welcome Back
          </CardTitle>
          <CardDescription className="text-card-foreground/70 font-sans">
            Sign in to your account to continue
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FieldGroup>
              <Controller
                name="email"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel
                      htmlFor="email"
                      className="text-sm font-medium text-card-foreground font-sans"
                    >
                      Email Address
                    </FieldLabel>
                    <Input
                      {...field}
                      aria-invalid={fieldState.invalid}
                      id="email"
                      type="email"
                      placeholder="Enter your email address..."
                      className="border-white/40 bg-white/10 placeholder:text-card-foreground/50 text-card-foreground py-3 focus:ring-2 focus:ring-blue-400 focus:border-blue-400 focus:bg-white/15 transition-all duration-200"
                      required
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
              <Controller
                name="password"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel
                      htmlFor="password"
                      className="text-sm font-medium text-card-foreground font-sans"
                    >
                      Password
                    </FieldLabel>
                    <Input
                      {...field}
                      aria-invalid={fieldState.invalid}
                      id="password"
                      type="password"
                      placeholder="Type in your password..."
                      className="border-white/40 bg-white/10 placeholder:text-card-foreground/50 text-card-foreground py-3 focus:ring-2 focus:ring-blue-400 focus:border-blue-400 focus:bg-white/15 transition-all duration-200"
                      required
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
            </FieldGroup>

            <Button
              type="submit"
              className="w-full ripple-effect hover-lift font-sans font-bold py-5 transition-all duration-300"
              style={{
                backgroundColor: "#0C115B",
                color: "white",
              }}
              disabled={isLoading}
            >
              {isLoading ? "Signing In..." : "Sign In"}
            </Button>
          </form>

          <div className="relative">
            <div className="relative flex justify-center text-xs uppercase">
              <span className="px-2 text-card-foreground/60 font-sans">
                Or continue with
              </span>
            </div>
          </div>

          <div className="space-y-3">
            <Button
              type="button"
              variant="outline"
              onClick={handleGoogleLogin}
              className="w-full glass-effect border-white/30 hover-lift ripple-effect text-card-foreground hover:bg-white/20 font-sans transition-all duration-300"
              disabled={isLoading}
            >
              <GoogleIcon />
              Continue with Google
            </Button>

            <Button
              type="button"
              variant="outline"
              className="w-full glass-effect border-white/30 hover-lift ripple-effect text-card-foreground hover:bg-white/20 font-sans transition-all duration-300"
              onClick={handleAppleLogin}
              disabled={isLoading}
            >
              <AppleIcon />
              Continue with Apple
            </Button>

            <Button
              type="button"
              variant="outline"
              onClick={handleFacebookLogin}
              disabled={isLoading}
              className="w-full glass-effect border-white/30 hover-lift ripple-effect text-card-foreground hover:bg-white/20 font-sans transition-all duration-300"
            >
              <MetaIcon />
              Continue with Neta
            </Button>

            <Button
              type="button"
              variant="outline"
              onClick={handleMicrosoftLogin}
              disabled={isLoading}
              className="w-full glass-effect border-white/30 hover-lift ripple-effect text-card-foreground hover:bg-white/20 font-sans transition-all duration-300"
            >
              <MicrosoftIcon />
              Continue with Microsoft
            </Button>
          </div>

          <div className="text-center">
            <a
              href="#"
              className="text-sm text-card-foreground/70 hover:text-card-foreground font-sans transition-colors"
            >
              Forgot your password?
            </a>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
