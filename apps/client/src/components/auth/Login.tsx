import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useAdminAuth } from "@/hooks/useAdminAuth";

// Import your generated Shadcn components
import { Button } from "@eastgate/ui/components/button";
import { Input } from "@eastgate/ui/components/input";
import { Label } from "@eastgate/ui/components/label";
import { Separator } from "@eastgate/ui/components/separator";

// ✨ Define the Yup Validation Schema
const loginSchema = yup.object().shape({
  email: yup
    .string()
    .email("Please enter a valid email")
    .required("Email is required"),
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

type LoginFormValues = yup.InferType<typeof loginSchema>;

function LoginForm() {
  const {
    loginWithGoogleAdminCheck,
    loginWithEmailAdminCheck,
    isVerifyingServer,
  } = useAdminAuth();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const navigate = useNavigate();

  // ✨ Initialize React Hook Form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: yupResolver(loginSchema),
  });

  const handleEmailSubmit = async (data: LoginFormValues) => {
    setErrorMessage(null);
    try {
      await loginWithEmailAdminCheck(data.email, data.password);
      navigate({ to: "/" });
    } catch (error: any) {
      setErrorMessage(error.message || "Invalid credentials or access denied.");
    }
  };

  const handleGoogleLogin = async () => {
    setErrorMessage(null);
    try {
      await loginWithGoogleAdminCheck();
      navigate({ to: "/" });
    } catch (error: any) {
      setErrorMessage(
        error.message || "Google sign-in failed or access denied.",
      );
    }
  };

  return (
    <main className="flex-1 flex items-center justify-center p-4">
      <div className="flex flex-col gap-6 p-8 border rounded-lg shadow-sm w-full max-w-md bg-card text-card-foreground">
        <div className="flex flex-col space-y-1.5 text-center">
          <h1 className="text-2xl font-semibold tracking-tight">
            Admin Portal
          </h1>
          <p className="text-sm text-muted-foreground">
            Enter your credentials to access the dashboard
          </p>
        </div>

        {/* ✨ The Form */}
        <form
          onSubmit={handleSubmit(handleEmailSubmit)}
          className="flex flex-col gap-4"
        >
          <div className="flex flex-col gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="admin@eastgate.com"
              {...register("email")}
              disabled={isVerifyingServer}
            />
            {errors.email && (
              <p className="text-sm text-destructive">{errors.email.message}</p>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              placeholder="••••••••"
              {...register("password")}
              disabled={isVerifyingServer}
            />
            {errors.password && (
              <p className="text-sm text-destructive">
                {errors.password.message}
              </p>
            )}
          </div>

          <Button
            type="submit"
            disabled={isVerifyingServer}
            className="w-full mt-2"
          >
            {isVerifyingServer ? "Verifying..." : "Sign in with Email"}
          </Button>
        </form>

        {errorMessage && (
          <div className="p-3 bg-destructive/10 text-destructive text-sm rounded-md text-center">
            {errorMessage}
          </div>
        )}

        <div className="relative">
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
          disabled={isVerifyingServer}
          className="w-full"
        >
          Google
        </Button>
      </div>
    </main>
  );
}
