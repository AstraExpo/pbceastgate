import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useAdminAuth } from "@/hooks/auth";
import { useState } from "react";

export const Route = createFileRoute("/_auth/login")({
  component: LoginPage,
});

function LoginPage() {
  const { loginWithAdminCheck, isVerifyingServer } = useAdminAuth();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleLogin = async () => {
    setErrorMessage(null);
    try {
      console.log("🚀 [login page] Initiating Admin Login flow...");
      await loginWithAdminCheck();
      console.log("✅ [login page] Admin verified! Redirecting...");
      navigate({ to: "/" });
    } catch (error) {
      console.error("❌ [login page] Login rejected:", error);
      setErrorMessage("Access denied. Administrator privileges required.");
    }
  };

  return (
    <main className="flex-1 flex items-center justify-center p-4">
      <div className="flex flex-col gap-6 items-center p-8 border rounded-lg shadow-sm w-full max-w-md">
        <h1 className="text-2xl font-bold">Admin Portal Login</h1>

        <button
          onClick={handleLogin}
          disabled={isVerifyingServer}
          className="w-full bg-foreground text-background px-6 py-3 rounded-full font-medium hover:opacity-90 transition disabled:opacity-50 cursor-pointer"
        >
          {isVerifyingServer
            ? "Verifying Admin Privileges..."
            : "Sign in with Google"}
        </button>

        {errorMessage && (
          <p className="text-sm text-red-500 text-center">{errorMessage}</p>
        )}
      </div>
    </main>
  );
}
