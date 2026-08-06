import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useAuth } from "@eastgate/auth";
import { useLoginWithFirebase } from "@/hooks/auth";

export const Route = createFileRoute("/_auth/login")({
  component: LoginPage,
});

function LoginPage() {
  const { signInWithGoogle, getToken } = useAuth();
  const {
    authenticateAdmin,
    loading: serverLoading,
    error: serverError,
  } = useLoginWithFirebase();
  const navigate = useNavigate();

  const handleLogin = async () => {
    console.log("🚀 [login page] Initiating Google Sign-In...");
    try {
      // Step 1: Authenticate with Firebase client SDK (Popup)
      await signInWithGoogle();
      console.log(
        "🎉 [login page] Firebase Sign-In successful. Fetching token...",
      );

      // Step 2: Grab the raw Firebase ID token
      const token = await getToken();
      if (!token) {
        throw new Error("Failed to retrieve Firebase ID token after login.");
      }

      // Step 3: Send the token to the NestJS backend to verify and upsert/approve user
      console.log("📡 [login page] Syncing user with NestJS backend...");
      const response = await authenticateAdmin(token);

      console.log("✅ [login page] Server sync successful:", response);

      // Step 4: Server has approved the user, safe to redirect to dashboard
      navigate({ to: "/" });
    } catch (error) {
      console.error(
        "❌ [login page] Error during login or server sync:",
        error,
      );
    }
  };

  return (
    <main className="flex-1 flex items-center justify-center p-4">
      <div className="flex flex-col gap-6 items-center p-8 border rounded-lg shadow-sm w-full max-w-md">
        <h1 className="text-2xl font-bold">Admin Portal Login</h1>

        <button
          onClick={handleLogin}
          disabled={serverLoading}
          className="w-full bg-foreground text-background px-6 py-3 rounded-full font-medium hover:opacity-90 transition disabled:opacity-50 cursor-pointer"
        >
          {serverLoading ? "Verifying with server..." : "Sign in with Google"}
        </button>

        {serverError && (
          <p className="text-sm text-red-500 text-center">
            Access denied: {serverError.message}
          </p>
        )}
      </div>
    </main>
  );
}
